import Section from '@/components/ui/section';
import Container from '@/components/ui/container';
import Navigation from '@/components/ui/navigation';
import Hero from '@/components/hero';
import About from '@/components/about';
import Skills from '@/components/skills';

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      {/* Projects Section */}
      <Section id="projects">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Featured Projects
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Here are some of the projects I've worked on that showcase my skills 
              and passion for creating impactful digital solutions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((project) => (
              <div key={project} className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-colors">
                <div className="h-48 bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground">Project {project} Image</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Project {project}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    A brief description of what this project accomplishes and the 
                    technologies used to build it.
                  </p>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                      React
                    </span>
                    <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                      TypeScript
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Contact Section */}
      <Section id="contact" className="bg-muted/50">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Let's Work Together
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              I'm always interested in new opportunities and exciting projects. 
              Whether you have a question or just want to say hi, feel free to reach out!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Send Message
              </button>
              <button className="px-8 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-muted transition-colors">
                Download Resume
              </button>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
