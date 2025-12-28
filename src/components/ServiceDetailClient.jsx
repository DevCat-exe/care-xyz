"use client";
import { motion } from "motion/react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";
import {
  LuBaby,
  LuHeartHandshake,
  LuActivity,
  LuStethoscope,
  LuStar,
  LuCalendar,
  LuLogIn,
  LuInfo,
  LuCircleCheck,
  LuHash,
  LuUsers,
  LuArrowRight,
  LuShoppingCart,
  LuShieldCheck,
} from "react-icons/lu";

export default function ServiceDetailClient({ service }) {
  const { data: session } = useSession();

  const getIcon = (serviceName) => {
    const name = serviceName?.toLowerCase() || "";
    if (name.includes("baby")) return <LuBaby />;
    if (name.includes("elderly")) return <LuHeartHandshake />;
    if (name.includes("special")) return <LuActivity />;
    return <LuStethoscope />;
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-4xl shadow-glass overflow-hidden mb-12 border border-white/20"
        >
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="relative h-80 lg:h-auto overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] hover:scale-110"
                style={{
                  backgroundImage: `url("${
                    service.imageUrl ||
                    "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1000&q=80"
                  }")`,
                }}
              ></div>
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 glass px-5 py-2.5 rounded-2xl border border-white/30 backdrop-blur-xl">
                <div className="flex items-center gap-2">
                  <LuStar className="text-accent text-sm!" />
                  <span className="text-sm font-black text-white">
                    4.9 (120+ Reviews)
                  </span>
                </div>
              </div>
            </div>

            <div className="p-10 lg:p-14 bg-white backdrop-blur-md">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 bg-primary/15 rounded-2xl flex items-center justify-center text-primary border border-primary/20 shadow-inner">
                    <div className="text-3xl!">{getIcon(service.name)}</div>
                  </div>
                  <div>
                    <h1 className="text-4xl font-black text-text-main tracking-tight leading-tight">
                      {service.name}
                    </h1>
                    <div className="flex items-center gap-1.5 text-accent mt-2">
                      {[...Array(5)].map((_, i) => (
                        <LuStar key={i} className="text-base!" />
                      ))}
                      <span className="text-text-muted text-sm font-bold ml-2">
                        4.9/5 Excellent
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-text-muted text-lg mb-8 leading-relaxed font-medium">
                {service.fullDescription}
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-8">
                <div className="flex flex-col">
                  <span className="text-xs font-black uppercase tracking-widest text-text-muted mb-1">
                    Starting from
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-primary">
                      ${service.basePrice}
                    </span>
                    <span className="text-text-muted font-bold">/hr</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 w-full sm:w-auto">
                  {session ? (
                    <Link
                      href={`/booking/${service._id}`}
                      className="flex items-center justify-center gap-3 px-10 py-4 bg-primary hover:bg-primary-hover text-white font-black rounded-2xl shadow-lg hover:shadow-primary/40 transition-all transform hover:scale-[1.02] active:scale-95 flex-1 sm:flex-none"
                    >
                      <LuCalendar className="font-light" />
                      <span>Book Now</span>
                    </Link>
                  ) : (
                    <Link
                      href={`/login?callbackUrl=/booking/${service._id}`}
                      className="flex items-center justify-center gap-3 px-10 py-4 bg-primary hover:bg-primary-hover text-white font-black rounded-2xl shadow-lg hover:shadow-primary/40 transition-all transform hover:scale-[1.02] active:scale-95 flex-1 sm:flex-none"
                    >
                      <LuLogIn className="font-light" />
                      <span>Sign In to Book</span>
                    </Link>
                  )}
                  <Link
                    href="/"
                    className="flex items-center justify-center px-10 py-4 bg-primary/10 text-primary font-black rounded-2xl hover:bg-primary/20 transition-all flex-1 sm:flex-none border border-primary/10"
                  >
                    Browse More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-4xl p-10 shadow-soft border border-border backdrop-blur-sm"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="size-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/20">
                  <LuInfo className="text-2xl!" />
                </div>
                <h2 className="text-2xl font-black text-text-main">
                  About this Service
                </h2>
              </div>

              <p className="text-text-muted text-lg leading-relaxed mb-10 font-medium">
                {service.fullDescription}
              </p>

              <h3 className="text-xl font-black text-text-main mb-6">
                Why Choose Our {service.name}?
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  "Detailed daily logs and updates",
                  "Age-appropriate developmental activities",
                  "Emergency response trained personnel",
                  "Flexible scheduling (24/7 availability)",
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 group p-4 rounded-2xl hover:bg-surface transition-colors border border-transparent hover:border-border"
                  >
                    <LuCircleCheck className="text-primary text-2xl! group-hover:scale-110 transition-transform" />
                    <span className="text-text-muted font-bold">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* How it Works */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-4xl p-10 shadow-soft border border-border overflow-hidden relative backdrop-blur-sm"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>

              <div className="flex items-center gap-4 mb-10">
                <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                  <LuHash className="text-2xl!" />
                </div>
                <h2 className="text-2xl font-black text-text-main">
                  How it Works
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center relative">
                {/* Connecting Line */}
                <div className="hidden md:block absolute top-10 left-[15%] w-[70%] h-1 bg-linear-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-full z-0"></div>

                <div className="flex flex-col items-center gap-4 relative z-10">
                  <div className="size-20 rounded-3xl bg-white text-primary flex items-center justify-center text-2xl font-black shadow-xl ring-1 ring-border border-4 border-surface transition-transform hover:scale-110">
                    01
                  </div>
                  <h3 className="font-black text-xl text-text-main">
                    Select Service
                  </h3>
                  <p className="text-text-muted font-medium">
                    Choose your dates and specific care requirements.
                  </p>
                </div>

                <div className="flex flex-col items-center gap-4 relative z-10">
                  <div className="size-20 rounded-3xl bg-primary text-white flex items-center justify-center text-2xl font-black shadow-xl shadow-primary/30 ring-1 ring-primary/20 border-4 border-surface transition-transform hover:scale-110">
                    02
                  </div>
                  <h3 className="font-black text-xl text-text-main">
                    Meet & Greet
                  </h3>
                  <p className="text-text-muted font-medium">
                    Video call or meet your carer before the booking starts.
                  </p>
                </div>

                <div className="flex flex-col items-center gap-4 relative z-10">
                  <div className="size-20 rounded-3xl bg-white text-primary flex items-center justify-center text-2xl font-black shadow-xl ring-1 ring-border border-4 border-surface transition-transform hover:scale-110">
                    03
                  </div>
                  <h3 className="font-black text-xl text-text-main">
                    Care Begins
                  </h3>
                  <p className="text-text-muted font-medium">
                    Relax knowing your family is in safe, professional hands.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="sticky top-24 space-y-6"
            >
              {/* Booking Summary */}
              <div className="bg-white rounded-3xl p-8 shadow-soft border border-border border-t-4 border-t-primary backdrop-blur-xl">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20">
                    <LuShoppingCart className="text-2xl!" />
                  </div>
                  <div>
                    <h3 className="font-black text-text-main">
                      Booking Details
                    </h3>
                    <p className="text-xs text-text-muted font-bold uppercase tracking-wider">
                      Quick Reservation
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex justify-between items-center pb-4 border-b border-border">
                    <span className="text-sm text-text-muted font-bold">
                      Service Type
                    </span>
                    <span className="font-black text-text-main">
                      {service.name}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-border">
                    <span className="text-sm text-text-muted font-bold">
                      Base Rate
                    </span>
                    <div className="text-right">
                      <span className="font-black text-primary text-xl">
                        ${service.basePrice}
                      </span>
                      <span className="text-xs text-text-muted font-bold">
                        /hr
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-border">
                    <span className="text-sm text-text-muted font-bold">
                      Min. Duration
                    </span>
                    <span className="font-black text-text-main">
                      {service.minimumHours} Hours
                    </span>
                  </div>
                </div>

                <div className="mt-10 space-y-4">
                  {session ? (
                    <Link
                      href={`/booking/${service._id}`}
                      className="w-full py-4 bg-primary hover:bg-primary-hover text-white font-black rounded-2xl shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-3 transform hover:scale-[1.02] active:scale-95"
                    >
                      <LuCalendar className="font-light" />
                      <span>Continue to Booking</span>
                    </Link>
                  ) : (
                    <Link
                      href={`/login?callbackUrl=/booking/${service._id}`}
                      className="w-full py-4 bg-primary hover:bg-primary-hover text-white font-black rounded-2xl shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-3 transform hover:scale-[1.02] active:scale-95"
                    >
                      <LuLogIn className="font-light" />
                      <span>Sign In to Book</span>
                    </Link>
                  )}
                  <p className="text-[11px] text-text-muted text-center font-bold uppercase tracking-widest leading-none">
                    No Credit Card Required Yet
                  </p>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="rounded-3xl p-6 flex items-start gap-4 border border-emerald-500/30 bg-emerald-500/10 shadow-lg shadow-emerald-500/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-emerald-500/20 transition-all"></div>
                <LuShieldCheck className="text-emerald-500 text-3xl! relative z-10" />
                <div className="relative z-10">
                  <p className="text-sm font-black text-emerald-700">
                    Premium Guarantee
                  </p>
                  <p className="text-xs text-emerald-800/70 mt-1 font-bold leading-relaxed">
                    Every caregiver is background-checked and identity-verified
                    for your peace of mind.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
