#!/bin/bash

echo "🚀 Ejecutando actualización local del README..."
echo ""

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
    echo ""
fi

# Test feeds
echo "🧪 Probando fuentes de contenido..."
npm test
echo ""

# Generate README
echo "📝 Generando README..."
npm start
echo ""

# Show differences
if command -v git &> /dev/null; then
    echo "📊 Cambios detectados:"
    git diff --no-index README.md README-preview.md || true
    echo ""
fi

echo "✅ ¡Completado! Revisa el archivo README-preview.md para ver el resultado."
echo "💡 Si te gusta el resultado, puedes copiar el contenido a README.md"