const fs = require('fs');
const ContentFetcher = require('./content-fetcher');

// Typing animation configuration
const TYPING_SVG_CONFIG = {
  font: 'Fira+Code',
  weight: 600,
  size: 28,
  duration: 3000,
  pause: 1000,
  color: '0078D4',
  width: 600,
  lines: [
    '¡Hola! Soy Gisela Torres 👩🏻‍💻',
    'Software Global Blackbelt @Microsoft',
    'Creadora de contenido tech 🎥',
    'Apasionada del Cloud & DevOps ☁️'
  ]
};

function buildTypingSvgUrl(config) {
  const encodedLines = config.lines.map(line => encodeURIComponent(line)).join(';');
  return `https://readme-typing-svg.herokuapp.com?font=${config.font}&weight=${config.weight}&size=${config.size}&duration=${config.duration}&pause=${config.pause}&color=${config.color}&center=true&vCenter=true&width=${config.width}&lines=${encodedLines}`;
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
  
  // Build typing SVG URL
  const typingSvgUrl = buildTypingSvgUrl(TYPING_SVG_CONFIG);
  
  // Create README template
  const readme = `<div align="center">
  
  <!-- Header con animación de typing -->
  <img src="${typingSvgUrl}" alt="Typing SVG" />
  
  <br/>
  
  <img src="https://media.giphy.com/media/hvRJCLFzcasrR4ia7z/giphy.gif" width="30px" alt="Waving hand animation">
  <p>¡Bienvenid@ a mi trocito de GitHub! 🤓</p>

  <!-- Contador de visitas -->
  <img src="https://komarev.com/ghpvc/?username=0GiS0&label=Visitantes&color=0078D4&style=flat-square" alt="Profile views" />

  <br/><br/>

  <!-- Badges de redes sociales -->
  [![YouTube Channel Subscribers](https://img.shields.io/youtube/channel/subscribers/UC140iBrEZbOtvxWsJ-Tb0lQ?style=for-the-badge&logo=youtube&logoColor=white&color=red)](https://www.youtube.com/c/GiselaTorres?sub_confirmation=1)
  [![GitHub followers](https://img.shields.io/github/followers/0GiS0?style=for-the-badge&logo=github&logoColor=white)](https://github.com/0GiS0)
  [![LinkedIn Follow](https://img.shields.io/badge/LinkedIn-Sígueme-blue?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/giselatorresbuitrago/)
  [![X Follow](https://img.shields.io/badge/X-Sígueme-black?style=for-the-badge&logo=x&logoColor=white)](https://twitter.com/0GiS0)

</div>

---

## 🤔 ¿Quién soy?

<div align="center">

> *"La tecnología no solo cambia el mundo, también cambia a las personas que la crean y la usan."*

</div>

Trabajo en **Microsoft** desde hace más de 11 años (¡y 18 en el sector!) como **Software Global Blackbelt** 🫶🏻. Mi misión es técnica: ayudar a los developers a ser más felices 🥲 y productivos 👩🏻‍💻 a través de la tecnología.

🎯 **Mi filosofía:** Creo que el mejor código es el que soluciona problemas reales y hace la vida más fácil a las personas.

Soy una apasionada de la tecnología y comparto todo lo que aprendo en mi blog [return(GiS);](https://www.returngis.net) y ahora también en YouTube [return(GiS); en YouTube](https://www.youtube.com/@returngis) 🎥🍿.

<div align="center">

📅 **¡Nuevo contenido cada miércoles a las 10:00 AM (CEST)!** 📅

</div>

---

## 🛠️ Stack de Tecnologías y Herramientas

### ☁️ Cloud & DevOps

<div align="center">
  <img src="https://img.shields.io/badge/azure-0078D4?logo=microsoft-azure&logoColor=white&style=for-the-badge" alt="Microsoft Azure">
  <img src="https://img.shields.io/badge/Azure_DevOps-0078D7?style=for-the-badge&logo=azuredevops&logoColor=white" alt="Azure DevOps">
  <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
  <img src="https://img.shields.io/badge/terraform-7B42BC?logo=terraform&logoColor=white&style=for-the-badge" alt="Terraform">
  <img src="https://img.shields.io/badge/kubernetes-326CE5?logo=kubernetes&logoColor=white&style=for-the-badge" alt="Kubernetes">
  <img src="https://img.shields.io/badge/docker-2496ED?logo=docker&logoColor=white&style=for-the-badge" alt="Docker">
</div>

### 🧠 Desarrollo Core & IA Generativa

<div align="center">
  <img src="https://img.shields.io/badge/Generative_AI-000000?style=for-the-badge&logo=openai&logoColor=white" alt="Inteligencia Artificial Generativa">
  <img src="https://img.shields.io/badge/.NET-512BD4?style=for-the-badge&logo=dotnet&logoColor=white" alt=".NET">
  <img src="https://img.shields.io/badge/-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/-JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/python-3776AB?logo=python&logoColor=white&style=for-the-badge" alt="Python">
  <img src="https://img.shields.io/badge/-HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
</div>

### 🔧 Herramientas

<div align="center">
  <img src="https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white" alt="Visual Studio Code">
  <img src="https://img.shields.io/badge/GitHub_Copilot-000000?style=for-the-badge&logo=githubcopilot&logoColor=white" alt="GitHub Copilot">
  <img src="https://img.shields.io/badge/powershell-5391FE?logo=powershell&logoColor=white&style=for-the-badge" alt="PowerShell">
  <img src="https://img.shields.io/badge/Terminal-241F31?style=for-the-badge&logo=gnometerminal&logoColor=white" alt="Terminal">
  <img src="https://img.shields.io/badge/macOS-000000?style=for-the-badge&logo=apple&logoColor=white" alt="macOS">
  <img src="https://img.shields.io/badge/windows-0078D6?logo=windows&logoColor=white&style=for-the-badge" alt="Windows">
  <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" alt="Git">
  <img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white" alt="Postman">
</div>

---
${videoSection}---
${blogSection}---

## 🚀 Proyectos destacados

<div align="center">

| 📚 Contenido | 🔗 Enlace | 📝 Descripción |
|:---:|:---:|:---|
| 🌐 **Blog** | [![return(GiS) Blog](https://img.shields.io/badge/return(GiS)-339933?style=flat-square&logo=github-pages&logoColor=white)](https://www.returngis.net) | Mi blog personal con tutoriales, guías y artículos sobre tecnología |
| 🎬 **YouTube** | [![YouTube Channel](https://img.shields.io/badge/return(GiS)-FF0000?style=flat-square&logo=youtube&logoColor=white)](https://www.youtube.com/@returngis) | Videos técnicos semanales sobre Cloud, DevOps e IA |
| 💻 **GitHub** | [![GitHub Repos](https://img.shields.io/badge/Repositorios-100000?style=flat-square&logo=github&logoColor=white)](https://github.com/0GiS0?tab=repositories) | Código de mis demos, tutoriales y proyectos open source |

</div>

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
  
  <!-- GitHub Stats Cards 
  <img height="180em" src="https://github-readme-stats.vercel.app/api?username=0GiS0&show_icons=true&hide_border=true&count_private=true&include_all_commits=true&theme=default&title_color=0078D4&icon_color=0078D4" alt="Estadísticas de GitHub de Gisela Torres" />
  <img height="180em" src="https://github-readme-stats.vercel.app/api/top-langs/?username=0GiS0&exclude_repo=KNN-Image-Classification&show_icons=true&hide_border=true&layout=compact&langs_count=6&theme=default&title_color=0078D4" alt="Lenguajes más usados por Gisela Torres" />
  
  <br/><br/>
  
  GitHub Streak Stats 
  <img height="180em" src="https://github-readme-streak-stats.herokuapp.com/?user=0GiS0&hide_border=true&ring=0078D4&fire=FF6B35&currStreakLabel=0078D4" alt="GitHub Streak Stats de Gisela Torres" />
  
  <br/><br/>
  -->
  
  <!-- Activity Graph -->
  <img src="https://github-readme-activity-graph.vercel.app/graph?username=0GiS0&theme=github-light&hide_border=true&area=true&area_color=0078D4&line=0078D4&point=FF6B35" alt="Gráfico de actividad de GitHub de Gisela Torres" width="95%"/>

</div>

---

## 🥰 Mis intereses

<div align="center">

| 🐣 Familia y amig@s | 🚴🏼‍♀️ Ciclismo | 🐕 Siri | 🌲 Senderismo | ✈️ Viajar | 🎬 Cine |
|:---:|:---:|:---:|:---:|:---:|:---:|
| Tiempo de calidad | Sobre ruedas | Paseos caninos | Naturaleza | Nuevas culturas | Palomitas 🍿 |

</div>

---

## ✉️ Contacto

<div align="center">

¿Te gusta mi contenido? **¡Suscríbete y sígueme en mis redes sociales!** 🚀

[![Blog](https://img.shields.io/badge/blog-339933?logo=github-pages&logoColor=white&style=for-the-badge)](https://www.returngis.net "Visita mi blog")
[![YouTube](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/@returngis "🔔 ¡Suscríbete a mi canal!")
[![Twitter](https://img.shields.io/twitter/follow/0gis0?style=for-the-badge)](https://twitter.com/0gis0 "Sígueme en Twitter")
[![LinkedIn](https://img.shields.io/badge/-LinkedIn-blue?style=for-the-badge&logo=Linkedin&logoColor=white)](https://www.linkedin.com/in/giselatorresbuitrago/ "Conéctate conmigo en LinkedIn")
[![Instagram](https://img.shields.io/badge/-Instagram-purple?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/0gis0/ "Sígueme en Instagram")
[![Mastodon](https://img.shields.io/badge/-Mastodon-blue?style=for-the-badge&logo=mastodon&logoColor=white)](https://mastodon.cloud/@0gis0 "Sígueme en Mastodon")

</div>

---

<div align="center">

💡 **¡Nuevo contenido cada miércoles!** 💡

*Este README se actualiza automáticamente con mis últimos vídeos y artículos* 🤖✨

<br/>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0078D4&height=100&section=footer" width="100%"/>

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
