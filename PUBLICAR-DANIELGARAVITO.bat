@echo off
chcp 65001 >nul
title Actualizar danielgaravito.co/encv
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0PUBLICAR-DANIELGARAVITO.ps1"
