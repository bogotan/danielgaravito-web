
const stats = [
  { value: '4', label: 'Instrumentos de medición con datos abiertos' },
  { value: '52M', label: 'Colombianos en el sistema que analizo' },
  { value: '10K+', label: 'Personas impactadas por EducALL' },
];

export default function About() {
  return (
    <section id="sobre-mi" className="section-container">
      {/* La fotografía circular se fue de aquí. Ya está en el hero, en
          rectángulo: mostrarla dos veces en la misma página no agrega nada,
          y el círculo con borde de color era lo más "perfil de red social"
          que tenía el sitio. */}
      <div className="grid lg:grid-cols-[minmax(0,1fr)_320px] gap-12 lg:gap-20 items-start">
        <div className="order-2 lg:order-1">
          <h2 className="section-title">
            Sobre <span className="gradient-text">mí</span>
          </h2>

          <div className="space-y-4 text-text-muted leading-relaxed">
            <p>
              Soy <span className="text-text font-semibold">economista</span> de
              la Universidad Nacional de Colombia, con{' '}
              <span className="text-text font-semibold">
                Global Master in Business Analytics &amp; Data Strategy
              </span>{' '}
              de <span className="text-text font-semibold">EAE Business School</span>{' '}
              (Barcelona), cursado con beca completa. Actualmente adelanto la{' '}
              <span className="text-text font-semibold">
                Maestría en Ingeniería de Sistemas y Computación
              </span>
              . Trabajo en la intersección entre datos, salud pública e
              innovación social.
            </p>

            <p>
              Durante cuatro años dirigí{' '}
              <span className="text-accent-blue font-medium">
                Innovación y Analítica en ADRES
              </span>
              , un área que se creó desde cero y llegó a setenta personas,
              aplicando analítica avanzada e inteligencia artificial a la
              gestión de los recursos del sistema de salud de 52 millones de
              colombianos. Salí en agosto de 2026. Hoy hago ese mismo trabajo
              desde afuera, con datos abiertos y método reproducible —{' '}
              <a href="/etica" className="text-accent-blue hover:underline">
                bajo estas reglas
              </a>
              .
            </p>

            <p>
              Ese trabajo hoy toma la forma de{' '}
              <span className="text-text font-semibold">instrumentos de medición</span>{' '}
              construidos solo con datos públicos: un{' '}
              <a
                href="https://datos.sinergistica.com/termometro"
                className="text-accent-blue hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                termómetro del acceso
              </a>{' '}
              sobre la Encuesta de Calidad de Vida, una serie sobre quién sostiene el
              financiamiento con la GEIH, veintisiete años de mortalidad del registro de
              estadísticas vitales, y un radar de precios de medicamentos. Cada cifra se
              publica con su incertidumbre a la vista y se puede recalcular.
            </p>

            <p>
              Un termómetro no diagnostica: dice que hay fiebre.{' '}
              <span className="text-text font-semibold">
                No soy el médico — hago el instrumento
              </span>
              , y lo dejo sobre la mesa para que lo use cualquiera.
            </p>

            <p>
              Fundé{' '}
              <span className="text-accent-green font-semibold">
                EducALL (Llamadas para Educar)
              </span>
              , una plataforma que demostró que se puede educar sin internet, usando
              simples llamadas telefónicas. En el camino compartimos reconocimientos
              que sirvieron para amplificar la causa:{' '}
              <span className="text-text-muted">Falling Walls Lab (2021)</span>,{' '}
              <span className="text-text-muted">Copa Mundial de Emprendimiento (2021)</span>{' '}
              y{' '}
              <span className="text-text-muted">EY Emprendedor Social (2023)</span>.
            </p>

            <p>
              Creé{' '}
              <span className="text-accent-green font-semibold">NACER</span>, un
              juego serio que pone en evidencia cómo la desigualdad se define
              desde antes de nacer. Creo que los datos son una herramienta para
              cerrar brechas — no para presumirlas.
            </p>
          </div>
        </div>

        {/* Las cifras, sin cajas de color: una columna con filetes. */}
        <div className="order-1 lg:order-2 lg:pt-16">
          <dl className="border-t border-rule">
            {stats.map((stat) => (
              <div key={stat.label} className="py-5 border-b border-rule">
                <dt className="font-serif text-3xl text-text leading-none">
                  {stat.value}
                </dt>
                <dd className="text-text-muted text-xs mt-2 leading-relaxed">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
