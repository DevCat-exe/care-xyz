"use client";
import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { HiOutlineArrowRight, HiOutlineChevronRight } from "react-icons/hi2";
import { LuBaby, LuHeartHandshake, LuActivity } from "react-icons/lu";
import { MdOutlineMedicalServices } from "react-icons/md";

const getIcon = (name) => {
  const n = name.toLowerCase();
  if (n.includes("baby") || n.includes("child"))
    return <LuBaby className="text-primary" size={24} />;
  if (n.includes("elderly") || n.includes("senior"))
    return <LuHeartHandshake className="text-primary" size={24} />;
  if (n.includes("special") || n.includes("needs"))
    return <LuActivity className="text-primary" size={24} />;
  return <MdOutlineMedicalServices className="text-primary" size={24} />;
};

const DEFAULT_FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80";

export default function ServiceCard({ service, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group flex flex-col gap-5 rounded-2xl p-4 hover:bg-primary/5 transition-colors border border-transparent hover:border-primary/10"
    >
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-sm">
        <Image
          src={service.imageUrl || DEFAULT_FALLBACK_IMAGE}
          alt={service.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
      </div>

      <div className="flex flex-col gap-3 px-2">
        <div className="flex items-center gap-3">
          <div className="size-6 flex items-center justify-center">
            {getIcon(service.name)}
          </div>
          <h3 className="text-text-main text-xl font-black leading-normal tracking-tight">
            {service.name}
          </h3>
        </div>

        <p className="text-text-muted text-sm font-medium leading-relaxed line-clamp-2">
          {service.description}
        </p>

        <Link
          href={`/service/${service._id}`}
          className="text-primary text-sm font-black mt-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-1 group-hover:translate-x-0"
        >
          <span>Learn more</span>
          <HiOutlineChevronRight />
        </Link>
      </div>
    </motion.div>
  );
}
