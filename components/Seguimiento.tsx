"use client";

// Seguimiento del Second Brain dentro del hub. Los datos llegan de /api/hub (descifrados en el servidor tras el login).
import { useEffect, useMemo, useState } from "react";

type Tarea = { id: string; texto: string; proyecto?: string | null; fecha?: string | null; horizonte?: string; vencida?: boolean };

const PESTANAS = [
  { id: "bitacora", nombre: "Bitácora", ayuda: "Mes → semana → día, con tareas de largo, mediano y corto plazo" },
  { id: "lista", nombre: "Lista", ayuda: "Buscar y filtrar proyectos" },
  { id: "tablero", nombre: "Tablero", ayuda: "Horas por capa, frescura y fechas" },
  { id: "grafo", nombre: "Grafo", ayuda: "Conexiones entre proyectos, personas y fuentes" },
  { id: "galeria", nombre: "Galería", ayuda: "Todo con su logo" },
] as const;
type Pestana = (typeof PESTANAS)[number]["id"];

function Vista({ v, activa }: { v: string; activa: boolean }) {
  const [cargada, setCargada] = useState(false);
  useEffect(() => { if (activa) setCargada(true); }, [activa]);
  if (!cargada) return null;
  return (
    <div className={activa ? "" : "hidden"}>
      <iframe
        src={`/api/hub/vista?v=${v}`}
        title={`Second Brain · ${v}`}
        className="w-full rounded-lg border border-rule bg-white"
        style={{ height: "82vh", minHeight: 560 }}
        sandbox="allow-scripts allow-same-origin allow-popups allow-top-navigation-by-user-activation"
      />
      <p className="text-[11px] text-text-muted mt-1">
        <a href={`/api/hub/vista?v=${v}`} target="_blank" rel="noopener" className="underline hover:text-text">Abrir en pantalla completa</a>
      </p>
    </div>
  );
}

function Norte({ e }: { e: any }) {
  const [abierto, setAbierto] = useState(false);
  if (!e) return null;
  return (
    <div className="card !p-4 mb-4">
      <button className="w-full text-left" onClick={() => setAbierto(!abierto)}>
        <p className="text-[11px] uppercase tracking-wide text-text-muted">Norte · estrategia profesional</p>
        <p className="text-text font-semibold mt-1">{e.frase}</p>
        <p className="text-xs text-text-muted mt-1">
          {e.horizonte && <>Horizonte <b className="text-text">{e.horizonte}</b>, mes {e.mes} de {e.de} · </>}
          {e.jerarquia}
          {e.dias_sin_revisar > 30 && <span className="text-accent-gold"> · sin revisar hace {e.dias_sin_revisar} días</span>}
          <span className="ml-1 underline">{abierto ? "menos" : "ver horizontes y riesgos"}</span>
        </p>
      </button>
      {abierto && (
        <div className="mt-3 pt-3 border-t border-rule/60 grid md:grid-cols-3 gap-4 text-sm">
          {(e.horizontes || []).map((h: any) => (
            <div key={h.nombre}>
              <p className={`text-xs font-semibold ${h.nombre === e.horizonte ? "text-accent-green" : "text-text-muted"}`}>{h.nombre} · {h.rango}</p>
              {h.objetivo && <p className="text-text mt-1">{h.objetivo}</p>}
              <ul className="mt-1 space-y-0.5 text-xs text-text-muted">{(h.puntos || []).map((x: string) => <li key={x}>· {x}</li>)}</ul>
            </div>
          ))}
          {e.riesgos?.length > 0 && (
            <div className="md:col-span-3 text-xs text-text-muted">Riesgos que más matan: {e.riesgos.join(" · ")}</div>
          )}
        </div>
      )}
    </div>
  );
}

