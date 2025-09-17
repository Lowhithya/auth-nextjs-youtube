"use client"

import axios from "axios"

import toast from "react-hot-toast";
import { useRouter, } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
    const [data, setData] = useState("nothing")
    const router = useRouter()
    const logout = async () => {
        try {
            await axios.get("/api/users/logout")
            toast.success("Logout successful")
            router.push("/login")
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }
    const getUserDetails = async () => {
        const response = await axios.get("/api/users/me")
        console.log(response.data);
        setData(response.data.data.username)
        router.push(`/profile/${response.data.data.username}`)
    }
    const resetPassword= ()=>{
        router.push("/resetpassword")
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile Page</p>
            <h2 className="p-3 rounded bg-green-500">{data === "nothing" ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <hr />
            <br />
            <button
                onClick={logout}
                className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Logout
            </button>
            <button
                onClick={getUserDetails}
                className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Get User details
            </button>
            <br />
            <button
                onClick={resetPassword}
                className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Reset Password
            </button>
            
        </div>
    )
}