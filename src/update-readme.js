const fs = require('fs');
const ContentFetcher = require('./content-fetcher');

async function updateReadme() {
  console.log('\ud83d\ude80 Iniciando actualizaci\u00f3n del README...\n');
  
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
  const readme = `# \u00a1Hola developer! <img src=\"https://media.giphy.com/media/hvRJCLFzcasrR4ia7z/giphy.gif\" width=\"25px\" alt=\"Waving hand animation\">

<div align=\"center\">
  
\u00a1Bienvenidx a mi trocito de GitHub! \ud83e\udd13

</div>

---

## \ud83e\udd14 \u00bfQui\u00e9n soy?

Me llamo Gisela Torres y trabajo en Microsoft como Global Blackbelt - Developer Audience. Se trata de un puesto t\u00e9cnico cuya misi\u00f3n es apoyar y asesorar sobre c\u00f3mo ayudar a los desarrolladores a ser m\u00e1s felices \ud83e\udd72 y productivos \ud83d\udc69\ud83c\udffb\u200d\ud83d\udcbb. Soy una apasionada de la tecnolog\u00eda y comparto todo lo que aprendo en mi blog [return(GiS);](https://www.returngis.net) y ahora tambi\u00e9n en YouTube [return(GiS); en YouTube](https://www.youtube.com/@returngis) \ud83c\udfa5\ud83c\udf7f.

\ud83d\udcc5 **\u00a1Nuevo contenido cada mi\u00e9rcoles a las 10:00 AM!** \ud83d\udcc5

---

## \ud83d\udc69\ud83c\udffc\u200d\ud83d\udcbb Tecnolog\u00edas y herramientas

<div align=\"center\">

![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=black "JavaScript")
![Node.js](https://img.shields.io/badge/-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white "Node.js")
![HTML5](https://img.shields.io/badge/-HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white "HTML5")
![Terraform](https://img.shields.io/badge/terraform-7B42BC?logo=terraform&logoColor=white&style=for-the-badge "Terraform")

![VSCode](https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white "Visual Studio Code")
![kubernetes](https://img.shields.io/badge/kubernetes-326CE5?logo=kubernetes&logoColor=white&style=for-the-badge "Kubernetes")
![Azure](https://img.shields.io/badge/azure-0078D4?logo=microsoft-azure&logoColor=white&style=for-the-badge "Microsoft Azure")
![Windows](https://img.shields.io/badge/windows-0078D6?logo=windows&logoColor=white&style=for-the-badge "Windows")

![Docker](https://img.shields.io/badge/docker-2496ED?logo=docker&logoColor=white&style=for-the-badge "Docker")
![Python](https://img.shields.io/badge/python-3776AB?logo=python&logoColor=white&style=for-the-badge "Python")
![PowerShell](https://img.shields.io/badge/powershell-5391FE?logo=powershell&logoColor=white&style=for-the-badge "PowerShell")

</div>

---
${videoSection}---
${blogSection}---

## \ud83d\ude80 Proyectos destacados

<div align=\"center\">

[![return(GiS) Blog](https://img.shields.io/badge/BLOG-return(GiS)-339933?style=for-the-badge)](https://www.returngis.net "Mi blog personal")
[![YouTube Channel](https://img.shields.io/badge/YouTube-return(GiS)-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/@returngis "Mi canal de YouTube")

</div>

---

## \ud83d\udcca Mis estad\u00edsticas

<div align=\"center\">
  <img height=\"180em\" src=\"https://github-readme-stats.vercel.app/api?username=0gis0&show_icons=true&hide_border=true&&count_private=true&include_all_commits=true\" alt=\"Estad\u00edsticas de GitHub de Gisela Torres\" />
  <img height=\"180em\" src=\"https://github-readme-stats.vercel.app/api/top-langs/?username=0gis0&exclude_repo=KNN-Image-Classification&show_icons=true&hide_border=true&layout=compact&langs_count=4\" alt=\"Lenguajes m\u00e1s usados por Gisela Torres\" />
</div>

---

## \ud83e\udd70 Mis intereses

<div align=\"center\">

\ud83d\udc23 &nbsp;Pasar tiempo con mi familia
&nbsp;\u2022&nbsp;
\ud83d\udeb4\ud83c\udffc\u200d\u2640\ufe0f &nbsp;Montar en bici
&nbsp;\u2022&nbsp;
\ud83d\udc15 &nbsp;Pasear a Siri
&nbsp;\u2022&nbsp;
\ud83c\udf32 &nbsp;Senderismo
&nbsp;\u2022&nbsp;
\u2708\ufe0f &nbsp;Viajar
&nbsp;\u2022&nbsp;
\ud83c\udfac &nbsp;Ir al cine

</div>

---

## \u2709\ufe0f Contacto

<div align=\"center\">

\u00bfTe gusta mi contenido? **\u00a1Suscr\u00edbete y s\u00edgueme en mis redes sociales!** \ud83d\ude80

[![Blog](https://img.shields.io/badge/blog-339933?logo=github-pages&logoColor=white&style=for-the-badge)](https://www.returngis.net "Visita mi blog")
[![YouTube](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/@returngis "\ud83d\udd14 \u00a1Suscr\u00edbete a mi canal!")
[![Twitter](https://img.shields.io/twitter/follow/0gis0?style=for-the-badge)](https://twitter.com/0gis0 "S\u00edgueme en Twitter")
[![LinkedIn](https://img.shields.io/badge/-LinkedIn-blue?style=for-the-badge&logo=Linkedin&logoColor=white)](https://www.linkedin.com/in/giselatorresbuitrago/ "Con\u00e9ctate conmigo en LinkedIn")
[![Instagram](https://img.shields.io/badge/-Instagram-purple?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/0gis0/ "S\u00edgueme en Instagram")
[![Mastodon](https://img.shields.io/badge/-Mastodon-blue?style=for-the-badge&logo=mastodon&logoColor=white)](https://mastodon.cloud/@0gis0 "S\u00edgueme en Mastodon")

</div>

---

<div align=\"center\">

\ud83d\udca1 **\u00a1Nuevo contenido cada mi\u00e9rcoles!** \ud83d\udca1

*Este README se actualiza autom\u00e1ticamente con mis \u00faltimos v\u00eddeos y art\u00edculos*

![Contador de visitas](https://visitor-badge.glitch.me/badge?page_id=0gis0 "Contador de visitas a mi perfil")

</div>`;

  // Write to README.md
  fs.writeFileSync('README.md', readme);
  
  console.log('\u2705 README.md actualizado correctamente!');
  console.log(`\ud83d\udcca V\u00eddeos incluidos: ${videos.length}`);
  console.log(`\ud83d\udcca Art\u00edculos incluidos: ${posts.length}`);
  
  // Also create a preview version
  fs.writeFileSync('README-preview.md', readme);
  console.log('\ud83d\udd0d Archivo de previsualizaci\u00f3n creado: README-preview.md');
}

// Run if called directly
if (require.main === module) {
  updateReadme().catch(console.error);
}

module.exports = updateReadme;
