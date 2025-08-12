import type { Metadata } from "next";
import Section from "@/components/ui/section";
import Container from "@/components/ui/container";
import PageWrapper from "@/components/ui/page-wrapper";
import ProjectsContent from "./projects-content";

export const metadata: Metadata = {
  title: "Projects | David Benjamin",
  description: "David Benjamin's portfolio of software projects, including full-stack applications, AI/ML solutions, and innovative software engineering work. View demos, code, and project details.",
  keywords: ["David Benjamin", "Projects", "Portfolio", "Software Engineering", "Full Stack", "AI/ML", "Web Applications", "GitHub", "Demo"],
  authors: [{ name: "David Benjamin" }],
  creator: "David Benjamin",
  openGraph: {
    title: "Projects | David Benjamin",
    description: "Software engineering projects and portfolio showcase",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | David Benjamin",
    description: "Software engineering projects and portfolio showcase",
  },
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
};

export default function Projects() {
    return (
        <PageWrapper>
            <Section id="projects" className="bg-background/50 py-16 sm:py-20 lg:py-24 h-full">
                <Container className="max-w-7xl">
                    <ProjectsContent />
                </Container>
            </Section>
        </PageWrapper>
    );
}
