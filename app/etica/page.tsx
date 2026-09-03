import Link from 'next/link';

export const metadata = {
  title: 'Declaración de conflicto de interés | Daniel Garavito',
  description:
    'Declaración pública de conflicto de interés de Daniel Alfonso Garavito Jiménez, Asesor de Innovación y Analítica en ADRES y Fundador de EducALL.',
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Declaración de conflicto de interés · Daniel Garavito',
    description:
      'Transparencia sobre el doble rol Asesor ADRES + Fundador EducALL. Marco normativo, mitigaciones y canal de reporte.',
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
          <span className="gradient-text">Declaración de conflicto de interés</span>
        </h1>
        <p className="text-text-muted">
          Daniel Alfonso Garavito Jiménez · 23 de abril de 2026
        </p>
      </header>

      <div className="blog-article space-y-6 text-text leading-relaxed">
        <p className="text-lg text-text-muted">
          Publico esta declaración porque trabajar al mismo tiempo para el
          Estado y tener una empresa propia exige transparencia total. No es
          un requisito formal, es un compromiso explícito con la gente que
          sigue mi trabajo, con mis colegas de ADRES, con el equipo de EducALL
          y con Colombia.
        </p>

        <h2 className="text-2xl font-bold text-text mt-12 mb-4">Mis dos roles activos</h2>
        <p>
          <strong>Asesor de Innovación y Analítica — ADRES.</strong> Soy
          servidor público vinculado a la Administradora de los Recursos del
          Sistema General de Seguridad Social en Salud (ADRES). Acompaño al equipo de Innovación y Analítica en proyectos
          de analítica avanzada e inteligencia artificial al servicio de
          la gestión de los recursos del sistema de salud. No soy directivo ni
          tengo poder de contratación.
        </p>
        <p>
          <strong>Fundador y representante legal — EducALL (Llamadas para Educar).</strong>{' '}
          Soy dueño y representante legal de EducALL, iniciativa social de
          educación por llamadas telefónicas. EducALL es una empresa privada,
          sin relación contractual con ADRES ni con actores del sector salud
          que ejecuten recursos administrados por ADRES.
        </p>
        <p>
          Ambos roles son compatibles bajo la ley colombiana siempre que se
          cumplan reglas estrictas de transparencia, independencia y no uso
          del cargo público para beneficio privado. Esas reglas son las que
          siguen.
        </p>

        <h2 className="text-2xl font-bold text-text mt-12 mb-4">Principios que rigen mi actuación</h2>
        <div className="space-y-4">
          <div className="border-l-2 border-accent-green pl-4">
            <h3 className="font-bold text-text">Primero el interés público.</h3>
            <p className="text-text-muted">
              Cuando una decisión en ADRES pueda afectar directa o
              indirectamente a EducALL, a sus clientes o a mí como persona, me
              aparto del trámite y lo declaro por escrito. No negocio, no
              recomiendo, no firmo.
            </p>
          </div>

          <div className="border-l-2 border-accent-green pl-4">
            <h3 className="font-bold text-text">Deslinde explícito de roles.</h3>
            <p className="text-text-muted">
              Nunca hablo desde los dos lados a la vez. Si estoy en un espacio
              ADRES, hablo como Asesor ADRES. Si estoy en un espacio EducALL,
              hablo como fundador de EducALL. Mis opiniones personales en este
              sitio, en redes y en entrevistas no representan a ADRES.
            </p>
          </div>

          <div className="border-l-2 border-accent-green pl-4">
            <h3 className="font-bold text-text">No uso recursos del Estado para lo privado.</h3>
            <p className="text-text-muted">
              No uso equipos, correos, credenciales, tiempo laboral ni
              información de ADRES para actividades, marketing o ventas de
              EducALL. No uso el cargo ni la red de contactos institucional
              para abrir puertas comerciales a EducALL.
            </p>
          </div>

          <div className="border-l-2 border-accent-green pl-4">
            <h3 className="font-bold text-text">No mezclo audiencias.</h3>
            <p className="text-text-muted">
              EducALL no se ofrece a actores del sistema de salud que reciban
              recursos administrados por ADRES. Cuando un evento mezcla ambas
              audiencias, declaro el doble rol al iniciar y me abstengo de
              cualquier mensaje que pueda parecer promoción cruzada.
            </p>
          </div>

          <div className="border-l-2 border-accent-green pl-4">
            <h3 className="font-bold text-text">No acepto favores del sector que regulo indirectamente.</h3>
            <p className="text-text-muted">
              No recibo viáticos, regalos por encima de umbrales legales,
              viajes o invitaciones pagadas de EPS, IPS, proveedores
              tecnológicos en salud, operadores fiduciarios del SGSSS ni
              actores que contraten o puedan contratar con ADRES. Las
              invitaciones a eventos académicos o institucionales que acepto
              quedan registradas.
            </p>
          </div>

          <div className="border-l-2 border-accent-green pl-4">
            <h3 className="font-bold text-text">Declaro anualmente.</h3>
            <p className="text-text-muted">
              Mi participación en EducALL está declarada en el SIGEP dentro de
              la declaración de bienes, rentas y actividad económica privada, y
              se actualiza cada año antes del 31 de marzo, al ingreso y al
              retiro del cargo.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-text mt-12 mb-4">Marco normativo que aplico</h2>
        <p className="text-text-muted">
          Esta declaración se enmarca en la normatividad colombiana sobre
          función pública, inhabilidades y transparencia:
        </p>
        <ul className="space-y-2 text-text-muted list-none pl-0">
          <li><strong className="text-text">Constitución Política, arts. 122–129</strong> — principios de función pública.</li>
          <li><strong className="text-text">Ley 1952 de 2019</strong> (Código General Disciplinario), arts. 38–39 — faltas, inhabilidades, conflictos de interés.</li>
          <li><strong className="text-text">Ley 734 de 2002</strong> (subsistente parcialmente) — régimen disciplinario.</li>
          <li><strong className="text-text">Ley 1474 de 2011</strong> — Estatuto Anticorrupción.</li>
          <li><strong className="text-text">Ley 2195 de 2022</strong> — medidas en materia de transparencia e integridad.</li>
          <li><strong className="text-text">Ley 80 de 1993, art. 8</strong> — inhabilidades para contratar con el Estado.</li>
          <li><strong className="text-text">Ley 1712 de 2014</strong> — transparencia y acceso a la información pública.</li>
          <li><strong className="text-text">Ley 1581 de 2012</strong> — protección de datos personales.</li>
          <li><strong className="text-text">Ley 190 de 1995, arts. 13–14</strong> — declaración de bienes y rentas.</li>
          <li><strong className="text-text">Decreto 1083 de 2015</strong> — régimen único de función pública.</li>
        </ul>

        <h2 className="text-2xl font-bold text-text mt-12 mb-4">
          Situaciones concretas de conflicto y cómo las manejo
        </h2>
        <div className="space-y-4 text-text-muted">
          <p>
            <strong className="text-text">Si ADRES estudia o decide sobre
            políticas que afecten al sector educación (donde opera EducALL):</strong>{' '}
            me declaro impedido, no participo en reuniones técnicas ni en la
            decisión final, y así queda en acta.
          </p>
          <p>
            <strong className="text-text">Si una EPS, IPS o proveedor del
            sistema de salud busca contratar con EducALL:</strong> EducALL
            declina la oferta o la escala con mi abogado externo para evaluar
            si hay ruta legalmente segura. En casi todos los casos, la
            respuesta por defecto es declinar.
          </p>
          <p>
            <strong className="text-text">Si me invitan a hablar en un evento
            del sector salud en calidad de CEO de EducALL:</strong> rechazo la
            invitación o la reformulo para hablar sólo en mi nombre personal,
            sin promocionar servicios de EducALL, dejando claro mi doble rol.
          </p>
          <p>
            <strong className="text-text">Si me ofrecen regalos, viajes,
            viáticos o cursos pagados desde cualquier actor del sistema de
            salud:</strong> los rechazo y dejo constancia escrita.
          </p>
          <p>
            <strong className="text-text">Si en un proyecto mío se usan datos
            que provengan de ADRES:</strong> sólo uso datos públicos o
            agregados. Ningún dato reservado, ninguna información contractual
            en curso, ninguna base con datos personales de afiliados sale de
            ADRES hacia mis proyectos personales.
          </p>
          <p>
            <strong className="text-text">Si un familiar directo hasta 4° de
            consanguinidad, 2° de afinidad o 1° civil aparece en un proceso
            ADRES:</strong> me aparto del trámite.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-text mt-12 mb-4">
          Lo que este sitio hace para cumplir lo anterior
        </h2>
        <ul className="space-y-2 text-text-muted">
          <li>
            La vista pública de proyectos no revela información reservada ni
            estados internos que puedan interpretarse como información
            privilegiada de ADRES.
          </li>
          <li>
            La sección privada está protegida con contraseña y no es
            indexable por buscadores.
          </li>
          <li>
            El blog distingue de manera explícita entre reflexiones personales
            y posiciones de ADRES.
          </li>
          <li>
            No se promocionan productos o servicios de EducALL desde las
            páginas que hablan de mi rol en ADRES.
          </li>
        </ul>

        <h2 className="text-2xl font-bold text-text mt-12 mb-4">Canal de reporte</h2>
        <p className="text-text-muted">
          Si identificas una posible situación de conflicto de interés en mi
          actuación pública o en este sitio, escríbeme a{' '}
          <a
            href="mailto:dagaravitoj@gmail.com?subject=Reporte%20%E2%80%94%20conflicto%20de%20inter%C3%A9s"
            className="text-accent-green hover:underline font-medium"
          >
            dagaravitoj@gmail.com
          </a>{' '}
          con el asunto <em>&quot;Reporte — conflicto de interés&quot;</em>.
          Me comprometo a responder en un plazo máximo de 72 horas hábiles y,
          si el caso lo requiere, a escalar la consulta con asesoría jurídica
          externa y con los canales institucionales que correspondan (Control
          Interno Disciplinario de ADRES, Procuraduría General, según la
          naturaleza del asunto).
        </p>
        <p className="text-text-muted">
          Para reportes que necesiten la ruta oficial ante el Estado, la
          Procuraduría General de la Nación recibe denuncias disciplinarias
          contra servidores públicos a través de{' '}
          <a
            href="https://www.procuraduria.gov.co"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-green hover:underline font-medium"
          >
            www.procuraduria.gov.co
          </a>
          .
        </p>

        <h2 className="text-2xl font-bold text-text mt-12 mb-4">
          Actualización y vigencia
        </h2>
        <p className="text-text-muted">Esta declaración se revisa y actualiza:</p>
        <ul className="space-y-1 text-text-muted">
          <li>Anualmente, antes del 31 de marzo.</li>
          <li>Cuando cambien mis roles o mi participación en EducALL.</li>
          <li>Cuando se modifique normatividad aplicable.</li>
        </ul>
        <p className="text-text-muted">
          Si alguno de los hechos aquí descritos deja de ser cierto,
          actualizaré este documento dentro de los 15 días siguientes y dejaré
          constancia de la modificación.
        </p>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-sm text-text-muted italic">
            Publicado el 23 de abril de 2026 · Última actualización: 23 de abril de 2026
          </p>
          <p className="font-bold text-text mt-4">Daniel Alfonso Garavito Jiménez</p>
          <p className="text-sm text-text-muted">
            <a href="mailto:dagaravitoj@gmail.com" className="hover:text-text">
              dagaravitoj@gmail.com
            </a>
          </p>
        </div>

        <div className="mt-8 p-5 rounded-xl bg-bg-secondary border border-gray-800 text-sm text-text-muted italic">
          Esta declaración expresa mi compromiso personal de transparencia y
          no reemplaza los controles ni reportes oficiales establecidos por
          ADRES y los órganos de control. Ante cualquier duda razonable
          consulto con asesoría jurídica independiente.
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
