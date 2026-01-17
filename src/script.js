document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM Carregado - Inicializando sistema...");

  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  const navbar = document.getElementById("navbar");
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const closeMenuBtn = document.getElementById("close-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-link");
  const bookingForm = document.getElementById("booking-form");
  const floatingWhatsapp = document.getElementById("floating-whatsapp");

  if (floatingWhatsapp && typeof WHATSAPP_NUMBER !== "undefined") {
    floatingWhatsapp.href = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}`;
    floatingWhatsapp.title = "Fale conosco no WhatsApp";
    floatingWhatsapp.setAttribute("aria-label", "WhatsApp da Barbearia Soares");
  }

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

  if (bookingForm) {
    bookingForm.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && e.target.type !== "submit") {
        e.preventDefault();

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

  function getTodayDate() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const currentHour = now.getHours();

    if (currentHour < 17) {
      if (today.getDay() !== 0) {
        return today;
      }
    }

    let nextDate = new Date(today);

    if (currentHour >= 17) {
      nextDate.setDate(nextDate.getDate() + 1);
    }

    while (nextDate.getDay() === 0) {
      nextDate.setDate(nextDate.getDate() + 1);
    }

    return nextDate;
  }

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

    if (date.toDateString() === today.toDateString()) {
      return `Hoje, ${formatted}`;
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return `Amanhã, ${formatted}`;
    }

    return formatted;
  }

  function formatDateForSubmit(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function formatTimeInput(inputValue) {
    let numbers = inputValue.replace(/\D/g, "");
    if (numbers.length === 0) return "";

    if (numbers.length > 4) {
      numbers = numbers.substring(0, 4);
    }

    if (numbers.length <= 2) {
      return numbers; 
    } else if (numbers.length === 3) {

      return numbers.substring(0, 2) + ":" + numbers.substring(2, 3);
    } else {

      return numbers.substring(0, 2) + ":" + numbers.substring(2, 4);
    }
  }

  function validateAndFormatTime(timeStr) {
    if (!timeStr || timeStr.trim() === "") {
      return {
        valid: false,
        message: "Digite um horário",
        display: "",
      };
    }

    let time = timeStr.replace(/\D/g, "");

    if (time.length < 1) {
      return {
        valid: false,
        message: "Digite pelo menos 1 dígito",
        display: "",
      };
    }
    if (time.length === 1) {
      time = "0" + time + "00"; // 8 -> 08:00
    } else if (time.length === 2) {
      time = time + "00"; // 12 -> 12:00
    } else if (time.length === 3) {
      time = time.substring(0, 2) + time.substring(2, 3) + "0"; // 830 -> 08:30
    }

    const hours = time.substring(0, 2);
    const minutes = time.substring(2, 4);

    const hourNum = parseInt(hours);
    const minuteNum = parseInt(minutes);

    if (isNaN(hourNum) || isNaN(minuteNum)) {
      return {
        valid: false,
        message: "Horário inválido",
        display: "",
      };
    }

    if (hourNum < 0 || hourNum > 23 || minuteNum < 0 || minuteNum > 59) {
      return {
        valid: false,
        message: "Horário inválido",
        display: "",
      };
    }

    const formattedTime = `${hours.padStart(2, "0")}:${minutes.padStart(
      2,
      "0"
    )}`;

    if (hourNum < 8 || hourNum > 17) {
      return {
        valid: false,
        message: "Fora do expediente (8h às 17h)",
        display: formattedTime,
        suggestion: hourNum < 8 ? "08:00" : "17:00",
      };
    }

    if (hourNum === 17 && minuteNum > 0) {
      return {
        valid: false,
        message: "Último horário: 17:00",
        display: formattedTime,
        suggestion: "17:00",
      };
    }

    if (minuteNum % 30 !== 0) {
      return {
        valid: true,
        formatted: formattedTime,
        display: `${hourNum}h${minuteNum > 0 ? minuteNum : ""}`,
        warning: "Sugerimos horários cheios ou meia-hora (ex: 9:00, 9:30)",
      };
    }

    return {
      valid: true,
      formatted: formattedTime,
      display: `${hourNum}h${minuteNum > 0 ? minuteNum : ""}`,
    };
  }

  function setupTimeField() {
    const timeInput = document.getElementById("time-input");
    const timeHidden = document.getElementById("time");

    if (!timeInput || !timeHidden) return;

    timeInput.value = "";
    timeHidden.value = "";


    timeInput.placeholder = "Das 8h às 17h";


    let timeFeedback = document.getElementById("time-feedback");
    if (!timeFeedback) {
      timeFeedback = document.createElement("div");
      timeFeedback.id = "time-feedback";
      timeFeedback.className = "text-xs mt-1";
      timeInput.parentNode.appendChild(timeFeedback);
    }


    let lastValidTime = "";


    timeInput.addEventListener("input", function () {
      const cursorPos = this.selectionStart;
      const oldValue = this.value;


      const formattedValue = formatTimeInput(this.value);


      if (formattedValue !== this.value) {
        this.value = formattedValue;


        const diff = formattedValue.length - oldValue.length;
        const newCursorPos = cursorPos + diff;
        this.setSelectionRange(newCursorPos, newCursorPos);
      }


      updateTimeFeedback(this.value);
    });


    timeInput.addEventListener("blur", function () {
      if (!this.value.trim()) return;

      const validation = validateAndFormatTime(this.value);

      if (validation.valid) {
  
        if (validation.warning) {
          showTimeFeedback(validation.warning, "warning");
        }


        this.value = validation.formatted;
        timeHidden.value = validation.formatted;
        lastValidTime = validation.formatted;

        updateTimeFeedback(this.value);
      } else if (validation.suggestion) {
        this.value = validation.suggestion;
        timeHidden.value = validation.suggestion;
        lastValidTime = validation.suggestion;

        updateTimeFeedback(this.value);
        showTimeFeedback(
          `Horário ajustado para ${validation.suggestion}`,
          "info"
        );
      }
    });


    timeInput.addEventListener("focus", function () {
      this.classList.remove("border-red-300", "border-green-300");
      this.classList.add("border-amber-500");
    });


    function updateTimeFeedback(value) {
      if (!value.trim()) {
        timeFeedback.textContent = "Digite o horário desejado (8h às 17h)";
        timeFeedback.className = "text-xs mt-1 text-gray-500";
        timeInput.classList.remove(
          "border-red-300",
          "border-green-300",
          "bg-red-50",
          "bg-green-50"
        );
        timeInput.classList.add("border-gray-300");
        timeHidden.value = "";
        return;
      }

      const validation = validateAndFormatTime(value);

      if (validation.valid) {
        timeFeedback.textContent = validation.display
          ? `Horário: ${validation.display}`
          : "Horário válido";
        timeFeedback.className = "text-xs mt-1 text-green-600 font-medium";
        timeInput.classList.remove(
          "border-red-300",
          "border-gray-300",
          "bg-red-50"
        );
        timeInput.classList.add("border-green-300", "bg-green-50");
        timeHidden.value = validation.formatted;
        lastValidTime = validation.formatted;
      } else {
        timeFeedback.textContent = validation.message;
        timeFeedback.className = "text-xs mt-1 text-red-600 font-medium";
        timeInput.classList.remove(
          "border-green-300",
          "border-gray-300",
          "bg-green-50"
        );
        timeInput.classList.add("border-red-300", "bg-red-50");
        timeHidden.value = "";
      }
    }


    function showTimeFeedback(message, type = "info") {
      const tempFeedback = document.createElement("div");
      tempFeedback.className = `text-xs mt-1 font-medium ${
        type === "warning" ? "text-amber-600" : "text-blue-600"
      }`;
      tempFeedback.textContent = message;
      tempFeedback.id = "temp-feedback";


      const existing = document.getElementById("temp-feedback");
      if (existing) existing.remove();

      timeInput.parentNode.appendChild(tempFeedback);


      setTimeout(() => {
        if (tempFeedback.parentNode) {
          tempFeedback.remove();
        }
      }, 3000);
    }

    addTimeSuggestions();
  }

  function addTimeSuggestions() {
    const timeInput = document.getElementById("time-input");
    if (!timeInput) return;

    const suggestionsContainer = document.getElementById("time-suggestions");
    if (!suggestionsContainer) return;

    suggestionsContainer.innerHTML = "";

    const popularTimes = [];

    popularTimes.forEach((time) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className =
        "text-xs bg-gray-100 hover:bg-amber-100 text-gray-700 hover:text-amber-700 px-2 py-1 rounded transition-colors";
      button.textContent = time.replace(":00", "h");
      button.addEventListener("click", () => {
        document.getElementById("time-input").value = time;
        document.getElementById("time-input").dispatchEvent(new Event("input"));
        document.getElementById("time-input").dispatchEvent(new Event("blur"));
      });
      suggestionsContainer.appendChild(button);
    });
  }

  function setupServiceSelection() {
    const serviceInputs = document.querySelectorAll('input[name="service"]');
    const serviceHidden = document.getElementById("service-hidden");

    if (!serviceHidden || serviceInputs.length === 0) return;


    serviceHidden.value = "";


    serviceInputs.forEach((input) => {
      input.addEventListener("change", function () {
        if (this.checked) {
          serviceHidden.value = this.value;


          const allLabels = document.querySelectorAll(
            'input[name="service"] + label'
          );
          allLabels.forEach((label) => {
            label.classList.remove("border-amber-500", "bg-amber-50");
            label.classList.add("border-gray-200");
          });

          const currentLabel = this.nextElementSibling;
          if (currentLabel) {
            currentLabel.classList.add("border-amber-500", "bg-amber-50");
            currentLabel.classList.remove("border-gray-200");
          }
        }
      });

      const label = input.nextElementSibling;
      if (label) {
        label.addEventListener("click", () => {
          input.checked = true;
          input.dispatchEvent(new Event("change"));
        });
      }
    });
  }

  function setupPaymentSelection() {
    const paymentInputs = document.querySelectorAll(
      'input[name="payment-method"]'
    );
    const paymentHidden = document.getElementById("payment-hidden");
    const pixWarning = document.getElementById("pix-warning");
    const otherPaymentInfo = document.getElementById("other-payment-info");
    const pixChaveContainer = document.getElementById("pix-chave-container");
    const pixChaveInput = document.getElementById("pix-chave");
    const copyPixBtn = document.getElementById("copy-pix-btn");

    if (!paymentHidden || paymentInputs.length === 0) return;


    paymentHidden.value = "";


    paymentInputs.forEach((input) => {
      input.addEventListener("change", function () {
        if (this.checked) {
          paymentHidden.value = this.value;

          const allLabels = document.querySelectorAll(
            'input[name="payment-method"] + label'
          );
          allLabels.forEach((label) => {
            label.classList.remove("border-amber-500", "bg-amber-50");
            label.classList.add("border-gray-200");
          });

          const currentLabel = this.nextElementSibling;
          if (currentLabel) {
            currentLabel.classList.add("border-amber-500", "bg-amber-50");
            currentLabel.classList.remove("border-gray-200");
          }

          if (this.value === "Pix") {
            if (pixWarning) {
              pixWarning.classList.remove("hidden");
              pixWarning.classList.add("animate-fade-in-soft");
            }
            if (otherPaymentInfo) {
              otherPaymentInfo.classList.add("hidden");
            }
            if (pixChaveContainer) {
              pixChaveContainer.classList.remove("hidden");
            }
          } else {
            if (pixWarning) {
              pixWarning.classList.add("hidden");
              pixWarning.classList.remove("animate-fade-in-soft");
            }
            if (otherPaymentInfo) {
              otherPaymentInfo.classList.remove("hidden");
            }
            if (pixChaveContainer) {
              pixChaveContainer.classList.add("hidden");
            }
          }
        }
      });

      const label = input.nextElementSibling;
      if (label) {
        label.addEventListener("click", () => {
          input.checked = true;
          input.dispatchEvent(new Event("change"));
        });
      }
    });


    if (copyPixBtn && pixChaveInput) {
      copyPixBtn.addEventListener("click", function () {
        if (!pixChaveInput.value.trim()) {
          pixChaveInput.value = "000000000000"; // Chave padrão
        }

        pixChaveInput.select();
        pixChaveInput.setSelectionRange(0, 99999);

        try {
          navigator.clipboard.writeText(pixChaveInput.value).then(() => {
            const originalText = copyPixBtn.innerHTML;
            copyPixBtn.innerHTML =
              '<i data-lucide="check" class="w-4 h-4"></i> Copiado!';
            copyPixBtn.classList.remove("bg-amber-600");
            copyPixBtn.classList.add("bg-green-600");

            setTimeout(() => {
              copyPixBtn.innerHTML = originalText;
              copyPixBtn.classList.remove("bg-green-600");
              copyPixBtn.classList.add("bg-amber-600");
            }, 2000);
          });
        } catch (err) {
          document.execCommand("copy");
          const originalText = copyPixBtn.innerHTML;
          copyPixBtn.innerHTML =
            '<i data-lucide="check" class="w-4 h-4"></i> Copiado!';
          copyPixBtn.classList.remove("bg-amber-600");
          copyPixBtn.classList.add("bg-green-600");

          setTimeout(() => {
            copyPixBtn.innerHTML = originalText;
            copyPixBtn.classList.remove("bg-green-600");
            copyPixBtn.classList.add("bg-amber-600");
          }, 2000);
        }
      });
    }
  }
  function initBookingSystem() {
    console.log("Inicializando sistema de agendamento...");

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

    const nameInput = document.getElementById("name");
    if (nameInput) {
      nameInput.value = "";

      nameInput.addEventListener("input", function () {
        if (this.value.trim()) {
          this.classList.remove("border-red-300");
          this.classList.add("border-green-300");
        } else {
          this.classList.remove("border-green-300");
        }
      });
    }

    setupServiceSelection();


    setupPaymentSelection();

    setupTimeField();

    const observationsInput = document.getElementById("observations");
    if (observationsInput) {
      observationsInput.value = "";
    }
  }


  initBookingSystem();

  if (bookingForm) {
    bookingForm.addEventListener("submit", function (e) {
      e.preventDefault();
      e.stopPropagation();


      const nameInput = document.getElementById("name");
      const serviceHidden = document.getElementById("service-hidden");
      const paymentHidden = document.getElementById("payment-hidden");
      const pixChaveInput = document.getElementById("pix-chave");
      const dateInput = document.getElementById("date");
      const timeHidden = document.getElementById("time");
      const timeInput = document.getElementById("time-input");
      const observationsInput = document.getElementById("observations");

    
      let isValid = true;
      const errors = [];

      if (!nameInput || !nameInput.value.trim()) {
        isValid = false;
        errors.push("Nome");
        nameInput.classList.add("border-red-500", "ring-2", "ring-red-200");
      } else {
        nameInput.classList.remove("border-red-500", "ring-2", "ring-red-200");
      }

      if (!serviceHidden || !serviceHidden.value) {
        isValid = false;
        errors.push("Serviço");

        const serviceLabels = document.querySelectorAll(
          'input[name="service"] + label'
        );
        serviceLabels.forEach((label) => {
          label.classList.add("border-red-500", "ring-2", "ring-red-200");
        });
      } else {
        const serviceLabels = document.querySelectorAll(
          'input[name="service"] + label'
        );
        serviceLabels.forEach((label) => {
          label.classList.remove("border-red-500", "ring-2", "ring-red-200");
        });
      }

o
      if (!paymentHidden || !paymentHidden.value) {
        isValid = false;
        errors.push("Meio de Pagamento");

        const paymentLabels = document.querySelectorAll(
          'input[name="payment-method"] + label'
        );
        paymentLabels.forEach((label) => {
          label.classList.add("border-red-500", "ring-2", "ring-red-200");
        });
      } else {
        const paymentLabels = document.querySelectorAll(
          'input[name="payment-method"] + label'
        );
        paymentLabels.forEach((label) => {
          label.classList.remove("border-red-500", "ring-2", "ring-red-200");
        });
      }


      if (paymentHidden && paymentHidden.value === "Pix") {
        if (!pixChaveInput || !pixChaveInput.value.trim()) {
          if (pixChaveInput) {
            pixChaveInput.value = "0000000000000";
          }
        }
      }


      if (!timeHidden || !timeHidden.value) {
        isValid = false;
        errors.push("Horário");
        if (timeInput) {
          timeInput.classList.add("border-red-500", "ring-2", "ring-red-200");

          timeInput.scrollIntoView({ behavior: "smooth", block: "center" });
          timeInput.focus();
        }
      } else {

        const validation = validateAndFormatTime(timeHidden.value);
        if (!validation.valid) {
          isValid = false;
          errors.push("Horário inválido");
          if (timeInput) {
            timeInput.classList.add("border-red-500", "ring-2", "ring-red-200");
            timeInput.focus();
          }
        } else {
          if (timeInput) {
            timeInput.classList.remove(
              "border-red-500",
              "ring-2",
              "ring-red-200"
            );
          }
        }
      }

      if (!isValid) {
        alert(`Por favor, corrija:\n\n${errors.join("\n")}`);
        return;
      }


      const name = nameInput.value.trim();
      const service = serviceHidden.value;
      const paymentMethod = paymentHidden.value;
      const pixChave =
        paymentMethod === "Pix" && pixChaveInput
          ? pixChaveInput.value.trim()
          : "";
      const dateValue = dateInput.value;
      const timeValue = timeHidden.value;
      const observations = observationsInput
        ? observationsInput.value.trim()
        : "";


      const dateObj = new Date(dateValue);
      const dateFormatted = dateObj.toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      });


      const dateDisplay =
        dateFormatted.charAt(0).toUpperCase() + dateFormatted.slice(1);


      const [hours, minutes] = timeValue.split(":");
      const timeDisplay =
        minutes === "00"
          ? `${parseInt(hours)}h`
          : `${parseInt(hours)}h${minutes}`;


      let message =
        `*AGENDAMENTO - BARBEARIA SOARES*\n\n` +
        `👤 *Cliente:* ${name}\n` +
        `✂️ *Serviço:* ${service}\n` +
        `💳 *Pagamento:* ${paymentMethod}\n`;


      if (paymentMethod === "Pix" && pixChave) {
        message += `🔑 *Chave Pix:* ${pixChave}\n`;
      }

      message +=
        `📅 *Data:* ${dateDisplay}\n` + `⏰ *Horário:* ${timeDisplay}\n`;

      // Adicionar observações se houver
      if (observations) {
        message += `📝 *Observações:* ${observations}\n`;
      }

      message +=
        `\n📍 *Local:* R. Padre Cícero, 185 – Centro, Missão Velha - CE\n\n` +
        `_Por favor, confirme a disponibilidade deste horário._`;


      if (paymentMethod === "Pix") {
        message +=
          `\n\n📋 *INSTRUÇÃO PARA PIX:*\n` +
          `1. Faça o pagamento via Pix para a chave informada\n` +
          `2. Envie o comprovante agora para confirmar seu agendamento\n` +
          `3. Sem comprovante, o agendamento não será confirmado\n` +
          `4. Em caso de não comparecimento, não haverá devolução`;
      }


      if (typeof WHATSAPP_NUMBER === "undefined") {
        alert("Erro: Número do WhatsApp não configurado. Contate o suporte.");
        return;
      }


      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodedMessage}`;


      const newWindow = window.open(whatsappUrl, "_blank");


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


        setTimeout(() => {
       
          if (nameInput) {
            nameInput.value = "";
            nameInput.classList.remove(
              "border-green-300",
              "border-red-500",
              "ring-2",
              "ring-red-200"
            );
          }


          const serviceInputs = document.querySelectorAll(
            'input[name="service"]'
          );
          serviceInputs.forEach((input) => {
            input.checked = false;
          });
          const serviceLabels = document.querySelectorAll(
            'input[name="service"] + label'
          );
          serviceLabels.forEach((label) => {
            label.classList.remove(
              "border-amber-500",
              "bg-amber-50",
              "border-red-500",
              "ring-2",
              "ring-red-200"
            );
            label.classList.add("border-gray-200");
          });
          if (serviceHidden) {
            serviceHidden.value = "";
          }


          const paymentInputs = document.querySelectorAll(
            'input[name="payment-method"]'
          );
          paymentInputs.forEach((input) => {
            input.checked = false;
          });
          const paymentLabels = document.querySelectorAll(
            'input[name="payment-method"] + label'
          );
          paymentLabels.forEach((label) => {
            label.classList.remove(
              "border-amber-500",
              "bg-amber-50",
              "border-red-500",
              "ring-2",
              "ring-red-200"
            );
            label.classList.add("border-gray-200");
          });
          if (paymentHidden) {
            paymentHidden.value = "";
          }

          const pixWarning = document.getElementById("pix-warning");
          if (pixWarning) {
            pixWarning.classList.add("hidden");
          }

          const otherPaymentInfo =
            document.getElementById("other-payment-info");
          if (otherPaymentInfo) {
            otherPaymentInfo.classList.add("hidden");
          }


          const pixChaveInput = document.getElementById("pix-chave");
          if (pixChaveInput) {
            pixChaveInput.value = "";
          }


          const timeInputField = document.getElementById("time-input");
          if (timeInputField) {
            timeInputField.value = "";
            timeInputField.classList.remove(
              "border-green-300",
              "bg-green-50",
              "border-red-300",
              "bg-red-50",
              "border-red-500",
              "ring-2",
              "ring-red-200"
            );
            timeInputField.classList.add("border-gray-300");
          }


          const timeFeedback = document.getElementById("time-feedback");
          if (timeFeedback) {
            timeFeedback.textContent = "Digite o horário desejado (8h às 17h)";
            timeFeedback.className = "text-xs mt-1 text-gray-500";
          }


          if (timeHidden) {
            timeHidden.value = "";
          }


          if (observationsInput) {
            observationsInput.value = "";
          }

 
          const tempFeedback = document.getElementById("temp-feedback");
          if (tempFeedback) {
            tempFeedback.remove();
          }


          submitBtn.innerHTML = originalHTML;
          submitBtn.disabled = false;


          if (nameInput) {
            nameInput.focus();
          }


          setTimeout(initBookingSystem, 100);
        }, 1500);
      }
    });
  }

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

  console.log("✅ Sistema JavaScript inicializado com sucesso!");
});

