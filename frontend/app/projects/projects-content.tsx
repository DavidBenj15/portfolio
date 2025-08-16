'use client'

import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { useDisclosure } from "@heroui/use-disclosure";
import { useState } from "react";
import { ExternalLink, Github, Play, Code, ExternalLinkIcon, Calendar, Users, Award, ArrowLeft, ArrowRight } from "lucide-react";
import NextImage from "next/image";


// Enhanced Project data structure
interface Project {
    id: string;
    title: string;
    shortDescription: string;
    longDescription: string;
    coverImage: string;
    screenshots: { url: string; caption: string }[];
    video?: string;
    technologies: string[];
    category: 'Full Stack' | 'AI/ML' | 'DevOps';
    githubUrl?: string;
    liveUrl?: string;
    demoUrl?: string;
    featured: boolean;
    duration?: string;
    teamSize?: string;
    achievements?: string[];
    challenges?: string[];
    solutions?: string[];
}

const projects: Project[] = [
    {
        id: 'coldmap',
        title: 'ColdMap',
        shortDescription: 'Palantir AIP dashboard for predicting and visualizing cold storage risk factors.',
        longDescription: `Cell therapy manufacturers face $35 billion in annual losses from temperature deviations in the cryogenic supply chain (cold chain), where even slight delays or heat exposure can render life-saving treatments unusable.

I built ColdMap using Palantir AIP and GPT-4o to help logistics teams predict, explain, and mitigate cold chain shipment risks. Shipment data flows through an AIP-hosted pipeline and logistic regression model to calculate excursion probabilities, visualized on an interactive map. Users can filter by risk level, timeframe, location, and a variety of other parameters; query ColdChat (GPT-4o chatbot with shipment context) for natural-language explanations of top risk factors; and trigger AI workflows to draft emails and notify stakeholders.

Developed in ~2 weeks for Palantir’s “Semester at Palantir” program, ColdMap showcases my ability to identify a high-impact problem, quickly learn an unfamiliar tech stack, and deliver a data-driven MVP. Even as a prototype, it demonstrates how AI-powered workflows could transform cold chain logistics—reducing billion-dollar losses while safeguarding patient access to critical therapies.`,
        coverImage: 'https://davidbenjamin-portfolio.s3.us-east-1.amazonaws.com/coldmap/cover.png',
        screenshots: [
            { url: 'https://davidbenjamin-portfolio.s3.us-east-1.amazonaws.com/coldmap/cover.png', caption: 'ColdMap dashboard' },
            { url: 'https://davidbenjamin-portfolio.s3.us-east-1.amazonaws.com/coldmap/filter.png', caption: 'Filter for riskiest shipments departing from Johns Hopkins in the next week' },
            { url: 'https://davidbenjamin-portfolio.s3.us-east-1.amazonaws.com/coldmap/coldchat.png', caption: 'ColdChat: identify top risk factors and draft emails to stakeholders' },
            { url: 'https://davidbenjamin-portfolio.s3.us-east-1.amazonaws.com/coldmap/pipeline.png', caption: 'A visualization of the AIP data transformation pipeline' }
        ],
        technologies: ['scikit-learn', 'polars', 'GPT-4o', 'Palantir AIP', 'Python'],
        category: 'AI/ML',
        githubUrl: 'https://github.com/DavidBenj15/coldmap',
        featured: true,
        duration: '2 weeks',
        teamSize: 'Solo',
        // achievements: [
        //     'Reduced risk assessment time by 85%',
        //     'Improved prediction accuracy by 23%',
        //     'Successfully deployed to production environment',
        //     'Integrated with existing Palantir infrastructure'
        // ],
        // challenges: [
        //     'Complex data integration with legacy systems',
        //     'Real-time model performance optimization',
        //     'Ensuring model interpretability for stakeholders'
        // ],
        // solutions: [
        //     'Built robust ETL pipelines using Polars for efficient data processing',
        //     'Implemented model monitoring and A/B testing frameworks',
        //     'Created comprehensive documentation and training materials'
        // ],
        demoUrl: 'https://youtu.be/k0s5DXZZuMM'
    },
    {
        id: 'gec',
        title: 'Alibaba Global E-Commerce Challenge (2nd place / 500+ global teams)',
        shortDescription: "Built and pitched an augmented Reality (AR) 'view in your room' app to boost Alibaba's sales in developing countries.",
        longDescription: `
            • The problem: The Phillipines' e-commerce market is rapidly expanding, with a projected gross merchandise value of $24 billion by 2025. Amazon's AR implementation increased sales by ~9%, but competitors in the Philipiines' e-commerce market are yeto to tap into this advantage.
            • The solution: Our team built LEAP (Lazada Enhanced AR Platform), an AR app that allows user to view and compare products in their room through their phone's camera. LEAP aims to integrate seamlessley with Lazada's (Alibaba's Filipino e-commerce platform) existing platform, allowing Filipino shoppers to be confident in their purchases.
            • The process: Alibaba's 2024 E-Commerce Challenge was a multi-stage competition with over 500 global teams. Our team was given 2 weeks to write a proposal for our solution. After being shortlisted, we had 3 days to build a working prototype. After being shortlisted again as top-10 finalists, we were flown out to Alibaba's headquarters in Hangzhou, China to network with AI experts, C-suite executives, and engineers. We had 2 days to develop a presentation while exploring China for the first time, and ended up securing 2nd place!
        `,
        coverImage: 'https://davidbenjamin-portfolio.s3.us-east-1.amazonaws.com/alibaba/demo.jpg',
        screenshots: [
            { url: 'https://davidbenjamin-portfolio.s3.us-east-1.amazonaws.com/alibaba/demo.jpg', caption: 'Live demo of LEAP @ Alibaba HQ in Hangzhou, China' },
            { url: 'https://davidbenjamin-portfolio.s3.us-east-1.amazonaws.com/alibaba/second.jpg', caption: `Our team posing for a photo with Carlos Barrrera (Lazada CEO) and Kaifu Zhang (Head of AI Initiative @ Alibaba)` },
            { url: 'https://davidbenjamin-portfolio.s3.us-east-1.amazonaws.com/alibaba/hq.jpg', caption: `GEC global finalists @ Alibaba HQ` },
        ],
        technologies: ['Augmented Reality (AR)', 'React', 'Tailwind CSS'],
        category: 'Full Stack',
        githubUrl: 'https://github.com/DavidBenj15/gec-ar',
        featured: true,
        duration: '2 months',
        teamSize: '2',
        // demoUrl: 'https://youtu.be/k0s5DXZZuMM'
    },
//     {
//         id: 'baseball-analytics-platform',
//         title: 'Baseball Analytics Platform',
//         description: 'League-wide analytics platform for the Atlantic League, introducing MLB-style data access and tool sharing. Built ETL pipeline processing 60,000+ Trackman data points per game. Deployed full-stack web app serving 100+ users with Next.js and Express.js.',
//         shortDescription: 'League-wide baseball analytics platform with ETL pipeline',
//         longDescription: `The Baseball Analytics Platform represents a comprehensive solution for the Atlantic League, bringing professional-grade analytics capabilities to minor league baseball. This project addresses the critical need for data-driven decision making in baseball operations.

// Key Features:
// • Real-time ETL pipeline processing 60,000+ Trackman data points per game
// • Advanced statistical analysis and visualization tools
// • User management system supporting 100+ coaches, scouts, and analysts
// • Mobile-responsive dashboard for on-field decision making
// • Automated report generation and data export capabilities

// Technical Implementation:
// The platform leverages Next.js for the frontend with TypeScript for type safety, while the backend uses Express.js with AWS Lambda for serverless processing. The ETL pipeline processes massive amounts of Trackman data in real-time, transforming raw sensor data into actionable insights. PostgreSQL serves as the primary database with Redis for caching and session management.

// Impact and Results:
// • Reduced data processing time from hours to minutes
// • Increased user engagement by 300% within first 3 months
// • Enabled data-driven decisions that improved team performance metrics
// • Successfully scaled to support multiple teams and leagues`,
//         coverImage: 'https://davidbenjamin-portfolio.s3.us-east-1.amazonaws.com/coldmap/cover.png',
//         screenshots: [
//             { url: 'https://davidbenjamin-portfolio.s3.us-east-1.amazonaws.com/coldmap/cover.png', caption: 'Dashboard Overview' },
//             { url: 'https://davidbenjamin-portfolio.s3.us-east-1.amazonaws.com/coldmap/cover.png', caption: 'Analytics Interface' },
//             { url: 'https://davidbenjamin-portfolio.s3.us-east-1.amazonaws.com/coldmap/cover.png', caption: 'Data Visualization' }
//         ],
//         technologies: ['Next.js', 'TypeScript', 'Express.js', 'AWS Lambda', 'PostgreSQL'],
//         category: 'Data Science',
//         githubUrl: 'https://github.com/DavidBenj15/baseball-analytics',
//         featured: true,
//         duration: '8 months',
//         teamSize: 'Lead Developer',
//         achievements: [
//             'Processed 60,000+ data points per game in real-time',
//             'Served 100+ active users across multiple teams',
//             'Reduced data processing time from hours to minutes',
//             'Increased user engagement by 300% in first 3 months'
//         ],
//         challenges: [
//             'Handling massive real-time data streams efficiently',
//             'Ensuring data accuracy and consistency across sources',
//             'Building intuitive UI for non-technical users'
//         ],
//         solutions: [
//             'Implemented efficient ETL pipeline with AWS Lambda and Redis caching',
//             'Built comprehensive data validation and error handling systems',
//             'Created user-centered design with extensive user testing and feedback'
//         ]
//     },
//     {
//         id: 'portfolio-website',
//         title: 'Portfolio Website',
//         description: 'A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features a clean design, smooth animations, and optimal performance. Includes sections for showcasing projects, experience, and skills with a professional aesthetic.',
//         shortDescription: 'Modern portfolio website built with Next.js and TypeScript',
//         longDescription: `This portfolio website represents a culmination of modern web development best practices, showcasing both technical skills and design sensibility. Built with a focus on performance, accessibility, and user experience, it demonstrates proficiency in full-stack development and modern web technologies.

// Key Features:
// • Responsive design that works seamlessly across all devices
// • Smooth animations and transitions using Framer Motion
// • Optimized performance with Next.js Image optimization
// • Dark/light theme support with HeroUI components
// • SEO optimized with proper meta tags and structured data
// • Accessibility features including keyboard navigation and screen reader support

// Technical Implementation:
// The website leverages Next.js 13+ with the App Router for optimal performance and developer experience. TypeScript ensures type safety throughout the codebase, while Tailwind CSS provides utility-first styling. HeroUI components deliver consistent, accessible UI elements, and Framer Motion adds smooth, performant animations.

// Design Philosophy:
// The design emphasizes readability and professionalism while maintaining visual appeal. The layout guides visitors through a logical flow of information, from introduction to detailed project showcases. The color scheme and typography choices reflect modern design trends while ensuring excellent contrast and readability.

// Performance & SEO:
// • Lighthouse score: 95+ across all metrics
// • Core Web Vitals: All green
// • SEO score: 100/100
// • Accessibility score: 95/100`,
//         coverImage: 'https://davidbenjamin-portfolio.s3.us-east-1.amazonaws.com/coldmap/cover.png',
//         screenshots: [
//             { url: 'https://davidbenjamin-portfolio.s3.us-east-1.amazonaws.com/coldmap/cover.png', caption: 'Homepage Design' },
//             { url: 'https://davidbenjamin-portfolio.s3.us-east-1.amazonaws.com/coldmap/cover.png', caption: 'Projects Section' },
//             { url: 'https://davidbenjamin-portfolio.s3.us-east-1.amazonaws.com/coldmap/cover.png', caption: 'Responsive Layout' }
//         ],
//         technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'HeroUI', 'Framer Motion'],
//         category: 'Full Stack',
//         githubUrl: 'https://github.com/DavidBenj15/portfolio',
//         liveUrl: 'https://davidbenjamin.dev',
//         featured: true,
//         duration: '3 months',
//         teamSize: 'Solo',
//         achievements: [
//             'Achieved 95+ Lighthouse score across all metrics',
//             'Perfect SEO score of 100/100',
//             'All Core Web Vitals in green',
//             'Accessibility score of 95/100'
//         ],
//         challenges: [
//             'Balancing visual appeal with performance optimization',
//             'Ensuring accessibility compliance across all components',
//             'Creating smooth animations without impacting performance'
//         ],
//         solutions: [
//             'Implemented lazy loading and code splitting for optimal performance',
//             'Used semantic HTML and ARIA labels for accessibility',
//             'Leveraged Framer Motion\'s optimized animation engine'
//         ]
//     },

];

