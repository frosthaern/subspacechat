"use client"
import { useState } from "react";

export default function Home() {
  const [cred, setCred] = useState({ email: "", password: "" })

  const signIn = () => {
    console.log(cred)
  }

  return (
    <div>
        <input type="text" placeholder="email" onChange={(e) => setCred({ ...cred, email: e.target.value })} />
        <input type="password" placeholder="password" onChange={(e) => setCred({ ...cred, password: e.target.value })} />
        <button onClick={signIn}>Sign In</button>
    </div>
  );
}
