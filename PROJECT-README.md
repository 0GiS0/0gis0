# 🤖 Profile README Updater

Aplicación que actualiza automáticamente el README de perfil de GitHub con los últimos vídeos de YouTube y artículos del blog.

## ✨ Características

- 🎥 Obtiene automáticamente los últimos vídeos de YouTube
- 📝 Extrae los últimos artículos del blog via RSS
- 🤖 Automatización con GitHub Actions
- 🔄 Actualización periódica (miércoles a las 10:30 AM)
- 🖥️ Ejecución local para previsualización
- 📱 README profesional y moderno
- 🎯 Contenido fallback cuando las fuentes no están disponibles

## 🚀 Configuración

### 1. Instalación de dependencias

```bash
npm install
```

### 2. Ejecución local

Para probar los cambios localmente antes de hacer commit:

```bash
# Opción 1: Script automático
./local-update.sh

# Opción 2: Comandos manuales
npm test        # Probar fuentes de contenido
npm start       # Generar README
```

### 3. GitHub Actions

El workflow se ejecuta automáticamente:
- **Programado**: Miércoles a las 10:30 AM UTC
- **Manual**: Desde la pestaña Actions en GitHub
- **Automático**: En cada push a la rama main

## 📁 Estructura del proyecto

```
├── content-fetcher.js      # Lógica para obtener contenido
├── update-readme.js        # Script principal de actualización
├── test-feeds.js          # Script de pruebas
├── local-update.sh        # Script para ejecución local
├── package.json           # Dependencias del proyecto
└── .github/
    └── workflows/
        └── update-readme.yml  # Configuración de GitHub Actions
```

## 🛠️ Personalización

### Modificar el template del README

Edita el archivo `update-readme.js` para personalizar:
- Secciones del README
- Número de vídeos/artículos a mostrar
- Styling y badges
- Texto promocional

### Cambiar fuentes de contenido

En `content-fetcher.js` puedes modificar:
- URLs de RSS feeds
- Número de elementos a obtener
- Formato de fechas
- Contenido fallback

### Ajustar la programación

En `.github/workflows/update-readme.yml`:
```yaml
schedule:
  - cron: '30 10 * * 3'  # Miércoles 10:30 AM UTC
```

## 🔧 Solución de problemas

### No se detectan vídeos/artículos
- Verifica las URLs de los feeds RSS
- Comprueba la conectividad de red
- El sistema usa contenido fallback automáticamente

### El workflow no se ejecuta
- Asegúrate de que GitHub Actions esté habilitado
- Verifica los permisos del repositorio
- El workflow necesita al menos un commit en main

### Errores en ejecución local
```bash
# Limpiar e reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

## 📊 Funcionalidades del README generado

- **Header personalizado** con saludo animado
- **Sección de presentación** profesional
- **Últimos vídeos de YouTube** con enlaces directos
- **Últimos artículos del blog** con fechas
- **Tecnologías y herramientas** con badges
- **Estadísticas de GitHub** visual
- **Llamadas a la acción** para suscripción
- **Enlaces a redes sociales** destacados
- **Contador de visitas** al perfil

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Siéntete libre de:
- Reportar bugs
- Sugerir mejoras
- Enviar pull requests
- Compartir ideas

## 📝 Licencia

Este proyecto está bajo la licencia MIT.

---

*Desarrollado con ❤️ para automatizar el mantenimiento del perfil de GitHub*