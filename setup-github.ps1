# setup-github.ps1
# Inicializa el repo git de danielgaravito-web, lo sube a GitHub (privado)
# y lo prepara para auto-deploy en Vercel.
#
# Uso:
#   cd "C:\Users\Daniel.Garavito\Documents\Agentes Garavito\03_Contenido_Redes\marca_personal\danielgaravito_next"
#   .\setup-github.ps1
#
# Requisitos: git, gh (GitHub CLI) con sesión iniciada (gh auth login)

$ErrorActionPreference = "Stop"

Write-Host "=== Setup GitHub: danielgaravito-web ===" -ForegroundColor Cyan
Write-Host ""

# --- 1. Verificar dependencias ---
Write-Host "[1/6] Verificando dependencias..." -ForegroundColor Yellow
$gitOk = Get-Command git -ErrorAction SilentlyContinue
$ghOk  = Get-Command gh  -ErrorAction SilentlyContinue

if (-not $gitOk) {
  Write-Host "ERROR: git no está instalado. Instalalo con: winget install --id Git.Git" -ForegroundColor Red
  exit 1
}
if (-not $ghOk) {
  Write-Host "ERROR: GitHub CLI no instalado. Instalalo con: winget install --id GitHub.cli" -ForegroundColor Red
  Write-Host "  Luego: gh auth login" -ForegroundColor Red
  exit 1
}

# Verificar sesión en GitHub
$ghStatus = gh auth status 2>&1
if ($LASTEXITCODE -ne 0) {
  Write-Host "ERROR: no hay sesión de GitHub. Ejecuta: gh auth login" -ForegroundColor Red
  exit 1
}
Write-Host "  OK git + gh disponibles, sesión de GitHub activa" -ForegroundColor Green
Write-Host ""

# --- 2. Verificar que estamos en la carpeta correcta ---
Write-Host "[2/6] Verificando carpeta..." -ForegroundColor Yellow
if (-not (Test-Path "package.json") -or -not (Test-Path "data\projects.json")) {
  Write-Host "ERROR: no parece que estés en danielgaravito_next. No se encontró package.json o data/projects.json." -ForegroundColor Red
  exit 1
}
$pkg = Get-Content "package.json" -Raw | ConvertFrom-Json
if ($pkg.name -ne "danielgaravito-web") {
  Write-Host "AVISO: package.json dice name='$($pkg.name)', esperaba 'danielgaravito-web'. Continúo igual..." -ForegroundColor Yellow
}
Write-Host "  OK carpeta correcta: $(Get-Location)" -ForegroundColor Green
Write-Host ""

# --- 3. git init ---
Write-Host "[3/6] Inicializando repo git..." -ForegroundColor Yellow
if (Test-Path ".git") {
  Write-Host "  Ya existe .git — skip init" -ForegroundColor DarkYellow
} else {
  git init | Out-Null
  git branch -M main
  Write-Host "  OK repo inicializado en branch main" -ForegroundColor Green
}
Write-Host ""

# --- 4. .gitignore (si no existe, creo uno básico) ---
if (-not (Test-Path ".gitignore")) {
  Write-Host "[4/6] Creando .gitignore..." -ForegroundColor Yellow
  @"
node_modules/
.next/
out/
build/
.env
.env.local
.env.*.local
.vercel/
*.log
.DS_Store
Thumbs.db
"@ | Set-Content ".gitignore"
  Write-Host "  OK .gitignore creado" -ForegroundColor Green
} else {
  Write-Host "[4/6] .gitignore ya existe — skip" -ForegroundColor DarkYellow
}
Write-Host ""

# --- 5. Primer commit ---
Write-Host "[5/6] Haciendo commit inicial..." -ForegroundColor Yellow
git add .
$hasChanges = git diff --cached --name-only
if ($hasChanges) {
  git commit -m "feat: sync ELEFANTE -> web + roadmaps por proyecto

- Proyectos con roadmap paso-a-paso (Como terminarlo)
- Script sync-projects.js lee MEMORIA.md de ELEFANTE
- Accordion UI en componentes/Projects.tsx
- Protocolo documentado en PROTOCOLO_SYNC_WEB" | Out-Null
  Write-Host "  OK commit creado" -ForegroundColor Green
} else {
  Write-Host "  Sin cambios que commitear" -ForegroundColor DarkYellow
}
Write-Host ""

# --- 6. Crear repo en GitHub + push ---
Write-Host "[6/6] Creando repo privado en GitHub y subiendo..." -ForegroundColor Yellow
$remoteExists = git remote get-url origin 2>$null
if ($remoteExists) {
  Write-Host "  Remote 'origin' ya existe: $remoteExists" -ForegroundColor DarkYellow
  Write-Host "  Haciendo push..." -ForegroundColor Yellow
  git push -u origin main
} else {
  # Crea repo privado + agrega remote + push
  gh repo create danielgaravito-web `
    --private `
    --source=. `
    --remote=origin `
    --push `
    --description "Sitio personal de Daniel Garavito (Next.js + Tailwind, sincronizado con ELEFANTE)"
}

if ($LASTEXITCODE -eq 0) {
  Write-Host ""
  Write-Host "=== LISTO ===" -ForegroundColor Green
  Write-Host ""
  $repoUrl = gh repo view --json url -q .url
  Write-Host "Repo: $repoUrl" -ForegroundColor Cyan
  Write-Host ""
  Write-Host "Proximo paso (Vercel):" -ForegroundColor Cyan
  Write-Host "  1. Ve a https://vercel.com/new" -ForegroundColor White
  Write-Host "  2. Import -> danielgaravito-web" -ForegroundColor White
  Write-Host "  3. Framework: Next.js (autodetectado)" -ForegroundColor White
  Write-Host "  4. Deploy. A partir de ese momento cada 'git push' dispara deploy." -ForegroundColor White
  Write-Host ""
  Write-Host "Flujo continuo (despues de configurar Vercel):" -ForegroundColor Cyan
  Write-Host "  npm run sync-all" -ForegroundColor White
  Write-Host "  git add ." -ForegroundColor White
  Write-Host "  git commit -m 'sync: MEMORIA YYYY-MM-DD'" -ForegroundColor White
  Write-Host "  git push" -ForegroundColor White
} else {
  Write-Host "ERROR durante push/create. Revisa el mensaje de arriba." -ForegroundColor Red
  exit 1
}
