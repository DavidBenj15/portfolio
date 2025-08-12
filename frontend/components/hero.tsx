'use client';

import Section from '@/components/ui/section';
import { Card } from '@heroui/card';
import { Image } from '@heroui/image';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@heroui/modal';
import { Button } from '@heroui/button';
import { useDisclosure } from '@heroui/use-disclosure';
import NextImage from "next/image";

const images = [
    {
        src: '/images/jhu_crest_colorized.png',
    },
    {
        src: '/images/nasa_logo.png',
    },
    {
        src: '/images/meta.svg',
        height: 35,
    },
    {
        src: '/images/mlh.png',
        height: 35,
    }
]

const Hero = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const scrollToFooter = () => {
        const footer = document.getElementById('footer');
        if (footer) {
            footer.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const downloadResume = () => {
        const link = document.createElement('a');
        link.href = '/data/David_Benjamin_resume.pdf';
        link.download = 'David_Benjamin_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            <Section id="hero" className="flex items-center justify-center h-full min-h-screen">
                <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto w-full">
                    {/* Left column - Profile Image */}
                    <div className="flex justify-center lg:justify-start">
                        <div className="relative">
                            {/* Main profile image with enhanced styling */}
                            <Card className="bg-card border border-border/50 shadow-2xl overflow-hidden">
                                <Image
                                    src="/images/me_square.jpg"
                                    alt="David Benjamin"
                                    width={400}
                                    height={400}
                                    className="object-cover w-[400px] h-[400px]"
                                />
                            </Card>
                            
                            {/* Decorative accent elements */}
                            {/* <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full border-2 border-primary/30"></div>
                            <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-primary/10 rounded-full border border-primary/20"></div> */}
                        </div>
                    </div>

                    {/* Right column - Text Content */}
                    <div className="flex flex-col space-y-8 text-center lg:text-left">
                        {/* Name and Title */}
                        <div className="space-y-4">
                            <h1 className="text-5xl lg:text-7xl font-bold text-foreground leading-tight">
                                David Benjamin
                            </h1>
                            <div className="w-24 h-1 bg-primary rounded-full mx-auto lg:mx-0"></div>
                        </div>

                        {/* Description */}
                        <div className="space-y-6">
                            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
                                Computer Science @ Johns Hopkins Univeristy{' '}
                                <span className="text-primary font-semibold">Full Stack</span>{' | '}
                                <span className="text-primary font-semibold">DevOps</span>{' | '}
                                <span className="text-primary font-semibold">AI</span>
                            </p>
                            
                            {/* Additional subtitle for context */}
                            <p className="text-lg text-muted-foreground/80 max-w-xl">
                                Building impactful, customer-first solutions. Fueled by a growth mindset. Based in Baltimore, MD and Philadelphia, PA.
                            </p>
                        </div>

                        {/* Call to action buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            {/* <Button 
                                color="primary"
                                size="lg"
                                className="px-8 py-4 font-medium hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl"
                            >
                                View My Work
                            </Button> */}
                            <Button 
                                variant="bordered"
                                size="lg"
                                onClick={scrollToFooter}
                                className="px-8 py-4 font-medium hover:scale-105 transition-transform duration-300"
                            >
                                Get In Touch
                            </Button>
                            <Button
                                variant="ghost"
                                size="lg"
                                onClick={onOpen}
                                className="px-8 py-4 font-medium hover:scale-105 transition-transform duration-300"
                            >
                                View Resume
                            </Button>
                        </div>
                        
                    </div>
                </div>
            </Section>

            {/* Resume Modal */}
            <Modal 
                isOpen={isOpen} 
                onOpenChange={onOpenChange}
                size="5xl"
                scrollBehavior="inside"
                backdrop="blur"
            >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">
                        <h2 className="text-2xl font-bold">David Benjamin - Resume</h2>
                    </ModalHeader>
                    <ModalBody>
                        <div className="w-full h-[70vh] bg-muted/20 rounded-lg border border-border/50 overflow-hidden">
                            <iframe
                                src="/data/David_Benjamin_resume.pdf"
                                className="w-full h-full"
                                title="David Benjamin Resume"
                            />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button 
                            color="primary" 
                            onClick={downloadResume}
                            className="px-6 py-2"
                        >
                            Download PDF
                        </Button>
                        <Button 
                            variant="bordered" 
                            onClick={() => onOpenChange()}
                            className="px-6 py-2"
                        >
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default Hero;