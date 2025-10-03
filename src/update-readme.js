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
  
  <h1>¡Hola! Soy Gisela Torres 👩🏻‍💻</h1>
  
  <img src="https://media.giphy.com/media/hvRJCLFzcasrR4ia7z/giphy.gif" width="30px" alt="Waving hand animation">
  <p>¡Bienvenid@ a mi trocito de GitHub! 🤓</p>

<div align="center">

[![YouTube Channel Subscribers](https://img.shields.io/youtube/channel/subscribers/UC140iBrEZbOtvxWsJ-Tb0lQ?style=for-the-badge&logo=youtube&logoColor=white&color=red)](https://www.youtube.com/c/GiselaTorres?sub_confirmation=1)
[![GitHub followers](https://img.shields.io/github/followers/0GiS0?style=for-the-badge&logo=github&logoColor=white)](https://github.com/0GiS0)
[![LinkedIn Follow](https://img.shields.io/badge/LinkedIn-Sígueme-blue?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/giselatorresbuitrago/)
[![X Follow](https://img.shields.io/badge/X-Sígueme-black?style=for-the-badge&logo=x&logoColor=white)](https://twitter.com/0GiS0)

</div>

</div>

---

## 🤔 ¿Quién soy?

Trabajo en **Microsoft** desde hace más de 11 años (¡y 18 en el sector!) como **Software Global Blackbelt** 🫶🏻. Mi misión es técnica: ayudar a los developers a ser más felices 🥲 y productivos 👩🏻‍💻 a través de la tecnología. Soy una apasionada de la tecnología y comparto todo lo que aprendo en mi blog [return(GiS);](https://www.returngis.net) y ahora también en YouTube [return(GiS); en YouTube](https://www.youtube.com/@returngis) 🎥🍿.

📅 **¡Nuevo contenido cada miércoles a las 10:00 AM (CEST)!** 📅

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

## 🚀 Proyectos destacados

<div align="center">

[![return(GiS) Blog](https://img.shields.io/badge/BLOG-return(GiS)-339933?style=for-the-badge)](https://www.returngis.net "Mi blog personal")
[![YouTube Channel](https://img.shields.io/badge/YouTube-return(GiS)-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/@returngis "Mi canal de YouTube")

</div>

---

## 📊 Mis estadísticas

<div align="center">
  <img height="180em" src="https://github-readme-stats.vercel.app/api?username=0gis0&show_icons=true&hide_border=true&&count_private=true&include_all_commits=true" alt="Estadísticas de GitHub de Gisela Torres" />
  <img height="180em" src="https://github-readme-stats.vercel.app/api/top-langs/?username=0gis0&exclude_repo=KNN-Image-Classification&show_icons=true&hide_border=true&layout=compact&langs_count=4" alt="Lenguajes más usados por Gisela Torres" />
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

*Este README se actualiza automáticamente con mis últimos vídeos y artículos*

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
