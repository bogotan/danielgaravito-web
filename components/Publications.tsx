'use client';

import { useState } from 'react';

type Category = 'all' | 'salud' | 'amesp' | 'estadistica' | 'economia';

interface Publication {
  title: string;
  url: string;
  category: Category;
  year: number;
  description: string;
}

const publications: Publication[] = [
  // Investigacion en Salud
  { title: 'Esperanza de Vida', url: 'https://rpubs.com/bogotan/EsperanzaVida', category: 'salud', year: 2023, description: 'Analisis de esperanza de vida con datos en R' },
  { title: 'Economia de la Salud', url: 'https://rpubs.com/bogotan/EconomiaDeLaSalud', category: 'salud', year: 2023, description: 'Fundamentos de economia de la salud con aplicaciones en R' },
  { title: 'Tuberculosis', url: 'https://rpubs.com/bogotan/Tuberculosis', category: 'salud', year: 2023, description: 'Analisis epidemiologico de tuberculosis' },
  { title: 'ADRES UPC Diferencial', url: 'https://rpubs.com/bogotan/adres_upc', category: 'salud', year: 2023, description: 'Analisis de la UPC diferencial en el sistema de salud colombiano' },
  { title: 'Habilitacion Fedesalud', url: 'https://rpubs.com/bogotan/fedesalud_habilitacion', category: 'salud', year: 2022, description: 'Estudio de habilitacion de servicios de salud para Fedesalud' },
  { title: 'Bioestadistica - Motivacion del curso', url: 'https://rpubs.com/bogotan/Bioestadistica_motivacion_curso', category: 'salud', year: 2018, description: 'Introduccion y motivacion a la bioestadistica aplicada' },
  { title: 'Estadistica Bayesiana - Valores predictivos', url: 'https://rpubs.com/bogotan/BayesValoresPredictivos', category: 'salud', year: 2018, description: 'Aplicacion del teorema de Bayes a valores predictivos en salud' },
  { title: 'Razones, Proporciones y Tasas', url: 'https://rpubs.com/bogotan/Razones_Proporciones_Tasas', category: 'salud', year: 2018, description: 'Medidas fundamentales en epidemiologia y salud publica' },

  // Serie AMESP - Analisis Multivariado Espacial
  { title: 'AMESP 1. Motivacion', url: 'https://rpubs.com/bogotan/AMESP1Motivacion', category: 'amesp', year: 2019, description: 'Introduccion y motivacion al analisis multivariado espacial' },
  { title: 'AMESP 2. Metodos Exploratorios Multivariados', url: 'https://rpubs.com/bogotan/AMESP2IntroMetodosExploratorios', category: 'amesp', year: 2019, description: 'Introduccion a metodos exploratorios multivariados' },
  { title: 'AMESP 3. Conceptos Previos', url: 'https://rpubs.com/bogotan/AMESP3ConceptosPrevios', category: 'amesp', year: 2019, description: 'Conceptos fundamentales previos al analisis multivariado' },
  { title: 'AMESP 4. Componentes Principales (PCA)', url: 'https://rpubs.com/bogotan/AMESP4PCA', category: 'amesp', year: 2019, description: 'Analisis de componentes principales con R' },
  { title: 'AMESP 5. Correspondencias Simples', url: 'https://rpubs.com/bogotan/AMESP5ACS', category: 'amesp', year: 2019, description: 'Analisis de correspondencias simples' },
  { title: 'AMESP 6. Correspondencias Multiples (ACM)', url: 'https://rpubs.com/bogotan/AMESP6ACM', category: 'amesp', year: 2019, description: 'Analisis de correspondencias multiples' },
  { title: 'AMESP 7. Clasificacion', url: 'https://rpubs.com/bogotan/AMESP7Clasificacion', category: 'amesp', year: 2019, description: 'Metodos de clasificacion y clustering' },
  { title: 'AMESP 8. Intro Espacial', url: 'https://rpubs.com/bogotan/AMESP8IntroSpacial', category: 'amesp', year: 2019, description: 'Introduccion al analisis espacial' },
  { title: 'AMESP 9. Patrones Puntuales', url: 'https://rpubs.com/bogotan/AMESP9PatronesPuntuales', category: 'amesp', year: 2019, description: 'Analisis de patrones puntuales espaciales' },
  { title: 'AMESP 10. Geoestadistica', url: 'https://rpubs.com/bogotan/AMESP10Geoestadistica', category: 'amesp', year: 2019, description: 'Fundamentos de geoestadistica y kriging' },
  { title: 'AMESP 11. Datos por Areas', url: 'https://rpubs.com/bogotan/AMESP11DatosPorAreas', category: 'amesp', year: 2019, description: 'Analisis de datos agregados por areas' },
  { title: 'AMESP 12. Modelos Datos por Areas', url: 'https://rpubs.com/bogotan/AMESP12ModelosDatosareas', category: 'amesp', year: 2019, description: 'Modelado estadistico de datos espaciales por areas' },
  { title: 'Syllabus Estadistica Espacial', url: 'https://rpubs.com/bogotan/Syllabus_Espacial', category: 'amesp', year: 2019, description: 'Programa del curso de estadistica espacial' },

  // Estadistica III - Modelos de Regresion
  { title: 'EstIII 1. Intro Modelos', url: 'https://rpubs.com/bogotan/EstIII_1_Intro_Modelos', category: 'estadistica', year: 2019, description: 'Introduccion a modelos estadisticos' },
  { title: 'EstIII 2. Modelos de Regresion Lineales', url: 'https://rpubs.com/bogotan/EstIII_2_Modelos_Regresion_lineales', category: 'estadistica', year: 2019, description: 'Modelos de regresion lineal simple y multiple' },
  { title: 'EstIII 3. Regresion Normal Lineal - Inferencia', url: 'https://rpubs.com/bogotan/EstIII_3_Modelos_Regresion_lineales_inferencia', category: 'estadistica', year: 2019, description: 'Inferencia en el modelo de regresion normal lineal' },
  { title: 'EstIII 3. Pautas Trabajo Final', url: 'https://rpubs.com/bogotan/EstIII_3_Pautas_Trabajo_Final', category: 'estadistica', year: 2019, description: 'Guia para el trabajo final del curso' },
  { title: 'EstIII 3. Taller', url: 'https://rpubs.com/bogotan/EstIII_Taller', category: 'estadistica', year: 2019, description: 'Taller practico de modelos de regresion' },

  // Estadistica Fundamental
  { title: 'Conceptos, Metodos y Variables', url: 'https://rpubs.com/bogotan/concep_metodos_vars', category: 'estadistica', year: 2018, description: 'Fundamentos: conceptos, metodos y tipos de variables' },
  { title: 'Grados de Libertad y Distribuciones', url: 'https://rpubs.com/bogotan/gl_Bessel_distribuciones', category: 'estadistica', year: 2018, description: 'Chi-cuadrado, t de Student, F de Fisher y tamano del efecto' },
  { title: 'Categoricos y Dependencia', url: 'https://rpubs.com/bogotan/CategoDepend', category: 'estadistica', year: 2018, description: 'Analisis de variables categoricas y pruebas de dependencia' },
  { title: 'Pruebas de Hipotesis - Ejemplos', url: 'https://rpubs.com/bogotan/PruebasHipoEj', category: 'estadistica', year: 2018, description: 'Ejemplos practicos de pruebas de hipotesis' },
  { title: 'Pruebas de Distribucion', url: 'https://rpubs.com/bogotan/PruebasDist', category: 'estadistica', year: 2018, description: 'Pruebas de bondad de ajuste y normalidad' },
  { title: 'Pruebas de Hipotesis', url: 'https://rpubs.com/bogotan/PruebasHipo', category: 'estadistica', year: 2018, description: 'Teoria y practica de pruebas de hipotesis' },
  { title: 'Intervalos de Confianza', url: 'https://rpubs.com/bogotan/Intervalos', category: 'estadistica', year: 2018, description: 'Construccion e interpretacion de intervalos de confianza' },
  { title: 'TLC y Ley de Grandes Numeros', url: 'https://rpubs.com/bogotan/TLC', category: 'estadistica', year: 2018, description: 'Teorema del limite central y ley de los grandes numeros' },
  { title: 'Estimacion Puntual', url: 'https://rpubs.com/bogotan/EstimacionPuntual', category: 'estadistica', year: 2018, description: 'Metodos de estimacion puntual y propiedades de estimadores' },
  { title: 'Intro Inferencia', url: 'https://rpubs.com/bogotan/IntroInferencia', category: 'estadistica', year: 2018, description: 'Introduccion a la inferencia estadistica' },
  { title: 'Distribuciones de Probabilidad', url: 'https://rpubs.com/bogotan/DistProb', category: 'estadistica', year: 2018, description: 'Distribuciones especiales: binomial, Poisson, normal' },
  { title: 'Variable Aleatoria', url: 'https://rpubs.com/bogotan/VariableAleatoria', category: 'estadistica', year: 2018, description: 'Definicion y propiedades de variables aleatorias' },
  { title: 'Teoremas de Probabilidad', url: 'https://rpubs.com/bogotan/TeoremasProb', category: 'estadistica', year: 2018, description: 'Teoremas aditivo, multiplicativo y de probabilidad total' },
  { title: 'Covarianza y Correlacion', url: 'https://rpubs.com/bogotan/covarianza_correlacion', category: 'estadistica', year: 2018, description: 'Medidas de relacion lineal entre variables cuantitativas' },
  { title: 'Mentir con Graficas', url: 'https://rpubs.com/bogotan/MentirGraficas', category: 'estadistica', year: 2018, description: 'Como las graficas pueden distorsionar la realidad' },
  { title: 'Graficas en R', url: 'https://rpubs.com/bogotan/GraficasR', category: 'estadistica', year: 2018, description: 'Visualizacion de datos con R' },
  { title: 'Medidas de Forma', url: 'https://rpubs.com/bogotan/forma', category: 'estadistica', year: 2018, description: 'Asimetria y curtosis' },
  { title: 'Variabilidad', url: 'https://rpubs.com/bogotan/variabilidad', category: 'estadistica', year: 2018, description: 'Medidas de dispersion y variabilidad' },
  { title: 'Pensamiento Computacional - Intro a R', url: 'https://rpubs.com/bogotan/PensamientoComputacional_Rintro', category: 'estadistica', year: 2018, description: 'Introduccion a R y pensamiento computacional' },
  { title: 'Medidas de Tendencia Central', url: 'https://rpubs.com/bogotan/Medidas_tendencia_central', category: 'estadistica', year: 2018, description: 'Media, mediana, moda y cuantiles' },
  { title: 'Taller Inferencia', url: 'https://rpubs.com/bogotan/TallerInferencia', category: 'estadistica', year: 2018, description: 'Taller practico de inferencia estadistica' },

  // Economia
  { title: 'Deuda Publica Colombia II', url: 'https://rpubs.com/bogotan/a1', category: 'economia', year: 2016, description: 'Analisis de la deuda publica colombiana - Parte II' },
  { title: 'Deuda Publica Colombia I', url: 'https://rpubs.com/bogotan/209182', category: 'economia', year: 2016, description: 'Analisis de la deuda publica colombiana - Parte I' },
];

