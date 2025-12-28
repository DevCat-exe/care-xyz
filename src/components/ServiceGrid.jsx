"use client";
import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";
import { motion } from "motion/react";
import { HiArrowSmallRight } from "react-icons/hi2";

export default function ServiceGrid() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/services")
      .then((r) => r.json())
      .then((data) => {
        setServices(data.slice(0, 3)); // Only show first 3 on home
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section id="services" className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-300">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16 px-2">
          <div className="flex flex-col gap-4 max-w-2xl">
            <h2 className="text-text-main text-3xl md:text-5xl font-black tracking-tight leading-tight">
              Our Care Services
            </h2>
            <p className="text-text-muted text-lg font-normal leading-relaxed">
              Whether you need a nanny for your little ones or a companion for
              your aging parents, we have the right professional for you.
            </p>
          </div>

          <a
            href="#"
            className="flex items-center gap-2 text-primary font-bold hover:underline group"
          >
            <span>View all services</span>
            <HiArrowSmallRight className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-surface-hover rounded-2xl animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {services.map((s, idx) => (
              <ServiceCard key={s._id} service={s} index={idx} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
