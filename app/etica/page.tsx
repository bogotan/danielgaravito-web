import Link from 'next/link';

export const metadata = {
  title: 'Independencia y manejo de información | Daniel Garavito',
  description:
    'Declaración pública de Daniel Alfonso Garavito Jiménez sobre el fin de su vinculación con ADRES, las obligaciones que siguen vigentes después del cargo y las reglas con que maneja datos e información en su práctica independiente.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/etica' },
  openGraph: {
    title: 'Independencia y manejo de información · Daniel Garavito',
    description:
      'Ex servidor público de ADRES. Qué obligaciones siguen vigentes, con qué datos trabajo y cómo se puede verificar.',
    type: 'article',
    locale: 'es_CO',
  },
};

export default function EticaPage() {
  return (
    <article className="section-container max-w-3xl mx-auto">
      <header className="mb-10 pb-8 border-b border-gray-800">
        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-accent-gold/10 border border-accent-gold/30 text-accent-gold text-xs font-semibold uppercase tracking-wider">
          Ética y transparencia
        </div>
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          <span className="gradient-text">Independencia y manejo de información</span>
        </h1>
        <p className="text-text-muted">
          Daniel Alfonso Garavito Jiménez · Actualizada el 3 de septiembre de 2026
        </p>
      </header>

      <div className="blog-article space-y-6 text-text leading-relaxed">
        <p className="text-lg text-text-muted">
          Dirigí un área del Estado que administra los recursos de salud de 52
          millones de colombianos. Hoy trabajo por mi cuenta y varios de mis
          análisis hablan de ese mismo sistema. Esa secuencia obliga a decir
          con claridad qué me llevé, qué no, y bajo qué reglas trabajo ahora.
        </p>

        <h2 className="text-2xl font-bold text-text mt-12 mb-4">Dónde estoy hoy</h2>
        <p>
          <strong>Fui servidor público en ADRES hasta el 20 de agosto de 2026.</strong>{' '}
          Dirigí Innovación y Analítica, un área creada desde cero que llegó a
          setenta personas, dedicada a analítica avanzada e inteligencia
          artificial al servicio de la gestión de los recursos del sistema de
          salud. Ese vínculo terminó. No soy asesor, contratista ni vocero de
          la entidad, y nada de lo que publico compromete su posición
          institucional.
        </p>
        <p>
          <strong>Práctica independiente.</strong> Hoy hago investigación
          aplicada, formación y consultoría analítica en salud, a través de
          EducALL, de la que soy fundador y representante legal.
        </p>
        <p>
          Salir del Estado no cancela las obligaciones que vienen del cargo.
          Algunas duran un término definido; la de reserva no caduca. Las
          escribo aquí para que cualquiera pueda medirme contra ellas.
        </p>

        <h2 className="text-2xl font-bold text-text mt-12 mb-4">
          Lo que sigue vigente después del cargo
        </h2>

        <div className="space-y-5">
          <div className="p-5 rounded-xl bg-bg-secondary border border-gray-800">
            <h3 className="font-bold text-text mb-2">
              No gestiono intereses privados ante ADRES
            </h3>
            <p className="text-text-muted">
              No represento a terceros ni intervengo en trámites ante la
              entidad en asuntos que estuvieron bajo mi competencia, durante el
              término que fija la ley. Si un cliente necesita esa gestión, se
              lo digo en la primera reunión y lo remito a alguien más.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-bg-secondary border border-gray-800">
            <h3 className="font-bold text-text mb-2">
              Solo trabajo con datos públicos
            </h3>
            <p className="text-text-muted">
              Todo lo que publico y todo lo que vendo se construye sobre datos
              abiertos y actos administrativos publicados. La información
              reservada a la que tuve acceso durante el cargo no entra en mis
              análisis, ni en mis clases, ni en mis propuestas comerciales. La
              reserva no vence porque yo haya salido.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-bg-secondary border border-gray-800">
            <h3 className="font-bold text-text mb-2">
              Cada cifra se puede rastrear hasta su fuente
            </h3>
            <p className="text-text-muted">
              Mis estudios declaran de dónde salen los datos, con qué corte, y
              son reproducibles contra su repositorio. Esa es la prueba
              práctica de lo anterior: si un resultado se reproduce desde
              fuentes públicas, no hay nada adentro que no pudiera estar.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-bg-secondary border border-gray-800">
            <h3 className="font-bold text-text mb-2">Digo dónde estoy parado</h3>
            <p className="text-text-muted">
              Cuando escribo sobre una decisión en la que participé, lo
              advierto. Cuando un cliente tiene interés en el asunto que
              analizo, lo declaro antes de publicar. Las opiniones de este
              sitio, de mis redes y de mis entrevistas son mías y de nadie más.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-text mt-12 mb-4">Marco de referencia</h2>
        <p className="text-text-muted">
          Las reglas anteriores se apoyan, entre otras, en el Estatuto
          Anticorrupción (Ley 1474 de 2011) en materia de gestión de intereses
          privados por ex servidores; el Código General Disciplinario (Ley 1952
          de 2019); la Ley de Transparencia y Acceso a la Información Pública
          (Ley 1712 de 2014) y sus excepciones de reserva; y el régimen de
          protección de datos personales (Ley 1581 de 2012).
        </p>
        <p className="text-text-muted">
          No soy abogado y esta página no es un concepto jurídico: es el
          compromiso que asumo por escrito. Los alcances y términos exactos de
          cada norma los verifico con asesoría jurídica independiente antes de
          aceptar cualquier encargo que pueda rozar estos límites.
        </p>

        <h2 className="text-2xl font-bold text-text mt-12 mb-4">Si algo no cuadra</h2>
        <p>
          Si en algún trabajo mío ve un dato que no debería ser público, un
          conflicto que no declaré o una conclusión que parece servir a un
          interés que no está a la vista, escríbame con el asunto{' '}
          <em>&quot;Reporte — independencia&quot;</em>. Respondo, y si hay que
          corregir algo lo corrijo a la vista de todos.
        </p>

        <h2 className="text-2xl font-bold text-text mt-12 mb-4">Vigencia</h2>
        <p>Esta declaración se revisa y actualiza:</p>
        <ul className="list-disc pl-6 space-y-1 text-text-muted">
          <li>Anualmente, antes del 31 de marzo.</li>
          <li>Cuando cambien mis vínculos profesionales o mi participación en EducALL.</li>
          <li>Cuando asuma un encargo con una entidad del sector salud.</li>
          <li>Cuando se modifique normatividad aplicable.</li>
        </ul>
        <p className="text-text-muted">
          Si alguno de los hechos aquí descritos deja de ser cierto,
          actualizaré este documento dentro de los 15 días siguientes y dejaré
          constancia de la modificación.
        </p>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-sm text-text-muted italic">
            Publicada el 23 de abril de 2026 como declaración de conflicto de
            interés durante mi vinculación con ADRES · Reescrita el 3 de
            septiembre de 2026 tras el fin de esa vinculación
          </p>
          <p className="font-bold text-text mt-4">Daniel Alfonso Garavito Jiménez</p>
          <p className="text-sm text-text-muted">
            <a href="mailto:dagaravitoj@gmail.com" className="hover:text-text">
              dagaravitoj@gmail.com
            </a>
          </p>
        </div>

        <div className="mt-10 flex gap-4 text-sm">
          <Link href="/" className="text-accent-green hover:underline">
            ← Volver al inicio
          </Link>
          <Link href="/#contacto" className="text-accent-blue hover:underline">
            Contacto →
          </Link>
        </div>
      </div>
    </article>
  );
}
