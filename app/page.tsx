import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Research from '@/components/Research';
import Timeline from '@/components/Timeline';
import Media from '@/components/Media';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      {/* En Acción va primero: el visitante ve el trabajo antes que la biografía. */}
      <Media />
      <About />
      <Projects />
      <Research />
      <Timeline />
      <Contact />
    </>
  );
}
