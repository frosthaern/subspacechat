"use client"
import { useState } from "react";
import Link from "next/link";
import nhost from "@/lib/nhost";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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
    <div className="flex items-center justify-center min-h-screen bg-muted">
      <Card className="p-6 w-full max-w-sm space-y-4">
        <Input
          type="text"
          placeholder="Email"
          onChange={(e) => setCred({ ...cred, email: e.target.value })}
        />
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) => setCred({ ...cred, password: e.target.value })}
        />
        <Button className="w-full" onClick={signIn}>
          Sign In
        </Button>
        <div className="text-center text-sm">
          <Link href="/signup" className="underline">
            {"Don't have an account? Sign Up"}
          </Link>
        </div>
      </Card>
    </div>
  );
}
