---
title: "AMESP 4: Analisis de Componentes Principales (PCA)"
date: "2019-03-05"
excerpt: "Analisis de componentes principales: reduccion de dimensionalidad, interpretacion de factores, biplot."
tags: ["estadistica", "PCA", "reduccion dimensionalidad", "R", "educacion", "AMESP", "RPubs"]
rpubs: "https://rpubs.com/bogotan/AMESP4PCA"
category: "amesp"
---

# AMESP 4: Analisis de Componentes Principales (PCA)

*Este modulo es parte de la serie [AMESP: Analisis Multivariado y Espacial en R](/blog/amesp-analisis-multivariado-espacial).*

> **Publicado originalmente en [RPubs](https://rpubs.com/bogotan/AMESP4PCA)** — Presentacion interactiva con codigo R reproducible. [Ver en RPubs](https://rpubs.com/bogotan/AMESP4PCA).

---

Analisis de componentes principales: reduccion de dimensionalidad, interpretacion de factores, biplot.

## Contenido de la presentacion


## Análisis de componentes principales



## 0.1 Que es el análisis de componentes principales



## 0.2 Intuiciones



## 0.3 Articulos de aplicación



## 0.4 Ejemplos



## 0.5 Ejercicio



### 0.2.1 Nube estandarizada



### 0.2.2 ¿Qué linea?



### 0.2.3 Proyecciones



### 0.2.4 ¿Qué hace el algoritmo?



### 0.4.1 Deportistas



### 0.4.2 Componentes principales como combicación lineal de las variables



### 0.5.1 Desempeño Municipal


“La idea central del análisis de componentes principales (PCA, por sus siglas en inglés) es reducir la dimensionalidad de un conjunto de datos que consiste en un gran número de variables interrelacionadas, conservando al mismo tiempo, en la medida de lo posible, la variación presente en el conjunto de datos” (Jolliffe 2002). El objetivo de la PCA es reemplazar un gran número de variables correlacionadas con un conjunto de componentes principales no correlacionados. Estos componentes pueden considerarse como combinaciones lineales de las variables originales que se ponderan de manera óptima y se derivan de la matriz de correlación de los datos. Los primeros componentes principales explican la mayor proporción de la varianza total y pueden retenerse para su uso en modelos de regresión subsiguientes sin preocuparse por la multicolinealidad.

Considere la posibilidad de utilizar esta técnica cuando:

Diferencias con regresion - Intercepto - Funcion a optimizar - Error - Se calcula la descomposición de inercia, no una sola “componente” como es el caso de la regresión.

Minimizar las distancias de las protecciones.

Maximinar las distancias del centroide a los puntos.

Price, A.L., et al., Principal components analysis corrects for stratification in genome-wide association studies. Nature genetics, 2006. 38(8): p. 904-9

Navarro Silvera, S.A., et al., Principal component analysis of dietary and lifestyle patterns in relation to risk of subtypes of esophageal and gastric cancer. Annals of epidemiology, 2011. 21(7): p. 543-50.

Hu, F.B., Dietary pattern analysis: a new direction in nutritional epidemiology. Current opinion in lipidology, 2002. 13(1): p. 3-9.

Okin, P.M., et al., Principal component analysis of the T wave and prediction of cardiovascular mortality in American Indians: the Strong Heart Study. Circulation, 2002. 105(6): p. 714-9.

Hurtado, D., I. Kawachi, and J. Sudarsky, Social capital and self-rated health in Colombia: the good, the bad and the ugly. Social science & medicine, 2011. 72(4): p. 584-90.

Bueno, R.E., S.J. Moyses, and S.T. Moyses, Millennium development goals and oral health in cities in southern Brazil. Community dentistry and oral epidemiology, 2010.

Stewart, S.E., et al., Principal components analysis of obsessive-compulsive disorder symptoms in children and adolescents. Biological psychiatry, 2007. 61(3): p. 285-91.

library(scatterplot3d) data(trees) s3d <- scatterplot3d(trees, type = "h", color = "blue", angle=55, pch = 16) # Add regression plane my.lm <- lm(trees$Volume ~ trees$Girth + trees$Height) s3d$plane3d(my.lm) # Add supplementary points s3d$points3d(seq(10, 20, 2), seq(85, 60, -5), seq(60, 10, -10), col = "red", type = "h", pch = 8)

Datos sobre 102 atletas hombres y 100 mujeres recogidos en el Instituto Australiano del Deporte

#install.packages(c("FactoMineR", "factoextra")) #install.packages(c("sn")) library("FactoMineR") library("factoextra") ## Loading required package: ggplot2 ## Welcome! Related Books: `Practical Guide To Cluster Analysis in R` at https://goo.gl/13EFCZ library("sn") ## Loading required package: stats4 ## ## Attaching package: 'sn' ## The following object is masked from 'package:stats': ## ## sd library("corrplot") ## corrplot 0.84 loaded data(ais) summary(ais) ## sex sport RCC WCC ## female:100 Row :37 Min. :3.800 Min. : 3.300 ## male :102 T_400m :29 1st Qu.:4.372 1st Qu.: 5.900 ## B_Ball :25 Median :4.755 Median : 6.850 ## Netball:23 Mean :4.719 Mean : 7.109 ## Swim :22 3rd Qu.:5.030 3rd Qu.: 8.275 ## Field :19 Max. :6.720 Ma

*[Contenido completo disponible en la presentacion de RPubs]*

---

**[Ver presentacion completa en RPubs](https://rpubs.com/bogotan/AMESP4PCA)**

---

*Material desarrollado por Daniel Garavito como parte de su labor docente e investigadora. Todo el contenido incluye codigo R reproducible.*

*Mas publicaciones en [RPubs/bogotan](https://rpubs.com/bogotan/).*
