import Section from '@/components/ui/section';
import { Image } from '@heroui/image';
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
    const defaultHeight = 50; // Set your default height here

    return (
        <Section id="hero" className="flex flex-col items-center justify-center bg-background h-full min-h-screen">
            <div className="grid md:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-8 h-full">
                {/* Left column - Name and description */}
                <div className="space-y-6 h-full flex flex-col justify-between">
                    <div className="space-y-6">
                        <h1 className="text-4xl sm:text-5xl lg:text-8xl font-bold text-foreground">
                            David Benjamin
                        </h1>
                    </div>
                </div>
                {/* Right column - Image placeholder */}
                <div className="flex flex-col items-center justify-center h-full">
                    <p className="text-3xl sm:text-3xl text-muted-foreground max-w-3xl">
                        Computer science student passionate about{' '}
                        <span className="text-primary">Full Stack SWE</span>,{' '}
                        <span className="text-primary">DevOps</span>, and{' '}
                        <span className="text-primary">AI</span>.
                    </p>
                </div>
            </div>
        </Section>
    )
}

export default Hero;