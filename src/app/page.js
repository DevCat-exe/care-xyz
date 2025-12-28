import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import ServiceGrid from "@/components/ServiceGrid";
import Mission from "@/components/Mission";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";

export const metadata = {
  title: "Care.xyz - Trusted Care for Your Family",
  description: "Find reliable and trusted care services for children, elderly, and family members. Premium caregiving made easy, secure, and accessible.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <Stats />
      <ServiceGrid />
      <Mission />
      <Testimonials />
      <CTA />
    </main>
  );
}