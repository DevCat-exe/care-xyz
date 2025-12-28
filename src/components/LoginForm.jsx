"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { FaGoogle } from "react-icons/fa";
import { LuMail, LuLock, LuEye, LuEyeOff, LuArrowRight } from "react-icons/lu";
import { MdMedicalServices } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";

import Swal from "sweetalert2";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    if (e) e.preventDefault();
    setLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    setLoading(false);
    if (res?.ok) {
      Swal.fire({
        icon: "success",
        title: "Welcome Back!",
        text: "Logged in successfully.",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        router.push("/");
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Please check your credentials and try again.",
        confirmButtonColor: "#3b82f6",
      });
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-row bg-white selection:bg-primary/20 font-display">
      {/* Left Section: Login Form */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 p-6 sm:p-12 lg:p-24 relative bg-white">
        <div className="max-w-110 mx-auto w-full flex flex-col justify-center">
          {/* Branding */}
          <Link href="/" className="flex items-center gap-3 mb-12 group w-fit">
            <div className="size-10 text-primary flex items-center justify-center transition-transform group-hover:scale-110">
              <MdMedicalServices size={36} />
            </div>
            <h2 className="text-text-main text-xl font-bold tracking-tight">
              Care.xyz
            </h2>
          </Link>

          {/* Page Heading */}
          <div className="mb-10">
            <h1 className="text-text-main text-4xl font-black leading-tight tracking-tight mb-3">
              Welcome back
            </h1>
            <p className="text-text-muted text-base font-medium">
              Enter your credentials to access your account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-text-main ml-1">
                Email Address
              </label>
              <div className="relative group">
                <LuMail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors text-lg" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  required
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-primary/10 rounded-xl bg-white text-text-main font-semibold focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all placeholder:text-text-muted/40 shadow-soft"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between px-1">
                <label className="text-sm font-bold text-text-main">
                  Password
                </label>
                <Link
                  className="text-xs font-bold text-primary hover:underline transition-colors"
                  href="#"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative group">
                <LuLock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors text-lg" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  className="w-full pl-12 pr-12 py-3.5 border-2 border-primary/10 rounded-xl bg-white text-text-main font-semibold focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all placeholder:text-text-muted/40 shadow-soft"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-text-muted hover:text-primary transition-colors cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <LuEyeOff size={18} /> : <LuEye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Sign In</span>
                  <LuArrowRight />
                </>
              )}
            </button>
          </form>

          <div className="flex flex-col gap-6 mt-8">
            <div className="relative flex items-center">
              <div className="grow border-t border-border"></div>
              <span className="mx-4 shrink-0 text-xs font-bold text-text-muted uppercase tracking-wider">
                Or continue with
              </span>
              <div className="grow border-t border-border"></div>
            </div>

            <button
              type="button"
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className="flex w-full items-center justify-center gap-3 py-3.5 border border-border rounded-xl hover:bg-gray-50 transition-all text-text-main font-bold shadow-sm group"
            >
              <svg
                className="size-5 transition-transform group-hover:scale-110"
                viewBox="0 0 24 24"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.24.81-.6z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            <p className="text-center text-text-muted font-semibold text-sm">
              Don&apos;t have an account?{" "}
              <Link
                className="text-primary hover:underline font-bold ml-1"
                href="/register"
              >
                Create one now
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Section: Visual */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden bg-slate-900 group">
        <Image
          alt="Caregiver"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[6s] group-hover:scale-110"
          src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=2073&auto=format&fit=crop"
          fill
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>

        <div className="absolute bottom-20 left-20 right-20 text-white">
          <div className="max-w-md">
            <div className="flex text-amber-400 mb-6 gap-1">
              {[...Array(5)].map((_, i) => (
                <LuMail key={i} className="fill-current" />
              ))}
            </div>
            <h3 className="text-3xl font-black leading-tight tracking-tight mb-6">
              &quot;Finding reliable care for my mother was easy with
              Care.xyz.&quot;
            </h3>
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-full overflow-hidden border-2 border-white/20">
                <Image
                  src="https://i.pravatar.cc/150?u=sarah"
                  alt="user"
                  width={48}
                  height={48}
                />
              </div>
              <div>
                <p className="font-bold text-lg">Sarah Jenkins</p>
                <p className="text-white/60 text-xs font-semibold uppercase tracking-widest">
                  Verified Member
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
