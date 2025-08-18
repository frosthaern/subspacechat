"use client"
import { useState } from "react";
import Link from "next/link";
import nhost from "@/lib/nhost";
import { useRouter } from "next/navigation";

export default function Home() {
  const [cred, setCred] = useState({ email: "", password: "" });
  const router = useRouter();

  const signIn = () => {
    const { error } = nhost.auth.signIn({
      email: cred.email,
      password: cred.password,
    });
    if (error) {
      console.error(error.message);
    }
    router.push("/chat");
  };

  return (
    <div>
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
      <button onClick={signIn}>Sign In</button>
      <Link href="/signup">Don't have an account? Sign Up</Link>
    </div>
  );
}
