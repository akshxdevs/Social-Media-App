"use client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { AppBar } from "../Components/AppBar";
import { useEffect, useState } from "react";
import axios from "axios";

export default function(){
    const [isLogin,setIsLogin] = useState(false);
    const [feed,setFeed] = useState([]);
    const router = useRouter();
    const name  = localStorage.getItem("name");
    const getAllPost = async() =>{
        await axios.get("",)
    }
    useEffect(()=>{
        if (name) {
            setIsLogin(true)
        }
        getAllPost()
    },[])
    return <div className="flex justify-center items-center h-screen">
        <div className="flex w-fit flex-col border border-slate-200 shadow p-12 rounded-xl">
                <div className="">
                    <AppBar/>
                </div>
                <div className="py-5">
                    <h1 className="font-semibold text-2xl">Hey, {name} 👋🏻</h1>
                </div>
                {isLogin && 
                <div className="flex flex-col">
                    {feed.length > 0 ? (
                        <div>
                            {feed.map((index,post)=>(
                                <div key={index}>
                                    <div>
                                        {post}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ):(
                    <div className="flex justify-center items-center p-40 border border-slate-200 rounded-lg">
                        No Posts Yet!
                    </div>
                    )}
                </div>
                }
        </div>
        <ToastContainer/>
    </div>
}









