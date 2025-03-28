"use client"
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "../config";

export default function(){
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const router = useRouter();

    return <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col border border-slate-100 p-10 rounded-2xl shadow">
            <h1 className="font-semibold text-4xl p-3">Welcome, back 🥳</h1>
            <input type="email" placeholder="Enter your username.." className="py-3 border border-blue-400 rounded-lg my-2 pr-15 pl-3" onChange={(e)=>setUsername(e.target.value)}/>
            <input type="password" placeholder="Enter your password.." className="py-3 border border-blue-400 rounded-lg my-2 pr-15 pl-3" onChange={(e)=>setPassword(e.target.value)}/>
            <button className="border bg-black text-slate-200 font-semibold border-black p-2 rounded-md mt-10" onClick={async()=>{
                try {
                    
                    const res = await axios.post(`${BACKEND_URL}/user/signin`,{
                        username,
                        password
                    });
                    toast.success("Login Successfull!");
                    const token = res.data.token;
                    const userId = res.data.user.id;
                    const name = res.data.user.name;
                    localStorage.setItem("token",token);
                    localStorage.setItem("userId",userId);
                    localStorage.setItem("name",name);
                    router.push("/dashboard");
                
                    } catch (error) {
                        console.error(error);
                        toast.error("Something went wrong!!")
                    }
            }}>Let's Start</button>
            <div className="flex justify-center text-sm font-light ">
                <p className="py-5 px-1">Don't have an Account?</p>
                <a href="/signup" className="py-5 underline">signup</a>
            </div>
            </div>
        <ToastContainer/>
    </div>
}









