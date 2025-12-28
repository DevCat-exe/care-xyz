"use client";
import { motion } from "motion/react";
import Image from "next/image";
import { HiStar } from "react-icons/hi2";
import { FaQuoteRight } from "react-icons/fa";

const TESTIMONIALS = [
  {
    name: "Sarah Jenkins",
    role: "Daughter of senior patient",
    image: "https://i.pravatar.cc/150?u=sarah",
    quote:
      "Finding a nurse for my father was effortless. Care.xyz gave us peace of mind knowing he was in good hands while we were at work. Highly recommended!",
    stars: 5,
  },
  {
    name: "Michael Torres",
    role: "Parent of two",
    image: "https://i.pravatar.cc/150?u=michael",
    quote:
      "We needed a last-minute sitter for our special needs son. The caregiver we found was incredible, patient, and so kind. We will definitely use this again.",
    stars: 5,
  },
  {
    name: "Emily Richards",
    role: "User since 2021",
    image: "https://i.pravatar.cc/150?u=emily",
    quote:
      "The transparency of the platform is what I love. I can see certifications and reviews upfront. It feels much safer than other sites I've tried.",
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-6 max-w-300">
        <div className="text-center mb-16">
          <h2 className="text-text-main text-3xl md:text-5xl font-black tracking-tight leading-tight mb-4">
            Families love Care.xyz
          </h2>
          <p className="text-text-muted text-lg font-medium">
            Don&apos;t just take our word for it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="flex flex-col gap-6 p-8 rounded-2xl bg-surface-hover border border-border relative group"
            >
              <FaQuoteRight className="absolute top-6 right-8 text-primary/10 text-4xl group-hover:text-primary/20 transition-colors" />

              <div className="flex items-center gap-4">
                <div className="size-14 rounded-full overflow-hidden border-2 border-white shadow-sm relative">
                  <Image
                    alt={`${t.name}`}
                    className="object-cover"
                    src={t.image}
                    fill
                  />
                </div>
                <div>
                  <h4 className="font-bold text-text-main leading-tight">
                    {t.name}
                  </h4>
                  <p className="text-xs text-text-muted font-bold tracking-tight">
                    {t.role}
                  </p>
                </div>
              </div>

              <p className="text-text-muted italic font-medium leading-relaxed">
                &quot;{t.quote}&quot;
              </p>

              <div className="flex text-amber-400 gap-0.5 mt-auto">
                {[...Array(t.stars)].map((_, i) => (
                  <HiStar key={i} size={18} fill="currentColor" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
