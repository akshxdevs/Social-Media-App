import { Request, Response, Router } from "express";
import { authenticateJWT } from "../middleware/middleware";
import { CommentSchema, LikeSchema, PostSchema, SavePostSchema } from "../types/types";
import { prismaClient } from "../db/db";
const router = Router();

router.get("/getpost/:id",authenticateJWT,async(req:Request,res:Response)=>{
    try {
        const userId = req.params.id
        // const token = req.headers.authorization as string
        // const tokenCheck = jwt.decode(token) as {id :string}
        // console.log(tokenCheck);
        // const validation = tokenCheck.id === userId
        // if (!validation) {
        //     return res.status(400).json({
        //         message:"Token Mismatch / UserId is wrong!"
        //     })
        // }  
        const getPost = await prismaClient.post.findMany({
            where:{
                userId:userId
            }
        })
        if (!getPost) {
            return res.send(404).json({
                message:"User Have 0 Post!"
            })
        }res.json({
            getPost
        })
    } catch (error) {
        console.error(error);
        res.status(403).send({message:"Something went wrong!"})  
    }
})

router.get("/getallpost",authenticateJWT,async(req:Request,res:Response)=>{
    try {
        const getAllPost = await prismaClient.post.findMany({
        })
        if (!getAllPost) {
            return res.send(404).json({
                message:"No Post Yet!"
            })
        }res.json({
            getAllPost
        })
    } catch (error) {
        console.error(error);
        res.status(403).send({message:"Something went wrong!"})  
    }
})

router.post("/createpost",authenticateJWT,async(req,res)=>{
    try {
        const parsedBody = PostSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(400).json({message:"Invalid Input",error:parsedBody.error.errors})
        }
        const { postDescription,postImgUrl,userId } = parsedBody.data       
        const post = await prismaClient.post.create({
            data:{
                postDescription:postDescription,
                imageUrl:postImgUrl,
                userId:userId
            }
        })
        res.json({
            message:"Posted Sucessfully",
            post
        })
    } catch (error) {
        console.error(error);
        res.status(403).send({message:"Something went wrong!"})
    }
})

router.post("/like",authenticateJWT,async(req,res)=>{
    try {
        const parsedBody = LikeSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(400).json({message:"Invalid Input",error:parsedBody.error.errors})
        }
        const {postId,userId} = parsedBody.data
        const user = await prismaClient.user.findFirst({
            where:{
                id:userId
            }
        })
        if (!user) {
            return res.status(404).json({
                message:"User Not Found"
            })
        }
        const post = await prismaClient.post.findFirst({
            where:{
                id:postId
            }
        })
        if (!post) {
            return res.status(404).json({
                message:"Post Not Found"
            })
        }
        await prismaClient.like.create({
            data:{
                postId:postId,
                userId:userId
            }
        })
        res.json({
            message:`${user.name} liked post ${postId}!`
        })
    } catch (error) {
        
    }
})

router.post("/comment",authenticateJWT,async(req,res)=>{
    try {
        const parsedBody = CommentSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(400).json({message:"Invalid Input",error:parsedBody.error.errors})
        }
        const {postId,userId,comment} = parsedBody.data
        const user = await prismaClient.user.findFirst({
            where:{
                id:userId
            }
        })
        if (!user) {
            return res.status(404).json({
                message:"User Not Found"
            })
        }
        const post = await prismaClient.post.findFirst({
            where:{
                id:postId
            }
        })
        if (!post) {
            return res.status(404).json({
                message:"Post Not Found"
            })
        }
        await prismaClient.comment.create({
            data:{
                comment:comment,
                postId:postId,
                userId:userId,
            }
        })
        res.json({
            message:`${user.name} commented ${comment} on post ${postId}!`
        })
    } catch (error) {
        
    }
})

router.post("/savepost/:id",authenticateJWT,async(req,res)=>{
    try {
        const postId = req.params.id
        const parsedBody = SavePostSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(400).json({message:"Invalid Input",error:parsedBody.error.errors})
        }
        const {userId} = parsedBody.data
        const user = await prismaClient.user.findFirst({
            where:{
                id:userId
            }
        })
        if (!user) {
            return res.status(404).json({
                message:"User Not Found"
            })
        }
        await prismaClient.savedPost.create({
            data:{
                postId:String(postId),
                userId:userId,
            }
        })
        res.json({
            message:`${postId} saved for ${user.name}!`
        })
    } catch (error) {
        
    }
})



export const postRouter = router;