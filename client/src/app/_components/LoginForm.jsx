"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import {useAuth} from "../context/auth";



export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [auth, setAuth] = useAuth()
  const router = useRouter()

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Use the full URL to your backend
      const res = await axios.post("http://localhost:8001/blog/auth/login", {
        email,
        password,
      })

      if (res && res.data.success) {
        toast.success(res.data && res.data.message)
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        })
        localStorage.setItem("auth", JSON.stringify(res.data))
        router.push("/dashboard")
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Something went wrong")
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-12">
      <form onSubmit={handleSubmit} className="p-8 border rounded-xl py-6">
        <h1 className="w-full text-center text-3xl mb-4">Log In</h1>
        <span className="flex flex-col gap-2 mb-2">
          <label>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="py-2 border border-gray-300 rounded-xl"
            type="email"
            name="email"
            fdprocessedid="61ioce"
          />
        </span>
        <span className="flex flex-col gap-2 mb-2">
          <label>Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="py-2 border border-gray-300 rounded-xl"
            type="password"
            name="password"
            fdprocessedid="5usujo"
          />
        </span>

        <button
          type="submit"
           fdprocessedid="39b37k"
          className="w-full flex justify-center bg-blue-700 py-2 rounded-xl text-white font-semibold mt-2"
        >
          Login
        </button>
       
      </form>
    </div>
  );
}
