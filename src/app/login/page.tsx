"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios  from "axios";
import toast from "react-hot-toast";


export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    const [buttondisabled,setButtonDisabled]=useState(false);
    const [loading,setLoading] = useState(false);

    // On Login
    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login",user);
            console.log("✅Login SuccessFull!", response.data);
            toast.success("✅Login Success")
            router.push(`/profile`)
            
        } catch (error: any) {
            console.log("Login failed",error.message);
            toast.error(error.message)
            
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        if(user.email.length > 0 && user.password.length > 0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true)
        }
    },[user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            {loading?"Proccessing":<>
                <h1 className="text-3xl">Login</h1>
                <hr />
                <br />
                <label htmlFor="email">email</label>
                <input
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                    id="username"
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="email"
                />
                <label htmlFor="password">password</label>
                <input
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                    id="username"
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="password"
                />
                <button
                    className="p-2 border border-gray-300 rounded-lg mb-4 cursor-pointer hover:scale-105 focus:outline-none focus:border-gray-600 "
                    onClick={onLogin}
                >
                    Login
                </button>
                <p>New User? <Link href="/signup" className="text-blue-400">Register</Link> here!</p>

            </>}
            
        </div>
    )
}