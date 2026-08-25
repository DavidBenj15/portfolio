'use client'

import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Accordion, AccordionItem } from "@heroui/accordion";


const experiences = [
    {
        name: 'SpaceX',
        title: 'Software Engineer Intern (Incoming)',
        location: 'Hawthorne, CA',
        date: 'September 2026 \u2013 December 2026',
        bullets: []
    },
    {
        name: 'Meta',
        title: 'Production Engineer Intern',
        location: 'Burlingame, CA',
        date: 'June 2026 \u2013 August 2026',
        bullets: [
            'Automated performance tuning for all production wearables LLMs by building a Rust CLI that orchestrates safe deployment cloning, controlled load testing, and automated analysis \u2014 surfacing configurations that improved throughput by up to 124%.',
            'Accelerated serving config discovery from days to minutes by designing an adaptive agent orchestration system that proposes tuning strategies grounded in live deployment context via read-only tool use, executes experiments, and iterates based on measured results \u2014 converging on optimal serving configs from 170+ parameters.',
            'Eliminated progress loss across multi-hour tuning experiments and enabled cross-team result sharing by engineering an event-log experiment registry with checkpoint-based resume and queryable trial history.'
        ]
    },
    {
        name: 'NASA \u2013 National Aeronautics and Space Administration',
        title: 'Software Engineer Intern',
        location: 'Greenbelt, MD',
        date: 'May 2025 \u2013 May 2026',
        bullets: [
            'Accelerated review cycles for 500+ telescope proposals from 7 days to under 1 hour by building an AI-powered reviewer assignment system with constraint programming (Google OR-Tools, Django), enforcing 20+ optimization constraints.',
            'Enabled processing of 2+ hour optimization workflows by implementing Celery + Redis async architecture with Flower monitoring dashboard for mission-critical telescope proposal reviews.',
            'Built conflict-detection algorithms (RapidFuzz, Astropy) solving name disambiguation and coordinate matching challenges, ensuring bias-free reviewer assignments across $8 million in annual telescope funding decisions.',
            'Sustained uptime for NuSTAR and XRISM scientists during time-critical review cycles by orchestrating Kubernetes deployments \u2014 authoring manifests (Deployments, Ingress, CronJobs, PVCs) with Kustomize overlays and a GitHub Actions CI/CD pipeline enabling zero-downtime rolling updates.'
        ]
    },
    {
        name: 'Johns Hopkins Sports Analytics Research Group',
        title: 'Lead Software Engineer',
        location: 'Baltimore, MD',
        date: 'May 2024 \u2013 May 2025',
        bullets: [
            'Led a 9-person team to deliver the Atlantic League of Professional Baseball\'s first league-wide analytics platform, providing MLB-caliber data access and tool sharing that modernized team operations.',
            'Engineered and deployed ETL pipeline (Pandas, AWS Lambda, Docker) and RESTful API (PostgreSQL, API Gateway) democratizing 60K+ Trackman datapoints per game for 20+ developers building analytics tools.',
            'Launched a full-stack web app (Next.js, TypeScript, Express.js, Tailwind CSS) centralizing analytics tools; adopted by 100+ coaches, analysts, and staff for data-driven decision-making.'
        ]
    }
];

export default function ExperienceContent() {
    return (
        <div className="space-y-16">
            {/* Header Section */}
            <div className="space-y-6">
                <h1 className="text-4xl sm:text-5xl lg:text-8xl font-bold text-foreground glow-white-soft">
                    Experience
                </h1>
            </div>

            {/* Timeline Section */}
            <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-1/2 md:left-80 top-0 bottom-0 w-0.5 bg-secondary/30 transform -translate-x-0.5"></div>

                <div className="space-y-12">
                    {experiences.map((experience, index) => (
                        <div key={index} className="relative flex flex-col md:flex-row items-start md:items-center">
                            {/* Date - Left side on desktop, top on mobile */}
                            <div className="w-full md:w-80 mb-4 md:mb-0 md:pr-8 flex justify-center md:justify-end">
                                <div className="text-right">
                                    <p className="text-lg font-bold text-primary">
                                        {experience.date}
                                    </p>
                                </div>
                            </div>

                            {/* Timeline dot */}
                            <div className="absolute left-1/2 md:left-80 top-6 md:top-8 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg z-10 transform -translate-x-1/2"></div>

                            {/* Content - Right side */}
                            <div className="w-full md:flex-1 md:pl-8">
                                <Card
                                    className={`w-full cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-l-primary`}
                                >
                                    <CardHeader className="pb-3">
                                        <div className="flex flex-col space-y-2 w-full">
                                            <div className="flex justify-between items-start flex-wrap gap-2">
                                                <h2 className="text-xl sm:text-2xl font-bold text-foreground text-left">
                                                    {experience.name}
                                                </h2>
                                            </div>
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                                                <h3 className="text-lg font-semibold text-primary">
                                                    {experience.title}
                                                </h3>
                                                <p className="text-sm text-muted-foreground font-medium">
                                                    {experience.location}
                                                </p>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    {/* <Divider className="my-4" /> */}
                                    <CardFooter className="pt-0 pb-4">
                                        <Accordion isCompact>
                                            <AccordionItem key={index} className="text-muted-foreground leading-relaxed">
                                                <div className="space-y-3">
                                                    {experience.bullets.map((bullet, bulletIndex) => (
                                                        <div key={bulletIndex} className="flex items-start space-x-3">
                                                            <div className="w-2 h-2 rounded-full bg-primary/60 mt-2 flex-shrink-0"></div>
                                                            <p className="text-base text-muted-foreground leading-relaxed">
                                                                {bullet}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </AccordionItem>
                                        </Accordion>
                                    </CardFooter>
                                </Card>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
