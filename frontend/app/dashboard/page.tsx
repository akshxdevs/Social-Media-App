"use client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { AppBar } from "../Components/AppBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Navbar } from "../Components/NavBar";

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
        }).catch((err)=>{
            console.error(err);
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
        getAllPost();
    },[token])
    return <div className="flex justify-center items-center h-screen ">
            <div className="flex w-fit flex-col border border-slate-200 shadow p-2 rounded-xl  h-[80vh]">
                <div className="p-2">
                        <AppBar/>
                    </div>
                    {isLogin && (
                        <div className="max-h-[80vh] overflow-y-auto p-5">
                            {feed.length > 0 ? (
                                <div>
                                    {feed.map((post: any, index: number) => (
                                        <div key={index} className="flex flex-col pb-5">
                                            <div className="border border-slate-200 rounded-lg shadow-xl p-5">
                                                <div className="flex flex-col">
                                                    <div className="flex p-2 gap-2">
                                                        <div>
                                                            <img src={post.userUserProfilePic} alt="profilePic" />
                                                        </div>
                                                        <div>{post.userId || post.username}</div>
                                                    </div>
                                                    <img
                                                        src={post.imageUrl}
                                                        alt="posturl"
                                                        className="items-center w-auto h-auto object-cover rounded-lg"
                                                    />
                                                    <div className="p-2">
                                                        <h1 className="font-semibold text-lg">{post.postDescription}</h1>
                                                        <p className="font-light text-sm text-slate-600">{post.postedOn}</p>
                                                        <div className="flex gap-4">
                                                            <button>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    strokeWidth="1.5"
                                                                    stroke="currentColor"
                                                                    className="size-6"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                                                                    />
                                                                </svg>
                                                            </button>
                                                            <button>
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    strokeWidth="1.5"
                                                                    stroke="currentColor"
                                                                    className="size-6"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex items-center p-40 border border-slate-200 rounded-lg">No Posts Yet!</div>
                            )}
                        </div>
                    )}
                    <div className="flex justify-center items-center">
                        <Navbar/>
                    </div>
                </div>
            <ToastContainer/>
        </div>
}









