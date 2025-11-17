document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  /* --------------------------------------------------
     MOBILE NAV TOGGLE
  -------------------------------------------------- */
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector(".main-nav");
  const navLinks = document.querySelectorAll(".main-nav a");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = body.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        body.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* --------------------------------------------------
     THEME TOGGLE (localStorage)
  -------------------------------------------------- */
  const themes = ["default", "infernal", "shadow"];
  const themeLabels = {
    default: "Default",
    infernal: "Infernal",
    shadow: "Shadow"
  };

  const toggleBtn = document.querySelector("[data-theme-toggle]");
  if (!toggleBtn) return;

  const savedTheme = localStorage.getItem("qod-theme");
  let currentIndex = 0;

  if (savedTheme && themes.includes(savedTheme)) {
    currentIndex = themes.indexOf(savedTheme);
  }

  function applyTheme(name) {
    themes.forEach(t => body.classList.remove("theme-" + t));
    body.classList.add("theme-" + name);

    toggleBtn.textContent = themeLabels[name];
    localStorage.setItem("qod-theme", name);
  }

  applyTheme(themes[currentIndex]);

  toggleBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % themes.length;
    applyTheme(themes[currentIndex]);
  });

  /* --------------------------------------------------
     PARALLAX SCROLLING (Hero Image)
     Makes the big top image move at 40% scroll speed
  -------------------------------------------------- */
  const heroImage = document.querySelector(".hero-image img");

  if (heroImage) {
    let lastScroll = 0;

    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;

      // Smooth parallax: moves slightly slower than scroll
      const offset = scrollY * 0.4;

      // Only transform Y for performance
      heroImage.style.transform = `translateY(${offset}px) scale(1.05)`;

      lastScroll = scrollY;
    });
  }
});

