#!/bin/bash
# =============================================================
# 🚀 Deploy automático danielgaravito.co
# Ejecutar: bash deploy.sh
# =============================================================

set -e
echo "🚀 Deploy automático danielgaravito.co"
echo "======================================="

# 1. Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
  echo "❌ Error: Ejecuta este script desde la carpeta del proyecto (danielgaravito_next/)"
  exit 1
fi

# 2. Verificar herramientas necesarias
echo ""
echo "📦 Verificando herramientas..."

if ! command -v node &> /dev/null; then
  echo "❌ Node.js no está instalado. Instálalo desde https://nodejs.org"
  exit 1
fi
echo "  ✅ Node.js $(node -v)"

if ! command -v npm &> /dev/null; then
  echo "❌ npm no está instalado."
  exit 1
fi
echo "  ✅ npm $(npm -v)"

if ! command -v git &> /dev/null; then
  echo "❌ Git no está instalado. Instálalo desde https://git-scm.com"
  exit 1
fi
echo "  ✅ Git $(git --version | cut -d' ' -f3)"

# 3. Instalar Vercel CLI si no existe
if ! command -v vercel &> /dev/null; then
  echo ""
  echo "📦 Instalando Vercel CLI..."
  npm install -g vercel
fi
echo "  ✅ Vercel CLI instalado"

# 4. Instalar dependencias
echo ""
echo "📦 Instalando dependencias del proyecto..."
npm install

# 5. Crear .env.local si no existe
if [ ! -f ".env.local" ]; then
  echo ""
  echo "📝 Creando .env.local (Supabase se configura después)..."
  cat > .env.local << 'EOF'
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_ADMIN_EMAIL=bogotan@gmail.com
EOF
fi

# 6. Build local para verificar
echo ""
echo "🔨 Compilando proyecto..."
npx next build

if [ $? -ne 0 ]; then
  echo "❌ Error en el build. Revisa los errores arriba."
  exit 1
fi
echo "  ✅ Build exitoso"

# 7. Inicializar Git si no está
if [ ! -d ".git" ]; then
  echo ""
  echo "📂 Inicializando repositorio Git..."
  git init
  git add .
  git commit -m "🚀 Initial commit - danielgaravito.co"
fi

# 8. Deploy a Vercel
echo ""
echo "🌐 Desplegando a Vercel..."
echo "   (Si es la primera vez, te pedirá login y configuración del proyecto)"
echo ""
vercel --prod

echo ""
echo "========================================="
echo "✅ ¡Deploy completado!"
echo ""
echo "PRÓXIMOS PASOS:"
echo "1. Ve a https://vercel.com/dashboard → tu proyecto → Settings → Domains"
echo "2. Agrega: danielgaravito.co"
echo "3. Configura DNS en tu registrador de dominio"
echo "4. Para Supabase: ve a https://supabase.com → New Project"
echo "   Luego actualiza .env.local con las keys"
echo "========================================="
