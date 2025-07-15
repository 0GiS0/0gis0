#!/bin/bash

echo "\ud83d\ude80 Ejecutando actualizaci\u00f3n local del README..."
echo ""

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "\ud83d\udce6 Instalando dependencias..."
    npm install
    echo ""
fi

# Test feeds
echo "\ud83e\uddea Probando fuentes de contenido..."
npm test
echo ""

# Generate README
echo "\ud83d\udcdd Generando README..."
npm start
echo ""

# Show differences
if command -v git &> /dev/null; then
    echo "\ud83d\udcca Cambios detectados:"
    git diff --no-index README.md README-preview.md || true
    echo ""
fi

echo "\u2705 \u00a1Completado! Revisa el archivo README-preview.md para ver el resultado."
echo "\ud83d\udca1 Si te gusta el resultado, puedes copiar el contenido a README.md"
