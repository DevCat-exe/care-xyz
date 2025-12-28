# Care.io - Premium Caregiving Network 🏥

Care.io is a modern, high-end marketplace connecting families with professional, background-verified caregivers. Designed with a vibrant, light-mode first approach, it offers a seamless booking experience for Childcare, Eldercare, and Specialized medical assistance.

## 🚀 Live Demo

[Care.xyz](http://devcat-b12a12.netlify.app/)

## ✨ Key Features

### 💎 Premium User Experience

- **Vibrant Aesthetic**: A meticulously crafted light-mode UI using high-contrast typography and harmonized color palettes.
- **Dynamic Bookings**: Intelligently switches between Hourly and Daily rates with real-time cost calculation.
- **Modern Feedback**: Every interaction is powered by **SweetAlert2** for elegant, non-intrusive feedback.
- **Micro-Animations**: Fluid transitions and hover states powered by **Framer Motion**.

### 🔒 Secure Authentication

- **Multi-Auth**: Support for traditional credentials and **Google OAuth**.
- **User Verification**: Mandatory NID Number and Contact Phone collection.
- **Strict Security**: High-complexity password enforcement (6+ chars, Uppercase, Lowercase) on both frontend and backend.
- **Google Sync**: Automated database synchronization for social logins.

### 📅 Advanced Booking System

- **Location Intelligence**: Multi-step meeting point selectors (Division → District → City → Area).
- **Invoicing**: Automatic HTML email invoicing sent directly to users upon successful booking.
- **Booking Insights**: Interactive dashboard to view status, investment breakdown, and caretaker details.
- **Cancellation Flow**: Secure, one-click cancellation for pending bookings.

### 🌐 Performance & SEO

- **Dynamic Metadata**: Specialized SEO titles and descriptions for every service page.
- **Route Protection**: Server-side middleware guarding private dashboards and checkout flows.
- **Next.js 15+ Optimized**: Fully compatible with the latest asynchronous APIs and Turbopack.

## 🛠️ Tech Stack

- **Framework**: Next.js 15/16 (App Router)
- **Styling**: Tailwind CSS 4.0
- **Database**: MongoDB (Native Driver)
- **Auth**: NextAuth.js
- **Animations**: Framer Motion
- **UI Components**: Lucide Icons, SweetAlert2
- **Communication**: Nodemailer (GMAIL SMTP)
