import SectionWithGrid from '@/components/ui/section-with-grid';
import Hero from '@/components/hero';
import About from '@/components/about';
import Skills from '@/components/skills';
import PageWrapper from '@/components/ui/page-wrapper';

export default function HomeWithSectionGrids() {
  return (
    <PageWrapper>
      
      <SectionWithGrid gridIntensity={0.08} gridSize={50}>
        <Hero />
      </SectionWithGrid>
      
      <SectionWithGrid gridIntensity={0.04} gridSize={30}>
        <About />
      </SectionWithGrid>
      
      <SectionWithGrid gridIntensity={0.06} gridSize={40}>
        <Skills />
      </SectionWithGrid>
    </PageWrapper>
  );
} 