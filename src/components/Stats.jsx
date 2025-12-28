"use client";
import { LuAward, LuUsers, LuHeart, LuShieldCheck } from "react-icons/lu";
import { motion } from "motion/react";

const STATS = [
  {
    icon: <LuAward size={28} />,
    value: "5,000+",
    label: "Verified Carers",
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    icon: <LuUsers size={28} />,
    value: "12,000+",
    label: "Families Served",
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    icon: <LuHeart size={28} />,
    value: "10+",
    label: "Years of Trust",
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    icon: <LuShieldCheck size={28} />,
    value: "100%",
    label: "Safety Checks",
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
];

export default function Stats() {
  return (
    <section className="bg-primary/5 py-16 border-y border-primary/10">
      <div className="container mx-auto px-6 max-w-300">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {STATS.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-center justify-center gap-2 p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow group"
            >
              <div
                className={`p-5 bg-white rounded-2xl mb-2 text-primary shadow-soft border border-primary/10 transition-transform group-hover:scale-110 group-hover:rotate-3`}
              >
                {stat.icon}
              </div>
              <p className="text-text-main text-2xl md:text-3xl font-black tracking-tight leading-tight">
                {stat.value}
              </p>
              <p className="text-text-muted text-sm md:text-base font-semibold text-center">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
