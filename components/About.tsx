import Image from 'next/image';

const stats = [
  { value: '10+', label: 'Proyectos de impacto' },
  { value: '37', label: 'Agentes IA creados' },
  { value: '1', label: 'Misión: cerrar brechas' },
];

export default function About() {
  return (
    <section id="sobre-mi" className="section-container">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Photo + Stats */}
        <div className="space-y-8">
          {/* Circular photo */}
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

          {/* Stats */}
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

        {/* Bio */}
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
              . Hoy me muevo en la intersección entre datos, salud pública e
              innovación social.
            </p>

            <p>
              Como <span className="text-accent-blue font-medium">asesor en ADRES</span>,
              trabajo con analítica avanzada e inteligencia artificial para mejorar
              la gestión de los recursos del sistema de salud de más de 52 millones
              de colombianos. Lidero la{' '}
              <span className="text-text font-semibold">Sala de Inteligencia</span>{' '}
              y el desarrollo de herramientas de auditoría con IA.
            </p>

            <p>
              Fundé{' '}
              <span className="text-accent-green font-semibold">
                EducALL (Llamadas para Educar)
              </span>
              , una plataforma que demostró que se puede educar sin internet, usando
              simples llamadas telefónicas. Impactamos{' '}
              <span className="text-text font-semibold">más de 1.000 vidas</span>,
              fuimos finalistas en{' '}
              <span className="text-accent-gold font-medium">MIT Solve</span> y
              ganadores del{' '}
              <span className="text-accent-gold font-medium">
                Premio EY Emprendedor Social 2023
              </span>
              .
            </p>

            <p>
              Creé{' '}
              <span className="text-accent-green font-semibold">NACER</span>, un
              juego serio que pone en evidencia cómo la desigualdad se define
              desde antes de nacer. Creo que los datos son la herramienta más
              poderosa para cerrar las brechas que nos separan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
