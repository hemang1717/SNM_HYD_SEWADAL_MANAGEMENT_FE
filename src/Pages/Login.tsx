import React, { useState, useEffect, use } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/ui/input";
import sewaImage from "../assets/seva.png";
import { useAuth } from "../context/authContext";
import { loginApi } from "@/Apis/api";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { setIsSignIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    console.log("email: ",email," && password: ",password)
    try {
      const data=await loginApi(email,password);
      localStorage.setItem("authToken", data.token);
      setIsSignIn(true);
      navigate("/attendanceSheet");
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="absolute top-0 left-0 w-full h-screen flex">
      {/* Left Side (Image Section) */}
      <div className="w-[75%] h-full">
        <img src={sewaImage} alt="Sewa" className="w-full h-full object-fit" />
      </div>

      {/* Right Side (Login Form Section) */}
      <div className="w-[30%] h-screen flex justify-center items-center bg-violet-100">
        <div className="w-full max-w-md  p-10 bg-white rounded-lg shadow-lg m-8p mx-4">
          <h1 className="text-3xl font-bold text-center mb-6">
            Dhan Nirankar Ji 
            <br/>
            Welcome to Login
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 p-3 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">
                Password
              </label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 p-3 border border-gray-300 rounded"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-zinc-800 text-white py-3 rounded hover:bg-zinc-900 transition"
            >
              Login
            </button>
          </form>
          {error && <p className="text-red-500 text-center my-4">{error}</p>}

        </div>
      </div>
    </div>
  );
};

export default Login;
