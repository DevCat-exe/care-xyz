"use client";
import { useEffect } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import {
  LuTriangleAlert,
  LuCircleAlert,
  LuRefreshCw,
  LuHouse,
} from "react-icons/lu";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-rose-500/5 via-surface to-surface overflow-hidden relative font-outfit">
      {/* Background Orbs */}
      <div className="absolute top-1/4 right-1/4 size-96 bg-rose-500/5 blur-[120px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/4 size-96 bg-primary/5 blur-[120px] rounded-full animate-pulse delay-1000"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full text-center relative z-10"
      >
        <div className="relative inline-block mb-12">
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 2, -2, 0],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="size-48 bg-rose-500/10 rounded-4xl flex items-center justify-center text-rose-500 shadow-inner border border-rose-500/20 backdrop-blur-xl"
          >
            <LuTriangleAlert className="text-[100px]! font-light opacity-50" />
          </motion.div>

          <div className="absolute -bottom-4 -right-4 size-20 bg-surface rounded-3xl shadow-glass flex items-center justify-center text-rose-500 border-2 border-border">
            <LuCircleAlert className="text-4xl! font-black animate-pulse" />
          </div>
        </div>

        <h1 className="text-6xl md:text-7xl font-black text-text-main tracking-tighter mb-6">
          System <span className="text-rose-500 italic">Interruption</span>
        </h1>

        <p className="text-xl md:text-2xl text-text-muted font-medium mb-12 leading-relaxed max-w-xl mx-auto px-4">
          An unexpected fluctuation has occurred in the care terminal. Our
          engineers have been notified.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 px-4">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-4 px-10 py-5 bg-rose-500 hover:bg-rose-600 text-white font-black rounded-2xl shadow-2xl shadow-rose-500/30 transition-all hover:scale-105 active:scale-95 group w-full sm:w-auto"
          >
            <LuRefreshCw className="group-hover:rotate-180 transition-transform duration-500" />
            <span>Initiate Recovery</span>
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-4 px-10 py-5 bg-surface border-2 border-border text-text-main font-black rounded-2xl shadow-soft hover:shadow-glass hover:bg-surface-hover transition-all group w-full sm:w-auto"
          >
            <LuHouse className="group-hover:scale-110 transition-transform" />
            <span>Decline & Exit</span>
          </Link>
        </div>

        <div className="mt-16 pt-8 border-t border-border/50">
          <p className="text-[10px] uppercase tracking-[0.3em] font-black text-rose-500/50 mb-2">
            Technical Reference
          </p>
          <code className="text-xs bg-surface/50 px-4 py-2 rounded-xl border border-border text-text-muted font-mono break-all">
            {error?.message || "Internal Network Desynchronization"}
          </code>
        </div>
      </motion.div>

      {/* Decorative Text */}
      <div className="absolute top-10 right-10 pointer-events-none opacity-5 flex items-center gap-4 rotate-90 origin-right">
        <span className="text-8xl font-black italic tracking-tighter text-rose-500">
          CRITICAL
        </span>
        <div className="h-px w-20 bg-rose-500"></div>
        <span className="text-xl font-medium uppercase tracking-[1em] text-rose-500">
          System State
        </span>
      </div>
    </main>
  );
}
