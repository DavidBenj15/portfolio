'use client'

import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Accordion, AccordionItem } from "@heroui/accordion";


const experiences = [
    {
        name: 'NASA – National Aeronautics and Space Administration',
        title: 'Software Engineer Intern',
        location: 'Greenbelt, MD',
        date: 'May 2025 – Present',
        bullets: [
            'Reduced scheduling time for hundreds of telescope proposals from 7 days to under 1 hour by engineering a constraint-based reviewer assignment system (Google OR-Tools, Django) that enforced 20+ compliance, fairness, and workload constraints.',
            'Eliminated 100% of observed timeout failures in telescope review scheduling by implementing Celery + Redis for async orchestration, enabling continuous processing of multi-hour optimization jobs critical to proposal review.',
            'Improved fairness and accuracy in reviewer assignments through conflict-detection modules, including fuzzy name disambiguation (RapidFuzz) and coordinate resolution (Astropy), reducing bias and strengthening scientific integrity.'
        ]
    },
    {
        name: 'Meta – Major League Hacking Fellowship',
        title: 'Site Reliability Engineering Fellow',
        location: 'Remote',
        date: 'June 2025 – September 2025',
        bullets: [
            'One of less than 2.5% accepted into Meta and MLH’s 12-week Site Reliability Engineering fellowship, collaborating with Meta Production Engineers to design reliable, scalable, production-ready systems.',
            'Deployed production-grade portfolio website on Linux (DigitalOcean VPS) using Nginx reverse proxy, Docker containerization, and MySQL database; gained proficiency with Linux system administration and core networking concepts (HTTP, DNS, TCP/IP).',
            'Built CI/CD pipelines with GitHub Actions and implemented Prometheus/Grafana monitoring for real-time metrics, alerting, and incident response, enhancing performance troubleshooting, observability, and incident management skills.'
        ]
    },
    {
        name: 'Johns Hopkins Sports Analytics Research Group',
        title: 'Lead Software Engineer',
        location: 'Baltimore, MD',
        date: 'May 2024 – May 2025',
        bullets: [
            'Directed a 9-person team to deliver the Atlantic League of Professional Baseball’s first league-wide analytics platform, providing MLB-caliber data access and tool sharing that modernized team operations.',
            'Engineered and deployed an ETL pipeline (Pandas, AWS Lambda, Docker) and REST API (PostgreSQL, API Gateway) that democratizes 60K+ Trackman datapoints per game; now powering 10+ developers building 5+ statistical apps.',
            'Launched a full-stack web app (Next.js, TypeScript, Express.js, Tailwind CSS) centralizing analytics tools; adopted by 100+ coaches, analysts, and staff for data-driven decision-making.'
        ]
    },
    {
        name: 'HopHacks',
        title: 'Full Stack Software Engineer, Organizer',
        location: 'Baltimore, MD',
        date: 'December 2024 – Present',
        bullets: [
            'Engineered a GitHub Actions–based CI/CD pipeline that fully automated website deployment, eliminating 100% of manual EC2 deployment steps and achieving zero-downtime releases through rsync + build promotion.',
            'Developed core full-stack features (React, Flask, MongoDB, S3) supporting 500+ hackers and judges, collaborating across 5 functional teams with Agile workflows to enhance registration, judging, and overall event experience.'
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
