"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "motion/react";
import BookingForm from "@/components/BookingForm";

export default function BookingPage() {
    const { service_id } = useParams();
    const [service, setService] = useState(null);

    useEffect(() => {
        fetch(`/api/services/${service_id}`)
            .then((r) => r.json())
            .then((data) => setService(data));
    }, [service_id]);

    if (!service) return <p className="p-10">Loading…</p>;

    return (
        <main className="min-h-screen pt-28 pb-20 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/5 via-surface to-surface">
            <div className="max-w-4xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Secure Checkout</span>
                    <h1 className="text-4xl md:text-5xl font-black text-text-main mb-4 tracking-tighter">
                        Complete Your <span className="text-primary">Booking</span>
                    </h1>
                    <p className="text-text-muted font-medium text-lg">
                        Confirming your schedule for <span className="text-text-main font-bold">{service.name}</span>
                    </p>
                </motion.div>

                <BookingForm service={service} />
            </div>
        </main>
    );
}