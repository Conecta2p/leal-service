// Formulários Melhorados
document.addEventListener("DOMContentLoaded", function () {
  initializeForms();
  initializeFileUpload();
  initializeCharacterCounters();
});

function initializeForms() {
  const forms = document.querySelectorAll(".enhanced-form");

  forms.forEach((form) => {
    form.addEventListener("submit", handleFormSubmit);

    // Validação em tempo real
    const inputs = form.querySelectorAll("input, textarea, select");
    inputs.forEach((input) => {
      input.addEventListener("blur", validateField);
      input.addEventListener("input", validateField);
    });
  });
}

function handleFormSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');

  // Validar todos os campos
  const isValid = validateForm(form);

  if (isValid) {
    // Simular envio
    showLoadingState(submitBtn, true);

    setTimeout(() => {
      showLoadingState(submitBtn, false);
      showSuccessMessage(form, "Mensagem enviada com sucesso!");
      form.reset();
      resetCharacterCounters(form);
    }, 2000);
  }
}

function validateForm(form) {
  let isValid = true;
  const fields = form.querySelectorAll(
    "input[required], textarea[required], select[required]"
  );

  fields.forEach((field) => {
    if (!validateField({ target: field })) {
      isValid = false;
    }
  });

  return isValid;
}

function validateField(e) {
  const field = e.target;
  const value = field.value.trim();
  const formGroup = field.closest(".form-group");

  // Remover estados anteriores
  formGroup.classList.remove("valid", "invalid");

  if (field.hasAttribute("required") && !value) {
    formGroup.classList.add("invalid");
    return false;
  }

  if (field.type === "email" && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      formGroup.classList.add("invalid");
      return false;
    }
  }

  if (value) {
    formGroup.classList.add("valid");
  }

  return true;
}

function showLoadingState(button, isLoading) {
  if (isLoading) {
    button.classList.add("loading");
    button.disabled = true;
  } else {
    button.classList.remove("loading");
    button.disabled = false;
  }
}

function showSuccessMessage(form, message) {
  const existingMessage = form.querySelector(".success-message");
  if (existingMessage) {
    existingMessage.remove();
  }

  const successMsg = document.createElement("div");
  successMsg.className = "success-message";
  successMsg.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
  successMsg.style.cssText = `
        background: #d4edda;
        color: #155724;
        padding: 15px;
        border-radius: 8px;
        margin-top: 20px;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 600;
    `;

  form.appendChild(successMsg);

  setTimeout(() => {
    successMsg.remove();
  }, 5000);
}

function initializeFileUpload() {
  const uploadAreas = document.querySelectorAll(".upload-area");

  uploadAreas.forEach((area) => {
    const input = area.querySelector('input[type="file"]');
    const preview = area.nextElementSibling;

    area.addEventListener("dragover", (e) => {
      e.preventDefault();
      area.style.borderColor = "var(--secondary-color)";
      area.style.background = "rgba(255, 189, 45, 0.1)";
    });

    area.addEventListener("dragleave", () => {
      area.style.borderColor = "var(--light-gray)";
      area.style.background = "transparent";
    });

    area.addEventListener("drop", (e) => {
      e.preventDefault();
      area.style.borderColor = "var(--light-gray)";
      area.style.background = "transparent";

      if (e.dataTransfer.files.length) {
        input.files = e.dataTransfer.files;
        handleFileSelect(input, preview);
      }
    });

    input.addEventListener("change", () => {
      handleFileSelect(input, preview);
    });
  });
}

function handleFileSelect(input, preview) {
  const file = input.files[0];

  if (file) {
    // Validar tamanho (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Arquivo muito grande. Tamanho máximo: 5MB");
      input.value = "";
      return;
    }

    // Validar tipo
    const allowedTypes = [".pdf", ".doc", ".docx"];
    const fileExtension = "." + file.name.split(".").pop().toLowerCase();

    if (!allowedTypes.includes(fileExtension)) {
      alert("Tipo de arquivo não permitido. Use PDF, DOC ou DOCX.");
      input.value = "";
      return;
    }

    preview.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <i class="fas fa-file-pdf" style="color: #e74c3c; font-size: 1.5rem;"></i>
                <div>
                    <strong>${file.name}</strong>
                    <div style="font-size: 0.8rem; color: #666;">
                        ${(file.size / 1024 / 1024).toFixed(2)} MB
                    </div>
                </div>
                <button type="button" onclick="removeFile(this)" 
                        style="margin-left: auto; background: none; border: none; color: #999; cursor: pointer;">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
    preview.classList.add("active");
  }
}

function removeFile(button) {
  const preview = button.closest(".file-preview");
  const input =
    preview.previousElementSibling.querySelector('input[type="file"]');

  input.value = "";
  preview.classList.remove("active");
  preview.innerHTML = "";
}

function initializeCharacterCounters() {
  const textareas = document.querySelectorAll("textarea[data-max]");

  textareas.forEach((textarea) => {
    const maxLength =
      textarea.getAttribute("data-max") || textarea.id === "mensagem"
        ? 500
        : 300;
    const counter = textarea.nextElementSibling.querySelector("span");

    textarea.addEventListener("input", () => {
      const length = textarea.value.length;
      counter.textContent = length;

      if (length > maxLength * 0.8) {
        counter.style.color = "#e74c3c";
      } else {
        counter.style.color = "inherit";
      }
    });
  });
}

function resetCharacterCounters(form) {
  const counters = form.querySelectorAll(".char-count span");
  counters.forEach((counter) => {
    counter.textContent = "0";
    counter.style.color = "inherit";
  });
}
