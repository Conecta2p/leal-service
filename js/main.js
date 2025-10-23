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
        header.style.background = "rgba(255, 255, 255, 0.95)";
        header.style.backdropFilter = "blur(10px)";
      } else {
        header.style.background = "var(--white)";
        header.style.backdropFilter = "none";
      }
    });
  }

  // Form submission
  const contactForm = document.getElementById("form-contato");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Simulação de envio
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);

      // Aqui você implementaria o envio real para o servidor
      console.log("Dados do formulário:", data);

      // Feedback visual
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      submitBtn.textContent = "Enviando...";
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.textContent = "Mensagem Enviada!";
        submitBtn.style.backgroundColor = "#27ae60";

        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.style.backgroundColor = "";
          contactForm.reset();
        }, 3000);
      }, 1500);
    });
  }

  // Clientes slider - auto scroll
  const clientesSlider = document.querySelector(".clientes-slider");
  if (clientesSlider) {
    let scrollAmount = 0;
    const scrollSpeed = 1;
    const sliderWidth = clientesSlider.scrollWidth;
    const clientWidth = clientesSlider.clientWidth;

    function autoScroll() {
      if (scrollAmount > sliderWidth - clientWidth) {
        scrollAmount = 0;
      } else {
        scrollAmount += scrollSpeed;
      }
      clientesSlider.scrollLeft = scrollAmount;
      requestAnimationFrame(autoScroll);
    }

    // Iniciar auto-scroll após um delay
    setTimeout(() => {
      autoScroll();
    }, 2000);
  }

  // Inicializar contadores imediatamente (não esperar pela animação)
  animateCounters();
});

// Função de contadores (movida para fora do DOMContentLoaded)
function animateCounters() {
  const counters = document.querySelectorAll(".counter");

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
