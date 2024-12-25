import express, { Request, Response } from "express";
import { client } from "../lib/client";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { z } from "zod";
import { middlewareFunc } from "../middleware";

const router = express.Router();

router.get('/' , middlewareFunc , async(req : Request , res : Response) => {
    const id = req.userId as string;
    try{
        const resp = await client.zap.findMany({
            where : {
                userId : id
            },
            include : {
                actions : {
                    select : {
                        type : true,
                        order : true
                    }
                },
                trigger : {
                    select : {
                        type : true,
                    }
                }
            }
        })
    } catch(e){
        console.log(e);

    }
});

export default router;