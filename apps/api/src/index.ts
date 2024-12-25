import express, { Request, Response } from "express";
import cors from "cors";
import 'dotenv/config';
import authRouter from "./routes/login"
import zapRouter from "./routes/zaps";

const PORT=process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth',authRouter);
app.use('/zaps',zapRouter);
app.get('/' , (req : Request, res : Response) => {
    res.status(200).send("Hello World");
    return;
})

app.listen(PORT || 8000 , () => console.log(`Server Running on port ${PORT}`));