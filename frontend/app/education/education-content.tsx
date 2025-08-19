'use client'

import { Divider } from "@heroui/divider";
import { Chip } from "@heroui/chip";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "@heroui/modal";
import { useDisclosure } from "@heroui/use-disclosure";
import { Button } from "@heroui/button";
import { useState } from "react";

const courseCategories = [
    {
        name: 'Computer Science',
        courses: [
            {
                name: 'Artificial Intelligence',
                description: 'This course is recommended for scientists and engineers with a genuine curiosity about the fundamental obstacles in getting machines to perform tasks such as deduction, learning, planning and navigation. It covers methods for automated reasoning, automatic problem solvers and planners, knowledge representation mechanisms, game playing, machine learning, and statistical pattern recognition.',
                code: 'EN.601.464'
            },
            {
                name: 'Software System Design',
                description: 'This course introduces modern software systems design, with an emphasis on how to design large-scale systems, assess common system design trade-offs, and tackle system design challenges. It covers non-functional requirements, API design, distributed systems concepts, modern software building blocks (e.g., load balancers, caches, containers, etc.). Additionally, it includes case studies of common system design problems, some drawn from interview questions. Ultimately, this course helps learners become better software engineers.',
                code: 'EN.601.425'
            },
            {
                name: 'Computer System Fundamentals',
                description: 'This course covers modern computer systems from a software perspective. Topics include binary data representation, machine arithmetic, assembly language, computer architecture, performance optimization, memory hierarchy and cache organization, virtual memory, Unix systems programming, network programming, and concurrency. Hardware and software interactions relevant to computer security are highlighted. Students will gain hands-on experience with these topics in a series of programming assignments.',
                code: 'EN.601.229'
            },
            {
                name: 'Intro Algorithms',
                description: 'This course concentrates on the design of algorithms and the rigorous analysis of their efficiency. topics include the basic definitions of algorithmic complexity (worst case, average case); basic tools such as dynamic programming, sorting, searching, and selection; advanced data structures and their applications (such as union-find); graph algorithms and searching techniques such as minimum spanning trees, depth-first search, shortest paths, design of online algorithms and competitive analysis.',
                code: 'EN.600.433'
            },
            {
                name: 'Data Structures',
                description: 'This course covers the design, implementation and efficiencies of data structures and associated algorithms, including arrays, stacks, queues, linked lists, binary trees, heaps, balanced trees and graphs. Other topics include sorting, hashing, Java generics, and unit testing. Course work involves both written homework and Java programming assignments.',
                code: 'EN.601.226'
            },
            {
                name: 'Intermediate Programming',
                description: 'This course teaches intermediate to advanced programming, using C and C++. We will cover low-level programming techniques, as well as object-oriented class design, and the use of class libraries. Specific topics include pointers, dynamic memory allocation, polymorphism, overloading, inheritance, templates, collections, exceptions, and others as time permits. Students are expected to learn syntax and some language specific features independently. Course work involves significant programming projects in both languages.',
                code: 'EN.601.220'
            },
            {
                name: 'Full-Stack JavaScript',
                description: 'This course will teach you programming in JavaScript and introduce you to several JavaScript frameworks that would enable you to build modern web, cross-platform desktop, and native/hybrid mobile applications. A student who successfully completes this course will be on the expedited path to becoming a full-stack JavaScript developer.',
                code: 'EN.601.280'
            },
            {
                name: 'Introduction to Deep Learning for Medical Imaging',
                description: 'This course provides a comprehensive overview of AI in medical imaging, covering classification, segmentation, and the use of different data types and modalities. It explores deep learning techniques with PyTorch, algorithms for medical segmentation, preprocessing and data augmentation, synthetic data generation, domain adaptation, bias and uncertainty handling, limited supervision learning, emerging architectures, and the applications of clinical AI in research and practice, including enhancing diagnosis, treatment, and patient outcomes.',
                code: 'EN.500.111',
            },
            {
                name: 'Studying the Brain with Neural Data Science',
                description: 'This course equips students with the skills to analyze and interpret neural data using advanced computational techniques. Students will work with real-world neural data to extract scientific insights, while focusing on computational methods such as machine learning, dimensionality reduction, regression models, and dynamical systems',
                code: 'EN.500.312'
            },
            {
                name: 'Scientific Computing',
                description: 'Students will learn to work in the Unix environment, and write bash shells scripts. They will learn to program using the Python programming language, including Python libraries for graphing, fitting and for numerical and statistical computing, such as NumPy, SciPy, and Matplotlib. At the end of the semester, students will complete a project coupling all components of the semester together. Brief lectures followed by extensive hands-on computer laboratories with examples from many disciplines.',
                code: 'AS.250.205'
            },
            {
                name: 'Gateway Computing: JAVA',
                description: 'This course introduces fundamental programming concepts and techniques, and is intended for all who plan to develop computational artifacts or intelligently deploy computational tools in their studies and careers. Topics covered include the design and implementation of algorithms using variables, control structures, arrays, functions, files, testing, debugging, and structured program design. Elements of object-oriented programming. algorithmic efficiency and data visualization are also introduced. Students deploy programming to develop working solutions that address problems in engineering, science and other areas of contemporary interest that vary from section to section.',
                code: 'EN.500.112'
            }
        ]
    },
    {
        name: 'Math',
        courses: [
            {
                name: 'Linear Algebra',
                description: 'Vector spaces, matrices, and linear transformations. Solutions of systems of linear equations. Eigenvalues, eigenvectors, and diagonalization of matrices. Applications to differential equations.',
                code: 'AS.110.201'
            },
            {
                name: 'Discrete Mathematics & Automata Theory',
                description: 'This course provides an introduction to mathematical reasoning and discrete structures relevant to computer science. Topics include propositional and predicate logic, proof techniques including mathematical induction, sets, relations, functions, recurrences, counting techniques, simple computational models, asymptotic analysis, discrete probability, graphs, trees, and number theory.',
                code: 'EN.601.230'
            },
            {
                name: 'Calculus III',
                description: 'This is a course in the calculus of functions of more than one independent variable. Topics include the analytic geometry of the graphs of either scalar or vector-valued functions, limits, continuity, partial derivatives and their applications, including optimization, multiple integrals, including line and surface integrals, and the big three theorems of Green, Stokes, and Gauss.',
                code: 'AS.110.202'
            },
            {
                name: 'Probability and Statistics',
                description: 'This is an introduction to statistics aimed at students in the life sciences. The course will provide the necessary background in probability with treatment of independence, Bayes theorem, discrete and continuous random variables and their distributions. The statistical topics covered will include sampling and sampling distributions, confidence intervals and hypothesis testing for means, comparison of populations, analysis of variance, linear regression and correlation. Analysis of data will be done using Excel.',
                code: 'EN.553.211'
            },
        ]
    },
    {
        name: 'Other Favorites',
        courses: [
            {
                name: 'Professional Writing and Communication',
                description: 'This course teaches students to communicate effectively with a wide variety of specialized and non-specialized audiences. To do this, students will write proposals in response to JHU-, Baltimore-, or Maryland-based initiatives that focus on a specific area of interest. Potential topics include initiatives to improve urban sustainability, resiliency, health disparities, social justice, mental health/well-being, government/municipal services, and other areas. The class emphasizes writing clearly and persuasively, leveraging evidence effectively, working with key stakeholders, creating appropriate visuals and infographics, developing oral presentation skills, working in collaborative groups, giving and receiving feedback, and simulating the real-world environment in which most communication occurs. Projects include resumes, cover letters, memos, proposals, technical reports, posters, and slides.',
                code: 'EN.661.110'
            },
            {
                name: 'Introduction to Fiction and Poetry',
                description: 'An introduction to basic strategies in the writing of poetry and fiction, with readings by Baldwin, Joyce, Lahiri, Garcia Marquez, Munro, Woolf, Donne, Bishop, Brooks, Komunyakaa, Tretheway, and others. Students will learn the elements of the short story and try their hand at a variety of forms: realist, fantastical, experimental. They\'ll also study the basic poetic forms and meters, from the ballad to the sonnet, iambic pentameter to free verse.Students will compose short stories and poems and workshop them in class.',
                code: 'AS.220.105'
            },
            {
                name: 'Computing Through the Ages',
                description: 'This course takes the student through 2000 year journey of computing and computing hardware architectures from the Salamis Tablet, the Chinese Suanpan, the Incas Yupana, Babbage Analytical engine, personal computers, and smart phones to modern data center computing machinery.',
                code: 'EN.501.112'
            },
            {
                name: 'Human Origins',
                description: 'This course examines the origins of human structure, function and behavior from an evolutionary perspective. It includes study of the evolution, behavior and behavioral ecology of nonhuman primates, hominid evolution (including the paleontological and archaeological records), and the origins of human cognition, social behavior and culture.',
                code: 'AS.290.101'
            }
        ]
    }
]

