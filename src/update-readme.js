const fs = require('fs');
const ContentFetcher = require('./content-fetcher');

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
  
  // Create README template
  const readme = `<div align="center">

<!-- Banner con gradiente atractivo -->
<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:0078D4,100:00C853&height=200&section=header&text=Gisela%20Torres%20👩🏻‍💻&fontSize=50&fontColor=fff&animation=fadeIn&fontAlignY=38&desc=Software%20Global%20Blackbelt%20@%20Microsoft%20•%20Content%20Creator&descAlignY=58&descAlign=50" alt="Banner animado"/>

</div>

<div align="center">
  
  <!-- Efecto de texto animado -->
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=22&duration=3000&pause=1000&color=0078D4&center=true&vCenter=true&multiline=true&width=600&height=100&lines=¡Bienvenid%40+a+mi+perfil!+👋;Comparto+conocimiento+en+Cloud+☁️;DevOps+•+IA+Generativa+•+.NET" alt="Texto animado" />
  
</div>

<div align="center">

[![YouTube Channel Subscribers](https://img.shields.io/youtube/channel/subscribers/UC140iBrEZbOtvxWsJ-Tb0lQ?style=for-the-badge&logo=youtube&logoColor=white&color=red)](https://www.youtube.com/c/GiselaTorres?sub_confirmation=1)
[![GitHub followers](https://img.shields.io/github/followers/0GiS0?style=for-the-badge&logo=github&logoColor=white)](https://github.com/0GiS0)
[![LinkedIn Follow](https://img.shields.io/badge/LinkedIn-Sígueme-blue?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/giselatorresbuitrago/)
[![X Follow](https://img.shields.io/badge/X-Sígueme-black?style=for-the-badge&logo=x&logoColor=white)](https://twitter.com/0GiS0)
[![Profile Views](https://komarev.com/ghpvc/?username=0GiS0&style=for-the-badge&color=0078D4)](https://github.com/0GiS0)

</div>

<br/>

<!-- Tabla de contenidos -->
<details>
<summary>📑 <b>Tabla de Contenidos</b></summary>
<br/>

- [🤔 ¿Quién soy?](#-quién-soy)
- [🛠️ Stack de Tecnologías](#️-stack-de-tecnologías-y-herramientas)
- [🎥 Mis últimos vídeos](#-mis-últimos-vídeos-en-youtube)
- [📝 Mis últimos artículos](#-mis-últimos-artículos-en-el-blog)
- [🏆 Logros y Reconocimientos](#-logros-y-reconocimientos)
- [🚀 Proyectos destacados](#-proyectos-destacados)
- [📊 Estadísticas](#-mis-estadísticas)
- [🥰 Mis intereses](#-mis-intereses)
- [✉️ Contacto](#️-contacto)

</details>

---

## 🤔 ¿Quién soy?

<img align="right" src="https://media.giphy.com/media/L1R1tvI9svkIWwpVYr/giphy.gif" width="300" alt="Coding animation"/>

Soy **Gisela Torres**, y trabajo en **Microsoft** desde hace más de **11 años** (¡y 18 en el sector tecnológico!) como **Software Global Blackbelt** 🫶🏻. 

### 🎯 Mi Misión
Mi misión es técnica y apasionante: **ayudar a los developers a ser más felices** 🥲 **y productivos** 👩🏻‍💻 a través de la tecnología. Me especializo en:

- ☁️ **Cloud Computing** con Azure
- 🤖 **Inteligencia Artificial Generativa** 
- 🔄 **DevOps & CI/CD**
- 🏗️ **Arquitecturas Modernas** de software

### 📚 Compartiendo Conocimiento
Soy una apasionada de aprender y enseñar. Comparto todo lo que aprendo en:
- 📝 Mi blog **[return(GiS);](https://www.returngis.net)** con artículos técnicos detallados
- 🎥 Mi canal de YouTube **[return(GiS);](https://www.youtube.com/@returngis)** con tutoriales prácticos en vídeo

<div align="center">

### 📅 ¡Nuevo contenido cada miércoles a las 10:00 AM (CEST)! 📅

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
  <img src="https://img.shields.io/badge/powershell-5391FE?logo=powershell&logoColor=white&style=for-the-badge" alt="PowerShell">
  <img src="https://img.shields.io/badge/windows-0078D6?logo=windows&logoColor=white&style=for-the-badge" alt="Windows">
</div>

---
${videoSection}---
${blogSection}---

## 🏆 Logros y Reconocimientos

<div align="center">

<!-- GitHub Trophies -->
<img src="https://github-profile-trophy.vercel.app/?username=0gis0&theme=darkhub&no-frame=true&no-bg=true&margin-w=4&column=4" alt="GitHub Trophies" />

</div>

<table align="center">
  <tr>
    <td align="center" width="50%">
      <img src="https://img.icons8.com/color/96/000000/microsoft.png" width="60" alt="Microsoft Icon"/>
      <br/>
      <b>11+ años en Microsoft</b>
      <br/>
      <small>Software Global Blackbelt</small>
    </td>
    <td align="center" width="50%">
      <img src="https://img.icons8.com/color/96/000000/youtube-play.png" width="60" alt="YouTube Icon"/>
      <br/>
      <b>Content Creator</b>
      <br/>
      <small>Blog + Canal YouTube</small>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <img src="https://img.icons8.com/color/96/000000/laptop-coding.png" width="60" alt="Coding Icon"/>
      <br/>
      <b>18+ años de experiencia</b>
      <br/>
      <small>Desarrollo de Software</small>
    </td>
    <td align="center" width="50%">
      <img src="https://img.icons8.com/color/96/000000/geography.png" width="60" alt="Globe Icon"/>
      <br/>
      <b>Comunidad Global</b>
      <br/>
      <small>Ayudando developers worldwide</small>
    </td>
  </tr>
</table>

---

## 🚀 Proyectos destacados

<div align="center">

<table>
  <tr>
    <td align="center" width="50%">
      <a href="https://www.returngis.net">
        <img src="https://img.icons8.com/fluency/96/000000/blog.png" width="80" alt="Blog Icon"/>
      </a>
      <br/>
      <a href="https://www.returngis.net">
        <b>return(GiS); Blog</b>
      </a>
      <br/>
      <sub>Mi blog técnico personal</sub>
      <br/>
      <sub>Artículos sobre Cloud, DevOps y más</sub>
      <br/><br/>
      <a href="https://www.returngis.net">
        <img src="https://img.shields.io/badge/Visitar-339933?style=for-the-badge&logo=github-pages&logoColor=white" alt="Visitar Blog"/>
      </a>
    </td>
    <td align="center" width="50%">
      <a href="https://www.youtube.com/@returngis">
        <img src="https://img.icons8.com/fluency/96/000000/youtube-play.png" width="80" alt="YouTube Icon"/>
      </a>
      <br/>
      <a href="https://www.youtube.com/@returngis">
        <b>return(GiS); en YouTube</b>
      </a>
      <br/>
      <sub>Mi canal de tutoriales en vídeo</sub>
      <br/>
      <sub>Contenido cada miércoles</sub>
      <br/><br/>
      <a href="https://www.youtube.com/@returngis?sub_confirmation=1">
        <img src="https://img.shields.io/badge/Suscribirse-FF0000?style=for-the-badge&logo=youtube&logoColor=white" alt="Suscribirse"/>
      </a>
    </td>
  </tr>
</table>

</div>

---

## 📊 Mis estadísticas

<div align="center">
  <img height="180em" src="https://github-readme-stats.vercel.app/api?username=0gis0&show_icons=true&theme=github_dark&hide_border=true&count_private=true&include_all_commits=true&bg_color=0d1117&title_color=0078D4&text_color=ffffff&icon_color=00C853" alt="Estadísticas de GitHub de Gisela Torres" />
  <img height="180em" src="https://github-readme-stats.vercel.app/api/top-langs/?username=0gis0&exclude_repo=KNN-Image-Classification&show_icons=true&theme=github_dark&hide_border=true&layout=compact&langs_count=6&bg_color=0d1117&title_color=0078D4&text_color=ffffff" alt="Lenguajes más usados por Gisela Torres" />
</div>

<br/>

<!-- GitHub Activity Graph -->
<div align="center">
  <img src="https://github-readme-activity-graph.vercel.app/graph?username=0gis0&theme=github-compact&hide_border=true&bg_color=0d1117&color=0078D4&line=00C853&point=ffffff" alt="Gráfico de actividad de GitHub" />
</div>

<br/>

<!-- GitHub Streak Stats -->
<div align="center">
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=0gis0&theme=dark&hide_border=true&background=0d1117&ring=0078D4&fire=00C853&currStreakLabel=ffffff" alt="GitHub Streak" />
</div>

<br/>

<!-- Contribution Snake -->
<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/0GiS0/0GiS0/output/github-contribution-grid-snake-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/0GiS0/0GiS0/output/github-contribution-grid-snake.svg">
    <img alt="github contribution grid snake animation" src="https://raw.githubusercontent.com/0GiS0/0GiS0/output/github-contribution-grid-snake.svg">
  </picture>
</div>

---

## 🥰 Mis intereses

<div align="center">

🐣 &nbsp;Pasar tiempo con mi familia y amig@s
&nbsp;•&nbsp;
🚴🏼‍♀️ &nbsp;Montar en bici
&nbsp;•&nbsp;
🐕 &nbsp;Pasear a Siri
&nbsp;•&nbsp;
🌲 &nbsp;Senderismo
&nbsp;•&nbsp;
✈️ &nbsp;Viajar
&nbsp;•&nbsp;
🎬 &nbsp;Ir al cine

</div>

---

## 💬 ¿Hablamos?

<div align="center">

### 🤝 ¿Te gusta mi contenido? ¡Conectemos!

Me encanta conectar con otros developers y compartir conocimiento. No dudes en contactarme si:

- 💡 Tienes preguntas sobre tecnología
- 🚀 Quieres colaborar en un proyecto
- 📚 Buscas ayuda con Azure, DevOps o IA Generativa
- ☕ Simplemente quieres charlar sobre tech

</div>

---

## ✉️ Mis redes sociales

<div align="center">

<table>
  <tr>
    <td align="center">
      <a href="https://www.returngis.net">
        <img src="https://img.icons8.com/fluency/48/000000/blog.png" width="40" alt="Blog"/>
        <br/><b>Blog</b>
      </a>
    </td>
    <td align="center">
      <a href="https://www.youtube.com/@returngis">
        <img src="https://img.icons8.com/fluency/48/000000/youtube-play.png" width="40" alt="YouTube"/>
        <br/><b>YouTube</b>
      </a>
    </td>
    <td align="center">
      <a href="https://twitter.com/0gis0">
        <img src="https://img.icons8.com/fluency/48/000000/twitter.png" width="40" alt="Twitter"/>
        <br/><b>Twitter</b>
      </a>
    </td>
    <td align="center">
      <a href="https://www.linkedin.com/in/giselatorresbuitrago/">
        <img src="https://img.icons8.com/fluency/48/000000/linkedin.png" width="40" alt="LinkedIn"/>
        <br/><b>LinkedIn</b>
      </a>
    </td>
    <td align="center">
      <a href="https://www.instagram.com/0gis0/">
        <img src="https://img.icons8.com/fluency/48/000000/instagram-new.png" width="40" alt="Instagram"/>
        <br/><b>Instagram</b>
      </a>
    </td>
    <td align="center">
      <a href="https://mastodon.cloud/@0gis0">
        <img src="https://img.icons8.com/fluency/48/000000/mastodon.png" width="40" alt="Mastodon"/>
        <br/><b>Mastodon</b>
      </a>
    </td>
  </tr>
</table>

<br/>

[![Blog](https://img.shields.io/badge/blog-339933?logo=github-pages&logoColor=white&style=for-the-badge)](https://www.returngis.net "Visita mi blog")
[![YouTube](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/@returngis "🔔 ¡Suscríbete a mi canal!")
[![Twitter](https://img.shields.io/twitter/follow/0gis0?style=for-the-badge)](https://twitter.com/0gis0 "Sígueme en Twitter")
[![LinkedIn](https://img.shields.io/badge/-LinkedIn-blue?style=for-the-badge&logo=Linkedin&logoColor=white)](https://www.linkedin.com/in/giselatorresbuitrago/ "Conéctate conmigo en LinkedIn")
[![Instagram](https://img.shields.io/badge/-Instagram-purple?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/0gis0/ "Sígueme en Instagram")
[![Mastodon](https://img.shields.io/badge/-Mastodon-blue?style=for-the-badge&logo=mastodon&logoColor=white)](https://mastodon.cloud/@0gis0 "Sígueme en Mastodon")

</div>

---

<div align="center">

### 🎯 ¿Quieres contribuir?

¡Las contribuciones son bienvenidas! Si tienes ideas para mejorar este perfil o mis proyectos:

1. 🍴 Haz un fork del repositorio
2. 🔧 Crea una rama con tu feature (\`git checkout -b feature/MejoraNueva\`)
3. 💾 Commit tus cambios (\`git commit -m 'Añade alguna mejora'\`)
4. 📤 Push a la rama (\`git push origin feature/MejoraNueva\`)
5. 🎉 Abre un Pull Request

</div>

---

<div align="center">

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=0:0078D4,100:00C853&height=120&section=footer" alt="Footer wave"/>

### 💡 ¡Nuevo contenido cada miércoles a las 10:00 AM (CEST)! 💡

*Este README se actualiza automáticamente con mis últimos vídeos y artículos del blog*

<sub>Hecho con ❤️ y ☕ por Gisela Torres</sub>

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
