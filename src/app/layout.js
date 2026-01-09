import "./globals.css";
import { Inter, Lexend } from "next/font/google";
import AuthProvider from "@/components/AuthProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });
const lexend = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-lexend"
});

export const metadata = {
  title: "Care.xyz - Trusted Care for Your Loved Ones",
  description: "Connect with verified, compassionate caregivers",
  openGraph: {
    title: "Care.xyz",
    description: "Connect with verified, compassionate caregivers",
    url: "https://devcat-b12a12.netlify.app/",
    siteName: "Care.xyz",
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${lexend.variable}`}>
      <body className={`${inter.className} font-display bg-[#f6f7f8] text-text-main`}>
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}