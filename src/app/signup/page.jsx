"use client";
import { useState } from "react";
import nhost from "@/lib/nhost";
export default function SignUp() {
  const [cred, setCred] = useState({ email: "", password: "" });

  const signUp = () => {
    const { error } = nhost.auth.signUp({
      email: cred.email,
      password: cred.password,
    });
    if (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Sign Up</h1>
      <input
        type="text"
        placeholder="email"
        onChange={(e) => setCred({ ...cred, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => setCred({ ...cred, password: e.target.value })}
      />
      <button onClick={signUp}>Sign Up</button>
    </div>
  );
}
