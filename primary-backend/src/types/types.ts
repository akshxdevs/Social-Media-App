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