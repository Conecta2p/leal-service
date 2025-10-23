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

// Carrossel do Hero Section - Versão Imagem Completa
function initHeroCarousel() {
  const slides = document.querySelectorAll(".carousel-slide");
  const indicators = document.querySelectorAll(".indicator");
  const prevBtn = document.querySelector(".carousel-control.prev");
  const nextBtn = document.querySelector(".carousel-control.next");

  let currentSlide = 0;
  let autoPlayInterval;
  let isTransitioning = false;

  // Função para mostrar slide específico
  function showSlide(index) {
    if (isTransitioning) return;

    isTransitioning = true;

    // Remove classe active de todos os slides
    slides.forEach((slide) => slide.classList.remove("active"));
    indicators.forEach((indicator) => indicator.classList.remove("active"));

    // Adiciona classe active ao slide atual
    slides[index].classList.add("active");
    indicators[index].classList.add("active");

    currentSlide = index;

    // Reset do flag após a transição
    setTimeout(() => {
      isTransitioning = false;
    }, 1000);
  }

  // Função para próximo slide
  function nextSlide() {
    let nextIndex = (currentSlide + 1) % slides.length;
    showSlide(nextIndex);
  }

  // Função para slide anterior
  function prevSlide() {
    let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
  }

  // Event listeners para controles
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      nextSlide();
      resetAutoPlay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      prevSlide();
      resetAutoPlay();
    });
  }

  // Event listeners para indicadores
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      showSlide(index);
      resetAutoPlay();
    });
  });

  // Auto-play
  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 5000);
  }

  function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
  }

  // Pausar auto-play no hover
  const heroSection = document.querySelector(".hero");
  if (heroSection) {
    heroSection.addEventListener("mouseenter", () => {
      clearInterval(autoPlayInterval);
    });

    heroSection.addEventListener("mouseleave", () => {
      startAutoPlay();
    });
  }

  // Navegação por teclado
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      prevSlide();
      resetAutoPlay();
    } else if (e.key === "ArrowRight") {
      nextSlide();
      resetAutoPlay();
    }
  });

  // Swipe para dispositivos móveis
  let touchStartX = 0;
  let touchEndX = 0;

  document.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  document.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;

    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe left - next slide
      nextSlide();
      resetAutoPlay();
    }

    if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe right - previous slide
      prevSlide();
      resetAutoPlay();
    }
  }

  // Iniciar auto-play
  startAutoPlay();
}

// Inicializar carrossel quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", function () {
  initHeroCarousel();
});
