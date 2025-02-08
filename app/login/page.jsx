'use client'
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Welcome to DISASTER DATA PORTAL</h2>
        
        {isNewUser ? (
          <>
            <h3 className="text-lg font-bold mb-4">Create Account</h3>
            <input 
              type="email" 
              placeholder="Email" 
              className="border p-2 rounded w-full mb-4" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
            <input 
              type="password" 
              placeholder="Create Password" 
              className="border p-2 rounded w-full mb-4" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
            <button className="w-full bg-blue-600 text-white py-2 rounded">Sign Up</button>
            <p className="mt-4 text-sm text-center">Already a member? <span className="text-blue-600 cursor-pointer" onClick={() => setIsNewUser(false)}>Login</span></p>
          </>
        ) : (
          <>
            <h3 className="text-lg font-bold mb-4">Login</h3>
            <input 
              type="email" 
              placeholder="Email" 
              className="border p-2 rounded w-full mb-4" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
            <input 
              type="password" 
              placeholder="Password" 
              className="border p-2 rounded w-full mb-4" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
            <button className="w-full bg-green-600 text-white py-2 rounded">Login</button>
            <p className="mt-4 text-sm text-center">New to Data Portal? <span className="text-blue-600 cursor-pointer" onClick={() => setIsNewUser(true)}>Create Account</span></p>
          </>
        )}
      </div>
    </div>
  );
}
