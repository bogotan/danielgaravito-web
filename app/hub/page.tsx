"use client";

import { useState } from "react";
import Link from "next/link";
import projectsData from "@/data/projects.json";
import { useAdminAuth } from "@/components/AdminAuth";

type RoadmapStep = {
  step: number;
  title: string;
  status: "done" | "in_progress" | "pending";
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
  public?: boolean;
};

const allProjects: Project[] = (projectsData as any).projects;
const lastSync: string = (projectsData as any)._meta?.lastSync || "";

const statusColors: Record<string, string> = {
  active: "bg-accent-green/20 text-accent-green",
  "pre-launch": "bg-accent-blue/20 text-accent-blue",
  writing: "bg-accent-gold/20 text-accent-gold",
  design: "bg-purple-500/20 text-purple-400",
  ideation: "bg-pink-500/20 text-pink-400",
  paused: "bg-gray-500/20 text-gray-400",
};

const stepIcon: Record<RoadmapStep["status"], string> = {
  done: "\u2705",
  in_progress: "\ud83d\udd04",
  pending: "\u2b1c",
};

function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const doneCount = project.roadmap.filter((s) => s.status === "done").length;
  const inProgressCount = project.roadmap.filter((s) => s.status === "in_progress").length;
  const total = project.roadmap.length;

  return (
    <div className="card relative overflow-hidden">
      <div
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${project.color} opacity-70`}
      />
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{project.emoji}</span>
          <div>
            <h3 className="text-lg font-bold text-text">{project.title}</h3>
            <p className="text-accent-green text-xs font-medium">{project.subtitle}</p>
          </div>
        </div>
        <span
          className={`text-[10px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${
            statusColors[project.statusCategory] || "bg-gray-500/20 text-gray-400"
          }`}
        >
          {project.status}
        </span>
      </div>

      <p className="text-text-muted text-sm leading-relaxed mb-3">{project.description}</p>

      <div className="mb-3">
        <div className="flex items-center justify-between text-xs text-text-muted mb-1">
          <span>Progreso {total > 0 ? `${doneCount}/${total} pasos` : ""}</span>
          <span>{project.progress}%</span>
        </div>
        <div className="h-1.5 w-full bg-bg rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${project.color} transition-all duration-500`}
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

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

      <div className="flex items-center gap-3 flex-wrap text-[11px] text-text-muted mb-2">
        {project.deadline && project.deadline !== "continuo" && (
          <span>\ud83d\udcc5 {project.deadline}</span>
        )}
        <span>\ud83d\udc65 {project.owners.join(" \u00b7 ")}</span>
        {project.public === false && (
          <span className="text-accent-gold">\ud83d\udd12 No público</span>
        )}
      </div>

      {project.url && (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-accent-blue hover:text-accent-gold transition-colors mb-3"
        >
          Ir al proyecto \u2192
        </a>
      )}

      {total > 0 && (
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="w-full mt-2 text-xs font-medium text-accent-green hover:text-accent-gold transition-colors flex items-center justify-between"
        >
          <span>
            {open ? "Ocultar roadmap" : "Ver cómo terminarlo"}
            {inProgressCount > 0 && !open && (
              <span className="ml-2 text-[10px] text-accent-green">\u00b7 {inProgressCount} en curso</span>
            )}
          </span>
          <span className={`transform transition-transform ${open ? "rotate-180" : ""}`}>\u25be</span>
        </button>
      )}

      {open && (
        <div className="mt-3 pt-3 border-t border-gray-700/60 space-y-3">
          <ol className="space-y-1.5">
            {project.roadmap.map((s) => (
              <li
                key={s.step}
                className={`flex items-start gap-2 text-xs ${
                  s.status === "done" ? "text-text-muted line-through opacity-60" : "text-text-muted"
                }`}
              >
                <span className="flex-shrink-0 mt-0.5">{stepIcon[s.status]}</span>
                <div className="flex-1">
                  <span className="text-text">
                    {s.step}. {s.title}
                  </span>
                  <div className="text-[10px] text-text-muted mt-0.5">
                    <span className="opacity-75">{s.status}</span>
                    <span className="mx-1">\u00b7</span>
                    <span>{s.owner}</span>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          {project.blockers && project.blockers.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-red-400 mb-1.5">\u26d4 Bloqueos</h4>
              <ul className="space-y-1 text-xs text-text-muted">
                {project.blockers.map((b, i) => (
                  <li key={i}>\u2014 {b}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const fuerzaGAgents = [
  { g: "Orquestación", items: ["G — Directora de Orquesta"] },
  {
    g: "Divergencia y captura",
    items: ["JAGUAR — Captura salvaje", "ARAÑA — Analogía cruzada", "JAGUAR/ELEFANTE sync"],
  },
  {
    g: "Investigación y contexto",
    items: ["BÚHO — Investigación profunda", "CUERVO — Recolección de recursos", "LECHUZA — Transcripción + OCR", "ARDILLA — WhatsApp", "SURICATA — Actualidad", "GOLONDRINA — Benchmark internacional", "CÓNDOR — Futurología"],
  },
  {
    g: "Estrategia y carrera",
    items: ["ÁGUILA — Carrera + finanzas", "PAVO REAL — Marca personal", "ORCA — Economía salud", "TOPO — ROI proyectos", "JEFE — Avatar Director General ADRES"],
  },
  {
    g: "Tribunal y riesgos",
    items: ["HATER — Devil\u2019s advocate", "DANNY G — Defensor", "DIOS — Juez supremo", "ESCORPIÓN — Pre-mortem", "BÚFALO — Compliance legal"],
  },
  {
    g: "Construcción y publicación",
    items: ["PULPO — Materializa código", "HORMIGA — Escritura", "FÉNIX — Multimedia", "COLIBRÍ — Growth", "LORO — Publicación redes", "MANTIS  Datos y dashboards"],
  },
  {
    g: "Operaciones y gestión",
    items: ["ABEJA — Proyectos + Sprints", "LINCE — QA de outputs", "TEJÓN — Archivos y orden", "ELEFANTE — Memoria persistente", "TORTUGA — Backups", "MAPACHE — Compras inteligentes"],
  },
  {
    g: "Seguridad y privacidad",
    items: ["CANCERBERO — Privacidad C0\u2192C3 (Liam)", "ERIZO — Ciberseguridad + Default Deny", "GUARDIÁN — Memoria sesión", "ÁNGEL — Guardián motivacional (vive en G)"],
  },
  {
    g: "ADRES sub-squads",
    items: ["HALCÓN — Planeación analítica", "CAMALEÓN — Revisión por capas", "ZORRO — Design Thinking", "CASTOR — Deploy + DevOps", "NUTRIA — DataOps y gobernanza", "LOBO — Gestión de equipo"],
  },
];

export default function HubPage() {
  const { logout } = useAdminAuth();

  return (
    <div className="section-container max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-4xl font-bold gradient-text">Hub</h1>
          <p className="text-text-muted text-sm">Tu panel de control privado \u2014 danielgaravito.co/hub</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" className="text-text-muted text-sm hover:text-text transition-colors">
            \u2190 Volver al sitio
          </Link>
          <button
            onClick={logout}
            className="text-text-muted hover:text-red-400 text-sm transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
      {lastSync && (
        <p className="text-[11px] text-text-muted opacity-75 mb-10">
          Proyectos sincronizados desde ELEFANTE \u00b7 última actualización {lastSync}
        </p>
      )}

      <nav className="flex flex-wrap gap-2 mb-10">
        <a href="#proyectos" className="text-xs px-3 py-1.5 rounded-full bg-bg-secondary border border-gray-700 hover:border-accent-green text-text-muted hover:text-text transition-colors">
          \ud83d\udccb Proyectos
        </a>
        <a href="#fuerzag" className="text-xs px-3 py-1.5 rounded-full bg-bg-secondary border border-gray-700 hover:border-accent-green text-text-muted hover:text-text transition-colors">
          \ud83c\udfbc FuerzaG v5.2.1
        </a>
        <a href="#gracias" className="text-xs px-3 py-1.5 rounded-full bg-bg-secondary border border-gray-700 hover:border-accent-green text-text-muted hover:text-text transition-colors">
          \ud83d\ude4f Gracias
        </a>
        <a href="/admin" className="text-xs px-3 py-1.5 rounded-full bg-bg-secondary border border-gray-700 hover:border-accent-green text-text-muted hover:text-text transition-colors">
          \ud83d\udcc8 Leads / Admin
        </a>
        <a href="/admin/metrics" className="text-xs px-3 py-1.5 rounded-full bg-bg-secondary border border-gray-700 hover:border-accent-green text-text-muted hover:text-text transition-colors">
          \ud83d\udcca Métricas
        </a>
      </nav>

      {/* Proyectos */}
      <section id="proyectos" className="mb-16">
        <h2 className="text-2xl font-bold text-text mb-2">Proyectos</h2>
        <p className="text-text-muted text-sm mb-6">
          Vista completa con estado, roadmap y bloqueos \u2014 privada. Los marcados \ud83d\udd12 no son públicos.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allProjects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>

      {/* FuerzaG docs */}
      <section id="fuerzag" className="mb-16">
        <h2 className="text-2xl font-bold text-text mb-2">FuerzaG v5.2.1 \u2014 documentacin</h2>
        <p className="text-text-muted text-sm mb-6">
          Tu sistema de 43 agentes especializados. Esta vista es un índice \u2014 para más detalle, ver C:\\Agentes Garavito\\FuerzaG.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {fuerzaGAgents.map((grp) => (
            <div key={grp.g} className="card">
              <h3 className="text-sm font-bold text-accent-green mb-2">{grp.g}</h3>
              <ul className="space-y-1 text-xs text-text-muted">
                {grp.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-6 text-xs text-text-muted space-y-2 p-4 rounded-lg bg-bg-secondary border border-gray-800">
          <p><strong className="text-text">Núcleo v5.2.1:</strong> 43 agentes. Reglas: Liam &gt; Salud del pas &gt; Carrera &gt; Dinero.</p>
          <p><strong className="text-text">Regla #18 (Anti-wrong-chat):</strong> G detecta saltos de tema y pregunta antes de ejecutar acciones irreversibles.</p>
          <p><strong className="text-text">Anti-fragmentación:</strong> Máximo 3 proyectos en Materializar simultneamente.</p>
          <p><strong className="text-text">Puerta CANCERBERO:</strong> Antes de publicar, valida C0-C3. Liam es C3 siempre.</p>
        </div>
      </section>

      {/* Gracias */}
      <section id="gracias">
        <h2 className="text-2xl font-bold text-text mb-2">Gracias</h2>
        <p className="text-text-muted text-sm mb-6">Borrador privado \u2014 mejorar antes de publicar. Tarea registrada.</p>

        <div className="relative rounded-2xl overflow-hidden border border-accent-gold/20 bg-gradient-to-br from-accent-gold/5 via-bg-secondary to-accent-green/5 p-8 md:p-12">
          <div className="border-l-4 border-accent-gold pl-5 mb-10">
            <p className="text-text italic text-base md:text-lg leading-relaxed">
              \u201cLas miserias del mundo están ahí, y sólo hay dos modos de reaccionar ante ellas:
              o entender que uno no tiene la culpa y por tanto encogerse de hombros y decir que no está
              en sus manos remediarlo y esto es cierto, o bien asumir que, aun cuando no está en
              nuestras manos resolverlo, hay que comportarnos como si así lo fuera.\u201d
            </p>
            <p className="text-text-muted text-sm mt-3">
              \u2014 <span className="font-semibold text-text">José Saramago</span>, <em>La Jornada</em>, México \u00b7 3 de diciembre de 1998
            </p>
          </div>

          <h3 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="gradient-text">Gracias</span>
          </h3>
          <p className="text-text-muted text-sm mb-6">Por la bendita coincidencia.</p>

          <div className="text-text leading-relaxed space-y-4">
            <p>
              Nada de lo que aparece arriba hubiera pasado sin una <strong>cadena absurda de coincidencias benditas</strong>.
            </p>

            <p className="text-text-muted">
              Sin una profe del colegio que me puso en la cabeza que podía.<br/>
              Sin un papá maravilloso al que extraño cada día y al que solo quiero hacerle justicia.<br/>
              Sin una mamá que me enseñó a no rendirme y a ser recursivo.<br/>
              Sin un par de amigos que me dijeron <em>\u201cDanny, ese pitch está bueno, mándalo\u201d</em>.<br/>
              Sin una suerte inmerecida de haber nacido en Colombia.
            </p>

            <p>
              Si hay algo de mérito, es pequeño. A eso vinimos: a crecer y a servir. Si hay mérito, es haber dicho
              <em> sí </em>cuando tocaba, haberme quedado despierto cuando tocaba, y haber sabido a quién agradecer cuando ganamos.
            </p>

            <div className="pt-3 space-y-2">
              <p>Gracias al equipo de <strong>EducALL</strong> \u2014 David, Cristian, Natty, Sandra, Yei, Zu, y a todos los que han llamado para educar.</p>
              <p>Gracias a la gente de <strong>ADRES</strong> que cree que los datos pueden sanar un sistema.</p>
              <p>Gracias a <strong>Liam</strong>, que me despertó y me está enseñando a vivir de verdad.</p>
              <p>Gracias a <strong>Colombia</strong>, por ser la tierra prometida \u2014 solo necesitamos vencer la desigualdad y la indiferencia. Sigue siendo un laboratorio de esperanza.</p>
            </div>

            <p className="pt-4">
              Y gracias a ti, que llegaste hasta acá scrolleando.<br/>
              Si algo de lo que hice te sirve \u2014 úsalo. Ese es el pago.
            </p>

            <p className="text-right pt-4 text-accent-gold font-semibold">\u2014 Danny G</p>
          </div>
        </div>
      </section>
    </div>
  );
}
