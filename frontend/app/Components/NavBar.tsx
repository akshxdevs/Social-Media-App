import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { toast } from "react-toastify";

export const Navbar = () => {
    const router = useRouter();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [postDes, setPostDes] = useState<string>("");
    const [postImgUrl, setPostImgUrl] = useState<string>("");
    const [userId, setUserId] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        setUserId(localStorage.getItem("userId"));
        setToken(localStorage.getItem("token"));
    }, []);

    const handlePost = async () => {
        if (!postDes || !postImgUrl) {
            toast.error("Please fill in all fields.");
            return;
        }

        try {
            await axios.post(
                `${BACKEND_URL}/post/createpost`,
                { postDescription:postDes, postImgUrl, userId },
                { headers: { Authorization: token } }
            );
            toast.success("Posted Successfully.");
            setShowModal(false);
        } catch (error) {
            console.error(error);
            toast.error("Failed to post.");
        }
    };

    return (
        <div className="flex justify-between p-4">
            <div className="flex gap-5">
                <button onClick={() => router.push("/dashboard")}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-7"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                        />
                    </svg>
                </button>

                <button onClick={() => {
                    setShowModal(true)
                }}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-7"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
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
                        className="size-7"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                    </svg>
                </button>
            </div>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center">
                    <div className="bg-white p-5 rounded-lg shadow-lg w-96">
                        <div className="flex gap-3 p-2">
                            <button onClick={()=>setShowModal(false)}> 
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                                </svg>
                            </button>
                            <h1 className="text-lg font-semibold ">New Post</h1>
                        </div>
                        <input
                            type="text"
                            placeholder="Write a caption..."
                            className="border p-2 w-full mb-3 rounded"
                            onChange={(e) => setPostDes(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Paste image URL..."
                            className="border p-2 w-full mb-3 rounded"
                            onChange={(e) => setPostImgUrl(e.target.value)}
                        />
                        <div className="flex justify-center gap-3">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                onClick={handlePost}>
                                Post
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
