---
title: "Teorema del Limite Central y Ley de Grandes Numeros"
date: "2018-08-15"
excerpt: "Los dos teoremas mas importantes de la estadistica, demostrados con simulaciones en R."
tags: ["estadistica", "TLC", "ley grandes numeros", "R", "educacion", "RPubs"]
rpubs: "https://rpubs.com/bogotan/TLC"
category: "estadistica"
---

# Teorema del Limite Central y Ley de Grandes Numeros

> **Publicado originalmente en [RPubs](https://rpubs.com/bogotan/TLC)** — Presentacion interactiva con codigo R reproducible. [Ver en RPubs](https://rpubs.com/bogotan/TLC).

---

Los dos teoremas mas importantes de la estadistica, demostrados con simulaciones en R.

## Contenido de la presentacion


## Teorema del límite Central y Ley de los grandes números



## Máquina de Galton



## Introducción



## Objetivos



## Competencias



## Convergencia en distribución



## Teorema del límite central (Lindeberg-Lévy)



## Ley de los grandes números



## Bibliografía


Fue el padre de la recta de regresión y del concepto de correlación, primo de Darwin

Sobre una superficie plana, soltamos n bolas (cuanto mayor sea n, más preciso resultará), de forma que existen varias divisiones de caminos, en los cuales de manera aleatoria cada bola irá a derecha o izquierda de dicha división. Evidentemente, cada bola tiene un 50% de probabilidades de ir a un lado u otro en cada separación de caminos.

Demostrar el teorema del límite central, en particular que la distribución binomial es una aproximación a la distribución normal

En algunas ocasiones es difícil encontrar la distribución muestral de algunas estadísticas o estimadores, e incluso a veces no es posible determinar la distribución de la variable de interés, es por ésto que algunos teoremas de convergencia resultan de gran utilidad, en especial el teorema del límite central, en el cual se aproxima la distribución del promedio muestral cuando el tamaño de la muestra es grande.

A finalizar la sesión, el estudiante debe tener claro en qué momentos y sobre cual variable es posible aplicar el teorema del límite central, al igual que será capaz de aplicarlo.

En palabras sencillas, la convergencia en distribución está relacionada con la distribución de una sucesión de variables cuando el tamaño de muestra es grande, más formalmente, dada una sucesión de v.a.s $Y_n, n=1,2,…$, con funciones de distribución \(F_1(y), F_2(y),...\) y \(Y\) una v.a. con función de distribución \(F(y)\), \(Y_n\rightarrow^d Y\) (\(Y_n\) converge en distribución a \(Y\)) si:

\[\lim\limits_{n\to\infty}F_n(y)=F(y)\]

runi<-runif(10000,0,1) means<-NULL for(i in 1:1000){ means<-c(means,mean(sample(runi,size = 10))) } rexpon<-rexp(10000,10) means2<-NULL for(i in 1:1000){ means2<-c(means2,mean(sample(rexpon,size = 10))) } par(mfrow=c(1,2)) par(mfrow=c(2,2)) hist(runi) hist(means) hist(rexpon) hist(means2)

El teorema del límite central está relacionado con la distribución del promedio muestral cuando el tamaño de muestra es grande y no con que cualquier variable converge en distribución a una normal, como suele mal interpretarse.

Si \(X_1,...,X_n\) es una m.a. de una población con valor esperado \(\mu\) y varianza \(\sigma^2\), entonces:

\[\frac{\bar{X}_n-\mu}{\sigma/\sqrt{n}}\to^d Z\sim N(0,1)\]

Este teorema implica que cuando el tamaño de muestra es grande, el promedio muestral tiene distribución normal. Un caso particular se da cuando \(X_i\sim Ber(\pi)\), en ese caso \(\mu=\pi\), \(\sigma^2=\pi(1-\pi)\) y \(\frac{1}{n}\sum_{i=1}^{n}X_i=P_n\) es la proporción muestral, aplicando el teorema se tiene:

\[\frac{P_n-\pi}{\pi(1-\pi)/\sqrt{n}}\to^d Z\sim N(0,1)\]

Por lo tanto, cuando el tamaño de muestra es grande, la proporción muestral converge a una normal.

Esta ley afirma que el promedio de variables aleatorias independientes con una distribución común va a converger a la media de la distribución a medida que el tamaño crece.

Es decir, de acuerdo a esta ley, el promedio de los resultados obtenidos de una larga serie de repeticiones se acerca al valor esperado.

Ley de los Grandes Números: Si \(X1, X2, ...\) son variables aleatorias independientes idénticamente distribuidas (IID), cada una con media \(E(X) = \ºmu\). Entonces,

\[\bar X =\frac{\sum_i Xi}{n} \rightarrow \mu\] cuando \(n \rightarrow ∞\)

set.seed(123) n<-c(10,50,100,200,500,1000,2000,3000,4000,5000,6000,7000,8000,9000,10000) i<-1 means<-NULL for(i in 1:length(n)){ simula<-rbinom(n[i],1,0.5) means<-c(means,mean(simula)) } plot(cbind(n,means),type = "l") abline(h = 0.5,col="red")

\end{document}

- Teorema del límite Central y Ley de los grandes números Daniel Garavito - dagaravitoj@unal.edu.co 12 de octubre de 2018 Máquina de Galton Fue el p

*[Contenido completo disponible en la presentacion de RPubs]*

---

**[Ver presentacion completa en RPubs](https://rpubs.com/bogotan/TLC)**

---

*Material desarrollado por Daniel Garavito como parte de su labor docente e investigadora. Todo el contenido incluye codigo R reproducible.*

*Mas publicaciones en [RPubs/bogotan](https://rpubs.com/bogotan/).*
