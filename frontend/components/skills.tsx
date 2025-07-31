'use client'

import Section from "@/components/ui/section";
import Container from "./ui/container";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Chip } from "@heroui/chip";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Tooltip } from "@heroui/tooltip";


const programmingLanguages = [
    {
        name: 'Python',
        
    },
    {
        name: 'Java',
    },
    {
        name: 'JavaScript',
    },
    {
        name: 'TypeScript',
    },
    {
        name: 'C++',
    },
    {
        name: 'C',
    },
    {
        name: 'SQL',
    },
    {
        name: 'Bash'
    },
    {
        name: 'HTML/CSS'
    }
]

const tools = [
    {
        name: 'Linux/Unix',
    },
    {
        name: 'Git',
    },
    {
        name: 'Docker',
    },
    {
        name: 'GitHub',
    },
    {
        name: 'Amazon Web Services (AWS)'
    },
]

const frameworks = [
    {
        name: 'React',
    },
    {
        name: 'Next.js',
    },
    {
        name: 'Tailwind CSS',
    },
    {
        name: 'Node.js',
    },
    {
        name: 'Pandas',
    },
    {
        name: 'Flask',
    },
    {
        name: 'Django',
    },
    {
        name: 'FastAPI',
    },
    {
        name: 'NumPy'
    }
]

const methodologies = [
    {
        name: 'Object-Oriented Programming (OOP)',
    },
    {
        name: 'Agile (Scrum)',
    }, 
    {
        name: 'CI/CD (GitHub Actions)',
    },
    {
        name: 'Microservices',
    },
    {
        name: 'Testing (Unit, Integration, System, TDD)',
    },
    {
        name: 'API Development',
    },
]

const categories = [
    {
        name: 'Programming Languages',
        skills: programmingLanguages
    },
    {
        name: 'Tools & Platforms',
        skills: tools
    },
    {
        name: 'Frameworks & Libraries',
        skills: frameworks
    },
    {
        name: 'Methodologies',
        skills: methodologies
    }
]


const Skills = () => {
    return (
        <Section id="about" className="" >
            <Container>
                <div className="space-y-8">
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                        Technical Skills
                    </h2>

                    <div className="space-y-10">
                        {categories.map((category) => (
                            <div key={category.name} className="space-y-4">
                                <h3 className="text-lg sm:text-xl font-semibold text-foreground border-l-4 border-primary pl-4">
                                    {category.name}
                                </h3>
                                <div className="flex flex-wrap gap-2.5 pl-4">
                                    {category.skills.map((skill) => (
                                        <Chip
                                            key={skill.name}
                                            className="cursor-pointer bg-muted text-foreground hover:bg-accent transition-all duration-200 hover:scale-105"
                                            variant="solid"
                                            size="md"
                                        >
                                            {skill.name}
                                        </Chip>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </Section >
    )
}

export default Skills;