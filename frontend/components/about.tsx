import Section from "@/components/ui/section";
import Container from "./ui/container";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";

const About = () => {
    return (
        < Section id = "about" className = "bg-muted/50" >
            <Container>
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                            About Me
                        </h2>
                        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                            I'm a passionate developer with expertise in modern web technologies.
                            I love building applications that solve real problems and provide
                            exceptional user experiences.
                        </p>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            When I'm not coding, you can find me exploring new technologies,
                            contributing to open source projects, or sharing knowledge with
                            the developer community.
                        </p>
                    </div>
                    <div className="">
                        <Card>
                            <CardHeader>
                                <h3>
                                    Education
                                </h3>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </Container>
      </Section >
    )
}

export default About;