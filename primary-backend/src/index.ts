import express from "express";
import cors from "cors";
import { userRouter } from "./routes/user";
import { PORT } from "./config";
import { postRouter } from "./routes/post";
const app = express()

app.use(express.json());
app.use(cors());

app.use("/api/v1/user",userRouter)
app.use("/api/v1/post",postRouter)
console.log(PORT);

app.listen(PORT||5000);