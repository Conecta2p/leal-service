// Animações de entrada
document.addEventListener("DOMContentLoaded", function () {
  // Adicionar classe fade-in para elementos específicos
  const sections = document.querySelectorAll(".section, .cta-final");
  sections.forEach((section) => {
    section.classList.add("fade-in");
  });

  // Observador de elementos para animações de entrada
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        // Animar cards de serviços individualmente
        if (entry.target.id === "servicos") {
          const serviceCards = entry.target.querySelectorAll(".servico-card");
          serviceCards.forEach((card, index) => {
            setTimeout(() => {
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            }, index * 200);
          });
        }
      }
    });
  }, observerOptions);

  // Observar elementos para animação
  const elementsToAnimate = document.querySelectorAll(".fade-in");
  elementsToAnimate.forEach((el) => observer.observe(el));

  // Animações de hover para cards de serviços
  const serviceCards = document.querySelectorAll(".servico-card");
  serviceCards.forEach((card) => {
    // Definir estado inicial para animação
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition =
      "opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s ease";

    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Smooth scroll para links internos
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Efeito de digitação no hero (opcional)
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const text = heroTitle.innerHTML;
    heroTitle.innerHTML = "";
    let i = 0;

    function typeWriter() {
      if (i < text.length) {
        heroTitle.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    }

    // Iniciar efeito de digitação após um breve delay
    setTimeout(typeWriter, 1000);
  }

  // Animação para elementos flutuantes no hero
  const floatingCards = document.querySelectorAll(".floating-card");
  floatingCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.5}s`;
  });
});
