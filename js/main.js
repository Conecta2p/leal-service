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
// Função de contadores CORRIGIDA
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number");

  counters.forEach((counter) => {
    // Salva o texto original que contém o número
    const originalText = counter.textContent;

    // Extrai apenas os números e símbolos (como + e %)
    let targetText = originalText;

    // Se for um número com símbolo como "500+", extrai o número
    if (targetText.includes("+")) {
      targetText = targetText.replace("+", "");
    }

    // Converte para número
    const target = isNaN(parseInt(targetText)) ? 0 : parseInt(targetText);

    // Limpa o contador para a animação
    counter.textContent = "0";

    const increment = target / 50; // Mais rápido
    let current = 0;

    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.ceil(current);

        // Adiciona o símbolo de volta se existia originalmente
        if (originalText.includes("+") && Math.ceil(current) >= target) {
          counter.textContent = target + "+";
        } else if (originalText.includes("%") && Math.ceil(current) >= target) {
          counter.textContent = "100%";
        }

        setTimeout(updateCounter, 30);
      } else {
        // Garante o texto final correto
        counter.textContent = originalText;
      }
    };

    // Inicia a animação quando o elemento estiver visível
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateCounter();
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(counter);
  });
}