const categories: { id: Category; label: string; count: number }[] = [
  { id: 'all', label: 'Todas', count: publications.length },
  { id: 'salud', label: 'Salud Publica', count: publications.filter(p => p.category === 'salud').length },
  { id: 'amesp', label: 'Analisis Espacial', count: publications.filter(p => p.category === 'amesp').length },
  { id: 'estadistica', label: 'Estadistica', count: publications.filter(p => p.category === 'estadistica').length },
  { id: 'economia', label: 'Economia', count: publications.filter(p => p.category === 'economia').length },
];

export default function Publications() {
  const [filter, setFilter] = useState<Category>('all');

  const filtered = filter === 'all' ? publications : publications.filter(p => p.category === filter);

  return (
    <section id="publicaciones" className="section-container">
      <div className="text-center mb-12">
        <h2 className="section-title">
          <span className="gradient-text">Publicaciones</span>
        </h2>
        <p className="text-text-muted text-lg max-w-2xl mx-auto">
          Presentaciones interactivas en R publicadas en RPubs. Material academico, investigacion en salud y analisis de datos.
        </p>
        <a
          href="https://rpubs.com/bogotan"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-4 text-accent-green hover:underline text-sm"
        >
          Ver perfil completo en RPubs
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              filter === cat.id
                ? 'bg-accent-blue text-white shadow-lg shadow-accent-blue/20'
                : 'bg-bg-secondary text-text-muted hover:text-text border border-gray-800'
            }`}
          >
            {cat.label}
            <span className={`ml-1.5 text-xs ${filter === cat.id ? 'text-white/70' : 'text-text-muted/50'}`}>
              ({cat.count})
            </span>
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {filtered.map((pub) => (
          <a
            key={pub.url}
            href={pub.url}
            target="_blank"
            rel="noopener noreferrer"
            className="card group hover:border-accent-blue/30 hover:translate-y-[-2px]"
          >
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-accent-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-accent-blue text-sm font-bold">R</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-text group-hover:text-accent-blue transition-colors leading-tight">
                  {pub.title}
                </h3>
                <p className="text-text-muted text-xs mt-1 line-clamp-2">{pub.description}</p>
                <span className="text-xs text-text-muted/50 mt-2 inline-block">{pub.year}</span>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="text-center mt-8">
        <p className="text-text-muted text-sm">
          {publications.length} publicaciones &middot; Todas disponibles en{' '}
          <a href="https://rpubs.com/bogotan" target="_blank" rel="noopener noreferrer" className="text-accent-green hover:underline">
            RPubs
          </a>
        </p>
      </div>
    </section>
  );
}
