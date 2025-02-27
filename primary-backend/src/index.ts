import express from "express";
import cors from "cors";
import { userRouter } from "./routes/user";
import { PORT } from "./config";
const app = express()

app.use(express.json());
app.use(cors({
    origin:"",
    methods:"GET, POST, PUT, DELETE",
    credentials:true
}))

app.use("/api/v1/user",userRouter)

app.listen(PORT);