document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  // ---------- Mobile nav toggle ----------
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector(".main-nav");
  const navLinks = document.querySelectorAll(".main-nav a");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = body.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close nav when a link is tapped
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        body.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ---------- Parallax scrolling (hero + ambient layer) ----------
  const heroImage = document.querySelector(".hero-image");
  const ambientLayer = document.querySelector(".ambient-layer");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function handleParallax() {
    if (reduceMotion.matches) {
      if (heroImage) heroImage.style.transform = "";
      if (ambientLayer) ambientLayer.style.transform = "";
      return;
    }

    const y = window.scrollY || window.pageYOffset || 0;

    // Medium parallax: ~20–40px across typical scroll ranges
    if (heroImage) {
      const heroOffset = clamp(y * 0.15, -40, 40);
      heroImage.style.transform = `translateY(${heroOffset}px)`;
    }

    if (ambientLayer) {
      const ambientOffset = clamp(y * 0.06, -20, 20);
      ambientLayer.style.transform = `translateY(${ambientOffset}px)`;
    }
  }

  window.addEventListener("scroll", handleParallax);
  handleParallax();

  // ---------- Theme toggle with localStorage ----------
  const themes = ["default", "infernal", "shadow"];
  const themeLabels = {
    default: "Default",
    infernal: "Infernal",
    shadow: "Shadow"
  };

  const toggleBtn = document.querySelector("[data-theme-toggle]");
  if (!toggleBtn) return;

  // Load saved theme or default
  const savedTheme = localStorage.getItem("qod-theme");
  let currentIndex = 0;

  if (savedTheme && themes.includes(savedTheme)) {
    currentIndex = themes.indexOf(savedTheme);
  }

  function applyTheme(name) {
    // Remove all theme-* classes
    themes.forEach(t => body.classList.remove("theme-" + t));

    // Add the current one
    body.classList.add("theme-" + name);

    // Update button label
    toggleBtn.textContent = themeLabels[name];

    // Save
    localStorage.setItem("qod-theme", name);
  }

  // Initial theme
  applyTheme(themes[currentIndex]);

  // Cycle themes on click
  toggleBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % themes.length;
    applyTheme(themes[currentIndex]);
  });
});
