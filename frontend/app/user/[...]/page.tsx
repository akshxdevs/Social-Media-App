"use client";

export default function () {
    const userId = ""
    const name = localStorage.getItem("name");
    return <div className="flex justify-center items-center h-screen">
        <div className="flex w-fit flex-col border border-slate-200 shadow p-12 rounded-xl">
            <div className="flex justify-between gap-60">
                <div>
                    {name}
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