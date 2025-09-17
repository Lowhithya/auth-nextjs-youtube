"use client";
import Link from "next/link";
import React, { useEffect,useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster, ToastBar } from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false)
    // On Signing Up
    const onSignUp = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success:", response.data);

            toast.success(response.data.message,{duration: 3000})
            const login = setTimeout(() => {router.push("/login")}, 3000)
            clearTimeout(login)

        } catch (error: any) {
            console.log("Signup failed: ", error.response.data);
            toast.error(error.response.data.error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.username.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true)
        }
    }, [user])


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            {loading ? "Proccesing" : <>
                <h1 className="text-3xl">Signup</h1>
                <hr />
                <br />
                <label htmlFor="username">username</label>
                <input
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                    id="username"
                    type="text"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    placeholder="username"
                />
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

                    className={`p-3 border text-white border-gray-300 rounded-lg mb-4 cursor-pointer hover:scale-105  focus:outline-none focus:border-gray-600  disabled:text-slate-400 disabled:border-gray-700 disabled:hover:bg-[#0a0a0a] disabled:scale-100 disabled:cursor-default`}
                    disabled={buttonDisabled}
                    onClick={onSignUp}
                >
                    Signup
                </button>

                <Toaster position="top-right">

                </Toaster>



                <p>Already have an account? <Link href="/login" className="text-blue-400">Login</Link> here!</p></>}


        </div>
    )
}