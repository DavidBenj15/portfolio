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
    readMoreUrl?: string;
    duration?: string;
    teamSize?: string;
    achievements?: string[];
    challenges?: string[];
    solutions?: string[];
}

const projects: Project[] = [
    {
        id: 'load-in',
        title: 'load_in',
        shortDescription: 'AI developer onboarding engine that transforms any GitHub repo into a personalized curriculum.',
        longDescription: `
    • Built with a team of 6 an AI developer onboarding engine that transforms any GitHub repo into a personalized curriculum; engineered the external resources agent pipeline \u2014 fetching role-tailored YouTube tutorials, articles (Tavily), and reference repos \u2014 as a module within a LangGraph multi-agent system.

    • Grounded AI-generated onboarding quiz answers in actual codebase chunks via pgvector retrieval, ensuring source-cited, hallucination-resistant responses.

    • Built end-to-end Slack bot with an agentic Q&A handler \u2014 using Claude tool use to query live trainee progress.
`,
        coverImage: '/images/hiking_square.jpg',
        screenshots: [],
        technologies: ['LangGraph', 'pgvector', 'Claude API', 'Slack', 'Tavily', 'Python'],
        category: 'AI/ML',
        teamSize: '6',
    },
    {
        id: 'gec',
        title: 'Alibaba Global E-Commerce Challenge (2nd / 500+ Global Teams)',
        shortDescription: "Designed an AR 'view in your room' app to reduce purchase uncertainty in Southeast Asian e-commerce \u2014 built for Lazada integration.",
        longDescription: `
    • Designed an AR "view in your room" app to reduce purchase uncertainty in Southeast Asian e-commerce \u2014 built for Lazada integration using React and Google's AR model-viewer library.

    • Placed 2nd out of 500+ global teams; pitched live at Alibaba HQ to 70+ engineers and executives, including C-suite leaders.
`,
        coverImage: 'https://davidbenjamin-portfolio.s3.us-east-1.amazonaws.com/alibaba/demo.jpg',
        screenshots: [
            { url: 'https://davidbenjamin-portfolio.s3.us-east-1.amazonaws.com/alibaba/demo.jpg', caption: 'Live demo of LEAP @ Alibaba HQ in Hangzhou, China' },
            { url: 'https://davidbenjamin-portfolio.s3.us-east-1.amazonaws.com/alibaba/second.jpg', caption: `Our team posing for a photo with Carlos Barrrera (Lazada CEO) and Kaifu Zhang (Head of AI Initiative @ Alibaba)` },
            { url: 'https://davidbenjamin-portfolio.s3.us-east-1.amazonaws.com/alibaba/hq.jpg', caption: `GEC global finalists @ Alibaba HQ` },
        ],
        technologies: ['React', 'Google AR model-viewer'],
        category: 'AI/ML',
        githubUrl: 'https://github.com/DavidBenj15/gec-ar',
        teamSize: '2',
        readMoreUrl: 'https://www.prnewswire.com/news-releases/alibaba-international-wraps-up-2024-global-e-commerce-challenge-highlighting-youth-innovation-302238056.html'
    },
    {
        id: 'baseball-analytics-platform',
        title: 'SLUGGER',
        shortDescription: 'MLB-style advanced analytics platform for the Atlantic League of Professional Baseball.',
        longDescription: `
    • Problem: In Spring 2024, the Atlantic League of Professional Baseball (ALPB) began installing Trackman radars, generating 60,000+ data points per game. This data was locked in messy CSVs, requiring league coordination and offering no standardized infrastructure for analysts, coaches, or players.

    • Solution: We built SLUGGER, the first centralized analytics platform for the ALPB. It enables discovery and use of analytical "widgets" powered by a Trackman-backed API and is expanding to integrate other data sources like PointStreak.

    • API: SLUGGER's core is a RESTful API, built with AWS Lambda and deployed via API Gateway. It offers 5 endpoints (Teams, Ballparks, Players, Games, Pitches) and an ETL pipeline that processes 60,000+ pitch events per game using batch processing and Pandas, delivering clean, structured data to analysts.

    • Web App: A widget dashboard lets ALPB personnel access, filter, and favorite analytical tools built on the API. Teams can register, manage members, and launch widgets such as lineup optimization and pitch analysis.

    • My Role: As co-lead, I built critical functionality across the stack, engaged with stakeholders (players, coaches, and the ALPB president) to define requirements, and mentored students weekly on API usage and deployment.

    • Impact: Launched for the 2025 season, SLUGGER is live at https://www.alpb-analytics.com/ (though you need to be a member of the ALPB to access it), serving 100+ users across 10 teams and 10+ developers. At launch, it shipped with 4 production-ready widgets, with more in development from our growing community.
`,

        coverImage: 'https://davidbenjamin-portfolio.s3.us-east-1.amazonaws.com/alpb/landing.png',
        screenshots: [
            { url: 'https://davidbenjamin-portfolio.s3.us-east-1.amazonaws.com/alpb/landing.png', caption: 'SLUGGER landing page' },
            { url: 'https://davidbenjamin-portfolio.s3.us-east-1.amazonaws.com/alpb/architecture.png', caption: 'AWS ETL pipeline architecture' },
            { url: 'https://davidbenjamin-portfolio.s3.us-east-1.amazonaws.com/alpb/design+day.png', caption: 'Presenting SLUGGER at Johns Hopkins Design Day'}
        ],
        technologies: ['AWS API Gateway', 'AWS Lambda', 'Pandas', 'PostgreSQL', 'Next.js', 'Docker'],
        category: 'Full Stack',
        githubUrl: 'https://github.com/DavidBenj15/alpb-website',
        duration: '12 months',
        teamSize: '9',
        // achievements: [
        //     'Processed 60,000+ data points per game in real-time',
        //     'Served 100+ active users across multiple teams',
        //     'Reduced data processing time from hours to minutes',
        //     'Increased user engagement by 300% in first 3 months'
        // ],
        // challenges: [
        //     'Handling massive real-time data streams efficiently',
        //     'Ensuring data accuracy and consistency across sources',
        //     'Building intuitive UI for non-technical users'
        // ],
        // solutions: [
        //     'Implemented efficient ETL pipeline with AWS Lambda and Redis caching',
        //     'Built comprehensive data validation and error handling systems',
        //     'Created user-centered design with extensive user testing and feedback'
        // ]
    },

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
            <div className="space-y-6">
                <h1 className="text-4xl sm:text-5xl lg:text-8xl font-bold text-foreground glow-white-soft">
                    Projects
                </h1>
            </div>

            {/* Projects Grid */}
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
                                                        <div className="relative w-full bg-muted/20 rounded-xl overflow-hidden p-4">
                                                            <NextImage
                                                                src={selectedProject.screenshots[currentImageIndex].url}
                                                                alt={`${selectedProject.title} screenshot ${currentImageIndex + 1}`}
                                                                width={800}
                                                                height={600}
                                                                className="w-full h-auto max-h-[32rem] object-contain"
                                                            />
                                                            
                                                            {/* Navigation Arrows */}
                                                            {selectedProject.screenshots.length > 1 && (
                                                                <>
                                                                    <Button
                                                                        isIconOnly
                                                                        variant="flat"
                                                                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90 z-10"
                                                                        onPress={prevImage}
                                                                    >
                                                                        <ArrowLeft className="w-5 h-5" />
                                                                    </Button>
                                                                    <Button
                                                                        isIconOnly
                                                                        variant="flat"
                                                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90 z-10"
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
                                        {selectedProject?.readMoreUrl && (
                                            <Button
                                                as="a"
                                                href={selectedProject.readMoreUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                variant="bordered"
                                                startContent={<ExternalLinkIcon className="w-4 h-4" />}
                                                className="font-medium"
                                            >
                                                Read More
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
                        />
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
                            More
                        </Button>
                    )}
                </div>
            </CardFooter>
        </Card>
    );
}
