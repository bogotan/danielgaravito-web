# =============================================================================
#  Retirar el Termometro del SGSSS de danielgaravito.co
#
#  El proyecto pasa a vivir solo en datos.sinergistica.com. Este script
#  saca del repositorio la carpeta public/encv —el tablero, el cubo y los
#  documentos— y empuja el cambio. El articulo del blog se queda: es el
#  argumento, y ahora enlaza al sitio de Sinergistica.
#
#  Doble clic en RETIRAR-ENCV.bat. Nada que escribir.
# =============================================================================
$ErrorActionPreference = "Stop"
$ProgressPreference    = "SilentlyContinue"

$REPO = "$env:USERPROFILE\Documents\02_Proyectos\DanielGaravito.co"
$ENCV = "$REPO\public\encv"

function Titulo($t) { Write-Host ""; Write-Host "  $t" -ForegroundColor Cyan }
function Ok($t)     { Write-Host "  [OK] $t" -ForegroundColor Green }
function Aviso($t)  { Write-Host "  [!]  $t" -ForegroundColor Yellow }
function Falla($t)  { Write-Host "  [X]  $t" -ForegroundColor Red }
function Fin($c) { Write-Host ""; Read-Host "  Enter para cerrar" | Out-Null; exit $c }

Clear-Host
Write-Host ""
Write-Host "  ===============================================================" -ForegroundColor DarkCyan
Write-Host "    RETIRAR  danielgaravito.co/encv" -ForegroundColor White
Write-Host "    El Termometro pasa a vivir solo en datos.sinergistica.com" -ForegroundColor DarkGray
Write-Host "  ===============================================================" -ForegroundColor DarkCyan

# ------------------------------------------------------------------ 1/5
Titulo "[1/5] Revisando el entorno"
if (-not (Test-Path "$REPO\package.json")) {
  Falla "No encontre el proyecto en $REPO"
  Fin 1
}
foreach ($h in @("git","node","npm")) {
  if (-not (Get-Command $h -ErrorAction SilentlyContinue)) {
    Falla "$h no esta instalado."
    Fin 1
  }
}
Ok "Proyecto en $REPO"
Set-Location $REPO

# ------------------------------------------------------------------ 2/5
Titulo "[2/5] Sacando public/encv del repositorio"
if (Test-Path $ENCV) {
  # Copia de seguridad fuera del repo antes de tocar nada. El material
  # completo vive igual en la carpeta de Sinergistica, pero una copia mas
  # no cuesta nada y esto no tiene vuelta atras en el sitio publicado.
  $resp = Join-Path (Split-Path $REPO -Parent) ("encv-retirado-" + (Get-Date -Format yyyyMMdd))
  robocopy $ENCV $resp /E /NFL /NDL /NJH /NJS /NP | Out-Null
  Ok "Copia de seguridad en $resp"

  git rm -r --quiet public/encv
  if ($LASTEXITCODE -ne 0) {
    # Si nunca estuvo versionado, git rm falla y basta con borrar el directorio.
    Aviso "git no lo tenia versionado; se borra del disco."
    Remove-Item $ENCV -Recurse -Force
  }
  Ok "public/encv fuera del repositorio"
} else {
  Ok "public/encv ya no esta. No hay nada que sacar."
}

# ------------------------------------------------------------------ 3/5
Titulo "[3/5] Comprobando que no quede ningun enlace roto"
# El articulo del blog y la ficha del proyecto se quedan, pero tienen que
# apuntar a Sinergistica. Un enlace a /encv/ despues de este retiro es un
# 404 en la cara del lector.
$fuentes = Get-ChildItem -Path app,components,content,data,lib -Recurse -File -ErrorAction SilentlyContinue |
  Where-Object { $_.Extension -in @(".md",".mdx",".json",".ts",".tsx",".js",".jsx") }
# Las tres formas en que una ruta local aparece escrita: "/encv en JSON o
# JSX, (/encv en un enlace de markdown, '/encv en codigo. La comilla simple
# se escribe duplicada porque el patron va entre comillas simples.
$rotos = $fuentes | Select-String -Pattern '"/encv|\(/encv|''/encv' -ErrorAction SilentlyContinue
if ($rotos) {
  Falla "Quedan enlaces a /encv que van a dar 404:"
  $rotos | ForEach-Object { Write-Host "       $($_.Filename): $($_.Line.Trim())" -ForegroundColor Red }
  Write-Host "       Corrigelos antes de publicar. No se empuja nada."
  Fin 1
}
Ok "Ningun enlace apunta ya a /encv"

# ------------------------------------------------------------------ 4/5
Titulo "[4/5] Compilando, para no publicar algo roto"
npm install --silent
npx next build
if ($LASTEXITCODE -ne 0) {
  Falla "El build fallo. No se empuja nada."
  Write-Host "       El repositorio quedo con los cambios sin confirmar."
  Fin 1
}
Ok "Build exitoso"

# ------------------------------------------------------------------ 5/5
Titulo "[5/5] Confirmando y empujando"
git add -A content/blog data public
$estado = git status --porcelain
if (-not $estado) {
  Aviso "No hay cambios pendientes. El sitio ya esta como debe."
  Fin 0
}
$estado | Select-Object -First 20 | ForEach-Object { Write-Host "       $_" -ForegroundColor DarkGray }

$mensaje = @"
Retirar el Termometro del SGSSS de danielgaravito.co

El proyecto pasa a vivir solo en datos.sinergistica.com, que es donde
corresponde: si se factura, vive en Sinergistica; si se cita, vive aqui.
Tener el mismo tablero en dos dominios obligaba a mantener dos copias y
hacia que la tarjeta de un enlace anunciara la direccion del otro sitio.

Sale: public/encv completo —tablero, cubo, documentos y columnas—.
Se queda: el articulo del blog, que es el argumento y no el producto, con
sus enlaces apuntando ahora a datos.sinergistica.com.

Fecha: $(Get-Date -Format yyyy-MM-dd)
"@
$tmpMsg = Join-Path $env:TEMP "encv-retiro-$(Get-Date -Format yyyyMMddHHmmss).txt"
[System.IO.File]::WriteAllText($tmpMsg, $mensaje, (New-Object System.Text.UTF8Encoding $false))
git -c i18n.commitEncoding=UTF-8 commit -F $tmpMsg
$rc = $LASTEXITCODE
Remove-Item $tmpMsg -ErrorAction SilentlyContinue
if ($rc -ne 0) { Falla "El commit fallo."; Fin 1 }
Ok "Commit creado"

$rama = (git rev-parse --abbrev-ref HEAD).Trim()
git push origin $rama
if ($LASTEXITCODE -ne 0) {
  Falla "El push fallo. Lo mas comun es que falte autenticarse."
  Write-Host "       Corre una vez en una terminal:  git push origin $rama"
  Write-Host "       El commit ya esta hecho: no se pierde nada."
  Fin 1
}
Ok "Empujado a origin/$rama"

Write-Host ""
Write-Host "  ===============================================================" -ForegroundColor DarkCyan
Write-Host "    LISTO" -ForegroundColor Green
Write-Host "  ===============================================================" -ForegroundColor DarkCyan
Write-Host ""
Write-Host "  En uno o dos minutos danielgaravito.co/encv deja de existir y"
Write-Host "  el articulo del blog manda a datos.sinergistica.com."
Write-Host ""
Fin 0
