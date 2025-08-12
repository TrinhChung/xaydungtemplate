import Hero from "@/components/homepage/Hero";
import ServiceList from "@/components/homepage/ServiceList";
import AboutBlock from "@/components/homepage/AboutBlock";
import StatsStrip from "@/components/homepage/StatsStrip";
import ProjectCarousel from "@/components/homepage/ProjectCarousel";
import Partners from "@/components/homepage/Partners";
import CTAQuote from "@/components/homepage/CTAQuote";

export default function Home() {
  return (
    <>
      <Hero />
      <ServiceList />
      <AboutBlock />
      <StatsStrip />
      <ProjectCarousel />
      <Partners />
      <CTAQuote />
    </>
  );
}
