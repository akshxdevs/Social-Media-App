"use client"
import { LinkButtons } from "./buttons/LinkButtons"

export const AppBar = () => {
    return <div className="flex border-b justify-between p-4">
        <div className="flex flex-col justify-center text-2xl font-extrabold">
            <div className="flex gap-40">
            <div>
                <img src="" alt="logo" />
            </div>
            <div>
                Social Media App
            </div>
            <div>
                <img src="" alt="profile pic" />
            </div>
            </div>
        </div>
    </div>
}