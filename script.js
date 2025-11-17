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


