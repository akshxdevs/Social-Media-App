"use client"
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "../config";
import { AppBar } from "../Components/AppBar";

export default function(){
    const name = localStorage.getItem("name");
    const router = useRouter();

    return <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col border border-slate-200 shadow p-50 rounded-xl">
                <div className="absoulte top-5 right-5">
                    <AppBar/>
                </div>
                <div className="">
                    <h1 className="font-semibold text-2xl">Welcome, {name} 👋🏻</h1>
                </div>
        </div>
        <ToastContainer/>
    </div>
}









