"use client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { AppBar } from "../Components/AppBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export default function(){
    const [isLogin,setIsLogin] = useState(false);
    const [token,setToken] = useState<string|null>(null);
    const [name,setName] = useState<string|null>(null);
    const [feed,setFeed] = useState<any[]>([]);
    const router = useRouter();

    const getAllPost = async() =>{
        await axios.get(`${BACKEND_URL}/post/getallpost`,{
            headers:{
                authorization: token
            }
        }).then((res)=>{
            setFeed(res.data.getAllPost||[])
        })
    }
    useEffect(()=>{
        const name  = localStorage.getItem("name");
        const token = localStorage.getItem("token");
        if (name && token) {
            setName(name);
            setToken(token); 
            setIsLogin(true);
        }
        getAllPost()
    },[])
    useEffect(()=>{
        if(!token) return;
        getAllPost()
    },[token])
    return <div className="flex justify-center items-center h-fit">
        <div className="flex w-fit flex-col border border-slate-200 shadow p-12 rounded-xl">
                <div className="">
                    <AppBar/>
                </div>
                <div className="py-5">
                    <h1 className="font-semibold text-2xl">Hey, {name} 👋🏻</h1>
                </div>
                {isLogin && (
                <div className="flex flex-col justify-center items-center ">
                    {feed.length > 0 ? (
                        <div>
                            {feed.map((post:any, index:number)=>(
                                <div key={index}>
                                    <div>
                                        <img src={post.imageUrl} alt="posturl" className="w-full max-w-xs h-50 object-cover rounded-lg"/>
                                        <h1>{post.postDescription}</h1>
                                        <p>{post.postedOn}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ):(
                    <div className="flex justify-center items-center p-40 border border-slate-200 rounded-lg">
                        No Posts Yet!
                    </div>
                    )}
                </div>)}
        </div>
        <ToastContainer/>
    </div>
}









