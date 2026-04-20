---
title: "Esperanza de Vida: Analisis de Brechas en Colombia"
date: "2023-06-15"
excerpt: "Analisis de brechas en esperanza de vida entre departamentos colombianos. Indice de Theil, PIB per capita y proyecciones de convergencia."
tags: ["salud publica", "esperanza de vida", "Colombia", "R", "desigualdad", "RPubs"]
rpubs: "https://rpubs.com/bogotan/EsperanzaVida"
category: "salud"
---

# Esperanza de Vida: Analisis de Brechas en Colombia

> **Publicado originalmente en [RPubs](https://rpubs.com/bogotan/EsperanzaVida)** — Presentacion interactiva con codigo R reproducible. [Ver en RPubs](https://rpubs.com/bogotan/EsperanzaVida).

---

Analisis de brechas en esperanza de vida entre departamentos colombianos. Indice de Theil, PIB per capita y proyecciones de convergencia.

## Contenido de la presentacion


## Analisis de Brechas - Calidad de vida



## 1 Esperanza de vida



## 2 Años para alcanzar a Bogotá



## 3 Indice de Theil



## 4 PIB per capita vs Poblacion vs esperanza de vida



## 1.1 Ranking esperanzas de vida



### 3.0.1 Índice de Theil:



### 3.0.2 Descomposición del Índice de Theil:


una mujer Bogotana tiene esperanza de vida de XX país mienrtas que un hombre del vaupez de XXX

La gráfica muestra cuántos años les tomaría a cada departamento alcanzar la esperanza de vida de Bogotá DC en 2019, considerando sus tasas de crecimiento actuales:

Departamentos cerca de la parte inferior de la gráfica, como “Cundinamarca”, “Santander”, y “Caldas”, están más cerca de alcanzar la esperanza de vida de Bogotá y requerirían menos años.

Por otro lado, departamentos como “La Guajira”, “Vaupés”, y “Vichada” se encuentran en la parte superior, lo que indica que necesitarían más tiempo para alcanzar la esperanza de vida de Bogotá DC si mantienen sus tasas actuales de crecimiento.

Es importante señalar que esta proyección es una estimación basada en la tasa de crecimiento actual. Cambios futuros en factores demográficos, socioeconómicos y de salud pueden influir en la esperanza de vida y alterar estas proyecciones.

El Índice de Theil es una medida de desigualdad que se utiliza en diversos campos, desde la economía hasta la ecología. En el contexto de la salud pública y, más específicamente, en el análisis de la esperanza de vida, el índice puede ayudar a entender cómo se distribuye la desigualdad en la esperanza de vida entre diferentes regiones de un país.

\[ T = \frac{1}{n} \sum_{i=1}^{n} \left( \frac{x_i}{\bar{x}} \right) \log \left( \frac{x_i}{\bar{x}} \right) \]

Donde: - \(T\) es el Índice de Theil. - \(x_i\) es la esperanza de vida del \(i\)-ésimo departamento o unidad. - \(\bar{x}\) es la esperanza de vida media. - \(n\) es el número total de departamentos o unidades.

El Índice de Theil puede descomponerse en dos componentes: la entropía dentro de las regiones (Within) y la entropía entre las regiones (Between):

La desigualdad dentro de los grupos se refiere a la desigualdad que existe dentro de un grupo específico. Por ejemplo, al considerar departamentos en un país, se refiere a la desigualdad dentro de cada departamento.

La desigualdad entre grupos se refiere a la desigualdad que resulta de las diferencias entre los promedios de los grupos. En el contexto de departamentos, sería la desigualdad resultante de las diferencias en las esperanzas de vida promedio de los departamentos.

La suma de estas dos fuentes de desigualdad (dentro y entre) da el Índice de Theil total. Esta descomponibilidad permite a los analistas y responsables de la formulación de políticas identificar y abordar las fuentes específicas de desigualdad.

\[ T = T_{\text{within}} + T_{\text{between}} \]

Donde: - \(T\) es el Índice de Theil total. - \(T_{\text{within}}\) es la entropía o desigualdad dentro de las regiones. - \(T_{\text{between}}\) es la entropía o desigualdad entre las regiones.

Para la entropía dentro de las regiones:

\[ T_{\text{within}} = \sum_{j=1}^{m} w_j \frac{1}{n_j} \sum_{i=1}^{n_j} \left( \frac{x_{ij}}{\bar{x_j}} \right) \log \left( \frac{x_{ij}}{\bar{x_j}} \right) \]

Donde: - \(w_j\) es la proporción de la población total en la \(j\)-ésima región. - \(n_j\) es el número de departamentos o unidades en la \(j\)-ésima región. - \(x_{ij}\) es la esperanza de vida del \(i\)-ésimo departamento en la \(j\)-ésima región. - \(\bar{x_j}\) es la esperanza de vida media en la \(j\)-ésima región.

Para la entropía entre las regiones:

\[ T_{\text{between}} = T - T_{\text{within}} \]

El Índice de Theil mide la desigualdad en la distribución de un recurso, como ingreso o esperanza de vida. Un valor de 0 indica perfecta igualdad, donde todos tienen el mismo valor. Un valor mayor de 0 indica alguna forma de desigualdad, con valores más altos indicando mayor desigualdad.

El Índice de Theil tiene una propiedad útil llamada “descomp

*[Contenido completo disponible en la presentacion de RPubs]*

---

**[Ver presentacion completa en RPubs](https://rpubs.com/bogotan/EsperanzaVida)**

---

*Material desarrollado por Daniel Garavito como parte de su labor docente e investigadora. Todo el contenido incluye codigo R reproducible.*

*Mas publicaciones en [RPubs/bogotan](https://rpubs.com/bogotan/).*
