---
title: "Tuberculosis: Analisis Epidemiologico"
date: "2023-06-15"
excerpt: "Analisis epidemiologico de tuberculosis: incidencia, mortalidad, factores de riesgo y tendencias temporales."
tags: ["epidemiologia", "tuberculosis", "salud publica", "R", "RPubs"]
rpubs: "https://rpubs.com/bogotan/Tuberculosis"
category: "salud"
---

# Tuberculosis: Analisis Epidemiologico

> **Publicado originalmente en [RPubs](https://rpubs.com/bogotan/Tuberculosis)** — Presentacion interactiva con codigo R reproducible. [Ver en RPubs](https://rpubs.com/bogotan/Tuberculosis).

---

Analisis epidemiologico de tuberculosis: incidencia, mortalidad, factores de riesgo y tendencias temporales.

## Contenido de la presentacion


## Tuberculosis



## 0.1 Preprocesamiento



## 0.2 Autocorrelograma tasa general y de los casos



## 0.3 Hacer los conteos y las tasas por región y semana (tabla)



## 0.4 Hacer la serie por pertenencia étnica



## 0.5 Imputación de pertenencia étnica



## 0.6 Hacer la serie por resultado prueba VIH



## 0.7 Tablas



## 0.8 COVID



## 0.9 Modelo Poisson con offset



## 0.10 Población étnia y grupo de edad



## 0.11 Grafica covid y tuberculosis



## 0.12 Mapas con tasas anuales



## 0.13 Modelo


TAREAS https://docs.google.com/spreadsheets/d/1YDgZRMf1QuaCD3pRU_4RvmftX5zZJIoU3KD2GTn4-0w/edit#gid=0

Horas https://docs.google.com/spreadsheets/d/1bjHda-4I0oTYmI3fDGIAANk_ydQLj82LClWG5tvJyXc/edit#gid=0

Documento https://docs.google.com/document/d/1sI7it7-zlehi2uVJpJ-s33ViKRno7Ctl/edit

Esta consignado en el archivo Salome.R que es es archivo principal de preprocesamiento.

El lag 4, 9 y el lag 13, donde los coeficientes de autocorrelación son relativamente altos.

Se crea la variable con pertenencia étnica y sin pertenencia étnica - “Con pertenencia étnica”=c(“INDIGENA”, “NEGRO, MULATO, AFROCOLOMBIANO”, “ROOM (GITANO)”, “RAIZAL”, “AFROCOLOMBIANO”, “PALENQUERO”),

A partir de los datos del Censo, se realiza la impitación de la población con pertenencia étnica de los municipios

## ## AFROCOLOMBIANO INDIGENA ## 2 2623 ## MESTIZO NEGRO, MULATO, AFROCOLOMBIANO ## 4289 2124 ## OTRO PALENQUERO ## 39818 1 ## RAIZAL ROOM (GITANO) ## 81 13 ## # A tibble: 6 × 7 ## # Groups: ano, semana_epidemiologica [6] ## semana_epidemiologica ano ano_semana_epide…¹ con_p…² sin_p…³ pob_c…⁴ pob_s…⁵ ## <chr> <chr> <chr> <dbl> <dbl> <dbl> <dbl> ## 1 00 2018 2018-00 55 446 5645292 4.26e7 ## 2 01 2018 2018-01 45 189 5645292 4.26e7 ## 3 02 2018 2018-02 34 233 5645292 4.26e7 ## 4 03 2018 2018-03 15 120 5645292 4.26e7 ## 5 04 2018 2018-04 50 324 5645292 4.26e7 ## 6 05 2018 2018-05 27 192 5645292 4.26e7 ## # … with abbreviated variable names ¹​ano_semana_epidemiologica, ## # ²​con_pertenencia, ³​sin_pertenencia, ⁴​pob_con_pertenencia, ## # ⁵​pob_sin_pertenencia

Ajustar un modelo Poisson con los casos como respuesta (población como offset), incluyendo como explicativas grupo de edad, sexo, tiempo, dicotómica covid, # de casos COVID-19

semana es un consecutivo semana, poblaciones, conteo, por cada grupo de edad

proyecciones edades etnicas etnia no sexo

## # A tibble: 6 × 6 ## # Groups: ano, semana_epidemiologica, Sexo, grupo_edad [4] ## ano semana_epidemiologica Sexo grupo_edad pertenencia_etnica casos_tu…¹ ## <chr> <chr> <chr> <fct> <fct> <int> ## 1 2018 00 F [0,5) Con pertenencia étnica 1 ## 2 2018 00 F [0,5) Sin pertenencia étnica 1 ## 3 2018 00 F [5,10) Con pertenencia étnica 2 ## 4 2018 00 F [10,15) Sin pertenencia étnica 1 ## 5 2018 00 F [15,20) Con pertenencia étnica 1 ## 6 2018 00 F [15,20) Sin pertenencia étnica 11 ## # … with abbreviated variable name ¹​casos_tuberculosis 0.10 Población étnia y grupo de edad ## ## Antes Después ## 5754 4283 0.11 Grafica covid y tuberculosis

## Generalized linear mixed model fit by maximum likelihood (Laplace ## Approximation) [glmerMod] ## Family: Negative Binomial(109.7204) ( log ) ## Formula: casos_tuberculosis ~ grupo_edad + sexo + pertenencia_etnica + ## covid + offset(log(poblacion)) + (1 | semana) ## Data: pegada_completa[pegada_completa$semana <= 200, ] ## ## AIC BIC logLik deviance df.resid ## 38411.5 38583.5 -19181.8 38363.5 9532 ## ## Scaled residuals: ## Min 1Q Median 3Q Max ## -2.7145 -0.6118 -0.0687 0.5662 9.1974 ## ## Random effects: ## Groups Name Variance Std.Dev. ## semana (Intercept) 0.08126 0.2851 ## Number of obs: 9556, groups: semana, 200 ## ## Fixed effects: ## Estimate Std. Error z value Pr(>|z|) ## (Intercept) -13.59204 0.05348 -254.155 < 2e-16 ## grupo_edad[10,15) -0.08899 0.06460 -1.378 0.16831 ## grupo_edad[15,20) 0.83053 0.04935 16.829 < 2e-16 ## grupo_edad[20,25) 1.60609 0.04658 34.481 < 2e-16 ## grupo_edad[25,30) 1.79335 0.04627 38.757 < 2e-16 ## grupo_edad[30,35) 1.73279 0.04

*[Contenido completo disponible en la presentacion de RPubs]*

---

**[Ver presentacion completa en RPubs](https://rpubs.com/bogotan/Tuberculosis)**

---

*Material desarrollado por Daniel Garavito como parte de su labor docente e investigadora. Todo el contenido incluye codigo R reproducible.*

*Mas publicaciones en [RPubs/bogotan](https://rpubs.com/bogotan/).*
