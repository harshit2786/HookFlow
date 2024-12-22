import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req : Request , res : Response) => {
    res.status(200).send("Hello World");
})

app.listen(PORT || 4000 , () => console.log(`Server running on port ${PORT}`));
