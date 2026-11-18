@echo off
chcp 65001 >nul
title Subir el Seguimiento completo al hub (danielgaravito.co/hub)
rem Solo hay que correrlo UNA vez: sube el codigo del Seguimiento (bitacora, grafo, galeria, tablero) y los datos cifrados.
rem Despues, para el dia a dia, basta ACTUALIZAR-HUB.bat.
cd /d "%~dp0"
echo.
echo Sube el Seguimiento al hub. La clave del hub esta en .env.local (node scripts\cifrar-hub.mjs --ver-clave).
echo No hay que configurar nada en Vercel.
echo.
pause
python "..\Second Brain\_sistema\generar.py" || py "..\Second Brain\_sistema\generar.py"
node scripts\cifrar-hub.mjs || goto :fin
if exist ".git\index.lock" del ".git\index.lock"
git add ACTUALIZAR-HUB.bat PUBLICAR-HUB.bat scripts\cifrar-hub.mjs lib\hubSeguridad.ts components\Seguimiento.tsx app\api\hub app\api\auth\route.ts app\hub\page.tsx components\AdminAuth.tsx data\hub.enc.json data\hub-recursos.enc.json
git commit -m "hub: Seguimiento del Second Brain con bitacora, grafo, galeria y tablero (clave propia, datos cifrados, sin variables de Vercel)" -- ACTUALIZAR-HUB.bat PUBLICAR-HUB.bat scripts\cifrar-hub.mjs lib\hubSeguridad.ts components\Seguimiento.tsx app\api\hub app\api\auth\route.ts app\hub\page.tsx components\AdminAuth.tsx data\hub.enc.json data\hub-recursos.enc.json
git push
echo.
echo Listo. En un par de minutos Vercel publica; entra a danielgaravito.co/hub con tu clave.
:fin
pause
