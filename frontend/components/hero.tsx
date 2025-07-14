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
        <Section id="hero" className="flex flex-col items-center justify-start bg-background" fullHeight={true} container={true}>
            <div className="grid md:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-8">
                {/* Left column - Name and description */}
                <div className="space-y-6 h-full flex flex-col justify-between">
                    <div className="space-y-6">
                        <h1 className="text-4xl sm:text-5xl lg:text-8xl font-bold text-foreground">
                            David Benjamin
                        </h1>
                        <p className="text-3xl sm:text-3xl text-muted-foreground max-w-3xl">
                            Aspiring Software Engineer passionate about{' '}
                            <span className="text-primary">Backend Engineering</span>,{' '}
                            <span className="text-primary">AI/ML</span>, and{' '}
                            <span className="text-primary">DevOps</span>.
                        </p>
                    </div>
                    <div className="border-t border-border pt-6 pb-10 flex items-center flex-row gap-4">
                        {images.map((image) => {
                            const imageHeight = image.height || defaultHeight;
                            return (
                                <Image
                                    key={image.src}
                                    as={NextImage}
                                    isBlurred={true}
                                    src={image.src}
                                    alt="David Benjamin"
                                    width={100}
                                    height={imageHeight}
                                    style={{ width: 'auto', height: `${imageHeight}px`, borderRadius: 0 }}
                                />
                            );
                        })}
                    </div>
                </div>

                {/* Right column - Image placeholder */}
                <div className="flex h-full">
                    <Image
                        as={NextImage}
                        isBlurred={true}
                        src="/images/hero-me.png"
                        alt="David Benjamin"
                        className='m-10'
                        width={500}
                        height={500}
                    />
                </div>
            </div>
        </Section>
    )
}

export default Hero;