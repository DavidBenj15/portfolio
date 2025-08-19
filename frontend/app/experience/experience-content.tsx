'use client'

import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Accordion, AccordionItem } from "@heroui/accordion";


const experiences = [
    {
        name: 'Meta x Major League Hacking',
        title: 'Production Engineering Fellow',
        location: 'Remote',
        date: 'June 2025 - Present',
        bullets: [
            'Selected for a competitive 12-week fellowship (acceptance rate <2.5%) under direct mentorship of Meta Production Engineers, applying real - world Software Engineering and Site Reliability Engineering(SRE) practices.',
            'Built and deployed a production-grade portfolio website using Linux (DigitalOcean VPS), Nginx (reverse proxy, rate limiting), Docker, and MySQL; implemented CI/ CD pipelines with GitHub Actions and enforced reliability through TDD with unit, integration, and system tests.',
            'Integrated Prometheus and Grafana for observability, enabling real-time monitoring, metrics, and alerts to accelerate incident detection and resolution.'
        ]
    },
    {
        name: 'National Aeronautics and Space Administration (NASA)',
        title: 'Software Engineer Intern',
        location: 'Greenbelt, MD',
        date: 'May 2025 - Present',
        bullets: [
            'Built a constraint-based reviewer assignment tool with Google OR-Tools (CP-SAT) and Django, cutting space telescope proposal scheduling from 7 days to under 1 hour while meeting 15+ constraints on bias, workload, and compliance.',
            'Eliminated timeout failures by implementing asynchronous processing with Celery and Redis, enabling uninterrupted long - running constraint solver jobs and improving user reliability.',
            'Developed a name disambiguation module leveraging RapidFuzz and nickname heuristics, significantly improving conflict detection accuracy to reduce bias during proposal - reviewer assignment.'
        ]
    },
    {
        name: 'HopHacks',
        title: 'Full Stack Software Engineer, Organizer',
        location: 'Baltimore, MD',
        date: 'December 2024 - Present',
        bullets: [
            'Automated deployment for HopHacks website by designing a GitHub Actions CI/CD pipeline, reducing manual EC2 deployment steps by 100 % and eliminating downtime via safe, zero - downtime rsync + build promotion strategy.',
            'Built core full stack features to support 500+ hackers and judges using React, Flask, MongoDB, and Amazon S3.'
        ]
    },
    {
        name: 'Johns Hopkins Sports Analytics Research Group',
        title: 'Lead Software Engineer',
        location: 'Baltimore, MD',
        date: 'May 2024 - May 2025',
        bullets: [
            "Led a team of 9 to build the Atlantic League's first league-wide analytics platform, introducing MLB-style data access and tool sharing to modernize team operations.",
            "Democratized access to 60,000+ Trackman data points/game by deploying an ETL pipeline (Pandas, AWS Lambda, Docker) and REST API (PostgreSQL, API Gateway); currently used by 10+ developers to build 5+ statistical apps.",
            "Built and deployed a full-stack web app with Next.js, TypeScript, Express.js, and Tailwind CSS to unify the discovery and use of analytics baseball tools; currently serving 100+ users."
        ]
    }
]

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
