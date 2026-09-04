import Link from 'next/link';

interface Column {
  title: string;
  url: string;
  date: string; // ISO
  dateLabel: string;
  summary: string;
}

// Columnas publicadas en CONSULTORSALUD. Fuente autoritativa: la página de cada
// columna. Las fechas corresponden al sello de publicación del sitio.
const columns: Column[] = [
  {
    title: 'Siete pilares, un cuatrienio y una vara común',
    url: 'https://consultorsalud.com/siete-pilares-un-cuatrienio-y-una-vara-comun/',
    date: '2026-08-10',
    dateLabel: '10 ago 2026',
    summary:
      'Si la salud ha sido una inversión durante tres décadas, ¿dónde está el retorno? El BID lo cifra: hasta 4,5 años de vida sobre la mesa. Si «¿De quién es la culpa?» fue el diagnóstico, este es el plan de manejo.',
  },
  {
    title:
      'El precio que nunca envejece: por qué la tecnología médica madura se sigue pagando como si fuera nueva',
    url: 'https://consultorsalud.com/precio-que-nunca-envejece-tecnologia/',
    date: '2026-07-21',
    dateLabel: '21 jul 2026',
    summary:
      'Subir un precio regulado es un trámite; bajarlo, un problema técnico y político. La curva de aprendizaje que Theodore Wright describió en 1936, aplicada a un tarifario que solo sabe multiplicar.',
  },
  {
    title:
      '¿De quién es la culpa de la crisis del sistema de salud? Por qué es la pregunta equivocada',
    url: 'https://consultorsalud.com/culpa-crisis-del-sistema-de-salud/',
    date: '2026-07-02',
    dateLabel: '2 jul 2026',
    summary:
      'El sistema no se diagnostica con indicadores subrogados. Buscar culpables reemplaza el método que dice cómo está, a dónde debe llegar y cómo llevarlo allí.',
  },
  {
    title:
      'De la opacidad a la transparencia: por qué la interoperabilidad es la mejor inversión que el sistema de salud puede hacer en sí mismo',
    url: 'https://consultorsalud.com/opacidad-transparencia-interoperabilidad-salud/',
    date: '2026-06-22',
    dateLabel: '22 jun 2026',
    summary:
      'Un sistema que no puede verse a sí mismo no puede corregirse. La interoperabilidad no es un proyecto de tecnología: es la condición para saber qué está pasando.',
  },
  {
    title: 'La crisis que siempre vuelve: anatomía de una regularidad',
    url: 'https://consultorsalud.com/la-crisis-que-siempre-vuelve-anatomia-de-una-regularidad/',
    date: '2026-06-18',
    dateLabel: '18 jun 2026',
    summary:
      'El Seguro Social en los 2000, los recobros en 2009, la intervención de 2011, los años que siguieron. La crisis no es un accidente que se repite: es una regularidad con anatomía propia.',
  },
  {
    title: 'La trampa de la intervención: por qué cambiar la cúpula no cambia la organización',
    url: 'https://consultorsalud.com/ntervenciones-supersalud-eps-fracasar/',
    date: '2026-04-30',
    dateLabel: '30 abr 2026',
    summary:
      'Il Gattopardo leído desde la teoría de las organizaciones: cambiar a los de arriba sin tocar los planos profundos donde se decide es la transformación que no transforma nada.',
  },
  {
    title: 'La IA dejó de vivir en la nube',
    url: 'https://consultorsalud.com/la-ia-dejo-de-vivir-en-la-nube/',
    date: '2026-04-27',
    dateLabel: '27 abr 2026',
    summary:
      'La inteligencia artificial local y de código abierto ya existe. Lo urgente es aplicarla a problemas reales latinoamericanos, no esperar la tecnología que viene.',
  },
  {
    title: 'La paradoja del facilismo en la política pública de salud',
    url: 'https://consultorsalud.com/paradoja-del-facilismo-politica-publica-salud/',
    date: '2026-04-22',
    dateLabel: '22 abr 2026',
    summary:
      'Cuando el sistema cruje, la respuesta automática es subir la UPC. Pedir más recursos no está mal: es insuficiente, y es lo que con más facilidad nos desvía del fondo.',
  },
];

export default function Publications() {
  return (
    <section id="publicaciones" className="section-container">
      <div className="mb-10 max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          <span className="gradient-text">Columnas</span>
        </h2>
        <p className="text-text-muted text-lg">
          Escribo en{' '}
          <a
            href="https://consultorsalud.com/opinion/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-blue hover:underline"
          >
            CONSULTORSALUD
          </a>{' '}
          sobre cómo se mide, se paga y se decide en el sistema de salud
          colombiano. Ocho columnas entre abril y agosto de 2026.
        </p>
      </div>

      <ol className="space-y-px">
        {columns.map((c) => (
          <li key={c.url}>
            <a
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-bg-secondary border border-gray-800 hover:border-accent-blue/50 transition-colors p-5 md:p-6"
            >
              <div className="flex flex-col md:flex-row md:items-baseline md:gap-6">
                <time
                  dateTime={c.date}
                  className="text-text-muted text-xs font-mono tracking-wide shrink-0 mb-2 md:mb-0 md:w-28"
                >
                  {c.dateLabel}
                </time>
                <div className="min-w-0">
                  <h3 className="text-text font-semibold leading-snug group-hover:text-accent-blue transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-text-muted text-sm mt-2 leading-relaxed">
                    {c.summary}
                  </p>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ol>

      <p className="text-text-muted text-sm mt-8">
        El material de mis cursos de estadística y análisis espacial, y los
        análisis en R, están en{' '}
        <Link href="/blog" className="text-accent-green hover:underline">
          Escritos
        </Link>
        .
      </p>
    </section>
  );
}
