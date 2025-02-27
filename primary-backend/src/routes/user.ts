import { Router } from "express";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { SigninSchema, SignupSchema } from "../types/types";
import { prismaClient } from "../db/db";
import { USER_JWT } from "../config";
const router = Router();

router.post("/signup",async(req:Request,res:Response)=>{
    try {
        const parsedBody = SignupSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(400).json({message:"Invalid Input",error:parsedBody.error.errors})
        }
        const {name,username,password} = parsedBody.data;
        const existingUser = await prismaClient.user.findFirst({
            where:{
                username:username
            }
        })
        if (existingUser){
            return res.status(402).send({message:"User already exist"})
        }
        const HashedPassword = await bcrypt.hash(password,10)
        const user = await prismaClient.user.create({
            data:{
                name:name,
                username:username,
                password:HashedPassword,
            }
        })
        res.json({
            message:"User Created Sucessfully",
            user:user
        })
    } catch (error) {
        console.error(error);
        res.status(403).send({message:"Something went wrong!"})
    }
})

router.post("/signin",async(req:Request,res:Response)=>{
    try {
        const parsedBody = SigninSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(400).json({message:"Invalid Input",error:parsedBody.error.errors})
        }
        const {username,password} = parsedBody.data
        const user = await prismaClient.user.findFirst({
            where:{
                username,
            }
        })
        if (!user) {
            return res.status(401).send({message:"Invalid Email Or Password!"})
        }
        const passwordValidation = await bcrypt.compare(password,user.password);
        if (!passwordValidation) {
            return res.status(401).send({message:"Password Mismatch!"}) 
        }
        const token = jwt.sign({
            id:user.id
        },USER_JWT as string,{expiresIn:"1h"})
        res.json({
            token,
            message:"User Login Sucessfully"
        })  
    } catch (error) {
        console.error(error);
        res.status(403).send({message:"Something went wrong!"})
    }
})




export const userRouter = router;