import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Publications from '@/components/Publications';
import Timeline from '@/components/Timeline';
import Media from '@/components/Media';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Publications />
      <Timeline />
      <Media />
      <Contact />
    </>
  );
}
