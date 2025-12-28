"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import Link from "next/link";
import { LuSearch, LuShieldCheck } from "react-icons/lu";
import { HiStar } from "react-icons/hi2";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center bg-white py-12 md:py-20 lg:py-24 overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 size-96 bg-primary/5 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>

      <div className="container mx-auto px-6 md:px-10 max-w-300">
        <div className="flex flex-col-reverse gap-12 md:flex-row md:items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-1 flex-col gap-6 text-left md:pr-10"
          >
            <div className="flex flex-col gap-5">
              <h1 className="text-text-main text-4xl font-black leading-tight tracking-[-0.033em] md:text-5xl lg:text-6xl">
                Trusted Care for the Ones You Love Most
              </h1>
              <p className="text-text-muted text-lg font-normal leading-relaxed max-w-xl">
                Connect with verified, compassionate caregivers for children,
                seniors, and special needs support in your area. We prioritize
                safety so you can have peace of mind.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/login"
                className="flex min-w-40 items-center justify-center gap-2 rounded-xl h-14 px-8 bg-primary text-white text-base font-bold hover:bg-primary-hover transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-1"
              >
                <LuSearch className="text-lg" />
                <span>Find Care</span>
              </Link>
              <Link
                href="/register"
                className="flex min-w-40 items-center justify-center rounded-xl h-14 px-8 bg-primary/10 text-primary hover:bg-primary/20 transition-all font-black"
              >
                Apply to Care
              </Link>
            </div>

            <div className="flex items-center gap-2 text-sm text-text-muted font-medium mt-2">
              <div className="size-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                <LuShieldCheck size={14} />
              </div>
              <span>100% Background Checked Professionals</span>
            </div>
          </motion.div>

          {/* Image Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 w-full relative"
          >
            <div className="relative w-full aspect-4/3 md:aspect-square lg:aspect-4/3 rounded-2xl shadow-2xl overflow-hidden border-8 border-white">
              <Image
                src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Caregiver with senior"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent"></div>

              {/* Floating Testimonial Card */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-6 left-6 right-6 md:right-auto md:max-w-[320px] glass p-5 rounded-2xl border border-white/30 shadow-2xl backdrop-blur-md"
              >
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex text-amber-400">
                    <HiStar size={16} fill="currentColor" />
                    <HiStar size={16} fill="currentColor" />
                    <HiStar size={16} fill="currentColor" />
                    <HiStar size={16} fill="currentColor" />
                    <HiStar size={16} fill="currentColor" />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest font-black text-text-muted ml-2">
                    4.9/5 Rating
                  </span>
                </div>
                <p className="text-sm font-bold text-text-main italic leading-relaxed">
                  &ldquo;Sarah has been a blessing for my mother. We
                  couldn&rsquo;t be happier with the care.&rdquo;
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="size-2 bg-primary rounded-full animate-pulse"></div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary">
                    Verified Family
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Soft decorative elements */}
            <div className="absolute -z-10 -bottom-6 -right-6 size-48 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -z-10 -top-6 -left-6 size-48 bg-blue-100 rounded-full blur-3xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
