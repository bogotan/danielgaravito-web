import Image from 'next/image';

const stats = [
  { value: '1K+', label: 'Vidas impactadas por EducALL' },
  { value: '52M', label: 'Colombianos en el sistema que analizo' },
  { value: '10+', label: 'Años en datos y salud' },
];

export default function About() {
  return (
    <section id="sobre-mi" className="section-container">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="space-y-8">
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-accent-green/30 shadow-2xl shadow-accent-green/10">
              <Image
                src="/foto-daniel.jpg"
                alt="Daniel Garavito"
                fill
                className="object-cover"
                style={{ objectPosition: 'center 15%' }}
                priority
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center p-4 bg-bg-secondary rounded-xl border border-gray-800"
              >
                <div className="text-2xl md:text-3xl font-bold gradient-text">
                  {stat.value}
                </div>
                <div className="text-text-muted text-xs mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="section-title">
            Sobre <span className="gradient-text">mí</span>
          </h2>

          <div className="space-y-4 text-text-muted leading-relaxed">
            <p>
              Soy <span className="text-text font-semibold">economista</span> de
              la Universidad Nacional de Colombia con{' '}
              <span className="text-text font-semibold">
                Maestría en Ingeniería de Sistemas y Computación
              </span>
              . Actualmente curso el{' '}
              <span className="text-text font-semibold">
                Global Master in Business Analytics &amp; Data Strategy
              </span>{' '}
              en <span className="text-text font-semibold">EAE Business School</span>{' '}
              (Barcelona), con beca completa. Trabajo en la intersección entre
              datos, salud pública e innovación social.
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
      </div>
    </section>
  );
}
