/* ============================================
    Language Detection
    ============================================ */

function setLanguage(lang) {
    localStorage.setItem("language", lang); // Guarda a escolha do utilizador no localStorage, que é uma memória local do navegador. Assim, na próxima visita, a página lembra o idioma escolhido.
  
    document.documentElement.lang = lang;
  
    document.querySelectorAll("[data-lang-pt]").forEach(el => {
      el.textContent = lang === "pt"
        ? el.getAttribute("data-lang-pt")
        : el.getAttribute("data-lang-en");
    });

    const buttons = document.querySelectorAll(".language-switch button");
    buttons.forEach(btn => {
      const isPT = btn.textContent.includes("🇵🇹");
      const isEN = btn.textContent.includes("🇬🇧");

      btn.style.backgroundColor = "transparent";
      btn.classList.remove("animate");
  
      if ((lang === "pt" && isPT) || (lang === "en" && isEN)) {
        btn.style.backgroundColor = "var(--primary-color)";
        btn.classList.add("animate");
  
        void btn.offsetWidth;
        btn.classList.remove("animate");
        requestAnimationFrame(() => btn.classList.add("animate"));
      }
    });
  }
  
function detectInitialLanguage() {
  const savedLang = localStorage.getItem("language");

  if (savedLang) {
    setLanguage(savedLang);
    return;
  }

  const browserLang = navigator.language || navigator.userLanguage;
  const langCode = browserLang.startsWith("pt") ? "pt" : "en";

  setLanguage(langCode);
}
  
document.addEventListener("DOMContentLoaded", detectInitialLanguage);
  
/* ============================================
    Dark/light Theme detection
    ============================================ */

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const figure = document.getElementById("theme-figure");
  localStorage.setItem("theme", theme);
  if (theme === "light") {
    figure.textContent = "🌻" 
  } else {
    figure.textContent = "🪐" 
  }
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  applyTheme(newTheme);
}

function detectTheme() {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? "dark" : "light");
  }
}

document.addEventListener("DOMContentLoaded", detectTheme);
