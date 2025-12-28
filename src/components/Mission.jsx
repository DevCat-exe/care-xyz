"use client";
import Image from "next/image";
import { motion } from "motion/react";
import { LuCheck, LuShieldCheck } from "react-icons/lu";

const POINTS = [
  "Comprehensive Identity Verification",
  "National Criminal Background Checks",
  "Professional Reference Reviews",
  "Certification & License Validation",
];

export default function Mission() {
  return (
    <section className="py-16 md:py-24 bg-[#f0f7ff] relative overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-10 relative z-10 max-w-300">
        <div className="flex flex-col md:flex-row items-center gap-16 lg:gap-24">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 flex flex-col gap-8"
          >
            <div className="flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary w-fit border border-primary/20">
                <LuShieldCheck className="text-sm" />
                <span className="text-xs font-black uppercase tracking-wider">
                  Safety First
                </span>
              </div>
              <h2 className="text-text-main text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight">
                We take the worry out of finding care.
              </h2>
              <p className="text-text-muted text-lg leading-relaxed font-medium">
                Your family&apos;s safety is our top priority. We don&apos;t
                just list caregivers; we vet them. Our rigorous 5-step screening
                process includes:
              </p>
            </div>

            <ul className="flex flex-col gap-5">
              {POINTS.map((point, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="size-7 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 border border-emerald-200 transition-transform group-hover:scale-110">
                    <LuCheck size={16} strokeWidth={3} />
                  </div>
                  <span className="text-text-main font-bold">{point}</span>
                </motion.li>
              ))}
            </ul>

            <button className="mt-4 w-fit flex items-center justify-center rounded-xl h-14 px-8 bg-white border border-border text-text-main text-base font-bold hover:bg-gray-50 transition-all shadow-sm hover:shadow-md">
              Read Our Safety Standards
            </button>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 relative"
          >
            <div className="absolute -z-10 top-6 right-6 w-full h-full rounded-2xl bg-primary/10"></div>
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Caregiver screening"
                fill
                className="object-cover"
              />
            </div>

            {/* Floating Info card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-border flex items-center gap-4 max-w-70">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <LuShieldCheck size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-text-muted leading-none mb-1">
                  Status
                </p>
                <p className="text-sm font-bold text-text-main">
                  Vetted & Registered
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
