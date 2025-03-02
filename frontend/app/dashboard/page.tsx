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
    const [userId,setUserId] = useState<string|null>(null);
    const [feed,setFeed] = useState<any[]>([]);
    const [likeCounts,setLikeCounts] = useState<{[key:string]:number}>({});
    const [commentCounts,setCommentCounts] = useState<{[key:string]:number}>({});
    const [showCommentModel,setShowCommentModel] = useState(false);
    const [comment,setComment] = useState<string>();
    const [storePostId,setStorePostId] = useState<string|null>(null);
    const router = useRouter();
    const getAllPost = async () => {
        try {
            if (!token) {
                console.error("Token is missing!");
                return;
            }
            const res = await axios.get(`${BACKEND_URL}/post/getallpost`, {
                headers: {
                    authorization: token
                },
            });
    
            setFeed(res.data.getAllPost || []);
            setIsLogin(true);
        } catch (err) {
            console.error("Error fetching posts:", err);
        }
    };
    
    useEffect(()=>{
            setUserId(localStorage.getItem("userId"));
            setToken(localStorage.getItem("token")); 
            getAllPost()
    },[])
    useEffect(()=>{
        if(!token) return;
        getAllPost()
    },[token])
    
    useEffect(()=>{
        const fetchLikes = async() => {
            const updatedLikes : {[key:string]:number} = {}
            for(const post of feed){
                const count = await getLikes({postId:post.id})
                updatedLikes[post.id] = count ?? 0;
            }
            setLikeCounts(updatedLikes);
        }
        const fetchComments = async() =>{
            const updatedComment :{[key:string]:number} = {}
            for(const post of feed){
                const count = await getComments({postId:post.id});
                updatedComment[post.id] = count ?? 0
            }
            setCommentCounts(updatedComment);
        }

        if (feed.length > 0) {
            fetchLikes()
            fetchComments()
        }
    },[feed])

    const getLikes = async({postId}:{postId:string}) => {
        try {
            const res = await axios.get(`${BACKEND_URL}/post/getpostlike/${postId}`)
            if (res.data) {
                const likes = res.data.getPostLike;
                return likes.length
            }
        } catch (error) {
            console.error(error);
        }
    }

    const getComments = async({postId}:{postId:string}) => {
        try {
            const res = await axios.get(`${BACKEND_URL}/post/getpostcomment/${postId}`)
            if (res.data) {
                return res.data.getPostComment.length;
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleLike = async({postId}:{postId:string}) => {
        try {
            const res = await axios.post(`${BACKEND_URL}/post/like`,{
                postId,
                userId
            })
            if (res.data) {
                console.log("liked post");
                getAllPost();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleComment = async({postId}:{postId:string}) => {
        try {
            const res = await axios.post(`${BACKEND_URL}/post/comment`,{
                comment,
                postId,
                userId
            })
            if (res.data) {
                console.log("commented");
                getAllPost();
            }
        } catch (error) {
            console.error(error);
            
        }
    }

    return <div className="flex justify-center items-center h-screen ">
            <div className="flex w-fit flex-col border border-slate-200 shadow p-2 rounded-xl  h-[80vh]">
                <div className="p-2">
                        <AppBar/>
                        {}
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
                                                        <div>{post.accountName}</div>
                                                    </div>
                                                    <img
                                                        src={post.imageUrl}
                                                        alt="posturl"
                                                        className="items-center w-auto h-auto object-cover rounded-lg"
                                                    />
                                                    <div className="p-2">
                                                        <h1 className="font-semibold text-lg">{post.postDescription}</h1>
                                                        <p className="font-light text-sm text-slate-600">{post.postedOn}</p>
                                                        <div className="flex gap-2">
                                                            <button onClick={()=>handleLike({postId:post.id})}>
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
                                                            <div className="">{likeCounts[post.id] ?? 0}</div>
                                                            <button onClick={()=>{
                                                                setShowCommentModel(true)
                                                                setStorePostId(post.id)
                                                                }}>
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
                                                            <div>{commentCounts[post.id] ?? 0}</div>
                                                            {showCommentModel && (
                                                                <div className="fixed inset-0 flex items-center justify-center">
                                                                    <div className="bg-white p-5 rounded-lg shadow-lg w-96">
                                                                        <div className="flex gap-3 p-2">
                                                                            <button onClick={()=>setShowCommentModel(false)}> 
                                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                                                                                </svg>
                                                                            </button>
                                                                            <h1 className="text-lg font-semibold ">Comments</h1>
                                                                        </div>
                                                                        <input
                                                                            type="text"
                                                                            placeholder="Write a caption..."
                                                                            className="border p-2 w-full mb-3 rounded"
                                                                            onChange={(e) => setComment(e.target.value)}
                                                                        />
                                                                        <div className="flex justify-center gap-3">
                                                                            <button
                                                                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                                                                onClick={()=>{
                                                                                    if (!storePostId) return
                                                                                    handleComment({postId:storePostId})
                                                                                    setShowCommentModel(false);
                                                                                    }}>
                                                                                Comment
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> 
                                        <div>
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









