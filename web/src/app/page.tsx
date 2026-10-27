/*
 * Home page (/) — one scrolling page with all six required sections.
 *
 * PRD §6: "Order top to bottom: TopBar, Hero, About, Skills, Projects, Contact, Footer."
 *
 * This is a Server Component (no "use client" directive). Server Components
 * render on the server and send fully-formed HTML to the browser, so the
 * content is visible without JavaScript — PRD §5.5 requires this.
 *
 * The "use client" sections (TopBar, HeroSection, ContactSection) are
 * imported as Client Components inside this Server Component. Next.js
 * handles the boundary automatically.
 *
 * Phase 1: all data comes from the static seed file.
 * Phase 2: replace the seed imports with async API calls.
 */

import { TopBar }          from "@/components/ui/TopBar";
import { SocialRail }      from "@/components/ui/SocialRail";
import { SectionRail }     from "@/components/ui/SectionRail";
import { HeroSection }     from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection }   from "@/components/sections/SkillsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { AboutSection }    from "@/components/sections/AboutSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { ContactSection }  from "@/components/sections/ContactSection";
import { Footer }          from "@/components/ui/Footer";
import { MobileActionBar } from "@/components/ui/MobileActionBar";
import {
  getProfile,
  getSkills,
  getProjects,
} from "@/lib/api";

export default async function HomePage() {
  const [profile, skills, { featured, mlProjects, all }] = await Promise.all([
    getProfile(),
    getSkills(),
    getProjects(),
  ]);

  return (
    <>
      {/* Sticky top navigation bar */}
      <TopBar profile={profile} />

      {/* Fixed vertical social icon rail (desktop only — left side) */}
      <SocialRail profile={profile} />

      {/* Fixed vertical section link rail (desktop only — right side) */}
      <SectionRail />

      <main>
        <HeroSection profile={profile} />
        <ProjectsSection
          featuredProjects={featured}
          mlProjects={mlProjects}
          totalPublished={all.filter((p) => p.status === "published").length}
        />
        <SkillsSection skills={skills} />
        <ExperienceSection />
        <AboutSection profile={profile} />
        <EducationSection />
        <ContactSection profile={profile} />
      </main>

      <Footer profile={profile} />

      {/* Sticky bottom action bar on mobile only */}
      <MobileActionBar profile={profile} />
    </>
  );
}
