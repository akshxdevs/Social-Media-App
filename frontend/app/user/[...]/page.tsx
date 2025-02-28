"use client";

import { useParams, useSearchParams } from "next/navigation";

export default function () {
    const searchParams = useSearchParams()
    const userId = searchParams.get("id");
    console.log(userId);
    const name = localStorage.getItem("name");
    return <div className="flex justify-center items-center h-screen">
        <div className="flex w-fit flex-col border border-slate-200 shadow p-12 rounded-xl">
            <div className="flex justify-between gap-60">
                <div>
                    {name}
                    {userId}
                </div>
                <div>
                    {name}
                </div>
                <div>
                    {name}
                </div>
            </div>        
            
        </div>
    </div>
}