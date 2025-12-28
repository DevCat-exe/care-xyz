"use client";
import { motion } from "motion/react";

export default function CTA() {
  return (
    <section className="py-16 bg-primary text-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_-20%,rgba(255,255,255,0.1),transparent)]"></div>

      <div className="container mx-auto px-6 max-w-200 relative z-10">
        <div className="flex flex-col items-center text-center gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight"
          >
            Ready to find the perfect care?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/90 text-lg md:text-xl max-w-150 font-medium"
          >
            Join thousands of families who have found trusted, compassionate
            care through our platform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto mt-6"
          >
            <button className="flex items-center justify-center rounded-xl h-14 px-10 bg-white text-primary text-base font-black hover:bg-gray-50 transition-all shadow-xl hover:-translate-y-1 transform active:scale-95">
              Find a Caregiver
            </button>
            <button className="flex items-center justify-center rounded-xl h-14 px-10 bg-primary border-2 border-white text-white text-base font-black hover:bg-white/10 transition-all transform active:scale-95">
              Become a Caregiver
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
