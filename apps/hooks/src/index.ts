import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import { client } from "./lib/client";

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

app.post('/hooks/execute/:userId/:zapId', async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const zapId = req.params.zapId;
    const metadata = req.body;
    await client.$transaction(async tx => {
        const run = await tx.zapRun.create({
            data: {
                zapId: zapId,
                time: String(Date.now()),
                metaData: metadata
            }
        });
        await tx.zapRunOutbox.create({
            data: {
                zapRunId: run.id
            }
        });
    });
    res.status(200).send("Zap created successfully")
})

app.get('/', (req: Request, res: Response) => {
    res.status(200).send("Hello World");
})

app.listen(PORT || 4000, () => console.log(`Server running on port ${PORT}`));
