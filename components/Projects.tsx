'use client';

import { useState } from 'react';
import projectsData from '@/data/projects.json';

type RoadmapStep = {
  step: number;
  title: string;
  status: 'done' | 'in_progress' | 'pending';
  owner: string;
};

type Project = {
  slug: string;
  emoji: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  color: string;
  status: string;
  statusCategory: string;
  url?: string;
  progress: number;
  owners: string[];
  roadmap: RoadmapStep[];
  blockers: string[];
  deadline: string;
};

const projects: Project[] = (projectsData as any).projects;
const lastSync: string = (projectsData as any)._meta?.lastSync || '';

const statusColors: Record<string, string> = {
  'active': 'bg-accent-green/20 text-accent-green',
  'pre-launch': 'bg-accent-blue/20 text-accent-blue',
  'writing': 'bg-accent-gold/20 text-accent-gold',
  'design': 'bg-purple-500/20 text-purple-400',
  'ideation': 'bg-pink-500/20 text-pink-400',
  'paused': 'bg-gray-500/20 text-gray-400',
};

const stepStatusIcon: Record<RoadmapStep['status'], string> = {
  done: '✅',
  in_progress: '🔄',
  pending: '⬜',
};

const stepStatusLabel: Record<RoadmapStep['status'], string> = {
  done: 'Hecho',
  in_progress: 'En curso',
  pending: 'Pendiente',
};

function RoadmapPanel({ project }: { project: Project }) {
  const doneCount = project.roadmap.filter((s) => s.status === 'done').length;
  const inProgressCount = project.roadmap.filter((s) => s.status === 'in_progress').length;
  const total = project.roadmap.length;

  return (
    <div className="mt-4 pt-4 border-t border-gray-700/60 space-y-4">
      {/* Progreso */}
      <div>
        <div className="flex items-center justify-between text-xs text-text-muted mb-1">
          <span>Progreso · {doneCount}/{total} pasos</span>
          <span>{project.progress}%</span>
        </div>
        <div className="h-1.5 w-full bg-bg rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${project.color} transition-all duration-500`}
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      {/* Cómo terminarlo */}
      <div>
        <h4 className="text-sm font-semibold text-text mb-2">
          Cómo terminarlo
          {inProgressCount > 0 && (
            <span className="ml-2 text-[10px] text-accent-green">· {inProgressCount} en curso</span>
          )}
        </h4>
        <ol className="space-y-1.5">
          {project.roadmap.map((s) => (
            <li
              key={s.step}
              className={`flex items-start gap-2 text-xs ${
                s.status === 'done' ? 'text-text-muted line-through opacity-60' : 'text-text-muted'
              }`}
            >
              <span className="flex-shrink-0 mt-0.5">{stepStatusIcon[s.status]}</span>
              <div className="flex-1">
                <span className="text-text">{s.step}. {s.title}</span>
                <div className="text-[10px] text-text-muted mt-0.5">
                  <span className="opacity-75">{stepStatusLabel[s.status]}</span>
                  <span className="mx-1">·</span>
                  <span>{s.owner}</span>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Bloqueos */}
      {project.blockers && project.blockers.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-red-400 mb-1.5">⛔ Bloqueos activos</h4>
          <ul className="space-y-1 text-xs text-text-muted">
            {project.blockers.map((b, i) => (
              <li key={i}>— {b}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Deadline + owners */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-text-muted pt-1">
        {project.deadline && project.deadline !== 'continuo' && (
          <span>📅 <span className="text-text">Meta:</span> {project.deadline}</span>
        )}
        <span>👥 {project.owners.join(' · ')}</span>
      </div>
    </div>
  );
}

export default function Projects() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="proyectos" className="section-container">
      <h2 className="section-title">
        <span className="gradient-text">Proyectos</span>
      </h2>
      <p className="text-text-muted text-lg mb-2 max-w-2xl">
        Iniciativas en la intersección de tecnología, datos y impacto social.
        Cada proyecto incluye los pasos concretos para llegar a la línea de meta.
      </p>
      {lastSync && (
        <p className="text-[11px] text-text-muted mb-10 opacity-75">
          Sincronizado desde ELEFANTE · última actualización {lastSync}
        </p>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => {
          const isOpen = expanded === project.slug;
          return (
            <div
              key={project.slug}
              className="group card relative overflow-hidden transition-all"
            >
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${project.color} opacity-60 group-hover:opacity-100 transition-opacity duration-300`}
              />

              <div className="flex items-start justify-between mb-3">
                <span className="text-4xl">{project.emoji}</span>
                <span
                  className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                    statusColors[project.statusCategory] || 'bg-gray-500/20 text-gray-400'
                  }`}
                >
                  {project.status}
                </span>
              </div>

              <h3 className="text-lg font-bold text-text mb-1">{project.title}</h3>
              <p className="text-accent-green text-xs font-medium mb-3">
                {project.subtitle}
              </p>

              <p className="text-text-muted text-sm leading-relaxed mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-3">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-bg border border-gray-700 text-text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Toggle roadmap */}
              <button
                type="button"
                onClick={() => setExpanded(isOpen ? null : project.slug)}
                className="w-full mt-2 text-xs font-medium text-accent-green hover:text-accent-gold transition-colors flex items-center justify-between"
                aria-expanded={isOpen}
              >
                <span>{isOpen ? 'Ocultar roadmap' : 'Ver cómo terminarlo'}</span>
                <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                  ▾
                </span>
              </button>

              {isOpen && <RoadmapPanel project={project} />}
            </div>
          );
        })}
      </div>
    </section>
  );
}
