import type { Metadata } from "next";
import Section from "@/components/ui/section";
import Container from "@/components/ui/container";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Chip } from "@heroui/chip";
import { Input, Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { useState, useEffect } from "react";
import { useTimeline } from "../hooks/useTimeline";
import PageWrapper from "@/components/ui/page-wrapper";
import TimelineContent from "./timeline-content";

export const metadata: Metadata = {
  title: "Timeline | David Benjamin",
  description: "David Benjamin's interactive timeline where visitors can create posts and share messages. Connect and engage with my portfolio community.",
  keywords: ["David Benjamin", "Timeline", "Portfolio", "Community", "Posts", "Messages", "Interactive", "Engagement"],
  authors: [{ name: "David Benjamin" }],
  creator: "David Benjamin",
  openGraph: {
    title: "Timeline | David Benjamin",
    description: "Interactive timeline for community engagement and posts",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Timeline | David Benjamin",
    description: "Interactive timeline for community engagement",
  },
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
};

export default function Timeline() {
    return (
        <PageWrapper>
            <Section id="timeline" className="bg-background/50 py-16 sm:py-20 lg:py-24 h-full">
                <Container className="max-w-4xl">
                    <TimelineContent />
                </Container>
            </Section>
        </PageWrapper>
    );
}