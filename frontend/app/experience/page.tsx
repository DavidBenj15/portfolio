import type { Metadata } from "next";
import Section from "@/components/ui/section";
import Container from "@/components/ui/container";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Chip } from "@heroui/chip";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Tooltip } from "@heroui/tooltip";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "@heroui/modal";
import { useState } from "react";
import PageWrapper from "@/components/ui/page-wrapper";
import ExperienceContent from "./experience-content";

export const metadata: Metadata = {
  title: "Experience | David Benjamin",
  description: "David Benjamin's professional experience including roles at Meta x Major League Hacking, NASA, HopHacks, and Johns Hopkins Sports Analytics Research Group. Software engineering and production engineering experience.",
  keywords: ["David Benjamin", "Experience", "Software Engineer", "Production Engineering", "Meta", "NASA", "Major League Hacking", "Johns Hopkins", "Internship", "Fellowship"],
  authors: [{ name: "David Benjamin" }],
  creator: "David Benjamin",
  openGraph: {
    title: "Experience | David Benjamin",
    description: "Professional experience in software engineering, production engineering, and research",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Experience | David Benjamin",
    description: "Professional experience in software engineering and production engineering",
  },
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
};

export default function Experience() {
    return (
        <PageWrapper>
            <Section id="experience" className="py-16 sm:py-20 lg:py-24 h-full">
                <Container className="max-w-5xl">
                    <ExperienceContent />
                </Container>
            </Section>
        </PageWrapper>
    );
}