function TareasHoy({ hoy }: { hoy: any }) {
  const sem: Tarea[] = Array.isArray(hoy.semana) ? hoy.semana : [];
  const mes: Tarea[] = Array.isArray(hoy.mes) ? hoy.mes : [];
  const fila = (t: Tarea) => (
    <li key={t.id} className="flex gap-2 items-baseline">
      <span className={t.vencida ? "text-red-700" : "text-text-muted"}>○</span>
      <span className="text-text">{t.texto}</span>
      {t.proyecto && <span className="text-[11px] text-text-muted">· {t.proyecto}</span>}
      {t.fecha && <span className={`text-[11px] ${t.vencida ? "text-red-700" : "text-accent-gold"}`}>· {t.fecha}</span>}
    </li>
  );
  const bloques: [string, Tarea[], string][] = [
    ["Vencidas", hoy.vencidas, "text-red-700"],
    ["Hoy", hoy.tareas_hoy, "text-accent-green"],
    ["Esta semana", sem, "text-text"],
    ["Este mes", mes, "text-text"],
  ];
  return (
    <div className="card !p-4 mb-5">
      <div className="flex flex-wrap gap-x-6 gap-y-1 mb-3 text-xs text-text-muted">
        {bloques.map(([n, l, c]) => (
          <span key={n}><b className={`text-lg mr-1 ${c}`}>{l.length}</b>{n.toLowerCase()}</span>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-x-8 gap-y-3 text-sm">
        {bloques.filter(([, l]) => l.length).slice(0, 4).map(([n, l]) => (
          <div key={n}>
            <p className="text-[11px] uppercase tracking-wide text-text-muted mb-1">{n}</p>
            <ul className="space-y-1">{l.slice(0, 6).map(fila)}</ul>
            {l.length > 6 && <p className="text-[11px] text-text-muted mt-1">y {l.length - 6} más en la bitácora</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

type Item = {
  id: string; nombre: string; etapa: string; estado: string; capa: string; prioridad?: string; area?: string;
  cliente_objetivo?: string; ciclo_contratacion?: string; ingreso_esperado?: string; ultimo_avance?: string;
  siguiente_paso?: string; limite_validacion?: string; horas_semana?: string; riesgos?: string; url?: string;
  conexiones?: { tipo: string; a: string }[]; fuente?: string;
};

const CAPAS: Record<string, string> = { "1": "Base económica", "2": "Activos", "3": "Apuestas" };
const ESTADOS = ["activo", "esperando", "pausado", "idea"];
const vacio = (v?: string) => !v || v === "—" || v === "-";
const norm = (s: unknown) => String(s ?? "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

function dias(desde?: string) {
  if (vacio(desde)) return null;
  const d = new Date(String(desde).slice(0, 10) + "T00:00:00");
  return isNaN(+d) ? null : Math.floor((Date.now() - +d) / 86400000);
}

export default function Seguimiento() {
  const [feed, setFeed] = useState<{ generado: string; excluidos_por_privacidad: number; proyectos: Item[]; hoy?: any } | null>(null);
  const [pestana, setPestana] = useState<Pestana>("bitacora");
  const [error, setError] = useState("");
  const [q, setQ] = useState("");
  const [capa, setCapa] = useState("");
  const [estado, setEstado] = useState("activo");
  const [abierto, setAbierto] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/hub", { credentials: "same-origin" })
      .then(async (r) => {
        if (r.status === 401) throw new Error("La sesión venció: sal y vuelve a entrar al hub.");
        const j = await r.json();
        if (!r.ok) throw new Error(j.error || "No se pudo cargar el seguimiento");
        setFeed(j);
      })
      .catch((e) => setError(e.message));
  }, []);

  const lista = useMemo(() => {
    if (!feed) return [];
    const ws = norm(q).split(/\s+/).filter(Boolean);
    return feed.proyectos
      .filter((p) => (!capa || p.capa === capa) && (!estado || p.estado === estado))
      .filter((p) => !ws.length || ws.every((w) => norm(Object.values(p).map((v) => (typeof v === "string" ? v : JSON.stringify(v))).join(" ")).includes(w)))
      .sort((a, b) => (a.capa + (a.prioridad || "P9")).localeCompare(b.capa + (b.prioridad || "P9")) || a.nombre.localeCompare(b.nombre));
  }, [feed, q, capa, estado]);

  const conteo = useMemo(() => {
    const c: Record<string, number> = {};
    (feed?.proyectos || []).forEach((p) => (c[p.estado] = (c[p.estado] || 0) + 1));
    return c;
  }, [feed]);

  if (error) return <p className="text-red-700 text-sm">{error}</p>;
  if (!feed) return <p className="text-text-muted text-sm">Cargando el seguimiento…</p>;

  return (
    <div>
      <Norte e={(feed as any).estrategia} />
      {feed.hoy && <TareasHoy hoy={feed.hoy} />}
      <div role="tablist" className="flex flex-wrap gap-1 mb-4 border-b border-rule">
        {PESTANAS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={pestana === t.id}
            title={t.ayuda}
            onClick={() => setPestana(t.id)}
            className={`px-3 py-2 text-sm -mb-px border-b-2 ${pestana === t.id ? "border-accent-green text-text font-semibold" : "border-transparent text-text-muted hover:text-text"}`}
          >
            {t.nombre}
          </button>
        ))}
      </div>
      {PESTANAS.filter((t) => t.id !== "lista").map((t) => (
        <Vista key={t.id} v={t.id} activa={pestana === t.id} />
      ))}
      <div className={pestana === "lista" ? "" : "hidden"}>
      <div className="flex flex-wrap gap-2 items-center mb-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar: cliente, siguiente paso, riesgo…"
          className="flex-1 min-w-[220px] px-3 py-2 bg-bg border border-rule rounded-lg text-sm text-text focus:outline-none focus:border-accent-green"
        />
        <select value={capa} onChange={(e) => setCapa(e.target.value)} className="px-3 py-2 bg-bg border border-rule rounded-lg text-sm">
          <option value="">Todas las capas</option>
          {Object.entries(CAPAS).map(([k, v]) => <option key={k} value={k}>Capa {k} · {v}</option>)}
        </select>
        <div className="flex gap-1">
          {["", ...ESTADOS].map((e) => (
            <button
              key={e || "todos"}
              onClick={() => setEstado(e)}
              className={`px-2.5 py-1.5 rounded-full text-xs border ${estado === e ? "border-accent-green text-accent-green bg-accent-green/10" : "border-rule text-text-muted"}`}
            >
              {e || "todos"}{e && conteo[e] ? ` ${conteo[e]}` : ""}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {lista.map((p) => {
          const d = dias(p.ultimo_avance);
          const viejo = d !== null && d > 30 && (p.estado === "activo" || p.estado === "esperando");
          const lim = vacio(p.limite_validacion) ? null : -(dias(p.limite_validacion) ?? 0);
          return (
            <div key={p.id} className="card !p-4">
              <button className="w-full text-left" onClick={() => setAbierto(abierto === p.id ? null : p.id)}>
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-accent-green/10 text-accent-green">C{p.capa}</span>
                  {p.prioridad && <span className="text-[10px] text-text-muted">{p.prioridad}</span>}
                  <span className="font-semibold text-text">{p.nombre}</span>
                  <span className="text-xs text-text-muted">· {p.etapa}</span>
                  {viejo && <span className="text-[10px] text-red-700">sin avance hace {d} días</span>}
                  {lim !== null && lim >= 0 && lim <= 14 && <span className="text-[10px] text-accent-gold">vence en {lim} días</span>}
                </div>
                {!vacio(p.siguiente_paso) && <p className="text-sm text-text-muted mt-1">→ {p.siguiente_paso}</p>}
              </button>
              {abierto === p.id && (
                <dl className="mt-3 pt-3 border-t border-rule/60 grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs">
                  {([
                    ["Área", p.area], ["Cliente objetivo", p.cliente_objetivo], ["Ciclo de contratación", p.ciclo_contratacion],
                    ["Ingreso esperado", p.ingreso_esperado], ["Último avance", p.ultimo_avance], ["Límite", p.limite_validacion],
                    ["Horas por semana", p.horas_semana], ["Riesgos", p.riesgos], ["URL", p.url],
                  ] as [string, string | undefined][]).filter(([, v]) => !vacio(v)).map(([k, v]) => (
                    <div key={k}><dt className="text-text-muted">{k}</dt><dd className="text-text">{v}</dd></div>
                  ))}
                  {p.conexiones && p.conexiones.length > 0 && (
                    <div className="sm:col-span-2">
                      <dt className="text-text-muted">Conexiones</dt>
                      <dd className="text-text">{p.conexiones.map((c) => `${c.tipo} → ${c.a}`).join(" · ")}</dd>
                    </div>
                  )}
                </dl>
              )}
            </div>
          );
        })}
        {!lista.length && <p className="text-text-muted text-sm">Nada con esos filtros.</p>}
      </div>
      </div>
      <p className="text-[11px] text-text-muted mt-4">
        Fuente: Second Brain · generado {feed.generado} · {feed.proyectos.length} proyectos ({feed.excluidos_por_privacidad} privados fuera del hub).
        La bitácora se edita en tu PC (<code>ABRIR-BITACORA.bat</code>); para subir los cambios: <code>ACTUALIZAR-HUB.bat</code>.
      </p>
    </div>
  );
}
