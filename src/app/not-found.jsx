"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { LuCompass, LuHouse, LuHeadphones } from "react-icons/lu";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/5 via-surface to-surface overflow-hidden relative">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 size-96 bg-primary/5 blur-[120px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 size-96 bg-secondary/5 blur-[120px] rounded-full animate-pulse delay-1000"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full text-center relative z-10"
      >
        <div className="relative inline-block mb-12">
          <motion.div
            animate={{
              rotate: [0, 5, -5, 0],
              y: [0, -10, 0],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="size-48 bg-primary/10 rounded-4xl flex items-center justify-center text-primary shadow-inner border border-primary/20 backdrop-blur-xl"
          >
            <LuCompass className="text-[100px]! font-light opacity-50" />
          </motion.div>

          <div className="absolute -bottom-4 -right-4 size-20 bg-surface rounded-3xl shadow-glass flex items-center justify-center text-rose-500 border-2 border-border animate-bounce">
            <span className="text-4xl! font-black">404</span>
          </div>
        </div>

        <h1 className="text-6xl md:text-8xl font-black text-text-main tracking-tighter mb-6">
          Lost in <span className="text-primary italic">Transition</span>
        </h1>

        <p className="text-xl md:text-2xl text-text-muted font-medium mb-12 leading-relaxed max-w-xl mx-auto px-4">
          It seems the coordinate you&apos;re searching for is beyond our
          current care network. Let&apos;s find your way back home.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 px-4">
          <Link
            href="/"
            className="inline-flex items-center gap-4 px-10 py-5 bg-primary hover:bg-primary-hover text-white font-black rounded-2xl shadow-2xl shadow-primary/30 transition-all hover:scale-105 active:scale-95 group w-full sm:w-auto"
          >
            <LuHouse className="group-hover:rotate-12 transition-transform" />
            <span>Return to Sanctuary</span>
          </Link>

          <Link
            href="/#about"
            className="inline-flex items-center gap-4 px-10 py-5 bg-surface border-2 border-border text-text-main font-black rounded-2xl shadow-soft hover:shadow-glass hover:bg-surface-hover transition-all group w-full sm:w-auto"
          >
            <LuHeadphones className="group-hover:scale-110 transition-transform" />
            <span>Support Access</span>
          </Link>
        </div>
      </motion.div>

      {/* Decorative Text */}
      <div className="absolute bottom-10 left-10 pointer-events-none opacity-5 flex items-center gap-4">
        <span className="text-8xl font-black italic tracking-tighter">
          CARE.XYZ
        </span>
        <div className="h-px w-20 bg-current"></div>
        <span className="text-xl font-medium uppercase tracking-[1em]">
          Coordinate Error
        </span>
      </div>
    </main>
  );
}
