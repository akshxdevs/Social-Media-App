import dotenv from "dotenv"
dotenv.config();
export const USER_JWT = process.env.USER_JWT!;
export const JWT_SECRET = process.env.JWT_SECRET!;
export const PORT = process.env.PORT!;