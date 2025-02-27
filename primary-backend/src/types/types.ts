import z from "zod";

export const SignupSchema = z.object({
    name:z.string().min(5),
    username:z.string().email(),
    password:z.string().min(5)

})
export const SigninSchema = z.object({
    username:z.string().email(),
    password:z.string().min(5)
})

export const PostSchema = z.object({
    postDescription:z.string().min(1).max(30),
    postImgUrl:z.string().min(5),
    userId:z.string()
})

export const LikeSchema = z.object({
    postId:z.string(),
    userId:z.string()
})

export const CommentSchema = z.object({
    postId:z.string(),
    userId:z.string(),
    comment:z.string().min(1).max(30)
})

export const SavePostSchema = z.object({
    userId:z.string()
})