import express, { Request, Response } from "express";
import { client } from "../lib/client";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { z } from "zod";

const Schema = z.object({
    email: z.string().min(5),
    password: z.string()
})

const SignUpSchema = z.object({
    email: z.string().min(5),
    password: z.string().min(6),
    userName: z.string().min(6)
})

const secret = process.env.JWT_SECRET ?? "";

const router = express.Router();

router.post('/sign-in', async (req: Request, res: Response) => {
    try {
        const data = Schema.parse(req.body);
        try {
            const resp = await client.user.findFirst({
                where: {
                    email: data.email,
                    password: data.password
                }
            });
            if (!resp) {
                res.status(401).json({ message: "Password is incorrect" })
            }
            const id = resp?.id;
            const token = jwt.sign({ id, email: data.email }, secret);
            res.status(200).json({ jwt:token, id, email: data.email, userName: resp?.username });
            return;
        } catch (e) {
            res.status(400).json({ message: "Some error Occured. Please try again later" })
        }
    } catch (e) {
        console.log(e);
        res.status(423).json({ message: "Format Incorrect" })
    }
})

router.post('/sign-up', async (req: Request, res: Response) => {
    try {
        const data = SignUpSchema.parse(req.body);
        try {
            const resp = await client.user.findFirst({
                where: {
                    email: data.email,
                }
            });
            if (!resp) {
                const resp2 = await client.user.create({
                    data: {
                        email: data.email,
                        password: data.password,
                        username: data.userName
                    }
                })
                const id = resp2?.id;
                const token = jwt.sign({ id, email: data.email }, secret);
                res.status(200).json({ jwt:token, id, email: data.email, userName: resp2?.username });
                return;
            }

            res.status(405).json({ message: "Email already in use" });
            return;
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: "Some error Occured. Please try again later" })
        }
    } catch (e) {
        console.log(e);
        res.status(423).json({ message: "Format Incorrect" })
    }
})

export default router;