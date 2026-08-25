import type { Metadata } from "next";
import PageWrapper from "@/components/ui/page-wrapper";
import Hero from "@/components/hero";
import ExperienceContent from "@/components/experience";
import ProjectsContent from "@/components/projects";
import EducationContent from "@/components/education";
import Skills from "@/components/skills";
import Section from "@/components/ui/section";
import Container from "@/components/ui/container";

export const metadata: Metadata = {
  title: "David Benjamin",
  description: "David Benjamin — Computer Science at Johns Hopkins. Software Engineer with experience at SpaceX, Meta, and NASA.",
  keywords: ["David Benjamin", "Computer Science", "Full Stack Developer", "SRE", "AI/ML", "Johns Hopkins University", "Software Engineer", "Portfolio", "SpaceX", "Meta", "NASA"],
  authors: [{ name: "David Benjamin" }],
  creator: "David Benjamin",
  openGraph: {
    title: "David Benjamin",
    description: "Computer Science at Johns Hopkins. Software Engineer with experience at SpaceX, Meta, and NASA.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "David Benjamin",
    description: "Computer Science at Johns Hopkins. Software Engineer.",
  },
  robots: "index, follow",
};

export default function Home() {
  return (
    <PageWrapper>
      <Hero />

      <Section id="experience" padding="none" container={false} className="py-16 sm:py-20 lg:py-24">
        <Container className="max-w-5xl">
          <ExperienceContent />
        </Container>
      </Section>

      {/*
      <Section id="projects" padding="none" container={false} className="py-16 sm:py-20 lg:py-24">
        <Container className="max-w-5xl">
          <ProjectsContent />
        </Container>
      </Section>
      */}

      <Section id="education" padding="none" container={false} className="py-16 sm:py-20 lg:py-24">
        <Container className="max-w-5xl">
          <EducationContent />
        </Container>
      </Section>

      <Section id="skills" padding="none" container={false} className="py-16 sm:py-20 lg:py-24">
        <Container className="max-w-5xl">
          <Skills />
        </Container>
      </Section>
    </PageWrapper>
  );
}
