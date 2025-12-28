"use client";
import Link from "next/link";
import { MdMedicalServices } from "react-icons/md";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-6 max-w-300">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="size-8 text-primary flex items-center justify-center">
                <MdMedicalServices size={32} />
              </div>
              <h2 className="text-text-main text-xl font-bold tracking-tight">
                Care.xyz
              </h2>
            </Link>
            <p className="text-text-muted text-sm font-medium leading-relaxed max-w-70">
              Connecting families with vetted, compassionate caregivers since
              2014. Trusted by 12,000+ families.
            </p>
            <div className="flex items-center gap-4 text-text-muted">
              <Link href="#" className="hover:text-primary transition-colors">
                <FaFacebook size={20} />
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                <FaTwitter size={20} />
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                <FaInstagram size={20} />
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                <FaLinkedin size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-text-main text-base font-bold mb-6">
              Services
            </h4>
            <ul className="flex flex-col gap-4">
              <li>
                <Link
                  href="/#services"
                  className="text-text-muted hover:text-primary text-sm font-medium transition-colors"
                >
                  Child Care
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="text-text-muted hover:text-primary text-sm font-medium transition-colors"
                >
                  Elderly Care
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="text-text-muted hover:text-primary text-sm font-medium transition-colors"
                >
                  Special Needs
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="text-text-muted hover:text-primary text-sm font-medium transition-colors"
                >
                  Emergency Care
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-text-main text-base font-bold mb-6">Company</h4>
            <ul className="flex flex-col gap-4">
              <li>
                <Link
                  href="/#about"
                  className="text-text-muted hover:text-primary text-sm font-medium transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-text-muted hover:text-primary text-sm font-medium transition-colors"
                >
                  Our Mission
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-text-muted hover:text-primary text-sm font-medium transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-text-muted hover:text-primary text-sm font-medium transition-colors"
                >
                  Press
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-text-main text-base font-bold mb-6">Support</h4>
            <ul className="flex flex-col gap-4">
              <li>
                <Link
                  href="#"
                  className="text-text-muted hover:text-primary text-sm font-medium transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-text-muted hover:text-primary text-sm font-medium transition-colors"
                >
                  Safety Guides
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-text-muted hover:text-primary text-sm font-medium transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-text-muted hover:text-primary text-sm font-medium transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <p className="text-text-muted text-xs font-semibold uppercase tracking-widest">
            &copy; 2024 Care.xyz Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <p className="text-text-muted text-xs font-semibold uppercase tracking-widest">
              Proudly based in San Francisco
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
