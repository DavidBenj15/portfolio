import type { Metadata } from "next";
import Hero from '@/components/hero';
import About from '@/components/about';
import Skills from '@/components/skills';
import PageWrapper from '@/components/ui/page-wrapper';
import Layout from '@/app/layout';

export const metadata: Metadata = {
  title: "Home | David Benjamin",
  description: "David Benjamin - Computer Science student at Johns Hopkins University, passionate about Full Stack Development, DevOps, and AI. View my portfolio, skills, and experience.",
  keywords: ["David Benjamin", "Computer Science", "Full Stack Developer", "DevOps", "AI", "Johns Hopkins University", "Software Engineer", "Portfolio"],
  authors: [{ name: "David Benjamin" }],
  creator: "David Benjamin",
  openGraph: {
    title: "David Benjamin - Portfolio",
    description: "Computer Science student passionate about building impactful solutions",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "David Benjamin - Portfolio",
    description: "Computer Science student and Full Stack Developer",
  },
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
};

export default function Home() {

  return (
      <PageWrapper>
        <Hero />
        {/* <About /> */}
        <Skills />
      </PageWrapper>
  );
}
