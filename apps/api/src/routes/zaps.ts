import express, { Request, Response } from "express";
import { client } from "../lib/client";
import jwt from "jsonwebtoken";
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
                        type: true,
                        order: true
                    }
                },
                trigger: {
                    select: {
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
                        type: true,
                        order: true,
                        metaData: true
                    }
                },
                trigger: {
                    select: {
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


export default router;