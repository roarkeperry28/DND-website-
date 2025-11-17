document.addEventListener("DOMContentLoaded", () => {
  // ---------- Mobile nav toggle ----------
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelectorAll(".main-nav a");

  if (navToggle) {
    navToggle.addEventListener("click", () => {
      document.body.classList.toggle("nav-open");
    });
  }

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      document.body.classList.remove("nav-open");
    });
  });

  // ---------- Theme toggle ----------
  const body = document.body;
  const themeToggle = document.querySelector(".theme-toggle");

  const themes = ["default", "infernal", "shadow"];
  let currentIndex = 0; // 0 = Default, 1 = Infernal, 2 = Shadow

  function applyTheme() {
    // Remove old theme classes
    body.classList.remove("theme-infernal", "theme-shadow");

    const currentTheme = themes[currentIndex];

    if (currentTheme === "infernal") {
      body.classList.add("theme-infernal");
      themeToggle.textContent = "Infernal";
    } else if (currentTheme === "shadow") {
      body.classList.add("theme-shadow");
      themeToggle.textContent = "Shadow";
    } else {
      themeToggle.textContent = "Default";
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % themes.length;
      applyTheme();
    });

    // If you want to start in Infernal instead of Default:
    // currentIndex = 1;
    applyTheme();
  }
});

