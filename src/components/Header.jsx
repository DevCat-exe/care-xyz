"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { motion } from "motion/react";
import { MdMedicalServices } from "react-icons/md";
import { LuUser, LuLogOut, LuMenu, LuLayoutGrid } from "react-icons/lu";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-border bg-white px-10 py-3 shadow-sm">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="size-8 text-primary flex items-center justify-center transition-transform group-hover:scale-110">
            <MdMedicalServices size={32} />
          </div>
          <h2 className="text-text-main text-lg font-bold leading-tight tracking-[-0.015em]">
            Care.xyz
          </h2>
        </Link>
      </div>

      <div className="flex flex-1 justify-end gap-8 items-center">
        <nav className="hidden md:flex items-center gap-9">
          <Link
            href="/#services"
            className="text-text-main text-sm font-medium leading-normal hover:text-primary transition-colors"
          >
            Services
          </Link>
          <Link
            href="/#about"
            className="text-text-main text-sm font-medium leading-normal hover:text-primary transition-colors"
          >
            About Us
          </Link>
          <Link
            href="/#testimonials"
            className="text-text-main text-sm font-medium leading-normal hover:text-primary transition-colors"
          >
            Testimonials
          </Link>
          <Link
            href="/#safety"
            className="text-text-main text-sm font-medium leading-normal hover:text-primary transition-colors"
          >
            Safety
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {session ? (
            <div className="flex items-center gap-3">
              <Link
                href="/my-bookings"
                className="p-2 text-text-muted hover:text-primary transition-colors hover:bg-surface-hover rounded-xl"
                title="My Bookings"
              >
                <LuLayoutGrid size={22} />
              </Link>
              <div className="h-6 w-px bg-border mx-1"></div>
              <div className="flex items-center gap-3 bg-surface-hover px-3 py-1.5 rounded-2xl border border-border group cursor-pointer relative">
                <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                  <LuUser size={18} />
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-[10px] font-black uppercase tracking-widest text-text-muted leading-none mb-0.5">
                    Profile
                  </p>
                  <p className="text-xs font-bold text-text-main truncate max-w-20">
                    {session.user.name?.split(" ")[0]}
                  </p>
                </div>
                {/* Simple dropdown simulation on hover via peer or just keep clean */}
                <button
                  onClick={() => signOut()}
                  className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg ml-2"
                  title="Sign Out"
                >
                  <LuLogOut size={18} />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="hidden sm:block text-sm font-bold text-text-muted hover:text-primary transition-colors px-4 py-2"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="flex min-w-45 cursor-pointer items-center justify-center rounded-xl h-10 px-4 bg-primary hover:bg-primary/90 transition-colors text-white text-sm font-black tracking-[0.015em] shadow-lg shadow-primary/25"
              >
                Find a Caregiver
              </Link>
            </div>
          )}

          <button className="md:hidden p-2 text-text-main">
            <LuMenu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}