export default function ProjectsContent() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [activeTab, setActiveTab] = useState('overview');

    const handleProjectClick = (project: Project) => {
        console.log('Opening modal for project:', project.title);
        setSelectedProject(project);
        setCurrentImageIndex(0);
        onOpen();
    };

    const nextImage = () => {
        if (selectedProject) {
            setCurrentImageIndex((prev) => 
                prev === selectedProject.screenshots.length - 1 ? 0 : prev + 1
            );
        }
    };

    const prevImage = () => {
        if (selectedProject) {
            setCurrentImageIndex((prev) => 
                prev === 0 ? selectedProject.screenshots.length - 1 : prev - 1
            );
        }
    };

    const getCategoryColor = (category: Project['category']) => {
        const colors = {
            'Full Stack': 'primary' as const,
            'AI/ML': 'secondary' as const,
            'DevOps': 'success' as const,
            'Data Science': 'warning' as const,
            'Mobile': 'danger' as const
        };
        return colors[category];
    };

    return (
        <div className="space-y-16">
            {/* Header Section */}
            <div className="text-center space-y-6">
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground">
                    Projects
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                    Note: I'm currently working on adding more of my projects to this page. Check back later for more!
                </p>
            </div>

            {/* Featured Projects Grid */}
            <div className="space-y-12">
                <h2 className="text-2xl font-semibold text-primary text-center">
                    Featured Projects
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.filter(p => p.featured).map((project) => (
                        <ProjectCard 
                            key={project.id} 
                            project={project} 
                            onClick={() => handleProjectClick(project)}
                            getCategoryColor={getCategoryColor}
                            onViewDetails={handleProjectClick}
                        />
                    ))}
                </div>
            </div>

            {/* All Projects Grid */}
            <div className="space-y-12">
                <h2 className="text-2xl font-semibold text-primary text-center">
                    All Projects
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <ProjectCard 
                            key={project.id} 
                            project={project} 
                            onClick={() => handleProjectClick(project)}
                            getCategoryColor={getCategoryColor}
                            onViewDetails={handleProjectClick}
                        />
                    ))}
                </div>
            </div>

            {/* Enhanced Project Detail Modal */}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl" scrollBehavior="inside">
                <ModalContent className="max-h-[90vh]">
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-3 pb-4 border-b border-border/50">
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-3xl font-bold text-foreground">{selectedProject?.title}</h3>
                                        <Chip 
                                            color={selectedProject ? getCategoryColor(selectedProject.category) : 'primary'}
                                            variant="flat"
                                            size="lg"
                                            className="font-semibold"
                                        >
                                            {selectedProject?.category}
                                        </Chip>
                                    </div>
                                    {selectedProject?.featured && (
                                        <Chip 
                                            color="warning"
                                            variant="flat"
                                            size="lg"
                                            className="font-semibold"
                                        >
                                            ⭐ Featured Project
                                        </Chip>
                                    )}
                                </div>
                                
                                {/* Project Meta Info */}
                                {selectedProject && (
                                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                        {selectedProject.duration && (
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />
                                                <span>{selectedProject.duration}</span>
                                            </div>
                                        )}
                                        {selectedProject.teamSize && (
                                            <div className="flex items-center gap-2">
                                                <Users className="w-4 h-4" />
                                                <span>{selectedProject.teamSize}</span>
                                            </div>
                                        )}
                                        {selectedProject.achievements && selectedProject.achievements.length > 0 && (
                                            <div className="flex items-center gap-2">
                                                <Award className="w-4 h-4" />
                                                <span>{selectedProject.achievements.length} achievements</span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </ModalHeader>
                            
                            <ModalBody className="py-6">
                                {selectedProject && (
                                    <div className="w-full">
                                        {/* Custom Tabs */}
                                        <div className="flex gap-6 w-full relative border-b border-divider mb-6">
                                            <button
                                                onClick={() => setActiveTab('overview')}
                                                className={`px-0 py-3 font-medium transition-colors ${
                                                    activeTab === 'overview' 
                                                        ? 'text-primary border-b-2 border-primary' 
                                                        : 'text-muted-foreground hover:text-foreground'
                                                }`}
                                            >
                                                Overview
                                            </button>

                                            {/* {selectedProject.achievements || selectedProject.challenges || selectedProject.solutions && (
                                            <button
                                                onClick={() => setActiveTab('achievements')}
                                                className={`px-0 py-3 font-medium transition-colors ${
                                                    activeTab === 'achievements' 
                                                        ? 'text-primary border-b-2 border-primary' 
                                                        : 'text-muted-foreground hover:text-foreground'
                                                }`}
                                            >
                                                Achievements & Impact
                                            </button>
                                            )} */}
                                        </div>

                                        {/* Tab Content */}
                                        {activeTab === 'overview' && (
                                            <div className="space-y-8 pt-6">
                                                {/* Project Demo/Video Section */}
                                                {selectedProject.video && (
                                                    <div className="space-y-4">
                                                        <h4 className="text-xl font-semibold text-foreground">Project Demo</h4>
                                                        <div className="relative w-full h-80 bg-muted/20 rounded-xl overflow-hidden">
                                                            <video 
                                                                className="w-full h-full object-cover"
                                                                controls
                                                                poster={selectedProject.coverImage}
                                                            >
                                                                <source src={selectedProject.video} type="video/mp4" />
                                                                Your browser does not support the video tag.
                                                            </video>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Screenshots Gallery */}
                                                <div className="space-y-4">
                                                    {/* <h4 className="text-xl font-semibold text-foreground">Project Screenshots</h4> */}
                                                    <div className="relative">
                                                        <div className="relative w-full h-96 bg-muted/20 rounded-xl overflow-hidden">
                                                            <NextImage
                                                                src={selectedProject.screenshots[currentImageIndex].url}
                                                                alt={`${selectedProject.title} screenshot ${currentImageIndex + 1}`}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                            
                                                            {/* Navigation Arrows */}
                                                            {selectedProject.screenshots.length > 1 && (
                                                                <>
                                                                    <Button
                                                                        isIconOnly
                                                                        variant="flat"
                                                                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90"
                                                                        onPress={prevImage}
                                                                    >
                                                                        <ArrowLeft className="w-5 h-5" />
                                                                    </Button>
                                                                    <Button
                                                                        isIconOnly
                                                                        variant="flat"
                                                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90"
                                                                        onPress={nextImage}
                                                                    >
                                                                        <ArrowRight className="w-5 h-5" />
                                                                    </Button>
                                                                </>
                                                            )}
                                                        </div>
                                                        
                                                        {/* Screenshot Caption */}
                                                        <div className="text-center mt-3">
                                                            <p className="text-sm text-muted-foreground font-medium">
                                                                {selectedProject.screenshots[currentImageIndex].caption}
                                                            </p>
                                                        </div>
                                                        
                                                        {/* Image Indicators */}
                                                        {selectedProject.screenshots.length > 1 && (
                                                            <div className="flex justify-center gap-2 mt-4">
                                                                {selectedProject.screenshots.map((_, index) => (
                                                                    <button
                                                                        key={index}
                                                                        className={`w-2 h-2 rounded-full transition-all ${
                                                                            index === currentImageIndex 
                                                                                ? 'bg-primary w-6' 
                                                                                : 'bg-muted-foreground/30'
                                                                        }`}
                                                                        onClick={() => setCurrentImageIndex(index)}
                                                                    />
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Long Description */}
                                                <div className="space-y-4">
                                                    <h4 className="text-xl font-semibold text-foreground">Project Details</h4>
                                                    <div className="prose prose-invert max-w-none">
                                                        <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                                                            {selectedProject.longDescription}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Technologies */}
                                                <div className="space-y-4">
                                                    <h4 className="text-xl font-semibold text-foreground">Technologies Used</h4>
                                                    <div className="flex flex-wrap gap-3">
                                                        {selectedProject.technologies.map((tech) => (
                                                            <Chip
                                                                key={tech}
                                                                variant="flat"
                                                                size="lg"
                                                                className="bg-primary/10 text-primary border-primary/20 font-medium"
                                                            >
                                                                {tech}
                                                            </Chip>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {activeTab === 'achievements' && (
                                            <div className="space-y-8 pt-6">
                                                {/* Key Achievements */}
                                                {selectedProject.achievements && selectedProject.achievements.length > 0 && (
                                                    <div className="space-y-4">
                                                        <h4 className="text-xl font-semibold text-foreground">Key Achievements</h4>
                                                        <div className="grid gap-4">
                                                            {selectedProject.achievements.map((achievement, index) => (
                                                                <div key={index} className="flex items-start gap-3 p-4 bg-success/10 border border-success/20 rounded-lg">
                                                                    <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
                                                                    <p className="text-foreground font-medium">{achievement}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Challenges & Solutions */}
                                                {selectedProject.challenges && selectedProject.challenges.length > 0 && (
                                                    <div className="space-y-6">
                                                        <h4 className="text-xl font-semibold text-foreground">Challenges & Solutions</h4>
                                                        <div className="space-y-4">
                                                            {selectedProject.challenges.map((challenge, index) => (
                                                                <div key={index} className="space-y-3 p-4 bg-warning/10 border border-warning/20 rounded-lg">
                                                                    <div className="flex items-center gap-2">
                                                                        <div className="w-2 h-2 bg-warning rounded-full"></div>
                                                                        <h5 className="font-semibold text-foreground">Challenge {index + 1}</h5>
                                                                    </div>
                                                                    <p className="text-muted-foreground ml-4">{challenge}</p>
                                                                    {selectedProject.solutions && selectedProject.solutions[index] && (
                                                                        <div className="ml-4 p-3 bg-success/10 border border-success/20 rounded">
                                                                            <div className="flex items-center gap-2 mb-2">
                                                                                <div className="w-2 h-2 bg-success rounded-full"></div>
                                                                                <span className="font-medium text-success">Solution</span>
                                                                            </div>
                                                                            <p className="text-foreground">{selectedProject.solutions[index]}</p>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </ModalBody>
                            
                            <ModalFooter className="pt-4 border-t border-border/50">
                                <div className="flex gap-3 w-full justify-between items-center">
                                    <div className="flex gap-2">
                                        {selectedProject?.githubUrl && (
                                            <Button
                                                as="a"
                                                href={selectedProject.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                variant="bordered"
                                                startContent={<Github className="w-4 h-4" />}
                                                className="font-medium"
                                            >
                                                View Code
                                            </Button>
                                        )}
                                    </div>
                                    
                                    <div className="flex gap-2">
                                        {selectedProject?.liveUrl && (
                                            <Button
                                                as="a"
                                                href={selectedProject.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                color="primary"
                                                startContent={<ExternalLink className="w-4 h-4" />}
                                                className="font-medium"
                                            >
                                                Live Demo
                                            </Button>
                                        )}
                                        {selectedProject?.demoUrl && (
                                            <Button
                                                as="a"
                                                href={selectedProject.demoUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                startContent={<Play className="w-4 h-4" />}
                                                className="font-medium bg-primary"
                                            >
                                                Watch Demo
                                            </Button>
                                        )}
                                        <Button variant="light" onPress={onClose} className="font-medium">
                                            Close
                                        </Button>
                                    </div>
                                </div>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}

// Project Card Component
interface ProjectCardProps {
    project: Project;
    onClick: () => void;
    getCategoryColor: (category: Project['category']) => "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
    onViewDetails: (project: Project) => void;
}

function ProjectCard({ project, onClick, getCategoryColor, onViewDetails }: ProjectCardProps) {
    return (
        <Card 
            className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 border border-border/50 hover:border-primary/50 overflow-hidden"
            onClick={onClick}
        >
            {/* Project Image */}
            <div className="relative w-full h-48 bg-muted/20 overflow-hidden">
                <NextImage
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {/* Overlay with category */}
                <div className="absolute top-3 right-3">
                    <Chip 
                        color={getCategoryColor(project.category)}
                        variant="flat"
                        size="sm"
                        className="backdrop-blur-sm bg-background/80"
                    >
                        {project.category}
                    </Chip>
                </div>
                {/* Featured badge */}
                {project.featured && (
                    <div className="absolute top-3 left-3">
                        <Chip 
                            color="warning"
                            variant="flat"
                            size="sm"
                            className="backdrop-blur-sm bg-background/80"
                        >
                            ⭐ Featured
                        </Chip>
                    </div>
                )}
            </div>

            {/* Project Info */}
            <CardBody className="p-6">
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                        {project.shortDescription}
                    </p>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map((tech) => (
                            <Chip
                                key={tech}
                                variant="flat"
                                size="sm"
                                className="text-xs bg-muted/50 text-muted-foreground"
                            >
                                {tech}
                            </Chip>
                        ))}
                        {project.technologies.length > 3 && (
                            <Chip
                                variant="flat"
                                size="sm"
                                className="text-xs bg-muted/50 text-muted-foreground"
                            >
                                +{project.technologies.length - 3} more
                            </Chip>
                        )}
                    </div>
                </div>
            </CardBody>

            {/* Action Buttons */}
            <CardFooter className="p-6 pt-0">
                <div className="flex gap-2 w-full">
                    {project.githubUrl && (
                        <Button
                            as="a"
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="light"
                            size="sm"
                            className="flex-1"
                            startContent={<Github className="w-4 h-4" />}
                            onClick={(e) => e.stopPropagation()}
                        >
                            Code
                        </Button>
                    )}
                    {project.liveUrl && (
                        <Button
                            as="a"
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            color="primary"
                            size="sm"
                            className="flex-1"
                            startContent={<ExternalLinkIcon className="w-4 h-4" />}
                            onClick={(e) => e.stopPropagation()}
                        >
                            Demo
                        </Button>
                    )}
                    {!project.liveUrl && (
                        <Button
                            variant="bordered"
                            size="sm"
                            className="flex-1"
                            onClick={(e) => {
                                e.stopPropagation();
                                onViewDetails(project);
                            }}
                        >
                            View Details
                        </Button>
                    )}
                </div>
            </CardFooter>
        </Card>
    );
}
