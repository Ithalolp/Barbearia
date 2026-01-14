// ========== INICIALIZAÇÃO SEGURA ==========
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM Carregado - Inicializando sistema...");

  // Inicializar ícones Lucide APÓS o DOM carregar
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  // Obter elementos DOM
  const navbar = document.getElementById("navbar");
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const closeMenuBtn = document.getElementById("close-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-link");
  const bookingForm = document.getElementById("booking-form");
  const floatingWhatsapp = document.getElementById("floating-whatsapp");

  // ========== CONFIGURAR BOTÃO FLUTUANTE DO WHATSAPP ==========
  if (floatingWhatsapp && typeof WHATSAPP_NUMBER !== "undefined") {
    floatingWhatsapp.href = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}`;
    floatingWhatsapp.title = "Fale conosco no WhatsApp";
    floatingWhatsapp.setAttribute("aria-label", "WhatsApp da Barbearia Soares");
  }

  // ========== NAVBAR SCROLL ==========
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.remove("transparent-nav");
      navbar.classList.add("glass-nav");
      if (mobileMenuBtn) {
        mobileMenuBtn.classList.remove("text-white");
        mobileMenuBtn.classList.add("text-gray-900");
      }
    } else {
      navbar.classList.add("transparent-nav");
      navbar.classList.remove("glass-nav");
      if (mobileMenuBtn) {
        mobileMenuBtn.classList.add("text-white");
        mobileMenuBtn.classList.remove("text-gray-900");
      }
    }
  });

  // ========== MENU MOBILE ==========
  function toggleMenu() {
    if (mobileMenu) {
      mobileMenu.classList.toggle("translate-x-full");
      document.body.classList.toggle("overflow-hidden");
    }
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", toggleMenu);
  }

  if (closeMenuBtn) {
    closeMenuBtn.addEventListener("click", toggleMenu);
  }

  if (mobileLinks) {
    mobileLinks.forEach((link) => {
      link.addEventListener("click", toggleMenu);
    });
  }

  // ========== PREVENIR ENTER NO FORMULÁRIO ==========
  if (bookingForm) {
    bookingForm.addEventListener("keydown", function (e) {
      // Prevenir envio do formulário com Enter
      if (e.key === "Enter" && e.target.type !== "submit") {
        e.preventDefault();

        // Navegar para o próximo campo
        const inputs = Array.from(
          bookingForm.querySelectorAll("input, select, textarea")
        );
        const currentIndex = inputs.indexOf(e.target);

        if (currentIndex !== -1 && currentIndex < inputs.length - 1) {
          inputs[currentIndex + 1].focus();
        }
      }
    });
  }

  // ========== SISTEMA DE DATA ==========

  // Função para obter data do dia (até final do expediente)
  function getTodayDate() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Verificar se estamos dentro do expediente (8h às 17h)
    const currentHour = now.getHours();

    // Se for antes das 17h, usar hoje
    if (currentHour < 17) {
      // Verificar se não é domingo (0 = Domingo)
      if (today.getDay() !== 0) {
        return today;
      }
    }

    // Se for depois das 17h ou domingo, calcular próxima data
    let nextDate = new Date(today);

    // Se for depois das 17h hoje, pular para amanhã
    if (currentHour >= 17) {
      nextDate.setDate(nextDate.getDate() + 1);
    }

    // Pular domingos
    while (nextDate.getDay() === 0) {
      nextDate.setDate(nextDate.getDate() + 1);
    }

    return nextDate;
  }

  // Formatar data para exibição
  function formatDateForDisplay(date) {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    let formatted = date.toLocaleDateString("pt-BR", options);
    formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1);

    // Adicionar indicador de hoje/amanhã
    if (date.toDateString() === today.toDateString()) {
      return `Hoje, ${formatted}`;
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return `Amanhã, ${formatted}`;
    }

    return formatted;
  }

  // Formatar data para envio (YYYY-MM-DD)
  function formatDateForSubmit(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // ========== SISTEMA DE HORÁRIO CORRIGIDO ==========

  // Função para formatar horário enquanto digita (MÁSCARA SIMPLES)
  function formatTimeInput(inputValue) {
    // Remover tudo que não é número
    let numbers = inputValue.replace(/\D/g, "");

    // Se não tiver números, retornar vazio
    if (numbers.length === 0) return "";

    // Limitar a 4 dígitos
    if (numbers.length > 4) {
      numbers = numbers.substring(0, 4);
    }

    // Se tiver mais de 2 dígitos, adicionar : após o segundo
    if (numbers.length > 2) {
      return numbers.substring(0, 2) + ":" + numbers.substring(2);
    }

    // Se tiver 1-2 dígitos, manter como está
    return numbers;
  }

  // Função para validar e formatar final (ao sair do campo)
  function validateAndFormatTime(timeStr) {
    if (!timeStr || timeStr.trim() === "") {
      return { valid: false, message: "Digite um horário" };
    }

    // Remover : temporariamente para validação
    let time = timeStr.replace(/\D/g, "");

    // Se não tiver números suficientes
    if (time.length < 1) {
      return { valid: false, message: "Digite um horário" };
    }

    // Completar com zeros se necessário
    if (time.length === 1) {
      time = "0" + time + "00";
    } else if (time.length === 2) {
      time = time + "00";
    } else if (time.length === 3) {
      time = "0" + time.substring(0, 1) + time.substring(1, 3) + "0";
    }

    // Garantir formato HH:MM
    const hours = time.substring(0, 2);
    const minutes = time.substring(2, 4);

    const formattedTime = `${hours}:${minutes}`;
    const hourNum = parseInt(hours);
    const minuteNum = parseInt(minutes);

    // Validar valores
    if (hourNum < 0 || hourNum > 23 || minuteNum < 0 || minuteNum > 59) {
      return { valid: false, message: "Horário inválido" };
    }

    // Validar horário comercial (8h-17h)
    if (hourNum < 8 || hourNum > 17) {
      return {
        valid: false,
        message: "Fora do expediente (8h-17h)",
        suggestion: hourNum < 8 ? "08:00" : "17:00",
      };
    }

    if (hourNum === 17 && minuteNum > 0) {
      return {
        valid: false,
        message: "Último horário: 17:00",
        suggestion: "17:00",
      };
    }

    return {
      valid: true,
      formatted: formattedTime,
      display: `${hourNum}h${minuteNum > 0 ? minuteNum : ""}`,
    };
  }

  // ========== INICIALIZAR SISTEMA DE AGENDAMENTO ==========
  function initBookingSystem() {
    console.log("Inicializando sistema de agendamento...");

    // 1. CONFIGURAR DATA AUTOMÁTICA
    const dateDisplay = document.getElementById("date-display");
    const dateInput = document.getElementById("date");
    const dateContainer = document.getElementById("date-container");

    if (dateDisplay && dateInput && dateContainer) {
      const currentDate = getTodayDate();
      const displayText = formatDateForDisplay(currentDate);
      const submitValue = formatDateForSubmit(currentDate);

      dateDisplay.textContent = displayText;
      dateInput.value = submitValue;
      dateContainer.classList.remove("bg-gray-100");
      dateContainer.classList.add("bg-amber-50", "border-amber-200");
    }

    // 2. CONFIGURAR CAMPO DE NOME - GARANTIR QUE ESTÁ VAZIO
    const nameInput = document.getElementById("name");
    if (nameInput) {
      // FORÇAR O CAMPO A FICAR VAZIO SEMPRE
      nameInput.value = "";

      // Configurar evento de input simples
      nameInput.addEventListener("input", function () {
        if (this.value.trim()) {
          this.classList.remove("border-red-300");
          this.classList.add("border-green-300");
        } else {
          this.classList.remove("border-green-300");
        }
      });
    }

    // 3. CONFIGURAR CAMPO DE SERVIÇO
    const serviceSelect = document.getElementById("service");
    if (serviceSelect) {
      // Garantir que comece vazio
      serviceSelect.value = "";

      serviceSelect.addEventListener("change", function () {
        if (this.value) {
          this.classList.remove("border-red-300");
          this.classList.add("border-green-300");
        } else {
          this.classList.remove("border-green-300");
        }
      });
    }

    // 4. CONFIGURAR CAMPO DE HORÁRIO - MÁSCARA SIMPLES
    const timeInput = document.getElementById("time-input");
    const timeHidden = document.getElementById("time");
    const timeHint = document.getElementById("time-format-hint");

    if (timeInput && timeHidden && timeHint) {
      // Começar com campo vazio
      timeInput.value = "";
      timeHidden.value = "";
      timeHint.textContent = "Digite o horário";
      timeHint.classList.remove("text-green-600", "text-red-500");
      timeHint.classList.add("text-gray-400");

      // VARIÁVEL para controlar o cursor
      let previousValue = "";
      let previousCursorPos = 0;

      // MÁSCARA SIMPLES: só permite números e adiciona : automaticamente
      timeInput.addEventListener("input", function () {
        const cursorPos = this.selectionStart;
        previousValue = this.value;
        previousCursorPos = cursorPos;

        // Formatar enquanto digita (apenas números e :)
        const formattedValue = formatTimeInput(this.value);

        // Atualizar valor se mudou
        if (formattedValue !== this.value) {
          this.value = formattedValue;

          // Ajustar posição do cursor
          let newCursorPos = cursorPos;

          // Se adicionamos :, ajustar cursor
          if (
            formattedValue.length > previousValue.length &&
            formattedValue.includes(":") &&
            !previousValue.includes(":")
          ) {
            newCursorPos = cursorPos + 1;
          }

          this.setSelectionRange(newCursorPos, newCursorPos);
        }

        // Validar em tempo real (apenas para feedback)
        if (this.value.trim()) {
          const validation = validateAndFormatTime(this.value);

          if (validation.valid) {
            this.classList.remove("border-red-300", "bg-red-50");
            this.classList.add("border-green-300", "bg-green-50");
            timeHint.textContent = validation.display;
            timeHint.classList.remove("text-red-500");
            timeHint.classList.add("text-green-600");
            timeHidden.value = validation.formatted;
          } else {
            this.classList.remove("border-green-300", "bg-green-50");
            this.classList.add("border-red-300", "bg-red-50");
            timeHint.textContent = validation.message;
            timeHint.classList.remove("text-green-600");
            timeHint.classList.add("text-red-500");
            timeHidden.value = "";
          }
        } else {
          this.classList.remove(
            "border-green-300",
            "bg-green-50",
            "border-red-300",
            "bg-red-50"
          );
          timeHint.textContent = "Digite o horário";
          timeHint.classList.remove("text-green-600", "text-red-500");
          timeHint.classList.add("text-gray-400");
          timeHidden.value = "";
        }
      });

      // Formatar final ao perder o foco
      timeInput.addEventListener("blur", function () {
        if (this.value && this.value.trim()) {
          const validation = validateAndFormatTime(this.value);

          if (validation.valid) {
            this.value = validation.formatted;
            this.dispatchEvent(new Event("input"));
          } else if (validation.suggestion) {
            this.value = validation.suggestion;
            this.dispatchEvent(new Event("input"));
          }
        }
      });

      // Permitir apagar completamente
      timeInput.addEventListener("keydown", function (e) {
        if (e.key === "Backspace" || e.key === "Delete") {
          setTimeout(() => {
            if (!this.value.trim()) {
              this.classList.remove(
                "border-green-300",
                "bg-green-50",
                "border-red-300",
                "bg-red-50"
              );
              timeHint.textContent = "Digite o horário";
              timeHint.classList.remove("text-green-600", "text-red-500");
              timeHint.classList.add("text-gray-400");
              timeHidden.value = "";
            }
          }, 10);
        }
      });
    }
  }

  // Inicializar sistema de agendamento
  initBookingSystem();

  // ========== FORMULÁRIO DE WHATSAPP COM MENSAGEM BEM FORMATADA ==========
  if (bookingForm) {
    bookingForm.addEventListener("submit", function (e) {
      e.preventDefault();
      e.stopPropagation();

      // Elementos
      const nameInput = document.getElementById("name");
      const serviceSelect = document.getElementById("service");
      const dateInput = document.getElementById("date");
      const timeHidden = document.getElementById("time");

      // Validação básica
      let isValid = true;
      const errors = [];

      if (!nameInput || !nameInput.value.trim()) {
        isValid = false;
        errors.push("Nome");
        nameInput.classList.add("border-red-500");
      } else {
        nameInput.classList.remove("border-red-500");
      }

      if (!serviceSelect || !serviceSelect.value) {
        isValid = false;
        errors.push("Serviço");
        serviceSelect.classList.add("border-red-500");
      } else {
        serviceSelect.classList.remove("border-red-500");
      }

      if (!timeHidden || !timeHidden.value) {
        isValid = false;
        errors.push("Horário");
        const timeInputField = document.getElementById("time-input");
        if (timeInputField) timeInputField.classList.add("border-red-500");
      } else {
        const timeInputField = document.getElementById("time-input");
        if (timeInputField) timeInputField.classList.remove("border-red-500");
      }

      if (!isValid) {
        alert(`Por favor, preencha: ${errors.join(", ")}`);
        return;
      }

      // Obter valores
      const name = nameInput.value.trim();
      const service = serviceSelect.value;
      const dateValue = dateInput.value;
      const timeValue = timeHidden.value;

      // Formatar data para mensagem
      const dateObj = new Date(dateValue);
      const dateFormatted = dateObj.toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      });

      // Capitalizar primeira letra
      const dateDisplay =
        dateFormatted.charAt(0).toUpperCase() + dateFormatted.slice(1);

      // Formatar hora para exibição
      const [hours, minutes] = timeValue.split(":");
      const timeDisplay =
        minutes === "00"
          ? `${parseInt(hours)}h`
          : `${parseInt(hours)}h${minutes}`;

      // ========== MENSAGEM BEM FORMATADA PARA WHATSAPP ==========
      // Usando \n para quebras de linha limpas
      const message =
        `*AGENDAMENTO - BARBEARIA SOARES*\n\n` +
        `👤 *Cliente:* ${name}\n` +
        `✂️ *Serviço:* ${service}\n` +
        `📅 *Data:* ${dateDisplay}\n` +
        `⏰ *Horário:* ${timeDisplay}\n\n` +
        `📍 *Local:* R. Padre Cícero, 185 – Centro, Missão Velha - CE\n\n` +
        `_Por favor, confirme a disponibilidade deste horário._`;

      // VERIFICAR SE WHATSAPP_NUMBER ESTÁ DEFINIDO
      if (typeof WHATSAPP_NUMBER === "undefined") {
        alert("Erro: Número do WhatsApp não configurado. Contate o suporte.");
        return;
      }

      // Usar encodeURIComponent corretamente
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodedMessage}`;

      // Abrir WhatsApp
      const newWindow = window.open(whatsappUrl, "_blank");

      // Feedback visual
      const submitBtn = this.querySelector('button[type="submit"]');
      if (submitBtn) {
        const originalHTML = submitBtn.innerHTML;

        submitBtn.innerHTML = `
          <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Enviando...</span>
        `;
        submitBtn.disabled = true;

        // Reset após 1.5 segundos
        setTimeout(() => {
          // Limpar TODOS os campos COMPLETAMENTE
          if (nameInput) {
            nameInput.value = "";
            nameInput.classList.remove("border-green-300", "border-red-500");
          }

          if (serviceSelect) {
            serviceSelect.value = "";
            serviceSelect.classList.remove(
              "border-red-500",
              "border-green-300"
            );
          }

          // Limpar campo de hora COMPLETAMENTE
          const timeInputField = document.getElementById("time-input");
          if (timeInputField) {
            timeInputField.value = "";
            timeInputField.classList.remove(
              "border-green-300",
              "bg-green-50",
              "border-red-300",
              "bg-red-50"
            );
          }

          const timeHint = document.getElementById("time-format-hint");
          if (timeHint) {
            timeHint.textContent = "Digite o horário";
            timeHint.classList.remove("text-green-600", "text-red-500");
            timeHint.classList.add("text-gray-400");
          }

          // Limpar campo hidden
          if (timeHidden) {
            timeHidden.value = "";
          }

          // Restaurar botão
          submitBtn.innerHTML = originalHTML;
          submitBtn.disabled = false;

          // Focar no nome
          if (nameInput) {
            nameInput.focus();
          }

          // Recalcular data (caso tenha passado tempo)
          setTimeout(initBookingSystem, 100);
        }, 1500);
      }
    });
  }

  // Configuração Tailwind
  if (typeof tailwind !== "undefined") {
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            amber: {
              50: "#fffbeb",
              100: "#fef3c7",
              200: "#fde68a",
              300: "#fcd34d",
              400: "#fbbf24",
              500: "#f59e0b",
              600: "#d97706",
              700: "#b45309",
              800: "#92400e",
              900: "#78350f",
            },
          },
          fontFamily: {
            sans: ["Inter", "sans-serif"],
            serif: ["Playfair Display", "serif"],
          },
        },
      },
    };
  }
});
