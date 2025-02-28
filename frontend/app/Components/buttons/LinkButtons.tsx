"use client";
import { ReactNode } from "react"

export const LinkButtons = ({children,onClick}:{
    children:ReactNode,
    onClick:()=>void
}) => {
    <button onClick={onClick}>{children}</button>
}