export default function EducationContent() {
    const [selectedCourse, setSelectedCourse] = useState<{
        name: string;
        description: string;
        code: string;
    } | null>(null);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleChipClick = (course: { name: string; description: string; code: string }) => {
        setSelectedCourse(course);
        onOpen();
    };

    return (
        <div className="space-y-12">
            {/* Header Section */}
            <div className="space-y-6">
                <h1 className="text-4xl sm:text-5xl lg:text-8xl font-bold text-foreground glow-white-soft">
                    Education
                </h1>

                {/* University Info */}
                <div className="space-y-3">
                    <h2 className="text-2xl sm:text-3xl font-semibold text-primary">
                        Johns Hopkins University
                    </h2>
                    <div className="space-y-1">
                        <p className="text-base sm:text-lg text-foreground font-medium">
                            B.S. Computer Science | Minor in Entrepreneurship and Management
                        </p>
                        <div className="flex flex-col sm:flex-row sm:gap-6 gap-1 text-sm text-muted-foreground">
                            <p>Expected Graduation: May 2027</p>
                            <p>GPA: 3.92</p>
                        </div>
                    </div>
                </div>
            </div>

            <Divider className="my-8" />

            {/* Coursework Section */}
            <div className="space-y-8">
                <div className="space-y-3">
                    <h2 className="text-xl sm:text-2xl font-semibold text-primary">
                        Relevant Coursework
                    </h2>
                    <p className="text-base text-muted-foreground leading-relaxed">
                        Click on a course to see what I'm learning about!
                    </p>
                </div>


                <div className="space-y-10">
                    {courseCategories.map((category) => (
                        <div key={category.name} className="space-y-4">
                            <h3 className="text-lg sm:text-xl font-semibold text-foreground border-l-4 border-primary pl-4">
                                {category.name}
                            </h3>
                            <div className="flex flex-wrap gap-2.5 pl-4">
                                {category.courses.map((course) => (
                                    <Chip
                                        key={course.name}
                                        className="cursor-pointer bg-muted text-foreground hover:bg-accent transition-all duration-200 hover:scale-105"
                                        variant="solid"
                                        size="md"
                                        onClick={() => handleChipClick(course)}
                                    >
                                        {course.name}
                                    </Chip>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 pb-4">
                                <h3 className="text-xl font-semibold">{selectedCourse?.name}</h3>
                                <p className="text-base text-muted-foreground leading-relaxed">
                                    {selectedCourse?.code}
                                </p>
                            </ModalHeader>
                            <ModalBody className="py-6">
                                <p className="text-base text-muted-foreground leading-relaxed">
                                    {selectedCourse?.description}
                                </p>
                            </ModalBody>
                            <ModalFooter className="pt-4">
                                <Button
                                    color="primary"
                                    variant="light"
                                    onPress={onClose}
                                >
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}
