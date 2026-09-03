import Image from 'next/image';

const stats = [
  { value: '1K+', label: 'Vidas impactadas por EducALL' },
  { value: '52M', label: 'Colombianos al alcance de ADRES' },
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
              Como <span className="text-accent-blue font-medium">asesor en ADRES</span>,
              acompaño al equipo en analítica avanzada e inteligencia artificial al
              servicio del sistema de salud de más de 52 millones de colombianos. Hago
              parte del equipo de la{' '}
              <span className="text-text font-semibold">Sala de Inteligencia</span>,
              una iniciativa institucional de ADRES, donde el equipo desarrolla
              herramientas de auditoría con IA.
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
