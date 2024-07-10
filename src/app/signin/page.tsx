// pages/login.tsx
"use client";

import { MouseEventHandler, useState } from "react";
import { signIn } from "next-auth/react";
import logo from "@/../../public/favicon.ico";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter()

  const handleLogin:MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault()

    setLoading(true);
    setErrorMessage("");

    const signin = await signIn("credentials", {
      email,
      password,
      redirect: false
    });

    setLoading(false);

    
    if(!signin?.ok){
      toast.error("NIP kamu ada yg salah nih")
    }else{
      router.push('/')
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="w-16 h-16 relative mx-auto">
          <Image alt="logo" src={logo} objectFit="cover" />
        </div>
        <h2 className="text-2xl font-bold text-center">Login</h2>
        {errorMessage && (
          <div className="text-red-500 text-center">{errorMessage}</div>
        )}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              NIP
            </label>
            <input
              type="text"
              placeholder="nip"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
