import Footer from "@/components/common/Footer";
import Hero from "@/components/home/Hero";
import WhatDo from "@/components/home/WhatDo";

export default function Homepage() {
  return (
    <div className="dukaan bg-paper text-ink">
      <Hero />
      <WhatDo />
      <Footer />
    </div>
  );
}
