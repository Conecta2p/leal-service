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

// FUNÇÃO DEFINITIVA PARA CONTADORES
// FUNÇÃO DEFINITIVA - VERSÃO setInterval
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number[data-target]");

  counters.forEach((counter) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startCounterSimple(counter);
            observer.unobserve(counter);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(counter);
  });
}

function startCounterSimple(counter) {
  const target = parseInt(counter.getAttribute("data-target"));
  let current = 0;
  const increment = Math.ceil(target / 50); // Ajuste a velocidade aqui

  const timer = setInterval(() => {
    current += increment;

    if (current >= target) {
      counter.textContent = target;
      clearInterval(timer);
    } else {
      counter.textContent = current;
    }
  }, 40); // Ajuste o intervalo aqui
}
