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
import { useDisclosure } from "@heroui/use-disclosure";
import { Button } from "@heroui/button";
import { useState } from "react";
import PageWrapper from "@/components/ui/page-wrapper";
import EducationContent from "./education-content";

export const metadata: Metadata = {
  title: "Education | David Benjamin",
  description: "David Benjamin's educational background, including Computer Science studies at Johns Hopkins University, programming languages, technologies, frameworks, and core concepts.",
  keywords: ["David Benjamin", "Education", "Computer Science", "Johns Hopkins University", "Programming Languages", "Technologies", "Frameworks", "Computer Science Concepts"],
  authors: [{ name: "David Benjamin" }],
  creator: "David Benjamin",
  openGraph: {
    title: "Education | David Benjamin",
    description: "Computer Science education and technical skills at Johns Hopkins University",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Education | David Benjamin",
    description: "Computer Science education and technical skills",
  },
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
};

export default function Education() {
    return (
        <PageWrapper>
            <Section id="about" className="bg-background/50 sm:py-20 lg:py-24 h-full" >
                <Container className="max-w-5xl">
                    <EducationContent />
                </Container>
            </Section >
        </PageWrapper>
    );
}