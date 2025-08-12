'use client'

import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { useDisclosure } from "@heroui/use-disclosure";
import { useState } from "react";
import { ExternalLink, Github, Play, Code, ExternalLinkIcon } from "lucide-react";
import NextImage from "next/image";

// Project data structure
interface Project {
    id: string;
    title: string;
    description: string;
    shortDescription: string;
    image: string;
    video?: string;
    technologies: string[];
    category: 'Full Stack' | 'AI/ML' | 'DevOps' | 'Data Science' | 'Mobile';
    githubUrl?: string;
    liveUrl?: string;
    demoUrl?: string;
    featured: boolean;
}

const projects: Project[] = [
    {
        id: 'portfolio-website',
        title: 'Portfolio Website',
        description: 'A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features a clean design, smooth animations, and optimal performance. Includes sections for showcasing projects, experience, and skills with a professional aesthetic.',
        shortDescription: 'Modern portfolio website built with Next.js and TypeScript',
        image: '/images/projects/portfolio-preview.jpg',
        technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'HeroUI', 'Framer Motion'],
        category: 'Full Stack',
        githubUrl: 'https://github.com/DavidBenj15/portfolio',
        liveUrl: 'https://davidbenjamin.dev',
        featured: true
    },
    {
        id: 'mlh-fellowship',
        title: 'MLH Fellowship Portfolio',
        description: 'Portfolio website developed during the Meta x Major League Hacking Production Engineering Fellowship. Demonstrates proficiency in DevOps practices, CI/CD pipelines, and production system deployment. Built with modern web technologies and deployed using industry-standard tools.',
        shortDescription: 'Production engineering portfolio from MLH Fellowship',
        image: '/images/projects/mlh-portfolio.jpg',
        technologies: ['React', 'Docker', 'GitHub Actions', 'AWS', 'CI/CD'],
        category: 'DevOps',
        githubUrl: 'https://github.com/DavidBenj15/mlh-portfolio',
        featured: true
    },
    {
        id: 'nasa-constraint-solver',
        title: 'NASA Constraint Solver',
        description: 'Advanced constraint optimization system built for NASA Goddard Space Flight Center. Automates and optimizes reviewer assignment for space telescope proposals using Google OR-Tools, Redis, and Django. Reduces assignment time by 99% while satisfying 15+ complex constraints.',
        shortDescription: 'Constraint optimization system for NASA proposal management',
        image: '/images/projects/nasa-solver.jpg',
        technologies: ['Python', 'Django', 'Redis', 'Google OR-Tools', 'Celery'],
        category: 'Data Science',
        githubUrl: 'https://github.com/DavidBenj15/nasa-constraint-solver',
        featured: true
    },
    {
        id: 'hophacks-website',
        title: 'HopHacks Website',
        description: 'Official website for Johns Hopkins University\'s premier hackathon. Built with React, Flask, and MongoDB, supporting 500+ hackers and sponsors. Features team formation tools, judging systems, and event logistics management.',
        shortDescription: 'Official website for JHU hackathon with 500+ users',
        image: '/images/projects/hophacks-website.jpg',
        technologies: ['React', 'Flask', 'MongoDB', 'Amazon S3', 'Agile'],
        category: 'Full Stack',
        githubUrl: 'https://github.com/DavidBenj15/hophacks-website',
        liveUrl: 'https://hophacks.com',
        featured: false
    },
    {
        id: 'baseball-analytics-platform',
        title: 'Baseball Analytics Platform',
        description: 'League-wide analytics platform for the Atlantic League, introducing MLB-style data access and tool sharing. Built ETL pipeline processing 60,000+ Trackman data points per game. Deployed full-stack web app serving 100+ users with Next.js and Express.js.',
        shortDescription: 'League-wide baseball analytics platform with ETL pipeline',
        image: '/images/projects/baseball-analytics.jpg',
        technologies: ['Next.js', 'TypeScript', 'Express.js', 'AWS Lambda', 'PostgreSQL'],
        category: 'Data Science',
        githubUrl: 'https://github.com/DavidBenj15/baseball-analytics',
        featured: false
    }
];

export default function ProjectsContent() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const handleProjectClick = (project: Project) => {
        console.log('Opening modal for project:', project.title); // Debug log
        setSelectedProject(project);
        onOpen();
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
                    A collection of software engineering projects showcasing my passion for building 
                    impactful solutions across full-stack development, AI/ML, and DevOps.
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
                        />
                    ))}
                </div>
            </div>

            {/* Project Detail Modal */}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl" scrollBehavior="inside">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 pb-4">
                                <div className="flex items-center gap-3">
                                    <h3 className="text-2xl font-bold">{selectedProject?.title}</h3>
                                    <Chip 
                                        color={selectedProject ? getCategoryColor(selectedProject.category) : 'primary'}
                                        variant="flat"
                                        size="sm"
                                    >
                                        {selectedProject?.category}
                                    </Chip>
                                </div>
                            </ModalHeader>
                            <ModalBody className="py-6">
                                {selectedProject && (
                                    <div className="space-y-6">
                                        {/* Project Image/Video */}
                                        <div className="relative w-full h-64 bg-muted/20 rounded-lg overflow-hidden">
                                            {selectedProject.video ? (
                                                <video 
                                                    className="w-full h-full object-cover"
                                                    controls
                                                    poster={selectedProject.image}
                                                >
                                                    <source src={selectedProject.video} type="video/mp4" />
                                                    Your browser does not support the video tag.
                                                </video>
                                            ) : (
                                                <NextImage
                                                    src={selectedProject.image}
                                                    alt={selectedProject.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            )}
                                        </div>

                                        {/* Description */}
                                        <div className="space-y-4">
                                            <h4 className="text-lg font-semibold text-foreground">About</h4>
                                            <p className="text-muted-foreground leading-relaxed">
                                                {selectedProject.description}
                                            </p>
                                        </div>

                                        {/* Technologies */}
                                        <div className="space-y-4">
                                            <h4 className="text-lg font-semibold text-foreground">Technologies</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedProject.technologies.map((tech) => (
                                                    <Chip
                                                        key={tech}
                                                        variant="flat"
                                                        size="sm"
                                                        className="bg-muted/50 text-foreground"
                                                    >
                                                        {tech}
                                                    </Chip>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </ModalBody>
                            <ModalFooter className="pt-4">
                                <div className="flex gap-3 w-full justify-end">
                                    {selectedProject?.githubUrl && (
                                        <Button
                                            as="a"
                                            href={selectedProject.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            variant="bordered"
                                            startContent={<Github className="w-4 h-4" />}
                                        >
                                            View Code
                                        </Button>
                                    )}
                                    {selectedProject?.liveUrl && (
                                        <Button
                                            as="a"
                                            href={selectedProject.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            color="primary"
                                            startContent={<ExternalLink className="w-4 h-4" />}
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
                                            color="secondary"
                                            startContent={<Play className="w-4 h-4" />}
                                        >
                                            Watch Demo
                                        </Button>
                                    )}
                                    <Button variant="light" onPress={onClose}>
                                        Close
                                    </Button>
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
}

function ProjectCard({ project, onClick, getCategoryColor }: ProjectCardProps) {
    return (
        <Card 
            className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 border border-border/50 hover:border-primary/50 overflow-hidden"
            onClick={onClick}
        >
            {/* Project Image */}
            <div className="relative w-full h-48 bg-muted/20 overflow-hidden">
                <NextImage
                    src={project.image}
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
                            startContent={<Play className="w-4 h-4" />}
                        >
                            View Details
                        </Button>
                    )}
                </div>
            </CardFooter>
        </Card>
    );
}
