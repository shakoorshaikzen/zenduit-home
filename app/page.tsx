import { AnnouncementBar } from "@/components/sections/announcement-bar";
import { CameraShowpiece } from "@/components/sections/camera-showpiece";
import { FinalCta } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { Industries } from "@/components/sections/industries";
import { Integrations } from "@/components/sections/integrations";
import { ModuleRow } from "@/components/sections/module-row";
import { Pillars } from "@/components/sections/pillars";
import { PlatformOverview } from "@/components/sections/platform-overview";
import { ProductDives } from "@/components/sections/product-dives";
import { Resources } from "@/components/sections/resources";
import { ResultsBand } from "@/components/sections/results-band";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteNav } from "@/components/sections/site-nav";
import { Testimonials } from "@/components/sections/testimonials";

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <SiteNav />
      <main id="main">
        <Hero />
        <Pillars />
        <PlatformOverview />
        <ProductDives />
        <CameraShowpiece />
        <ModuleRow />
        <ResultsBand />
        <Industries />
        <Testimonials />
        <Integrations />
        <Resources />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
