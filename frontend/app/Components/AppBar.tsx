"use client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export const AppBar = () => {
    const [isLogin,setIsLogin] = useState(false);
    const router = useRouter();
    const userId = localStorage.getItem("userId");
    
    useEffect(()=>{
        if (userId) {
            setIsLogin(true)
        }
    },[])
    return <div className="flex border-b justify-between p-4">
        <div className="flex flex-col justify-center text-2xl font-extrabold ">
            <div className="flex gap-10">
            <div className="">
                <img src="" alt="logo" />
            </div>
            <div className="">
                Social Media App
            </div>
            <div>
                {isLogin && (
                        <div className="">
                            <img src="" alt="profile pic" onClick={()=>{
                                router.push("/user/id?="+userId)
                            }}/>
                        </div> 
                )}
            </div>
            </div>  
        </div>
    </div>
}