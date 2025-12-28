"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import {
  LuClock,
  LuCircleCheck,
  LuBadgeCheck,
  LuCircle,
  LuCalendarOff,
  LuSearchX,
  LuCompass,
  LuPlus,
  LuStethoscope,
  LuCalendar,
  LuTimer,
  LuMapPin,
  LuArrowRight,
  LuChartBar,
  LuX,
  LuFileText,
} from "react-icons/lu";
import Swal from "sweetalert2";

const statusConfig = {
  Pending: {
    bg: "bg-amber-100",
    text: "text-amber-700",
    icon: <LuClock />,
    border: "border-amber-200",
  },
  Confirmed: {
    bg: "bg-emerald-100",
    text: "text-emerald-700",
    icon: <LuCircleCheck />,
    border: "border-emerald-200",
  },
  Completed: {
    bg: "bg-blue-100",
    text: "text-blue-700",
    icon: <LuBadgeCheck />,
    border: "border-blue-200",
  },
  Cancelled: {
    bg: "bg-rose-100",
    text: "text-rose-700",
    icon: <LuCircle />,
    border: "border-rose-200",
  },
};

export default function MyBookingsClient() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/bookings");
      const data = await res.json();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    const result = await Swal.fire({
      title: "Cancel Booking?",
      text: "You won't be able to undo this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f43f5e",
      cancelButtonColor: "#94a3b8",
      confirmButtonText: "Yes, cancel it!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
      });
      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Cancelled",
          text: "Your booking has been cancelled.",
          timer: 1500,
          showConfirmButton: false,
        });
        fetchBookings();
      } else {
        const err = await res.json();
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: err.error || "Failed to cancel booking",
          confirmButtonColor: "#3b82f6",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Network error occurred",
        confirmButtonColor: "#3b82f6",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="flex flex-col items-center gap-4">
          <div className="size-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <p className="text-text-muted font-black uppercase tracking-[0.3em] text-xs">
            Accessing Bookings...
          </p>
        </div>
      </div>
    );
  }

  if (!bookings.length) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center"
        >
          <div className="relative inline-block mb-8">
            <div className="size-32 bg-primary/10 rounded-4xl flex items-center justify-center text-primary rotate-12 shadow-inner">
              <LuCalendarOff className="text-6xl!" />
            </div>
            <div className="absolute -bottom-2 -right-2 size-12 bg-surface rounded-2xl shadow-glass flex items-center justify-center text-rose-500 border border-border">
              <LuSearchX className="text-2xl!" />
            </div>
          </div>
          <h2 className="text-4xl font-black text-text-main mb-4 tracking-tighter">
            No Bookings <span className="text-primary italic">Yet</span>
          </h2>
          <p className="text-text-muted mb-10 font-medium text-lg leading-relaxed">
            Your care journal is currently empty. Explore our premium services
            and find the support you deserve.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-4 px-8 py-4 bg-primary hover:bg-primary-hover text-white font-black rounded-2xl shadow-xl shadow-primary/30 transition-all group"
          >
            <LuCompass className="group-hover:rotate-12 transition-transform" />
            <span>Discovery Premium Care</span>
          </Link>
        </motion.div>
      </div>
    );
  }

  const handleViewInsights = (b) => {
    Swal.fire({
      title: "Booking Insights",
      html: `
            <div class="text-left space-y-2">
                <p><strong>Status:</strong> ${b.status}</p>
                <p><strong>Investment:</strong> $${b.totalCost}</p>
                <p><strong>Scheduled:</strong> ${b.bookingDate} at ${b.bookingTime}</p>
                <p class="text-[10px] text-gray-400 mt-2">ID: ${b._id}</p>
            </div>
        `,
      icon: "info",
      confirmButtonColor: "#3b82f6",
    });
  };

  return (
    <main className="min-h-screen pt-28 pb-20 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/5 via-surface to-surface">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16"
        >
          <div>
            <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">
              Dashboard / Care Journal
            </span>
            <h1 className="text-5xl md:text-6xl font-black text-text-main tracking-tighter">
              My <span className="text-primary italic">Bookings</span>
            </h1>
            <p className="text-text-muted mt-4 font-medium text-lg flex items-center gap-2">
              <span className="size-2 bg-primary rounded-full animate-pulse"></span>
              You have{" "}
              <span className="text-text-main font-black">
                {bookings.length} active record
                {bookings.length !== 1 ? "s" : ""}
              </span>{" "}
              in your history
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-3 px-6 py-3 bg-surface border-2 border-border rounded-2xl text-text-main font-black shadow-soft hover:shadow-glass hover:bg-surface-hover transition-all group"
          >
            <LuPlus className="text-primary group-hover:scale-110 transition-transform" />
            <span>Reserve New Service</span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 gap-10">
          {bookings.map((b, idx) => (
            <motion.div
              key={b._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass group hover:bg-surface/80 transition-all rounded-4xl border border-border shadow-soft hover:shadow-glass overflow-hidden"
            >
              <div className="p-8 md:p-10">
                <div className="flex flex-col lg:flex-row gap-10">
                  {/* Left: Service Identity */}
                  <div className="flex-1">
                    <div className="flex items-start gap-8">
                      <div className="size-24 bg-primary/10 rounded-3xl flex items-center justify-center text-primary shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-500 relative">
                        <LuStethoscope className="text-4xl!" />
                        <div className="absolute -top-2 -right-2 size-8 bg-surface rounded-xl shadow-glass border border-border flex items-center justify-center text-[10px] font-black group-hover:rotate-12 transition-transform text-primary">
                          #{idx + 1}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-4 mb-3">
                          <h3 className="text-3xl font-black text-text-main tracking-tighter truncate leading-tight">
                            {b.serviceName}
                          </h3>
                          <span
                            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border-2 ${
                              statusConfig[b.status]?.bg
                            } ${statusConfig[b.status]?.text} ${
                              statusConfig[b.status]?.border
                            } shadow-sm`}
                          >
                            <div className="text-[14px]!">
                              {statusConfig[b.status]?.icon}
                            </div>
                            {b.status}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm font-bold text-text-muted">
                          <span className="flex items-center gap-2 bg-surface/50 px-3 py-1.5 rounded-xl border border-border/50">
                            <LuCalendar className="text-primary text-lg!" />
                            {b.bookingDate}
                          </span>
                          <span className="flex items-center gap-2 bg-surface/50 px-3 py-1.5 rounded-xl border border-border/50">
                            <LuClock className="text-primary text-lg!" />
                            {b.bookingTime}
                          </span>
                          <span className="flex items-center gap-2 bg-surface/50 px-3 py-1.5 rounded-xl border border-border/50">
                            <LuTimer className="text-primary text-lg!" />
                            {b.duration}
                          </span>
                          <span className="flex items-center gap-2 bg-surface/50 px-3 py-1.5 rounded-xl border border-border/50 max-w-xs truncate">
                            <LuMapPin className="text-primary text-lg!" />
                            {b.location}
                          </span>
                        </div>

                        {b.address && (
                          <p className="mt-4 text-text-muted/80 font-medium text-sm leading-relaxed line-clamp-2 max-w-xl group-hover:text-text-muted transition-colors">
                            {b.address}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Middle: Booking Stats */}
                  <div className="lg:w-87.5 flex flex-col justify-center border-y lg:border-y-0 lg:border-x-2 border-dashed border-border py-8 lg:py-0 lg:px-10">
                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-text-muted leading-none">
                          Booking Index
                        </p>
                        <p className="text-lg font-black text-text-main tracking-tighter">
                          #{b._id?.slice(-6).toUpperCase() || "N/A"}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-text-muted leading-none">
                          Investment
                        </p>
                        <p className="text-2xl font-black text-primary leading-none tracking-tighter">
                          ${b.totalCost}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-text-muted leading-none">
                          Scheduled For
                        </p>
                        <p className="text-sm font-bold text-text-main">
                          {b.bookingDate} • {b.bookingTime}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-text-muted leading-none">
                          Network Status
                        </p>
                        <div className="flex items-center gap-1.5 text-emerald-500 font-black text-sm uppercase italic">
                          <span className="size-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                          Secured
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Operations */}
                  <div className="lg:w-55 flex flex-col justify-center gap-4">
                    <Link
                      href={`/service/${b.serviceId}`}
                      className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary-hover hover:scale-[1.02] active:scale-[0.98] transition-all group/btn"
                    >
                      <span>View Details</span>
                      <LuArrowRight className="text-lg! group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleViewInsights(b)}
                        className="flex-1 px-4 py-3 bg-primary/10 border-2 border-primary/20 rounded-xl text-primary font-black text-xs hover:bg-primary/20 transition-all flex items-center justify-center"
                        aria-label="Booking Insights"
                        title="Booking Insights"
                      >
                        <LuChartBar className="text-lg!" />
                      </button>

                      {b.status === "Pending" && (
                        <button
                          onClick={() => handleCancel(b._id)}
                          className="flex-1 px-4 py-3 bg-rose-500/10 border-2 border-rose-500/20 text-rose-500 rounded-xl font-black text-xs hover:bg-rose-500 hover:text-white transition-all flex items-center justify-center"
                          aria-label="Cancel Booking"
                          title="Cancel Booking"
                        >
                          <LuX className="text-lg!" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary Widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 group"
        >
          <div className="relative p-1 bg-linear-to-br from-primary/20 via-border/50 to-primary/10 rounded-[2.5rem] shadow-glass">
            <div className="bg-surface/90 backdrop-blur-3xl rounded-[2.25rem] p-10 lg:p-14 overflow-hidden relative">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 size-80 bg-primary/5 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-primary/10 transition-colors duration-700"></div>

              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                <div className="text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary font-black uppercase tracking-widest text-[10px] mb-6 border border-primary/20">
                    <LuFileText className="text-sm!" />
                    Care Summary
                  </div>
                  <h3 className="text-4xl lg:text-5xl font-black text-text-main tracking-tighter mb-4 italic">
                    Portfolio{" "}
                    <span className="text-primary not-italic">Overview</span>
                  </h3>
                  <p className="text-text-muted font-medium text-lg max-w-sm">
                    A comprehensive look at your care engagement and network
                    utilization.
                  </p>
                </div>

                <div className="flex flex-wrap justify-center items-center gap-10 lg:gap-16">
                  <div className="text-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted mb-3 leading-none">
                      Total Investment
                    </p>
                    <div className="text-5xl lg:text-6xl font-black text-primary tracking-tighter flex items-center justify-center leading-none">
                      <span className="text-3xl lg:text-4xl mr-1 self-start mt-1">
                        $
                      </span>
                      {bookings
                        .reduce(
                          (sum, b) => sum + (parseFloat(b.totalCost) || 0),
                          0
                        )
                        .toFixed(0)}
                      <span className="text-text-muted/20 text-4xl lg:text-5xl ml-1">
                        .00
                      </span>
                    </div>
                  </div>

                  <div className="h-20 w-px bg-border/50 hidden md:block"></div>

                  <div className="flex flex-wrap justify-center gap-4 max-w-75">
                    {Object.entries(statusConfig).map(([status, config]) => {
                      const count = bookings.filter(
                        (b) => b.status === status
                      ).length;
                      if (count === 0) return null;
                      return (
                        <div
                          key={status}
                          className={`flex items-center gap-2 pl-2 pr-4 py-2 rounded-2xl border-2 ${config.bg} ${config.text} ${config.border} transition-all hover:scale-105 cursor-default`}
                        >
                          <div className="size-8 bg-surface rounded-xl flex items-center justify-center shadow-soft">
                            <div className="text-sm! font-black">
                              {config.icon}
                            </div>
                          </div>
                          <span className="text-xs font-black uppercase tracking-widest">
                            {count} {status}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
