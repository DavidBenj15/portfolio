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
    </main>
  );
}
