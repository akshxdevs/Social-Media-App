import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

interface AuthRequest extends Request {
    id?:string
}

export function authenticateJWT (req:AuthRequest,res:Response,next:NextFunction){
    const token = req.headers["authorization"] as unknown as string;
    if (!token) {
        return res.status(403).json({
            message:"Provide Header / Token!"
        })
    }
    const payload = jwt.verify(token,JWT_SECRET as string) as {id:string}
    if (payload) {
        req.id = payload.id;
        next();
    }else{
        return res.status(403).json({
            message:"Not Authorized"
        })
    }

}