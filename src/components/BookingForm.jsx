"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "motion/react";
import {
  LuCheck,
  LuTimer,
  LuMapPin,
  LuBadgeCheck,
  LuCalendar,
  LuChevronUp,
  LuChevronDown,
  LuInfo,
  LuArrowRight,
  LuArrowLeft,
  LuMap,
  LuCompass,
  LuBuilding,
  LuTriangleAlert,
  LuClipboardCheck,
  LuFileText,
  LuStethoscope,
  LuActivity,
  LuBell,
  LuCreditCard,
  LuStar,
} from "react-icons/lu";
import Swal from "sweetalert2";

export default function BookingForm({ service }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [duration, setDuration] = useState(4);
  const [type, setType] = useState("hours");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const total =
    (type === "days" ? duration * 24 : duration) * service.basePrice;

  const divisions = [
    "Dhaka",
    "Chittagong",
    "Sylhet",
    "Khulna",
    "Rajshahi",
    "Barisal",
    "Rangpur",
    "Mymensingh",
  ];
  const districts = {
    Dhaka: [
      "Dhaka",
      "Gazipur",
      "Narayanganj",
      "Manikganj",
      "Munshiganj",
      "Narsingdi",
      "Tangail",
      "Faridpur",
      "Gopalganj",
      "Shariatpur",
      "Rajbari",
      "Madaripur",
    ],
    Chittagong: [
      "Chittagong",
      "Comilla",
      "Brahmanbaria",
      "Lakshmipur",
      "Noakhali",
      "Feni",
      "Chandpur",
      "Rangamati",
      "Khagrachhari",
      "Bandarban",
    ],
    Sylhet: ["Sylhet", "Moulvibazar", "Sunamganj", "Habiganj"],
    Khulna: [
      "Khulna",
      "Jessore",
      "Satkhira",
      "Narail",
      "Meherpur",
      "Chuadanga",
      "Kushtia",
      "Magura",
      "Jhenaidah",
      "Bagerhat",
      "Khulna",
      "Satkhira",
    ],
    Rajshahi: [
      "Rajshahi",
      "Bogra",
      "Naogaon",
      "Natore",
      "Chapainawabganj",
      "Pabna",
      "Sirajganj",
      "Joypurhat",
    ],
    Barisal: [
      "Barisal",
      "Bhola",
      "Jhalokati",
      "Patuakhali",
      "Pirojpur",
      "Barguna",
    ],
    Rangpur: [
      "Rangpur",
      "Dinajpur",
      "Gaibandha",
      "Kurigram",
      "Lalmonirhat",
      "Nilphamari",
      "Panchagarh",
      "Thakurgaon",
    ],
    Mymensingh: ["Mymensingh", "Netrokona", "Sherpur", "Jamalpur"],
  };

  const cities = {
    Dhaka: ["Dhaka City", "Gazipur City", "Narayanganj City"],
    Chittagong: ["Chittagong City", "Comilla City", "Cox's Bazar"],
    Sylhet: ["Sylhet City", "Moulvibazar City"],
    Khulna: ["Khulna City", "Jessore City"],
    Rajshahi: ["Rajshahi City", "Bogra City"],
    Barisal: ["Barisal City", "Patuakhali City"],
    Rangpur: ["Rangpur City", "Dinajpur City"],
    Mymensingh: ["Mymensingh City", "Jamalpur City"],
  };

  const areas = {
    "Dhaka City": [
      "Gulshan 1",
      "Gulshan 2",
      "Banani",
      "Mohammadpur",
      "Dhanmondi",
      "Uttara",
      "Mirpur",
      "Bashundhara",
      "Baridhara",
      "Tejgaon",
      "Motijheel",
      "Old Dhaka",
    ],
    "Chittagong City": [
      "Agrabad",
      "GEC",
      "Foy's Lake",
      "Patenga",
      "Halishahar",
      "Chawkbazar",
      "Pahartali",
    ],
    "Sylhet City": [
      "Amborkhana",
      "Bandar Bazar",
      "Zindabazar",
      "Kean Bridge",
      "Mirboxtola",
    ],
    "Khulna City": ["Dumuria", "Rupsha", "Daulatpur", "Batiaghata"],
    "Rajshahi City": ["Boalia", "Motihar", "Rajpara", "Chandrima", "Katakhali"],
    "Barisal City": ["Kotwali", "Bandar", "Lalbag", "Wazirpur"],
    "Rangpur City": ["Rangpur Sadar", "Badarganj", "Kaunia", "Taraganj"],
    "Mymensingh City": ["Mymensingh Sadar", "Fulbaria", "Haluaghat", "Trishal"],
  };

  async function handleSubmit(e) {
    if (e) e.preventDefault();
    if (!date || !time) return alert("Please select a date and time");

    setLoading(true);
    try {
      const grandTotal = total * 1.2;
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: service._id,
          duration: `${duration} ${type}`,
          location: `${division}, ${district}, ${city}, ${area}`,
          address,
          totalCost: grandTotal.toFixed(2),
          bookingDate: date,
          bookingTime: time,
        }),
      });

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Booking Confirmed!",
          text: "Your request has been saved as Pending.",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          router.push("/my-bookings");
        });
      } else {
        const errorData = await res.json();
        Swal.fire({
          icon: "error",
          title: "Booking Failed",
          text: errorData.error || "Booking failed. Please try again.",
          confirmButtonColor: "#3b82f6",
        });
      }
    } catch (error) {
      console.error("Booking Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "A network error occurred. Please try again.",
        confirmButtonColor: "#3b82f6",
      });
    } finally {
      setLoading(false);
    }
  }

  const handleNext = () => {
    if (step === 1) {
      if (duration && type) setStep(2);
    } else if (step === 2) {
      if (division && district && city && area && address) setStep(3);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="space-y-6">
      {/* Stepper */}
      <div className="flex items-center justify-center mb-12">
        <div className="flex items-center justify-between w-full max-w-lg relative">
          {/* Progress Bar Background */}
          <div className="absolute top-5 left-0 w-full h-1 bg-border/30 rounded-full z-0"></div>
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-10 left-[15%] w-[70%] h-1 bg-linear-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-full z-0"></div>
          {/* Active Progress Bar */}
          <div
            className="absolute top-5 left-0 h-1 bg-primary rounded-full transition-all duration-500 z-0"
            style={{ width: `${((step - 1) / 2) * 100}%` }}
          ></div>

          {[
            { s: 1, label: "Duration", icon: <LuTimer /> },
            { s: 2, label: "Location", icon: <LuMapPin /> },
            { s: 3, label: "Review", icon: <LuBadgeCheck /> },
          ].map((item) => (
            <div
              key={item.s}
              className="flex flex-col items-center gap-3 relative z-10 group cursor-pointer"
              onClick={() => step > item.s && setStep(item.s)}
            >
              <div
                className={`size-11 rounded-2xl flex items-center justify-center font-black text-sm transition-all duration-500 shadow-lg border-2 ${
                  step >= item.s
                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/30"
                    : "bg-primary/5 text-primary/40 border-primary/10"
                } ${step === item.s ? "scale-110 ring-4 ring-primary/20" : ""}`}
              >
                {step > item.s ? (
                  <LuCheck className="text-xl!" />
                ) : (
                  <div className="text-xl!">{item.icon}</div>
                )}
              </div>
              <span
                className={`text-[11px] font-black uppercase tracking-widest transition-colors duration-500 ${
                  step >= item.s ? "text-primary" : "text-text-muted"
                }`}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Duration & Time */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="glass rounded-4xl p-8 border border-white/20 shadow-glass"
        >
          <div className="flex items-center gap-5 mb-10">
            <div className="size-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20 shadow-inner">
              <LuTimer className="text-3xl!" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-text-main tracking-tight">
                Set Your Preference
              </h3>
              <p className="text-text-muted font-bold uppercase text-[11px] tracking-widest">
                Step 01: Duration & Timing
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-5 gap-10">
            <div className="lg:col-span-3 space-y-8">
              <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-widest text-text-muted ml-1">
                  Select Duration
                </label>
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <input
                      type="number"
                      min="1"
                      value={duration}
                      onChange={(e) => setDuration(Number(e.target.value))}
                      className="w-full px-6 py-4 border-2 border-primary/10 rounded-2xl bg-white text-text-main font-black text-xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-text-muted/30 shadow-soft"
                      required
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-1">
                      <button
                        onClick={() => setDuration((d) => d + 1)}
                        className="hover:text-primary transition-colors"
                      >
                        <LuChevronUp className="text-sm!" />
                      </button>
                      <button
                        onClick={() => setDuration((d) => (d > 1 ? d - 1 : 1))}
                        className="hover:text-primary transition-colors"
                      >
                        <LuChevronDown className="text-sm!" />
                      </button>
                    </div>
                  </div>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="px-6 py-4 border-2 border-primary/10 rounded-2xl bg-white text-text-main font-black focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all cursor-pointer appearance-none min-w-30 shadow-soft"
                  >
                    <option value="hours">Hours</option>
                    <option value="days">Days</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <label className="text-xs font-black uppercase tracking-widest text-text-muted ml-1">
                    Booking Date
                  </label>
                  <div className="relative group">
                    <LuCalendar className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors" />
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full pl-14 pr-6 py-4 border-2 border-border rounded-2xl bg-surface/50 text-text-main font-bold focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-xs font-black uppercase tracking-widest text-text-muted ml-1">
                    Start Time
                  </label>
                  <div className="relative group">
                    <LuTimer className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors" />
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full pl-14 pr-6 py-4 border-2 border-border rounded-2xl bg-surface/50 text-text-main font-bold focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all appearance-none"
                    >
                      <option value="">Select Time</option>
                      <option value="08:00">08:00 AM</option>
                      <option value="09:00">09:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="13:00">01:00 PM</option>
                      <option value="14:00">02:00 PM</option>
                      <option value="15:00">03:00 PM</option>
                      <option value="16:00">04:00 PM</option>
                      <option value="17:00">05:00 PM</option>
                      <option value="18:00">06:00 PM</option>
                      <option value="19:00">07:00 PM</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-primary/5 rounded-3xl p-6 border-2 border-primary/10 h-full flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-black text-text-main uppercase tracking-widest mb-6 flex items-center gap-2">
                    <LuInfo className="text-primary text-xl!" />
                    Booking Summary
                  </h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-text-muted font-bold">
                        Service
                      </span>
                      <span className="font-black text-text-main">
                        {service.name}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-text-muted font-bold">
                        Basis
                      </span>
                      <span className="font-black text-text-main">
                        {duration} {type}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-text-muted font-bold">
                        {type === "days" ? "Daily Rate" : "Hourly Rate"}
                      </span>
                      <span className="font-black text-text-main">
                        $
                        {type === "days"
                          ? (service.basePrice * 24).toLocaleString()
                          : service.basePrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-primary/10">
                  <div className="flex justify-between items-end">
                    <span className="text-xs font-black uppercase tracking-widest text-text-muted mb-1">
                      Estimated Total
                    </span>
                    <div className="text-right">
                      <span className="text-4xl font-black text-primary">
                        ${total}
                      </span>
                      <p className="text-[10px] font-bold text-text-muted mt-1">
                        Excl. VAT & Charges
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-12 pt-8 border-t border-border">
            <motion.button
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNext}
              disabled={!duration || !type || !date || !time}
              className="flex items-center gap-3 px-12 py-4 bg-primary hover:bg-primary-hover text-white font-black rounded-2xl shadow-xl shadow-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <span>Continue</span>
              <LuArrowRight className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Step 2: Location */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="glass rounded-4xl p-8 border border-white/20 shadow-glass"
        >
          <div className="flex items-center gap-5 mb-10">
            <div className="size-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary border border-secondary/20 shadow-inner">
              <LuMapPin className="text-3xl!" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-text-main tracking-tight">
                Meeting Point
              </h3>
              <p className="text-text-muted font-bold uppercase text-[11px] tracking-widest">
                Step 02: Location Details
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-5 gap-10">
            <div className="lg:col-span-3 space-y-8">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <label className="text-xs font-black uppercase tracking-widest text-text-muted ml-1">
                    Division
                  </label>
                  <div className="relative group">
                    <LuMap className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors" />
                    <select
                      value={division}
                      onChange={(e) => {
                        setDivision(e.target.value);
                        setDistrict("");
                        setCity("");
                        setArea("");
                      }}
                      className="w-full pl-14 pr-6 py-4 border-2 border-border rounded-2xl bg-surface/50 text-text-main font-black focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all appearance-none cursor-pointer"
                      required
                    >
                      <option value="">Select Division</option>
                      {divisions.map((div) => (
                        <option key={div} value={div}>
                          {div}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-xs font-black uppercase tracking-widest text-text-muted ml-1">
                    District
                  </label>
                  <div className="relative group">
                    <LuCompass className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors" />
                    <select
                      value={district}
                      onChange={(e) => {
                        setDistrict(e.target.value);
                        setCity("");
                        setArea("");
                      }}
                      className="w-full pl-14 pr-6 py-4 border-2 border-border rounded-2xl bg-surface/50 text-text-main font-black focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all appearance-none cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                      required
                      disabled={!division}
                    >
                      <option value="">Select District</option>
                      {districts[division]?.map((dist) => (
                        <option key={dist} value={dist}>
                          {dist}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <label className="text-xs font-black uppercase tracking-widest text-text-muted ml-1">
                    City / Zone
                  </label>
                  <div className="relative group">
                    <LuBuilding className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors" />
                    <select
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                        setArea("");
                      }}
                      className="w-full pl-14 pr-6 py-4 border-2 border-border rounded-2xl bg-surface/50 text-text-main font-black focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all appearance-none cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                      required
                      disabled={!district}
                    >
                      <option value="">Select City</option>
                      {cities[division]?.map((ct) => (
                        <option key={ct} value={ct}>
                          {ct}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-xs font-black uppercase tracking-widest text-text-muted ml-1">
                    Local Area
                  </label>
                  <div className="relative group">
                    <LuMapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors" />
                    <select
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="w-full pl-14 pr-6 py-4 border-2 border-border rounded-2xl bg-surface/50 text-text-main font-black focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all appearance-none cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                      required
                      disabled={!city}
                    >
                      <option value="">Select Area</option>
                      {areas[city]?.map((ar) => (
                        <option key={ar} value={ar}>
                          {ar}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-widest text-text-muted ml-1">
                  Complete Address
                </label>
                <textarea
                  placeholder="House No, Road No, Apartment Name, Floor..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-6 py-4 border-2 border-border rounded-2xl bg-surface/50 text-text-main font-bold focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all min-h-35 resize-none placeholder:text-text-muted/30"
                  required
                />
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-accent px-2">
                  <LuTriangleAlert className="text-sm!" />
                  Ensure precise details for the caregiver
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-secondary/5 rounded-3xl p-6 border-2 border-secondary/10 h-full flex flex-col justify-between overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-2xl -mr-16 -mt-16"></div>

                <div>
                  <h4 className="text-sm font-black text-text-main uppercase tracking-widest mb-6 flex items-center gap-2">
                    <LuMapPin className="text-secondary text-xl!" />
                    Active Location
                  </h4>
                  <div className="space-y-4 relative z-10">
                    {[
                      { l: "Division", v: division },
                      { l: "District", v: district },
                      { l: "City", v: city },
                      { l: "Area", v: area },
                    ].map((loc, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center group"
                      >
                        <span className="text-xs text-text-muted font-bold">
                          {loc.l}
                        </span>
                        <span
                          className={`font-black tracking-tight ${
                            loc.v
                              ? "text-text-main"
                              : "text-text-muted/30 italic"
                          }`}
                        >
                          {loc.v || "Pending..."}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-12 pt-8 border-t border-border">
            <motion.button
              whileHover={{ scale: 1.02, x: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBack}
              className="flex items-center gap-3 px-8 py-4 border-2 border-border text-text-main font-black rounded-2xl hover:bg-surface transition-all group"
            >
              <LuArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              <span>Back</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNext}
              disabled={!division || !district || !city || !area || !address}
              className="flex items-center gap-3 px-12 py-4 bg-primary hover:bg-primary-hover text-white font-black rounded-2xl shadow-xl shadow-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <span>Continue</span>
              <LuArrowRight className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Step 3: Review */}
      {step === 3 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="glass rounded-4xl p-8 border border-white/20 shadow-glass"
        >
          <div className="flex items-center gap-5 mb-10">
            <div className="size-14 bg-green-100 rounded-xl flex items-center justify-center text-green-600 border border-green-200 shadow-inner">
              <LuClipboardCheck className="text-3xl!" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-text-main tracking-tight">
                Final Verification
              </h3>
              <p className="text-text-muted font-bold uppercase text-[11px] tracking-widest">
                Step 03: Review & Confirm
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-5 gap-10">
            <div className="lg:col-span-3 space-y-8">
              <div className="bg-surface/50 rounded-3xl p-8 border border-border">
                <h4 className="text-sm font-black text-text-main uppercase tracking-widest mb-6 flex items-center gap-2">
                  <LuFileText className="text-primary text-xl!" />
                  Reservation Summary
                </h4>
                <div className="grid sm:grid-cols-2 gap-x-12 gap-y-6">
                  {[
                    {
                      label: "Service",
                      value: service.name,
                      icon: <LuStethoscope />,
                    },
                    {
                      label: "Basis",
                      value: `${duration} ${type}`,
                      icon: <LuTimer />,
                    },
                    {
                      label: "Booking Date",
                      value: date,
                      icon: <LuCalendar />,
                    },
                    { label: "Start Time", value: time, icon: <LuBell /> },
                    {
                      label: "Billing Rate",
                      value: `$${service.basePrice}/hr`,
                      icon: <LuCreditCard />,
                    },
                    { label: "Zone", value: city, icon: <LuMap /> },
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col gap-1">
                      <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">
                        {item.label}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="text-primary text-sm! font-bold">
                          {item.icon}
                        </div>
                        <span className="font-black text-text-main">
                          {item.value || "N/A"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-surface/50 rounded-3xl p-8 border border-border">
                <h4 className="text-sm font-black text-text-main uppercase tracking-widest mb-6 flex items-center gap-2">
                  <LuMapPin className="text-secondary text-xl!" />
                  Deployment Address
                </h4>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-border shadow-soft">
                    <div className="size-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/20 font-black">
                      L
                    </div>
                    <span className="font-black text-text-main truncate">
                      {[division, district, city, area]
                        .filter(Boolean)
                        .join(" • ")}
                    </span>
                  </div>
                  <div className="p-4 bg-white rounded-2xl border border-border shadow-soft">
                    <p className="text-sm font-bold text-text-muted italic leading-relaxed">
                      &quot;{address}&quot;
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white rounded-4xl p-8 shadow-2xl relative overflow-hidden group border border-primary/5">
                <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-[80px] -mr-24 -mt-24 group-hover:bg-primary/10 transition-all duration-1000"></div>

                <h4 className="text-xs font-black text-primary uppercase tracking-[0.2em] mb-10 flex items-center gap-3">
                  <span className="w-8 h-px bg-primary/20"></span>
                  Checkout Invoice
                </h4>

                <div className="space-y-6">
                  <div className="flex justify-between items-center text-text-muted">
                    <span className="text-sm font-bold">Service Fee</span>
                    <span className="font-black text-lg text-text-main">
                      ${total.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-text-muted">
                    <span className="text-sm font-bold">
                      Service Charge (5%)
                    </span>
                    <span className="font-black text-lg text-text-main">
                      ${(total * 0.05).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-text-muted">
                    <span className="text-sm font-bold">Tax & VAT (15%)</span>
                    <span className="font-black text-lg text-text-main">
                      ${(total * 0.15).toFixed(2)}
                    </span>
                  </div>
                  <div className="h-px bg-primary/5 my-4"></div>
                  <div className="flex flex-col gap-2 pt-4">
                    <p className="text-[11px] font-black uppercase tracking-widest text-primary/60 group-hover:text-primary transition-colors">
                      Safety Certification Verified
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-black text-primary tracking-tighter">
                        ${(total * 1.2).toFixed(2)}
                      </span>
                      <span className="text-text-muted/40 font-bold uppercase text-[10px] tracking-widest">
                        USD
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-12 space-y-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full py-5 bg-primary hover:bg-primary-hover text-white font-black rounded-2xl shadow-xl shadow-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 relative z-10"
                  >
                    {loading ? (
                      <div className="size-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <LuBadgeCheck className="font-light" />
                        <span>Confirm Reservation</span>
                      </>
                    )}
                  </motion.button>
                  <p className="text-[10px] font-black uppercase tracking-widest text-text-muted/40 text-center leading-relaxed">
                    By clicking confirm, you agree to our <br /> terms of
                    service and care protocol.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-start mt-10">
            <motion.button
              whileHover={{ scale: 1.02, x: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBack}
              className="flex items-center gap-3 px-8 py-4 text-text-muted font-black hover:text-text-main transition-colors group"
            >
              <LuArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              <span>Modify Details</span>
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
