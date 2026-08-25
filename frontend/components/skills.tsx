'use client'

import { Chip } from "@heroui/chip";


const languages = [
    { name: 'Rust' },
    { name: 'Python' },
    { name: 'TypeScript' },
    { name: 'JavaScript' },
    { name: 'SQL' },
    { name: 'Bash' },
    { name: 'C' },
    { name: 'C++' },
    { name: 'Java' },
]

const aiMl = [
    { name: 'Vercel AI SDK' },
    { name: 'pgvector' },
    { name: 'scikit-learn' },
    { name: 'Pandas' },
    { name: 'NumPy' },
    { name: 'Claude API' },
]

const infrastructure = [
    { name: 'Kubernetes' },
    { name: 'Docker' },
    { name: 'AWS' },
    { name: 'PostgreSQL' },
    { name: 'Redis' },
    { name: 'Linux/UNIX' },
    { name: 'GitHub Actions' },
    { name: 'Nginx' },
]

const categories = [
    {
        name: 'Languages',
        skills: languages
    },
    {
        name: 'AI/ML',
        skills: aiMl
    },
    {
        name: 'Infrastructure',
        skills: infrastructure
    },
]


const Skills = () => {
    return (
        <div className="space-y-12">
            <div className="space-y-6">
                <h1 className="text-4xl sm:text-5xl lg:text-8xl font-bold text-foreground glow-white-soft">
                    Skills
                </h1>
            </div>

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
    )
}

export default Skills;