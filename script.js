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

  function applyTheme(name) {
    // Remove all theme-* classes
    themes.forEach(t => body.classList.remove("theme-" + t));

    // Add the current one
    body.classList.add("theme-" + name);

    // Update button label
    if (toggleBtn) {
      toggleBtn.textContent = themeLabels[name] || "Theme";
    }

    // Save
    localStorage.setItem("qod-theme", name);
  }

  // Load saved theme or default
  const savedTheme = localStorage.getItem("qod-theme");
  let currentIndex = 0;

  if (savedTheme && themes.includes(savedTheme)) {
    currentIndex = themes.indexOf(savedTheme);
  }

  // Initial theme
  applyTheme(themes[currentIndex]);

  // Cycle themes on click (if button exists)
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % themes.length;
      applyTheme(themes[currentIndex]);
    });
  }

  // ---------- WORLD MAP – hover/click hotspots ----------
  const worldMapSection = document.querySelector(".world-map-section");

  if (worldMapSection) {
    const hotspots = worldMapSection.querySelectorAll("[data-map-location]");
    const titleEl = worldMapSection.querySelector("[data-map-title]");
    const bodyEl = worldMapSection.querySelector("[data-map-body]");
    const taglineEl = worldMapSection.querySelector("[data-map-tagline]");

    // Optional defaults if you want them in HTML
    const defaultTitle = titleEl ? titleEl.textContent : "";
    const defaultBody = bodyEl ? bodyEl.textContent : "";
    const defaultTagline = taglineEl ? taglineEl.textContent : "";

    function activateHotspot(hotspot) {
      if (!hotspot) return;
      hotspots.forEach(h => h.classList.remove("is-active"));
      hotspot.classList.add("is-active");

      if (titleEl && hotspot.dataset.mapTitle) {
        titleEl.textContent = hotspot.dataset.mapTitle;
      }
      if (bodyEl && hotspot.dataset.mapBody) {
        bodyEl.textContent = hotspot.dataset.mapBody;
      }
      if (taglineEl) {
        if (hotspot.dataset.mapTagline) {
          taglineEl.textContent = hotspot.dataset.mapTagline;
        } else {
          taglineEl.textContent = defaultTagline;
        }
      }
    }

    // Activate first hotspot by default (if any)
    if (hotspots.length > 0) {
      activateHotspot(hotspots[0]);
    } else {
      // No hotspots: restore defaults if present
      if (titleEl) titleEl.textContent = defaultTitle;
      if (bodyEl) bodyEl.textContent = defaultBody;
      if (taglineEl) taglineEl.textContent = defaultTagline;
    }

    hotspots.forEach(hotspot => {
      // Hover
      hotspot.addEventListener("mouseenter", () => {
        activateHotspot(hotspot);
      });

      // Keyboard focus
      hotspot.addEventListener("focus", () => {
        activateHotspot(hotspot);
      });

      // Tap/click (nice for mobile)
      hotspot.addEventListener("click", () => {
        activateHotspot(hotspot);
      });
    });
  }
});

