// Menu mobile toggle
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      nav.classList.toggle("active");
      menuToggle.classList.toggle("active");
    });
  }

  // Fechar menu ao clicar em um link
  const navLinks = document.querySelectorAll(".nav ul li a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      nav.classList.remove("active");
      menuToggle.classList.remove("active");
    });
  });

  // Header scroll effect
  const header = document.querySelector(".header");
  if (header) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 100) {
        header.style.background = "rgba(255, 255, 255, 0.98)";
        header.style.backdropFilter = "blur(10px)";
      } else {
        header.style.background = "rgba(255, 255, 255, 0.95)";
        header.style.backdropFilter = "blur(10px)";
      }
    });
  }

  // Inicializar contadores
  animateCounters();
});

// Função de contadores
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number");

  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-target");
    const increment = target / 100;
    let current = 0;

    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.ceil(current);
        setTimeout(updateCounter, 20);
      } else {
        counter.textContent = target;
      }
    };

    updateCounter();
  });
}
