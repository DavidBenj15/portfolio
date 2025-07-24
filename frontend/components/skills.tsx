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

const technologies = [
    {
        name: 'Linux',
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
    }
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
    }
]

const concepts = [
    {
        name: 'Object-Oriented Programming (OOP)',
    },
    {
        name: 'Data Structures',
    }, 
    {
        name: 'Algorithms',
    },
    {
        name: 'Vector Databases',
    }
]

const courseCategories = [
    {
        name: 'Computer Science',
        courses: [
            {
                name: 'Artificial Intelligence',
                description: 'This course is recommended for scientists and engineers with a genuine curiosity about the fundamental obstacles in getting machines to perform tasks such as deduction, learning, planning and navigation. It covers methods for automated reasoning, automatic problem solvers and planners, knowledge representation mechanisms, game playing, machine learning, and statistical pattern recognition.',
            },
            {
                name: 'Software System Design',
                description: 'This course introduces modern software systems design, with an emphasis on how to design large-scale systems, assess common system design trade-offs, and tackle system design challenges. It covers non-functional requirements, API design, distributed systems concepts, modern software building blocks (e.g., load balancers, caches, containers, etc.). Additionally, it includes case studies of common system design problems, some drawn from interview questions. Ultimately, this course helps learners become better software engineers.'
            },
            {
                name: 'Computer System Fundamentals',
                description: 'This course covers modern computer systems from a software perspective. Topics include binary data representation, machine arithmetic, assembly language, computer architecture, performance optimization, memory hierarchy and cache organization, virtual memory, Unix systems programming, network programming, and concurrency. Hardware and software interactions relevant to computer security are highlighted. Students will gain hands-on experience with these topics in a series of programming assignments.'
            },
            {
                name: 'Intro Algorithms',
                description: 'This course concentrates on the design of algorithms and the rigorous analysis of their efficiency. topics include the basic definitions of algorithmic complexity (worst case, average case); basic tools such as dynamic programming, sorting, searching, and selection; advanced data structures and their applications (such as union-find); graph algorithms and searching techniques such as minimum spanning trees, depth-first search, shortest paths, design of online algorithms and competitive analysis.'
            }
        ]
    },
    {
        name: 'Math',
        courses: [
            {
                name: 'Linear Algebra',
                description: 'Vector spaces, matrices, and linear transformations. Solutions of systems of linear equations. Eigenvalues, eigenvectors, and diagonalization of matrices. Applications to differential equations.',
            },
            {
                name: 'Discrete Mathematics & Automata Theory',
                description: 'This course provides an introduction to mathematical reasoning and discrete structures relevant to computer science. Topics include propositional and predicate logic, proof techniques including mathematical induction, sets, relations, functions, recurrences, counting techniques, simple computational models, asymptotic analysis, discrete probability, graphs, trees, and number theory.'
            }
        ]
    },
    {
        name: 'Other',
        courses: [
            {
                name: 'Professional Writing and Communication',
                description: 'This course teaches students to communicate effectively with a wide variety of specialized and non-specialized audiences. To do this, students will write proposals in response to JHU-, Baltimore-, or Maryland-based initiatives that focus on a specific area of interest. Potential topics include initiatives to improve urban sustainability, resiliency, health disparities, social justice, mental health/well-being, government/municipal services, and other relevant areas. The class emphasizes writing clearly and persuasively, leveraging evidence effectively, working with key stakeholders, creating appropriate visuals and infographics, developing oral presentation skills, working in collaborative groups, giving and receiving feedback, and simulating the real-world environment in which most communication occurs. Projects include resumes, cover letters, memos, proposals, technical reports, posters, and slides.',
            },
            {
                name: 'Introduction to Fiction and Poetry',
                description: 'An introduction to basic strategies in the writing of poetry and fiction, with readings by Baldwin, Joyce, Lahiri, Garcia Marquez, Munro, Woolf, Donne, Bishop, Brooks, Komunyakaa, Tretheway, and others. Students will learn the elements of the short story and try their hand at a variety of forms: realist, fantastical, experimental. They’ll also study the basic poetic forms and meters, from the ballad to the sonnet, iambic pentameter to free verse. Students will compose short stories and poems and workshop them in class.'
            }
        ]
    }

]


const Skills = () => {
    return (
        <Section id="about" className="bg-muted/50" >
            <Container>
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                            Skills
                        </h2>
                        <h2 className="text-lg sm:text-xl font-bold text-primary mb-6">
                            Programming Languages
                        </h2>
                        <div className="flex flex-wrap gap-2 pb-8">
                            {
                                programmingLanguages.map((language) => (
                                    <Chip key={language.name} color="primary" variant="faded">
                                        {language.name}
                                    </Chip>
                                ))
                            }
                        </div>
                        <h2 className="text-lg sm:text-xl font-bold text-primary mb-6">
                            Technologies
                        </h2>
                        <div className="flex flex-wrap gap-2 pb-8">
                            {
                                technologies.map((technology) => (
                                    <Chip key={technology.name} color="primary" variant="faded">
                                        {technology.name}
                                    </Chip>
                                ))
                            }
                        </div>
                        <h2 className="text-lg sm:text-xl font-bold text-primary mb-6">
                            Frameworks & Libraries
                        </h2>
                        <div className="flex flex-wrap gap-2 pb-8">
                            {
                                frameworks.map((framework) => (
                                    <Chip key={framework.name} color="primary" variant="faded">
                                        {framework.name}
                                    </Chip>
                                ))
                            }
                        </div>
                        <h2 className="text-lg sm:text-xl font-bold text-primary mb-6">
                            Concepts
                        </h2>
                        <div className="flex flex-wrap gap-2 pb-8">
                            {
                                concepts.map((concept) => (
                                    <Chip key={concept.name} color="primary" variant="faded">
                                        {concept.name}
                                    </Chip>
                                ))
                            }
                        </div>
                    </div>
                    <div className="">
                        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                            Education
                        </h2>
                        <h2 className="text-lg sm:text-xl font-bold text-primary mb-6">
                            Johns Hopkins University
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            B.S. Computer Science | Minor in Entrepreneurship and Management
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Expected Graduation: May 2027
                        </p>
                        <p className="text-sm text-muted-foreground mb-4">
                            GPA: 3.92
                        </p>
                        <h2 className="text-md sm:text-md font-bold text-foreground mb-6">
                            Relevant Coursework
                        </h2>
                        <Accordion>
                            {
                                courseCategories.map((category) => (
                                    <AccordionItem key={category.name} aria-label={category.name} title={category.name}>
                                                                                 <div className="flex flex-wrap gap-2 pb-4">
                                             {category.courses.map((course) => (
                                                 <Tooltip key={course.name} content={
                                                    <div className="text-sm w-64 p-2">
                                                        <p className="font-bold text-foreground pb-1">{course.name}</p>
                                                        <p className="text-muted-foreground">{course.description}</p>
                                                    </div>
                                                    }>
                                                     <Chip color="primary" variant="faded">
                                                         {course.name}
                                                     </Chip>
                                                 </Tooltip>
                                             ))}
                                         </div>
                                    </AccordionItem>
                                ))
                            }
                        </Accordion>
                    </div>
                </div>
            </Container>
        </Section >
    )
}

export default Skills;