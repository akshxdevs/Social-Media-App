import express from "express";
import cors from "cors";
const app = express()
const PORT = 3000

app.use(express.json());
app.use(cors({
    origin:"",
    methods:"GET, POST, PUT, DELETE",
    credentials:true
}))

app.use("",)

app.listen(PORT,`Server running on port ${PORT}`)