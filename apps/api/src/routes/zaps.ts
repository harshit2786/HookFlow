import express, { Request, Response } from "express";
import { client } from "../lib/client";
import "dotenv/config";
import { z } from "zod";
import { middlewareFunc } from "../middleware";

const router = express.Router();

const ZapPostSchema = z.object({
    name: z.string(),
    description: z.string(),
    triggerId: z.string(),
    actions: z.array(z.object({
        order: z.number(),
        actionsId: z.string(),
        metaData: z.object({}).passthrough()
    }))
})

router.get('/', middlewareFunc, async (req: Request, res: Response) => {
    const id = req.userId as string;
    try {
        const resp = await client.zap.findMany({
            where: {
                userId: id
            },
            include: {
                actions: {
                    select: {
                        id : true,
                        type: true,
                        order: true
                    }
                },
                trigger: {
                    select: {
                        id : true,
                        type: true,
                    }
                }
            }
        });
        res.json({ data: resp });
        return;
    } catch (e) {
        console.log(e);
        res.status(400).json({ error: "Something went wrong" });
        return;
    }
});

router.delete('/:zapId', middlewareFunc, async (req: Request, res: Response) => {
    const id = req.userId as string;
    const zapId = req.params.zapId as string;
    try {
        await client.zap.delete({
            where: {
                id: zapId,
                userId: id
            }
        });
        res.json({ message: "Zap Deleted Successfully" })
    } catch (e) {
        console.log(e);
        res.status(400).json({ error: "Something went wrong" })
    }
})

router.post('/', middlewareFunc, async (req: Request, res: Response) => {
    const id = req.userId as string;
    const { data, success } = ZapPostSchema.safeParse(req.body);
    if (!success) {
        res.status(422).json({ error: "Unprocessable data" });
        return;
    }
    const timeStamp = Date.now().toString();
    try {
        const resp = await client.zap.create({
            data: {
                timeStamp,
                name: data.name,
                description: data.description,
                userId: id,
                trigger: {
                    create: {
                        typeId: data.triggerId
                    }
                },
                actions: {
                    createMany: {
                        data: data.actions.map(a => ({ typeId: a.actionsId, order: a.order, metaData: a.metaData }))
                    }
                }
            }
        });
        res.json({ data: resp });
        return;
    } catch (e) {
        console.log(e);
        res.status(400).json({ error: "Something went wrong" });
        return;
    }

});

router.get('/available-triggers', middlewareFunc , async(req : Request , res: Response) => {
    try{
        const resp = await client.availableTriggers.findMany();
        res.json(resp);
        return;
    } catch(e){
        console.log(e);
        res.status(400).json({error : "Something went wrong"});
    }
})

router.get('/available-actions', middlewareFunc , async(req : Request , res: Response) => {
    try{
        const resp = await client.availableActions.findMany();
        res.json(resp);
        return;
    } catch(e){
        console.log(e);
        res.status(400).json({error : "Something went wrong"});
    }
})

router.get('/:zapId', middlewareFunc, async (req: Request, res: Response) => {
    try {
        const id = req.userId as string;
        const zapId = req.params.zapId as string;
        const resp = await client.zap.findUnique({
            where: {
                userId: id,
                id: zapId
            },
            include: {
                actions: {
                    select: {
                        id : true,
                        type: true,
                        order: true,
                        metaData: true
                    }
                },
                trigger: {
                    select: {
                        id : true,
                        type: true,
                    }
                }
            }
        });
        if(!resp){
            res.status(404).json({error : "This zap does not exist"});
            return;
        }
        const respObj = {
            id : resp.id,
            name : resp.name,
            description : resp.description,
            timestamp : resp.timeStamp,
            trigger : {
                id : resp.trigger?.id,
                name : resp.trigger?.type.name,
                typeId : resp.trigger?.type.id
            },
            actions : resp.actions.map((a) => ({
                id : a.id,
                metadata : a.metaData,
                order : a.order,
                typeId : a.type.id,
                typeName : a.type.name
            }))
        }
        res.json({ data: respObj });
        return;
    } catch (e) {
        console.log(e);
        res.status(400).json({ error: "Something went wrong" });
        return;
    }
});


export default router;