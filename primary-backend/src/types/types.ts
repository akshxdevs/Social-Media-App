import z from "zod";

export const SignupSchema = z.object({
    name:z.string(),
    username:z.string().email(),
    password:z.string().min(5)
})