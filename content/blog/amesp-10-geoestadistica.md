---
title: "AMESP 10: Geoestadistica y Kriging"
date: "2019-03-11"
excerpt: "Variogramas, kriging ordinario, kriging universal. Prediccion espacial con datos continuos."
tags: ["estadistica", "geoestadistica", "kriging", "R", "educacion", "AMESP", "RPubs"]
rpubs: "https://rpubs.com/bogotan/AMESP10Geoestadistica"
category: "amesp"
---

# AMESP 10: Geoestadistica y Kriging

*Este modulo es parte de la serie [AMESP: Analisis Multivariado y Espacial en R](/blog/amesp-analisis-multivariado-espacial).*

> **Publicado originalmente en [RPubs](https://rpubs.com/bogotan/AMESP10Geoestadistica)** — Presentacion interactiva con codigo R reproducible. [Ver en RPubs](https://rpubs.com/bogotan/AMESP10Geoestadistica).

---

Variogramas, kriging ordinario, kriging universal. Prediccion espacial con datos continuos.

## Contenido de la presentacion


## Geoestadistica



## 0.1 Geoestadistica



## 0.2 Variagrama



## 0.3 Estimación del variograma



## 0.4 Predicciones por Krigging



## 0.5 Auto Kriging



## 0.6 F-Otros métodos de interpolación no-geoestadísticos



## 0.7 Taller



## 0.8 Bibliografia



### 0.1.1 Naturaleva de la variable respuesta



### 0.1.2 Canadian geochemical survey data



### 0.1.3 Ajuste de una superficie de tendencia



### 0.1.4 Predicción a partir de una superficie de tendencia



### 0.3.1 Variograma con tendencia espacial



### 0.3.2 Ajuste del modelo del variograma



### 0.4.1 Kriging ordinario



### 0.4.2 Llenando los huecos



### 0.4.3 Creación de una tabla de predicción



### 0.4.4 Predicciones en cuadrícula



### 0.5.1 Autokriging en ubicaciones puntuales



### 0.5.2 Auto-kriging sobre una red



### 0.6.1 Polígonos de Thiessen:



### 0.6.2 Inverso de la distancia:



### 0.7.1 Explore los datos



### 0.7.2 visualización



### 0.7.3 Variograma empirico



### 0.7.4 Ajuste automatico Variograma



### 0.7.5 Interpolación - Kriging



### 0.7.6 estimación por otros metodos no-geoestadisticos



### 0.7.7 Validación



### 0.7.8 Residuales


“Se juzga a una sociedad por sus ruidos, su arte, sus fiestas, no por sus estadisticas” - Atalli

Desarrollada originalmente para la industria minera, la geoestadística cubre el análisis de datos de medición basados en la ubicación. Permite la interpolación basada en modelos de mediciones con estimación de la incertidumbre.

Aunque el termino puede resultar confuso (Estadísticas en la tierra), pero todos los ejemplos que hemos visto hasta ahora son en la tierra. En este contexto, Geoestadística hace alusión a un tipo de datos especificos y en consecuencia de análisis. Desarrollada originalmente por empresas mineras para obtener información de yacimientos a partir me mediciones tomadas en unas pocas localizaciones. Las preguntas que resuelve la estadística espacial varian, por ejemplo es estimar el total de material vegetal en un campo, la polución en una ciudad. Como todo modelo estadístico, lo hace cuantificando la incertidembre.

A diferencia del estudio de patrones puntuales, la ubicación de los datos no es estadisticamente enteresante,las localizaciones han sido elegidas para recolectarkja los datos. Hay toda una rama de la estadistica para el muestreo de datos en el espacio.

Entender la naturaleza de la variable es crucial, pues la mayoría de operaciones en geoestadistidca van a usar esa variable como respuesta de un modelo. Del mismo modo que no debería usar datos de conteos en un modelo lineal, se debe usar un modelo lineal generalizado Poisson. Tampoco debería usar un modelo geoestadistico lineal si su variable respuesta es un conteo.

Como con cualquier tipo de datos, el primer paso es la exploración; las graficas permiten encontrar rápidamente patrones. Si los datos se ven influenciados por fronteras, direcciones, éstas deben estar incorporadas en el modelo.

varían según la dirección en que son examinadas

Generalmente cuando el variograma es calculado en distintas direcciones presenta distintos comportamientos con la variación de la distancia.

Su trabajo es estudiar la acidez (pH) de algunos datos de encuestas canadienses

library(sp) library(raster) library(gstat) ca_geo<-readRDS("D:/DriveW7/2019/Sabana/Estadistica aplicada Salud Publica/Bibliografía/DataCamp Spatial Statistics in R/datasets/ca_geo.rds", refhook = NULL) # ca_geo has been pre-defined str(ca_geo, 1) ## Formal class 'SpatialPointsDataFrame' [package "sp"] with 5 slots # See what measurements are at each location names(ca_geo) ## [1] "ID" "Elev" "pH" "Zn" "Cu" "Pb" "Ni" "Co" "Ag" "Mn" ## [11] "Fe" "Mo" "U" "W" "Sn" "Hg" "As" "Sb" "Ba" "Cd" ## [21] "V" "Bi" "Cr" "LoI" "F" "Au" # Get a summary of the acidity (pH) values summary(ca_geo$pH) ## Min. 1st Qu. Median Mean 3rd Qu. Max. NA's ## 3.900 6.100 6.600 6.531 7.000 8.700 33 # Look at the distribution hist(ca_geo$pH)

# Make a vector that is TRUE for the missin

*[Contenido completo disponible en la presentacion de RPubs]*

---

**[Ver presentacion completa en RPubs](https://rpubs.com/bogotan/AMESP10Geoestadistica)**

---

*Material desarrollado por Daniel Garavito como parte de su labor docente e investigadora. Todo el contenido incluye codigo R reproducible.*

*Mas publicaciones en [RPubs/bogotan](https://rpubs.com/bogotan/).*
