@echo off
chcp 65001 >nul
rem Actualiza el Seguimiento del hub (danielgaravito.co/hub) desde el Second Brain.
rem 1) regenera tableros e indice  2) cifra el feed  3) sube SOLO data/hub.enc.json
cd /d "%~dp0"
python "..\Second Brain\_sistema\generar.py" || py "..\Second Brain\_sistema\generar.py"
node scripts\cifrar-hub.mjs || goto :fin
if exist ".git\index.lock" del ".git\index.lock"
git add data\hub.enc.json data\hub-recursos.enc.json
git commit -m "data(hub): seguimiento del Second Brain" -- data\hub.enc.json data\hub-recursos.enc.json
git push
:fin
pause
