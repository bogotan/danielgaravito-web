'use client';

import projectsData from '@/data/projects.json';

type Project = {
  slug: string;
  emoji: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  color: string;
  url?: string;
  public?: boolean;
};

const allProjects: Project[] = (projectsData as any).projects;
// Vista pública: solo los que tienen public===true (Tesis/Furiosa/Metro 22 ocultos)
const projects = allProjects.filter((p) => p.public !== false);

export default function Projects() {
  return (
    <section id="proyectos" className="section-container">
      <h2 className="section-title">
        <span className="gradient-text">Proyectos</span>
      </h2>
      <p className="text-text-muted text-lg mb-10 max-w-2xl">
        Cosas que construí y que siguen vivas: un juego serio, una plataforma
        de formación, libros. Los estudios están más abajo, en{' '}
        <a
          href="#investigacion"
          className="text-accent-green hover:text-accent-gold underline underline-offset-4 transition-colors"
        >
          Investigación
        </a>
        .
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.slug}
            className="group card relative overflow-hidden"
          >
            {/* Se fueron dos cosas: el emoji de 36 px y la barra de color
                distinta en cada tarjeta. El emoji sigue en projects.json
                —ese archivo lo escribe el sync, no la mano— pero la vista ya
                no lo pinta. Las tarjetas ahora se distinguen por lo que
                dicen, no por el color de su borde. */}
            <h3 className="font-serif text-xl text-text mb-1.5">{project.title}</h3>
            <p className="text-text-muted text-xs uppercase tracking-[0.12em] mb-4">
              {project.subtitle}
            </p>

            <p className="text-text-muted text-sm leading-relaxed mb-4">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-2 py-0.5 rounded-full bg-bg border border-rule text-text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>

            {project.url && project.url.length > 0 && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-green hover:text-accent-gold transition-colors"
              >
                Ver proyecto
                <span aria-hidden>→</span>
              </a>
            )}
          </div>
        ))}
      </div>

      <aside className="mt-10 card border-accent-blue/30 bg-gradient-to-br from-accent-blue/5 to-transparent">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent-blue mb-2">
          ¿Busca contratar?
        </p>
        <h3 className="text-lg font-bold text-text mb-2">
          La consultoría y los productos viven en Sinergística
        </h3>
        <p className="text-text-muted text-sm leading-relaxed mb-4 max-w-2xl">
          MÉDULA —gestión industrial de la información para prestadores—, el
          taller <em>El Rezago</em>, la auditoría de una cifra y la formación
          ejecutiva se contratan a través de Sinergística S.A.S., la casa desde
          la que trabajo. Esta página guarda la otra mitad: la investigación, las
          columnas, los libros y las charlas, que son de autoría personal y se
          publican con fuentes abiertas.
        </p>
        <a
          href="https://sinergistica.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-blue hover:text-accent-gold transition-colors"
        >
          Ver el portafolio de Sinergística
          <span aria-hidden>↗</span>
        </a>
      </aside>
    </section>
  );
}
