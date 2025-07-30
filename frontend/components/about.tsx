import Section from "@/components/ui/section";
import Container from "./ui/container";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Chip } from "@heroui/chip";
import { Image } from "@heroui/image";

const courses = [
    {
        title: 'Data Structures',

    },
    {
        title: 'Intro Algorithms',
    },
    {
        title: 'Software System Design'
    }
]

const About = () => {
    return (
        < Section id = "about" className = "bg-muted/50" >
            <Container>
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <Card className="bg-card border border-border">
                                <Image
                                    src="/images/me_square.jpg"
                                    alt="David Benjamin"
                                    width={600}
                                    height={500}
                                    className="object-cover"
                                />
                        </Card>
                    </div>
                    <div className="">
                        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                            About Me
                        </h2>
                        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                            I'm a computer science student at Johns Hopkins University, graduating in May 2027.
                            I love building applications that solve real-world problems. I'm currently
                            interested in Backend SWE, DevOps, and AI, but am always looking to grow my skillset.
                        </p>
                    </div>
                </div>
            </Container>
      </Section >
    )
}

export default About;