// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');

  toggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
  });

  // Optional: close menu when clicking a link
  const navLinks = document.querySelectorAll('.main-nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      document.body.classList.remove('nav-open');
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const themeToggle = document.querySelector(".theme-toggle");

  // 3 themes: default (no class), infernal, shadow
  const themes = ["default", "infernal", "shadow"];
  let currentIndex = 0;

  function applyTheme() {
    // Remove any previous theme classes
    body.classList.remove("theme-infernal", "theme-shadow");

    const currentTheme = themes[currentIndex];

    if (currentTheme === "infernal") {
      body.classList.add("theme-infernal");
      themeToggle.textContent = "Infernal";
    } else if (currentTheme === "shadow") {
      body.classList.add("theme-shadow");
      themeToggle.textContent = "Shadow";
    } else {
      // Default
      themeToggle.textContent = "Default";
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % themes.length;
      applyTheme();
    });
  }

  // Start in Infernal to match your vibe if you want:
  // currentIndex = 1; // 0 = Default, 1 = Infernal, 2 = Shadow
  applyTheme();
});

