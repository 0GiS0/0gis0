const fs = require('fs');
const ContentFetcher = require('./content-fetcher');

// Typing animation configuration
const TYPING_SVG_CONFIG = {
  font: 'Fira+Code',
  weight: 600,
  size: 28,
  duration: 3000,
  pause: 1000,
  width: 950,
  lines: [
    'return(GiS);',
    'Creadora de contenido tech en YouTube y blog',
    'Cloud & DevOps · IA generativa ☁️🤖',
    'Microsoft: Global Black Belt - Developer Productivity'
  ]
};

function buildTypingSvgUrl(config, color) {
  // Use a separator other than ";" so a literal semicolon can appear within a line
  // (e.g. "return(GiS);") without the service treating it as a line break.
  const separator = '|';
  const encodedLines = config.lines.map(line => encodeURIComponent(line)).join(encodeURIComponent(separator));
  return `https://readme-typing-svg.herokuapp.com?font=${config.font}&weight=${config.weight}&size=${config.size}&duration=${config.duration}&pause=${config.pause}&color=${color}&center=true&vCenter=true&width=${config.width}&separator=${encodeURIComponent(separator)}&lines=${encodedLines}`;
}

async function updateReadme() {
  console.log('🚀 Iniciando actualización del README...\n');
  
  const fetcher = new ContentFetcher();
  
  // Fetch content
  const [videos, posts] = await Promise.all([
    fetcher.getYouTubeVideos(),
    fetcher.getBlogPosts()
  ]);
  
  // Generate dynamic sections
  const videoSection = fetcher.generateVideoSection(videos);
  const blogSection = fetcher.generateBlogSection(posts);
  
  // Build typing SVG URLs (dark text for light mode, light text for dark mode)
  const typingSvgUrlLight = buildTypingSvgUrl(TYPING_SVG_CONFIG, '000000');
  const typingSvgUrlDark = buildTypingSvgUrl(TYPING_SVG_CONFIG, 'FFFFFF');

  // Create README template
  const readme = `<div align="center">

  <!-- Header con animación de typing (con soporte para modo claro/oscuro) -->
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="${typingSvgUrlDark}">
    <source media="(prefers-color-scheme: light)" srcset="${typingSvgUrlLight}">
    <img src="${typingSvgUrlLight}" alt="Typing SVG" />
  </picture>

  <br/>

  <img src="https://media.giphy.com/media/hvRJCLFzcasrR4ia7z/giphy.gif" width="30px" alt="Waving hand animation">
  <p>¡Bienvenid@ a mi trocito de GitHub! 🤓</p>

</div>

---

<div align="center">

### 🔔 ¡Nuevo contenido cada miércoles! Suscríbete para no perdértelo

</div>
${videoSection}---
${blogSection}---

## 🤔 ¿Quién soy?

<div align="center">

> *"La tecnología no solo cambia el mundo, también cambia a las personas que la crean y la usan."*

</div>

Soy creadora de contenido tech: comparto todo lo que aprendo en mi blog [return(GiS);](https://www.returngis.net) y en YouTube [return(GiS); en YouTube](https://www.youtube.com/@returngis) sobre Cloud, DevOps e IA generativa.

🎯 **Mi filosofía:** Creo que el mejor código es el que soluciona problemas reales y hace la vida más fácil a las personas.

*(También trabajo en Microsoft desde hace más de 12 años -19 en el sector- como Global Black Belt - Developer Productivity 🫶🏻, ayudando a developers a ser más felices y productivos con la tecnología.)*

---

🧠 **En qué ando metida ahora:** agentes de IA, GitHub Copilot y observabilidad en el mundo Cloud & DevOps ☁️🤖

---

## 🏆 Contribuciones

<div align="center">

  <!-- Contribution Snake Animation -->
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/0GiS0/0GiS0/output/github-contribution-grid-snake-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/0GiS0/0GiS0/output/github-contribution-grid-snake.svg">
    <img alt="github contribution grid snake animation" src="https://raw.githubusercontent.com/0GiS0/0GiS0/output/github-contribution-grid-snake.svg">
  </picture>

</div>

---

## 📊 Mis estadísticas

<div align="center">

  <!-- Activity Graph (con soporte para modo claro/oscuro) -->
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://github-readme-activity-graph.vercel.app/graph?username=0GiS0&theme=github-dark&hide_border=true&area=true">
    <source media="(prefers-color-scheme: light)" srcset="https://github-readme-activity-graph.vercel.app/graph?username=0GiS0&theme=github-light&hide_border=true&area=true">
    <img src="https://github-readme-activity-graph.vercel.app/graph?username=0GiS0&theme=github-light&hide_border=true&area=true" alt="Gráfico de actividad de GitHub de Gisela Torres" width="95%"/>
  </picture>

</div>

---

## 🥰 Fuera del código

<div align="center">

Familia y amig@s · Ciclismo 🚴🏼‍♀️ · Mi perra Siri 🐕 · Senderismo 🌲 · Viajar ✈️ · Cine 🎬 🍿

</div>

---

## 📬 Sígueme

<div align="center">

¿Te gusta mi contenido? **¡Suscríbete y sígueme en mis redes sociales!** 🚀

<table>
<tr>
<td align="center"><a href="https://www.returngis.net" title="Visita mi blog"><img src="https://img.shields.io/badge/blog-339933?logo=github-pages&logoColor=white&style=for-the-badge" alt="Blog" /></a></td>
<td align="center"><a href="https://www.youtube.com/@returngis" title="🔔 ¡Suscríbete a mi canal!"><img src="https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white" alt="YouTube" /></a></td>
<td align="center"><a href="https://www.tiktok.com/@returngis" title="Sígueme en TikTok"><img src="https://img.shields.io/badge/TikTok-000000?style=for-the-badge&logo=tiktok&logoColor=white" alt="TikTok" /></a></td>
<td align="center"><a href="https://twitter.com/0gis0" title="Sígueme en X"><img src="https://img.shields.io/badge/X-000000?style=for-the-badge&logo=x&logoColor=white" alt="X" /></a></td>
<td align="center"><a href="https://bsky.app/profile/0gis0.bsky.social" title="Sígueme en Bluesky"><img src="https://img.shields.io/badge/Bluesky-0285FF?style=for-the-badge&logo=bluesky&logoColor=white" alt="Bluesky" /></a></td>
<td align="center"><a href="https://www.linkedin.com/in/giselatorresbuitrago/" title="Conéctate conmigo en LinkedIn"><img src="https://img.shields.io/badge/-LinkedIn-blue?style=for-the-badge&logo=Linkedin&logoColor=white" alt="LinkedIn" /></a></td>
<td align="center"><a href="https://www.instagram.com/0gis0/" title="Sígueme en Instagram"><img src="https://img.shields.io/badge/-Instagram-purple?style=for-the-badge&logo=instagram&logoColor=white" alt="Instagram" /></a></td>
<td align="center"><a href="https://mastodon.cloud/@0gis0" title="Sígueme en Mastodon"><img src="https://img.shields.io/badge/-Mastodon-blue?style=for-the-badge&logo=mastodon&logoColor=white" alt="Mastodon" /></a></td>
<td align="center"><a href="https://github.com/0GiS0?tab=repositories" title="Mis repositorios"><img src="https://img.shields.io/badge/Repositorios-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Repos" /></a></td>
</tr>
</table>

</div>

---

<div align="center">

*Este README se actualiza automáticamente con mis últimos vídeos y artículos* 🤖✨

<br/>

<img src="https://capsule-render.vercel.app/api?type=waving&color=000000&height=100&section=footer" width="100%"/>

*Made with ❤️ by Gisela Torres*

</div>`;

  // Write to README.md with explicit UTF-8 encoding
  fs.writeFileSync('README.md', readme, 'utf8');
  
  console.log('✅ README.md actualizado correctamente!');
  console.log(`📊 Vídeos incluidos: ${videos.length}`);
  console.log(`📊 Artículos incluidos: ${posts.length}`);
  
  // Also create a preview version with explicit UTF-8 encoding
  fs.writeFileSync('README-preview.md', readme, 'utf8');
  console.log('🔍 Archivo de previsualización creado: README-preview.md');
}

// Run if called directly
if (require.main === module) {
  updateReadme().catch(console.error);
}

module.exports = updateReadme;
