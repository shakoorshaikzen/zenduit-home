import { AnnouncementBar } from "@/components/sections/announcement-bar";
import { FinalCta } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { Industries } from "@/components/sections/industries";
import { PlatformExplorer } from "@/components/sections/platform-explorer";
import { CoreMessage } from "@/components/sections/core-message";
import { PlatformStory } from "@/components/sections/platform-story";
import { Resources } from "@/components/sections/resources";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteNav } from "@/components/sections/site-nav";
import { Validation } from "@/components/sections/validation";

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <SiteNav />
      <main id="main">
        <Hero />
        <CoreMessage />
        <PlatformExplorer />
        <PlatformStory />
        <Validation />
        <Industries />
        <Resources />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
