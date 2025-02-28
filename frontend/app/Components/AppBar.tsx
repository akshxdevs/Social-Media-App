"use client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export const AppBar = () => {
    const [isLogin,setIsLogin] = useState(false);
    const router = useRouter();
    const userId = localStorage.getItem("userId")
    useEffect(()=>{
        if (userId) {
            setIsLogin(true)
        }
    },[])
    return <div className="flex border-b justify-between p-4">
        <div className="flex flex-col justify-center text-2xl font-extrabold ">
            <div className="flex gap-40">
            <div>
                <img src="" alt="logo" />
            </div>
            <div>
                Social Media App
            </div>
            <div>
                {isLogin && (
                        <div className="relative inline-block">
                            <button className="btn btn-solid-primary my-2 peer">profile Pic</button>
                            <div className="hidden peer-focus:block absolute bg-white shadow-lg rounded-md mt-2 w-48">
                                <a className="block px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer" href="/user">Profile</a>
                                <a className="block px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">Account settings</a>
                                <a className="block px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">Subscriptions</a>
                            </div>
                        </div>  
                
                )}
            </div>
            </div>
        </div>
    </div>
}