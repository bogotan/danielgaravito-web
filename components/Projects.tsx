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
        Iniciativas en la intersección de tecnología, datos y impacto social.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.slug}
            className="group card relative overflow-hidden transition-all hover:border-accent-green/30"
          >
            <div
              className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${project.color} opacity-60 group-hover:opacity-100 transition-opacity duration-300`}
            />

            <div className="flex items-start justify-between mb-3">
              <span className="text-4xl">{project.emoji}</span>
            </div>

            <h3 className="text-lg font-bold text-text mb-1">{project.title}</h3>
            <p className="text-accent-green text-xs font-medium mb-3">
              {project.subtitle}
            </p>

            <p className="text-text-muted text-sm leading-relaxed mb-4">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-2 py-0.5 rounded-full bg-bg border border-gray-700 text-text-muted"
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
    </section>
  );
}
