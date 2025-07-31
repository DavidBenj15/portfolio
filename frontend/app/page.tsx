import Section from '@/components/ui/section';
import Container from '@/components/ui/container';
import GridOverlay from '@/components/ui/grid-overlay';
import Hero from '@/components/hero';
import About from '@/components/about';
import Skills from '@/components/skills';
import { DotsOverlay, DotsOverlayAdvanced } from '@/components/ui/dots-overlay';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      {/* Grid overlay that spans the entire page */}
      {/* <GridOverlay /> */}
      <DotsOverlay />
      {/* <DotsOverlayAdvanced /> */}
      
      {/* Subtle gradient overlay for depth */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 20% 50%, rgba(104, 172, 229, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(104, 172, 229, 0.08) 0%, transparent 50%)
          `
        }}
      />
      
      {/* Your existing content with proper z-index */}
      <div className="relative z-10">
        <Hero />
        <About />
        <Skills />
      </div>
    </main>
  );
}
