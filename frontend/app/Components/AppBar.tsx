"use client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export const AppBar = () => {
    const [isLogin,setIsLogin] = useState(false);
    const router = useRouter();
    const[userId,setUserId] = useState("");
    useEffect(()=>{
    const userId = localStorage.getItem("userId");
        if (userId) {
            setUserId(userId)
            setIsLogin(true)
        }
    },[])
    return <div className="flex border-b justify-between p-4">
        <div className="flex flex-col justify-center text-2xl font-extrabold ">
            <div className="flex gap-25">
                <div className="">
                   <button>
                   <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48" viewBox="0 0 24 24">
                        <path d="M14.636,4.584C16.712,6.27,19,9.066,19,13.193C19,16.539,16.382,20,12,20c-5.167,0-7-3.702-7-6.871 c0-1.252,0.489-2.468,1.184-3.457c0.152,0.318,0.33,0.626,0.539,0.911l0.09,0.123l0.108,0.108l0.064,0.064l0.86,0.86l1.159-0.368 C12.243,10.343,14.191,7.945,14.636,4.584 M12.66,0.965c-0.081,0-0.081,0.142-0.081,0.142C13.093,4.45,12.45,8.179,8.4,9.464 L8.336,9.4C7.629,8.436,7.371,6.829,7.371,6.186c0-0.129-0.193-0.129-0.193-0.129C4.929,7.343,3,10.236,3,13.129 C3,17.95,6.214,22,12,22c5.336,0,9-4.179,9-8.807c0-6.236-4.371-10.286-8.293-12.214C12.689,0.969,12.673,0.965,12.66,0.965 L12.66,0.965z"></path>
                   </svg>
                   </button>
                </div>
                <div className="text-orange-300 font-bold">
                    Social Media App
                </div>
                <div>
                    {isLogin && (
                        <div className="">
                            <button onClick={()=>{
                                router.push("/message/id="+userId)
                            }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-9">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                            </svg>
                            </button>
                        </div> 
                    )}
                </div>
            </div>  
        </div>
    </div>
}