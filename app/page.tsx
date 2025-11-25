"use client";

import { useEffect, useState } from "react";

import Navbar from '@/app/components/Navbar';
import Hero from '@/app/components/Hero';
import TopCategories from '@/app/components/TopCategories';
import About from '@/app/components/About';
import OnlineCourses from '@/app/components/OnlineCourses';
import Testimonials from '@/app/components/Testimonials';
import Footer from '@/app/components/Footer';
import ContactFormModal from "@/app/components/expertguidence"; // IMPORTANT
import SapOverview from "@/app/components/sap-overview";
import WhyChooseUs from '@/app/components/study'; 
import ScrollingMarquee from "@/app/components/scrolling";
import OurSponsors from './components/our-sponsers';
import ContactForm from "@/app/components/contact";
export default function Home() {

  const [openPopup, setOpenPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpenPopup(true);
    }, 3000); // ⏱️ 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <main>
      {/* Auto Popup Trigger */}
      <ContactFormModal isOpen={openPopup} onClose={() => setOpenPopup(false)}  />
      <Navbar />
      <Hero />
      <ScrollingMarquee />
      <SapOverview />
      <TopCategories />
      <About />
      <OnlineCourses />
      <WhyChooseUs />
      <Testimonials />
      <OurSponsors />
    <ContactForm />
      <Footer />
    </main>
  );
}
