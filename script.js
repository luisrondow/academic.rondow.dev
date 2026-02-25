import { academyContent } from "./content.js";

const heroHeading = document.getElementById("hero-heading");
const heroIntro = document.getElementById("hero-intro");
const heroLinks = document.getElementById("hero-links");
const asciiPanel = document.getElementById("ascii-panel");
const projectsList = document.getElementById("projects-list");
const metaDescription = document.querySelector('meta[name="description"]');

function isExternalLink(href) {
  try {
    const url = new URL(href, window.location.origin);
    return url.origin !== window.location.origin;
  } catch {
    return false;
  }
}

function decorateExternalLink(anchor, href) {
  if (!isExternalLink(href)) {
    return;
  }

  anchor.target = "_blank";
  anchor.rel = "noopener noreferrer";
}

function renderHero(content) {
  heroHeading.textContent = content.hero.heading;
  heroIntro.textContent = content.hero.intro;
  asciiPanel.textContent = content.ascii.art;

  heroLinks.textContent = "";

  content.hero.links.forEach((item) => {
    const li = document.createElement("li");
    const a = document.createElement("a");

    a.textContent = item.label;
    a.href = item.href;
    decorateExternalLink(a, item.href);

    li.appendChild(a);
    heroLinks.appendChild(li);
  });
}

function renderProjects(content) {
  projectsList.textContent = "";

  if (!content.projects.length) {
    const empty = document.createElement("p");
    empty.className = "muted-msg";
    empty.textContent = "No projects yet.";
    projectsList.appendChild(empty);
    return;
  }

  content.projects.forEach((project) => {
    const article = document.createElement("article");
    article.className = "project-card";

    const title = document.createElement("h3");
    title.className = "project-title";

    const titleLink = document.createElement("a");
    titleLink.href = project.href;
    titleLink.textContent = project.title;
    decorateExternalLink(titleLink, project.href);
    title.appendChild(titleLink);

    const description = document.createElement("p");
    description.className = "project-description";
    description.textContent = project.description;

    article.appendChild(title);
    article.appendChild(description);

    if (project.tags.length) {
      const tags = document.createElement("ul");
      tags.className = "project-tags";

      project.tags.forEach((tagText) => {
        const tag = document.createElement("li");
        tag.className = "project-tag";
        tag.textContent = tagText;
        tags.appendChild(tag);
      });

      article.appendChild(tags);
    }

    projectsList.appendChild(article);
  });
}

function applyMeta(content) {
  document.title = content.meta.title;

  if (metaDescription) {
    metaDescription.setAttribute("content", content.meta.description);
  }
}

applyMeta(academyContent);
renderHero(academyContent);
renderProjects(academyContent);
