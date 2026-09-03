import Link from 'next/link';

export const metadata = {
  title: 'Disclaimers legales — Libros | Daniel Garavito',
  description:
    'Disclaimers legales completos sobre los libros, suscripción, datos personales, derechos de autor y posición institucional.',
  robots: { index: true, follow: true },
};

export default function LibrosLegalPage() {
  return (
    <article className="section-container max-w-3xl mx-auto">
      <header className="mb-10 pb-8 border-b border-gray-800">
        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-accent-gold/10 border border-accent-gold/30 text-accent-gold text-xs font-semibold uppercase tracking-wider">
          ⚖️ Disclaimers legales
        </div>
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          <span className="gradient-text">Disclaimers — Libros</span>
        </h1>
        <p className="text-text-muted">
          Disclaimers completos aplicables a los libros, la suscripción al
          newsletter y el material derivado.
        </p>
      </header>

      <div className="blog-article space-y-8 text-text leading-relaxed">
        {/* 1. Disclaimer institucional */}
        <section>
          <h2 className="text-2xl font-bold text-text mb-4">
            1. Posición institucional
          </h2>
          <p className="text-text-muted">
            Las opiniones, análisis y reflexiones publicadas en estos libros son
            exclusivamente de mi autoría y carácter personal. No constituyen
            posición institucional ni representan el criterio oficial de la
            Administradora de los Recursos del Sistema General de Seguridad Social
            en Salud (ADRES), del Ministerio de Salud y Protección Social, ni de
            ninguna otra entidad del sector.
          </p>
          <p className="text-text-muted mt-3">
            Los contenidos se elaboran a partir de (i) información de dominio
            público, (ii) literatura académica verificable debidamente citada y
            (iii) experiencia profesional acumulada. En ningún caso divulgan
            información reservada, datos personales de beneficiarios, datos de
            operación contractual, ni elementos bajo deber de confidencialidad
            institucional.
          </p>
          <p className="text-text-muted mt-3">
            Cuando en los libros se discuten mecanismos de política pública,
            metodologías técnicas o desafíos del Sistema General de Seguridad
            Social en Salud, se hace en mi calidad de ciudadano y profesional del
            sector, con el ánimo de aportar al debate público informado. Las
            propuestas formuladas son hipótesis de discusión, no compromisos
            institucionales.
          </p>
          <p className="text-text-muted mt-3">
            Quien desee la posición oficial de ADRES sobre cualquier tema, puede
            consultar sus canales institucionales en{' '}
            <a
              href="https://www.adres.gov.co"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-green hover:underline"
            >
              www.adres.gov.co
            </a>
            .
          </p>
          <p className="text-text-muted mt-3 text-sm">
            Ver también la{' '}
            <Link href="/etica" className="text-accent-green hover:underline">
              Declaración de conflicto de interés
            </Link>{' '}
            que rige la actuación pública del autor.
          </p>
        </section>

        {/* 2. Derechos de autor */}
        <section>
          <h2 className="text-2xl font-bold text-text mb-4">
            2. Derechos de autor y propiedad intelectual
          </h2>
          <p className="text-text-muted">
            Los manuscritos, capítulos, borradores, esquemas conceptuales,
            ecuaciones, metáforas y demás obra intelectual de los libros aquí
            anunciados están protegidos por la legislación colombiana e
            internacional en materia de derechos de autor:
          </p>
          <ul className="space-y-2 text-text-muted mt-3 list-disc pl-5">
            <li>
              <strong className="text-text">Ley 23 de 1982</strong> sobre derechos
              de autor en Colombia.
            </li>
            <li>
              <strong className="text-text">Decisión 351 de 1993</strong> de la
              Comunidad Andina sobre régimen común de derecho de autor y
              derechos conexos.
            </li>
            <li>
              <strong className="text-text">Convenio de Berna</strong> para la
              protección de las obras literarias y artísticas.
            </li>
            <li>
              <strong className="text-text">Ley 1915 de 2018</strong> que
              moderniza la normatividad de derechos de autor en Colombia.
            </li>
          </ul>
          <p className="text-text-muted mt-3">
            <strong className="text-text">Todos los derechos reservados</strong>{' '}
            por Daniel Alfonso Garavito Jiménez. Queda prohibida la reproducción,
            distribución, comunicación pública, transformación, traducción o
            cualquier otra forma de explotación de la obra completa o parcial,
            por cualquier medio o procedimiento, sin autorización escrita previa
            del autor o sus causahabientes.
          </p>
          <p className="text-text-muted mt-3">
            Las citas breves para fines académicos, periodísticos o de crítica
            están permitidas conforme a las excepciones legales, siempre con
            atribución correcta a Daniel Garavito y al título y fecha del libro
            citado.
          </p>
        </section>

        {/* 3. No-distribución del manuscrito */}
        <section>
          <h2 className="text-2xl font-bold text-text mb-4">
            3. No-distribución del manuscrito en proceso
          </h2>
          <p className="text-text-muted">
            Mientras los libros se encuentran en proceso de escritura, los
            borradores, capítulos preliminares, materiales de trabajo,
            transcripciones de entrevistas y archivos relacionados son de uso
            interno exclusivo del autor y su equipo de producción. No se
            distribuyen a terceros sin autorización escrita.
          </p>
          <p className="text-text-muted mt-3">
            La eventual recepción no autorizada de borradores en proceso no
            confiere ningún derecho de uso, cita o reproducción. La distribución
            no autorizada de versiones preliminares puede generar
            responsabilidad civil y penal conforme a la Ley 23 de 1982 y la
            normatividad complementaria.
          </p>
        </section>

        {/* 4. Habeas Data y suscripción */}
        <section>
          <h2 className="text-2xl font-bold text-text mb-4">
            4. Tratamiento de datos personales (suscripción al newsletter)
          </h2>
          <p className="text-text-muted">
            La suscripción al newsletter de los libros se rige por el régimen
            general de protección de datos personales en Colombia:
          </p>
          <ul className="space-y-2 text-text-muted mt-3 list-disc pl-5">
            <li>
              <strong className="text-text">Ley 1581 de 2012</strong> y su decreto
              reglamentario <strong className="text-text">1377 de 2013</strong>.
            </li>
            <li>
              <strong className="text-text">Constitución Política, art. 15</strong>{' '}
              (derecho a la intimidad y al habeas data).
            </li>
          </ul>
          <h3 className="text-lg font-semibold text-text mt-5 mb-2">Responsable del tratamiento</h3>
          <p className="text-text-muted">
            Daniel Alfonso Garavito Jiménez ·{' '}
            <a href="mailto:dagaravitoj@gmail.com" className="text-accent-green hover:underline">
              dagaravitoj@gmail.com
            </a>
          </p>
          <h3 className="text-lg font-semibold text-text mt-5 mb-2">Finalidades del tratamiento</h3>
          <ul className="space-y-1 text-text-muted list-disc pl-5">
            <li>Enviar avances del proceso de escritura de los libros.</li>
            <li>Compartir capítulos publicables y material complementario.</li>
            <li>Notificar fechas de lanzamiento, preventa y eventos asociados.</li>
            <li>Difundir contenido editorial relacionado con los temas del libro.</li>
          </ul>
          <h3 className="text-lg font-semibold text-text mt-5 mb-2">Tus derechos como titular</h3>
          <ul className="space-y-1 text-text-muted list-disc pl-5">
            <li>Conocer, actualizar y rectificar tus datos.</li>
            <li>Solicitar prueba del consentimiento otorgado.</li>
            <li>Ser informado sobre el uso que se ha dado a tus datos.</li>
            <li>Revocar el consentimiento y solicitar la supresión cuando no se respeten los principios, derechos y garantías.</li>
            <li>Acceder gratuitamente a tus datos personales.</li>
          </ul>
          <p className="text-text-muted mt-3">
            Para ejercer cualquiera de estos derechos, escribe a{' '}
            <a href="mailto:dagaravitoj@gmail.com?subject=Habeas%20Data%20%E2%80%94%20Solicitud" className="text-accent-green hover:underline">
              dagaravitoj@gmail.com
            </a>{' '}
            con el asunto <em>&quot;Habeas Data — Solicitud&quot;</em>. El plazo de respuesta es
            de 10 días hábiles para consultas y 15 días hábiles para reclamos,
            conforme a la Ley 1581/2012.
          </p>
          <h3 className="text-lg font-semibold text-text mt-5 mb-2">Conservación y seguridad</h3>
          <p className="text-text-muted">
            Los datos se almacenan en la base de datos del sitio (Supabase) con
            controles de acceso y cifrado en reposo y en tránsito. Se conservarán
            mientras dure la relación de suscripción o hasta que el titular
            solicite su supresión. No se transfieren a terceros con fines
            comerciales.
          </p>
          <h3 className="text-lg font-semibold text-text mt-5 mb-2">Retiro fácil</h3>
          <p className="text-text-muted">
            Cada correo del newsletter incluye un enlace de baja con un click. La
            baja también puede solicitarse escribiendo al correo del responsable.
          </p>
        </section>

        {/* 5. Limitación de responsabilidad */}
        <section>
          <h2 className="text-2xl font-bold text-text mb-4">
            5. Limitación de responsabilidad
          </h2>
          <p className="text-text-muted">
            Los libros tienen propósito divulgativo y académico. No constituyen
            asesoría jurídica, financiera, médica ni de política pública para
            casos concretos. El autor no se hace responsable por decisiones
            tomadas por terceros con base en interpretaciones de los textos.
            Cualquier aplicación práctica de las ideas requiere asesoría
            profesional independiente.
          </p>
        </section>

        {/* 6. Vigencia y actualización */}
        <section>
          <h2 className="text-2xl font-bold text-text mb-4">
            6. Vigencia y actualización
          </h2>
          <p className="text-text-muted">
            Estos disclaimers se revisan al menos una vez al año, antes del 31
            de marzo, y cuando cambie la normatividad aplicable o las
            condiciones de los libros (por ejemplo, al pasar de manuscrito a
            obra publicada). La fecha de la última actualización se indica al
            final.
          </p>
          <p className="text-text-muted mt-3 text-sm italic">
            Última actualización: 3 de mayo de 2026.
          </p>
        </section>

        <div className="mt-8 p-5 rounded-xl bg-bg-secondary border border-gray-800 text-sm text-text-muted italic">
          Estos disclaimers son una declaración de buenas prácticas y no
          reemplazan la asesoría jurídica profesional para casos concretos.
        </div>

        <div className="mt-10 flex gap-4 text-sm">
          <Link href="/libros" className="text-accent-green hover:underline">
            ← Volver a los libros
          </Link>
          <Link href="/etica" className="text-accent-blue hover:underline">
            Declaración de conflicto de interés →
          </Link>
        </div>
      </div>
    </article>
  );
}
