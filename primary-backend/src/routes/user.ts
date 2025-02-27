import { Router } from "express";
import { SignupSchema } from "../types/types";

const router = Router();

router.use("/signup",(req,res)=>{
    const prasedData = SignupSchema.safeParse(req.body)
    if (!prasedData.success) {
        res.status(403).json({
            message:"Incorrect Inputs!"
        })
    }
})

export const userRouter = router;