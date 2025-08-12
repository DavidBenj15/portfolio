import Hero from '@/components/hero';
import About from '@/components/about';
import Skills from '@/components/skills';
import PageWrapper from '@/components/ui/page-wrapper';
import Layout from '@/app/layout';

export default function Home() {

  return (
      <PageWrapper>
        <Hero />
        {/* <About /> */}
        <Skills />
      </PageWrapper>
  );
}
