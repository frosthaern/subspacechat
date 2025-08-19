// "use client"
// import { useState } from "react";
// import Link from "next/link";
// import nhost from "@/lib/nhost";
// import { useRouter } from "next/navigation";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";

// export default function Home() {
//   const [cred, setCred] = useState({ email: "", password: "" });
//   const router = useRouter();

//   const signIn = () => {
//     const { error } = nhost.auth.signIn({
//       email: cred.email,
//       password: cred.password,
//     });
//     if (error) {
//       console.error(error.message);
//     }
//     router.push("/chat");
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-muted">
//       <Card className="p-6 w-full max-w-sm space-y-4">
//         <Input
//           type="text"
//           placeholder="Email"
//           onChange={(e) => setCred({ ...cred, email: e.target.value })}
//         />
//         <Input
//           type="password"
//           placeholder="Password"
//           onChange={(e) => setCred({ ...cred, password: e.target.value })}
//         />
//         <Button className="w-full" onClick={signIn}>
//           Sign In
//         </Button>
//         <div className="text-center text-sm">
//           <Link href="/signup" className="underline">
//             {"Don't have an account? Sign Up"}
//           </Link>
//         </div>
//       </Card>
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import Link from "next/link";
import nhost from "@/lib/nhost";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Lock, LogIn } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function Home() {
  const { toast } = useToast();
  const [cred, setCred] = useState({ email: "", password: "" });
  const router = useRouter();

  const signIn = () => {
    const { session, error } = nhost.auth.signIn({
      email: cred.email,
      password: cred.password,
    });
    if (!session) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error,
      });
      router.push("/signup");
    } else {
      toast({
        variant: "default",
        title: "Success",
        description: "Signed in successfully",
      });
      console.log(session);
      router.push("/chat");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-slate-900 to-slate-700 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-slate-600 text-sm">
            Please sign in to your account to continue
          </p>
        </div>

        {/* Login Card */}
        <Card className="p-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <div className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-slate-700 block"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10 h-12 border-slate-200 focus:border-slate-900 focus:ring-slate-900 transition-colors"
                  onChange={(e) => setCred({ ...cred, email: e.target.value })}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-slate-700 block"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="pl-10 h-12 border-slate-200 focus:border-slate-900 focus:ring-slate-900 transition-colors"
                  onChange={(e) =>
                    setCred({ ...cred, password: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Sign In Button */}
            <Button
              className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
              onClick={signIn}
            >
              <LogIn className="w-4 h-4 mr-2" />
              Sign In to Account
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-500 font-medium">
                  New to our platform?
                </span>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <Link
                href="/signup"
                className="inline-flex items-center text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors duration-200 group"
              >
                Create your account
                <span className="ml-1 group-hover:translate-x-0.5 transition-transform duration-200">
                  →
                </span>
              </Link>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-slate-500">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
