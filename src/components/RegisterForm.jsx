"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import {
  LuUser,
  LuMail,
  LuPhone,
  LuLock,
  LuEye,
  LuEyeOff,
  LuArrowRight,
  LuCircleCheck,
} from "react-icons/lu";
import { MdMedicalServices } from "react-icons/md";
import { HiStar } from "react-icons/hi2";
import Swal from "sweetalert2";

export default function RegisterForm() {
  const [form, setForm] = useState({
    name: "",
    nidNo: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  function validate() {
    if (form.password !== form.confirmPassword) return "Passwords don't match";
    if (form.password.length < 6)
      return "Password too short (min 6 characters)";
    if (!/[A-Z]/.test(form.password))
      return "Password must contain at least one uppercase letter";
    if (!/[a-z]/.test(form.password))
      return "Password must contain at least one lowercase letter";
    return null;
  }

  async function handleSubmit(e) {
    if (e) e.preventDefault();
    const err = validate();
    if (err) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: err,
        confirmButtonColor: "#3b82f6",
      });
      return;
    }
    setLoading(true);

    try {
      const registerRes = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          nidNo: form.nidNo,
          email: form.email,
          contact: form.contact,
          password: form.password,
        }),
      });

      const data = await registerRes.json();

      if (!registerRes.ok) {
        setLoading(false);
        return Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: data.message || "Registration failed",
          confirmButtonColor: "#3b82f6",
        });
      }

      // Automatically sign in after registration
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
      });

      setLoading(false);
      if (res?.ok) {
        Swal.fire({
          icon: "success",
          title: "Account Created!",
          text: "Redirecting to your destination...",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          router.push(callbackUrl);
        });
      } else {
        Swal.fire({
          icon: "info",
          title: "Registration Successful",
          text: "Please log in manually to continue.",
          confirmButtonColor: "#3b82f6",
        }).then(() => {
          router.push("/login");
        });
      }
    } catch (error) {
      console.error("Registration flow error:", error);
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong. Please try again.",
        confirmButtonColor: "#3b82f6",
      });
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row w-full overflow-hidden bg-white font-display">
      {/* Left Side: Visual Hero */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative flex-col justify-between p-16 text-white overflow-hidden group">
        <div className="absolute inset-0">
          <Image
            alt="Caring"
            className="w-full h-full object-cover opacity-50 transition-transform duration-[10s] group-hover:scale-110"
            src="https://images.unsplash.com/photo-1576765608598-09873ad398f7?q=80&w=2070"
            fill
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>
        </div>

        <Link
          href="/"
          className="relative z-10 flex items-center gap-3 w-fit group"
        >
          <div className="size-10 text-primary flex items-center justify-center transition-transform group-hover:scale-110">
            <MdMedicalServices size={36} />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Care.xyz</h2>
        </Link>

        <div className="relative z-10">
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 backdrop-blur-md px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-primary mb-6 border border-primary/30">
              <LuCircleCheck size={14} />
              <span>Joined by 12,000+ families</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-black leading-tight mb-6 tracking-tight">
              Start your journey <br /> with{" "}
              <span className="text-primary italic">trusted care.</span>
            </h1>
            <p className="text-lg text-white/70 font-medium leading-relaxed max-w-md">
              Access verified professionals who treat your family like their
              own.
            </p>
          </div>

          <div className="glass p-8 rounded-3xl border border-white/20 shadow-2xl relative overflow-hidden max-w-md backdrop-blur-2xl bg-white/5">
            <div className="absolute top-0 right-0 size-32 bg-primary/20 blur-3xl -mr-16 -mt-16"></div>
            <div className="flex gap-1 text-accent mb-5 relative z-10">
              {[...Array(5)].map((_, i) => (
                <HiStar key={i} size={18} fill="currentColor" />
              ))}
            </div>
            <p className="italic text-white text-lg font-medium mb-8 leading-relaxed relative z-10">
              &quot;The verification process is so thorough, it gave me
              immediate peace of mind.&quot;
            </p>
            <div className="flex items-center gap-4 relative z-10">
              <div className="size-12 rounded-full overflow-hidden border-2 border-white/20 shadow-lg">
                <Image
                  src="https://i.pravatar.cc/150?u=sarah"
                  alt="user"
                  width={48}
                  height={48}
                />
              </div>
              <div>
                <p className="font-black text-white">Sarah Jenkins</p>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
                  Verified Member
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex gap-8 text-[11px] font-bold uppercase tracking-widest text-white/40">
          <Link className="hover:text-white transition-colors" href="#">
            Terms
          </Link>
          <Link className="hover:text-white transition-colors" href="#">
            Privacy
          </Link>
        </div>
      </div>

      {/* Right Side: Registration Form */}
      <div className="flex-1 flex flex-col relative overflow-y-auto bg-white">
        <header className="flex lg:hidden items-center justify-between p-6">
          <Link href="/" className="flex items-center gap-2 text-primary">
            <MdMedicalServices size={32} />
            <span className="font-bold text-xl tracking-tight text-text-main">
              Care.xyz
            </span>
          </Link>
        </header>

        <div className="flex-1 flex flex-col justify-center p-6 sm:p-12 lg:p-24 max-w-200 mx-auto w-full">
          <div className="mb-10">
            <h1 className="text-4xl font-black text-text-main mb-3 tracking-tight">
              Create account
            </h1>
            <p className="text-text-muted text-base font-medium">
              Already have an account?{" "}
              <Link
                className="text-primary font-bold hover:underline"
                href="/login"
              >
                Sign in
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-text-main ml-1">
                  Full Name
                </label>
                <div className="relative group">
                  <LuUser className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors text-lg" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    required
                    className="w-full pl-12 pr-4 py-3.5 border border-border rounded-xl bg-white text-text-main font-semibold focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all placeholder:text-text-muted/40"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-text-main ml-1">
                  NID Number
                </label>
                <div className="relative group">
                  <LuCircleCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors text-lg" />
                  <input
                    type="text"
                    placeholder="1234 5678 9012"
                    required
                    className="w-full pl-12 pr-4 py-3.5 border border-border rounded-xl bg-white text-text-main font-semibold focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all placeholder:text-text-muted/40"
                    value={form.nidNo}
                    onChange={(e) =>
                      setForm({ ...form, nidNo: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-text-main ml-1">
                  Email
                </label>
                <div className="relative group">
                  <LuMail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors text-lg" />
                  <input
                    type="email"
                    placeholder="john@example.com"
                    required
                    className="w-full pl-12 pr-4 py-3.5 border border-border rounded-xl bg-white text-text-main font-semibold focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all placeholder:text-text-muted/40"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-text-main ml-1">
                  Phone
                </label>
                <div className="relative group">
                  <LuPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors text-lg" />
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    required
                    className="w-full pl-12 pr-4 py-3.5 border border-border rounded-xl bg-white text-text-main font-semibold focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all placeholder:text-text-muted/40"
                    value={form.contact}
                    onChange={(e) =>
                      setForm({ ...form, contact: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-text-main ml-1">
                  Password
                </label>
                <div className="relative group">
                  <LuLock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors text-lg" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    className="w-full pl-12 pr-12 py-3.5 border border-border rounded-xl bg-white text-text-main font-semibold focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all placeholder:text-text-muted/40"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-text-muted hover:text-primary transition-colors cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <LuEyeOff size={18} />
                    ) : (
                      <LuEye size={18} />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-text-main ml-1">
                  Confirm Password
                </label>
                <div className="relative group">
                  <LuLock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors text-lg" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    className="w-full pl-12 pr-4 py-3.5 border border-border rounded-xl bg-white text-text-main font-semibold focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all placeholder:text-text-muted/40"
                    value={form.confirmPassword}
                    onChange={(e) =>
                      setForm({ ...form, confirmPassword: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 mt-2">
              <input
                type="checkbox"
                required
                className="size-5 mt-0.5 rounded border-border text-primary focus:ring-primary/20 bg-white"
              />
              <p className="text-sm text-text-muted font-medium leading-relaxed">
                I agree to the{" "}
                <Link
                  href="#"
                  className="text-primary font-bold hover:underline"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="#"
                  className="text-primary font-bold hover:underline"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
            >
              {loading ? (
                <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Create Account</span>
                  <LuArrowRight />
                </>
              )}
            </button>

            <div className="relative flex items-center mt-6">
              <div className="grow border-t border-border"></div>
              <span className="mx-4 shrink-0 text-[10px] font-black text-text-muted uppercase tracking-widest">
                Or join with
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

            <p className="text-center text-text-muted font-semibold text-xs mt-6">
              Already have an account?{" "}
              <Link
                className="text-primary hover:underline font-black ml-1 uppercase tracking-wider"
                href="/login"
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
