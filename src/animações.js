// animations-fast.js - Sistema de Animações Rápidas para Barbearia Soares
// Animações otimizadas e mais rápidas para melhor experiência

(function () {
  "use strict";

  // Verificar preferência de redução de movimento
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    console.log("Redução de movimento ativada - Animções desativadas");
    return;
  }

  // ========== ADICIONAR KEYFRAMES AO ESTILO (VERSÃO RÁPIDA) ==========
  const style = document.createElement("style");
  style.textContent = `
    /* Animações de entrada RÁPIDAS */
    @keyframes revealUpFast {
      0% { 
        opacity: 0;
        transform: translateY(20px);
      }
      100% { 
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes staggerRevealFast {
      0% { 
        opacity: 0;
        transform: translateY(15px);
      }
      100% { 
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    /* Efeito de zoom suave RÁPIDO */
    @keyframes slowZoomFast {
      0%, 100% { 
        transform: scale(1);
      }
      50% { 
        transform: scale(1.07);
      }
    }
    
    /* Efeito de borda animada RÁPIDO */
    @keyframes borderFlowFast {
      0% { 
        background-position: 0% 50%;
      }
      100% { 
        background-position: 200% 50%;
      }
    }
    
    /* Pulsação suave RÁPIDA */
    @keyframes pulseGentleFast {
      0%, 100% { 
        transform: scale(1);
      }
      50% { 
        transform: scale(1.02);
      }
    }
    
    /* Quique do ícone RÁPIDO */
    @keyframes bounceIconFast {
      0%, 100% { 
        transform: translateY(0);
      }
      50% { 
        transform: translateY(-3px);
      }
    }
    
    /* Notificação pulsante RÁPIDA */
    @keyframes notificationPulseFast {
      0%, 85%, 100% { 
        transform: scale(1);
        box-shadow: 0 8px 20px rgba(37, 211, 102, 0.1);
      }
      92% { 
        transform: scale(1.03);
        box-shadow: 0 8px 20px rgba(37, 211, 102, 0.25);
      }
    }
    
    /* Flutuação suave RÁPIDA */
    @keyframes floatSlowFast {
      0%, 100% { 
        transform: translateY(0);
      }
      50% { 
        transform: translateY(-10px);
      }
    }
    
    /* Contador animado RÁPIDO */
    @keyframes countUpFast {
      0% { 
        opacity: 0;
        transform: translateY(8px);
      }
      100% { 
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    /* Efeito de onda RÁPIDO */
    @keyframes rippleFast {
      0% {
        transform: scale(0, 0);
        opacity: 0.5;
      }
      100% {
        transform: scale(15, 15);
        opacity: 0;
      }
    }
    
    /* Shift de gradiente RÁPIDO */
    @keyframes gradientShiftFast {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
    
    /* Fade in rápido */
    @keyframes fadeInFast {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
    
    /* Slide in from left rápido */
    @keyframes slideInLeftFast {
      0% {
        opacity: 0;
        transform: translateX(-30px);
      }
      100% {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    /* Slide in from right rápido */
    @keyframes slideInRightFast {
      0% {
        opacity: 0;
        transform: translateX(30px);
      }
      100% {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    /* ========== CLASSES DE ANIMAÇÃO RÁPIDAS ========== */
    .animate-reveal-up-fast {
      animation: revealUpFast 0.4s ease-out forwards;
      opacity: 0;
      will-change: transform, opacity;
    }
    
    .animate-fade-in-fast {
      animation: fadeInFast 0.3s ease-out forwards;
      opacity: 0;
    }
    
    .animate-slide-left-fast {
      animation: slideInLeftFast 0.4s ease-out forwards;
      opacity: 0;
    }
    
    .animate-slide-right-fast {
      animation: slideInRightFast 0.4s ease-out forwards;
      opacity: 0;
    }
    
    .animate-slow-zoom-fast {
      animation: slowZoomFast 6s ease-in-out infinite;
      will-change: transform;
    }
    
    .animate-stagger-reveal-fast {
      animation: staggerRevealFast 0.3s ease-out forwards;
      opacity: 0;
      will-change: transform, opacity;
    }
    
    
    .animate-float-slow-fast {
      animation: floatSlowFast 4s ease-in-out infinite;
      will-change: transform;
    }
    
    .animate-count-up-fast {
      animation: countUpFast 1s ease-out forwards;
      will-change: transform, opacity;
    }
    
    /* Cursor personalizado rápido */
    .custom-cursor-fast {
      position: fixed;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background-color: rgba(245, 158, 11, 0.3);
      border: 1px solid rgba(245, 158, 11, 0.7);
      pointer-events: none;
      z-index: 9999;
      transition: all 0.1s ease;
      transform: translate(-50%, -50%);
      mix-blend-mode: difference;
    }
    
    .custom-cursor-hover-fast {
      width: 30px !important;
      height: 30px !important;
      background-color: rgba(245, 158, 11, 0.4) !important;
      transition: all 0.15s ease !important;
    }
    
    /* Efeito de brilho rápido */
    .glow-on-hover-fast {
      position: relative;
      overflow: hidden;
    }
    
    .glow-on-hover-fast::after {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%);
      opacity: 0;
      transition: opacity 0.2s ease;
      pointer-events: none;
    }
    
    .glow-on-hover-fast:hover::after {
      opacity: 1;
    }
    
    /* Efeito de onda para botões rápido */
    .btn-wave-fast {
      position: relative;
      overflow: hidden;
    }
    
    .btn-wave-fast::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 4px;
      height: 4px;
      background: rgba(255, 255, 255, 0.5);
      opacity: 0;
      border-radius: 100%;
      transform: scale(1, 1) translate(-50%);
      transform-origin: 50% 50%;
    }
    
    .btn-wave-fast:focus:not(:active)::after {
      animation: rippleFast 0.6s ease-out;
    }
    
    /* Gradiente animado rápido */
    .animated-gradient-fast {
      background: linear-gradient(90deg, #f59e0b, #d97706, #f59e0b);
      background-size: 200% 100%;
      animation: gradientShiftFast 2s ease infinite;
    }
    
    /* Efeito de vidro dinâmico rápido */
    .glass-nav-dynamic-fast {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(8px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      transition: backdrop-filter 0.2s ease, background-color 0.2s ease;
    }
    
    /* Efeito de escala rápida */
    .scale-on-hover-fast {
      transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    
    .scale-on-hover-fast:hover {
      transform: scale(1.05);
    }
    
    /* Borda animada rápida */
    .border-animated-fast {
      background: linear-gradient(90deg, #f59e0b, #d97706, #f59e0b);
      background-size: 200% 100%;
      animation: borderFlowFast 1.5s linear infinite;
      border: 2px solid transparent;
      background-clip: padding-box;
    }
    
    /* Transição rápida para inputs */
    .input-fast-transition {
      transition: all 0.15s ease-out !important;
    }
  `;

  document.head.appendChild(style);

  // ========== SISTEMA DE ANIMAÇÕES RÁPIDAS ==========
  document.addEventListener("DOMContentLoaded", function () {
    console.log("Sistema de Animações Rápidas Premium inicializado");

    // Pequeno delay para garantir que tudo carregou
    setTimeout(initAnimations, 100);

    function initAnimations() {
      // ========== NAVBAR COM GLASSMORPHISM DINÂMICO RÁPIDO ==========
      const navbar = document.getElementById("navbar");
      if (navbar) {
        let ticking = false;

        window.addEventListener("scroll", () => {
          if (!ticking) {
            requestAnimationFrame(() => {
              const scrollY = window.scrollY;

              if (scrollY > 30) {
                navbar.classList.remove("transparent-nav");
                navbar.classList.add("glass-nav-dynamic-fast");

                // Ajustar rápido
                const blurIntensity = Math.min(12, 5 + (scrollY / 150) * 7);
                navbar.style.backdropFilter = `blur(${blurIntensity}px)`;

                const opacity = Math.min(0.95, 0.85 + (scrollY / 400) * 0.1);
                navbar.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
              } else {
                navbar.classList.add("transparent-nav");
                navbar.classList.remove("glass-nav-dynamic-fast");
                navbar.style.backdropFilter = "none";
                navbar.style.backgroundColor = "transparent";
              }

              ticking = false;
            });

            ticking = true;
          }
        });
      }

      // ========== INTERSECTION OBSERVER PARA ANIMAÇÕES DE SCROLL RÁPIDAS ==========
      const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -30px 0px", // Mais agressivo
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // Cards de serviços com stagger effect rápido
            if (entry.target.closest("#servicos")) {
              const serviceCards = entry.target.querySelectorAll(".group");
              serviceCards.forEach((card, i) => {
                setTimeout(() => {
                  card.classList.add("animate-stagger-reveal-fast");
                  card.style.animationDelay = `${i * 0.05}s`; // Mais rápido
                }, i * 50);
              });
            }

            // Seção sobre com animações laterais rápidas
            if (entry.target.closest("#sobre")) {
              const aboutImage = entry.target.querySelector("img");
              const aboutText = entry.target.querySelector(
                ".w-full.md\\:w-1\\/2:last-child"
              );

              if (aboutImage) {
                setTimeout(() => {
                  aboutImage.classList.add("animate-slide-left-fast");
                }, 100);
              }

              if (aboutText) {
                setTimeout(() => {
                  aboutText.classList.add("animate-slide-right-fast");
                }, 200);
              }
            }

            // Cards de pagamento rápidos
            if (entry.target.closest("#Pagamento")) {
              const paymentCards = entry.target.querySelectorAll(".group");
              paymentCards.forEach((card, i) => {
                setTimeout(() => {
                  card.classList.add("animate-stagger-reveal-fast");
                  card.style.animationDelay = `${i * 0.08}s`; // Mais rápido
                }, i * 80);
              });
            }

            // Galeria com zoom rápido
            if (entry.target.closest("#galeria")) {
              const galleryImages = entry.target.querySelectorAll("img");
              galleryImages.forEach((img, i) => {
                setTimeout(() => {
                  img.classList.add("animate-slow-zoom-fast");
                  img.style.animationDelay = `${i * 0.3}s`; // Mais rápido
                }, i * 300);
              });
            }

            // Elementos do hero rápidos
            if (
              entry.target.classList.contains("relative") &&
              entry.target.classList.contains("h-screen")
            ) {
              const heroElements =
                entry.target.querySelectorAll("h2, h1, p, .flex");
              heroElements.forEach((el, i) => {
                setTimeout(() => {
                  el.classList.add("animate-reveal-up-fast");
                  el.style.animationDelay = `${i * 0.1}s`; // Mais rápido
                }, i * 100);
              });
            }
          }
        });
      }, observerOptions);

      // Observar todas as seções
      document.querySelectorAll("section").forEach((section) => {
        observer.observe(section);
      });

      // ========== MICRO-INTERAÇÕES DE BOTÕES RÁPIDAS ==========
      const buttons = document.querySelectorAll(
        'a[href="#agendar"], button[type="submit"], a.bg-amber-600'
      );
      buttons.forEach((button) => {
        // Adicionar classes para efeitos rápidos
        button.classList.add(
          "btn-wave-fast",
          "glow-on-hover-fast",
          "scale-on-hover-fast"
        );

        // Efeito ao passar o mouse (rápido)
        button.addEventListener("mouseenter", function () {
          this.style.animation = "pulseGentleFast 1.2s ease-in-out infinite";

          // Efeito de borda animada rápida
          if (this.classList.contains("bg-amber-600")) {
            this.classList.add("border-animated-fast");
          }

          // Animar ícone rápido
          const icon = this.querySelector("i, img");
          if (icon) {
            icon.style.animation = "bounceIconFast 0.3s ease-out";
          }
        });

        button.addEventListener("mouseleave", function () {
          this.style.animation = "";
          this.classList.remove("border-animated-fast");

          const icon = this.querySelector("i, img");
          if (icon) {
            icon.style.animation = "";
          }
        });

        // Efeito de clique rápido
        button.addEventListener("mousedown", function () {
          this.style.transform = "scale(0.98)";
        });

        button.addEventListener("mouseup", function () {
          this.style.transform = "";
        });
      });

      // Botão WhatsApp com notificação pulsante rápida
      const whatsappButton = document.querySelector(
        'button[type="submit"].bg-green-600'
      );
      if (whatsappButton) {
        setTimeout(() => {
          whatsappButton.style.animation =
            "notificationPulseFast 4s ease-in-out infinite";
        }, 1000);
      }

      // ========== EFEITOS DE FORMULÁRIO RÁPIDOS ==========
      const bookingForm = document.getElementById("booking-form");
      if (bookingForm) {
        const formInputs = bookingForm.querySelectorAll(
          "input, select, textarea"
        );

        formInputs.forEach((input) => {
          input.classList.add("input-fast-transition");
          const label = input.previousElementSibling;

          if (label && label.tagName === "LABEL") {
            input.addEventListener("focus", () => {
              label.style.transform = "translateY(-3px)";
              label.style.transition = "transform 0.15s ease-out";
              label.style.color = "#f59e0b";

              input.style.boxShadow = "0 0 0 2px rgba(245, 158, 11, 0.25)";
              input.style.borderColor = "#f59e0b";
            });

            input.addEventListener("blur", () => {
              if (!input.value) {
                label.style.transform = "translateY(0)";
                label.style.color = "";
              }
              input.style.boxShadow = "";
              input.style.borderColor = "";
            });
          }
        });
      }

      // ========== EFEITO PARALLAX NO HERO (SUAVE E RÁPIDO) ==========
      const heroSection = document.querySelector(".relative.h-screen");
      if (heroSection) {
        const heroImage = heroSection.querySelector("img");

        if (heroImage) {
          let ticking = false;

          window.addEventListener("scroll", () => {
            if (!ticking) {
              requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.2; // Mais suave

                heroImage.style.transform = `translate3d(0, ${rate}px, 0)`;
                ticking = false;
              });

              ticking = true;
            }
          });

          // Adicionar classe de animação inicial rápida
          heroImage.classList.add("animate-float-slow-fast");
        }
      }

      // ========== CURSOR CUSTOMIZADO RÁPIDO ==========
      if (window.innerWidth > 768) {
        const cursor = document.createElement("div");
        cursor.className = "custom-cursor-fast";
        document.body.appendChild(cursor);

        // Atualizar posição do cursor (otimizado)
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;

        document.addEventListener("mousemove", (e) => {
          mouseX = e.clientX;
          mouseY = e.clientY;
        });

        // Animação suave do cursor
        function updateCursor() {
          cursorX += (mouseX - cursorX) * 0.2;
          cursorY += (mouseY - cursorY) * 0.2;

          cursor.style.left = `${cursorX}px`;
          cursor.style.top = `${cursorY}px`;

          requestAnimationFrame(updateCursor);
        }

        updateCursor();

        // Expandir cursor em elementos interativos
        const interactiveElements = document.querySelectorAll(
          "a, button, input, select, .group, .cursor-hover"
        );
        interactiveElements.forEach((el) => {
          el.addEventListener("mouseenter", () => {
            cursor.classList.add("custom-cursor-hover-fast");
          });

          el.addEventListener("mouseleave", () => {
            cursor.classList.remove("custom-cursor-hover-fast");
          });
        });

        // Esconder cursor ao sair da janela
        document.addEventListener("mouseleave", () => {
          cursor.style.opacity = "0";
        });

        document.addEventListener("mouseenter", () => {
          cursor.style.opacity = "1";
        });
      }

      // ========== CONTADOR DE ANOS DE EXPERIÊNCIA RÁPIDO ==========
      const experienceElement = document.querySelector("#sobre h2");
      if (experienceElement && experienceElement.textContent.includes("anos")) {
        const observerExp = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
              experienceElement.classList.add("animate-count-up-fast");

              // Simular contagem rápida
              const originalText = experienceElement.textContent;
              let count = 0;
              const maxCount = 10;

              const interval = setInterval(() => {
                if (count <= maxCount) {
                  experienceElement.textContent =
                    experienceElement.textContent.replace(/\d+/, count);
                  count += 1; // Contar mais rápido
                } else {
                  clearInterval(interval);
                  experienceElement.textContent = originalText;
                }
              }, 80); // Mais rápido

              observerExp.unobserve(experienceElement);
            }
          },
          { threshold: 0.3 }
        );

        observerExp.observe(experienceElement);
      }

      // ========== EFEITO DE DIGITAÇÃO PARA SLOGAN RÁPIDO ==========
      const slogan = document.querySelector(".text-gray-300.text-lg");
      if (slogan) {
        const observerSlogan = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
              const text = slogan.textContent;
              slogan.textContent = "";

              let i = 0;
              const typeWriter = () => {
                if (i < text.length) {
                  slogan.textContent += text.charAt(i);
                  i++;
                  setTimeout(typeWriter, 30); // Mais rápido
                }
              };

              typeWriter();
              observerSlogan.unobserve(slogan);
            }
          },
          { threshold: 0.3 }
        );

        observerSlogan.observe(slogan);
      }

      // ========== ANIMAÇÃO DE CARDS 3D RÁPIDA ==========
      const cards = document.querySelectorAll(
        ".group.bg-gray-800, .group.bg-white, .payment-card"
      );
      cards.forEach((card) => {
        card.addEventListener("mousemove", (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          const rotateY = ((x - centerX) / centerX) * 2; // Menor rotação
          const rotateX = ((centerY - y) / centerY) * 2; // Menor rotação

          card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
          card.style.transition = "transform 0.08s ease"; // Mais rápido
        });

        card.addEventListener("mouseleave", () => {
          card.style.transform =
            "perspective(800px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
          card.style.transition = "transform 0.3s ease"; // Mais rápido
        });
      });

      // ========== FLUTUAÇÃO PARA ÍCONES RÁPIDA ==========
      const icons = document.querySelectorAll(
        ".w-14.h-14, .w-16.h-16, .payment-icon"
      );
      icons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.1}s`;
        icon.classList.add("animate-float-slow-fast");
      });

      // ========== ANIMAÇÃO DE ENTRADA PARA MAPA RÁPIDA ==========
      const mapSection = document.querySelector("#contato");
      if (mapSection) {
        const observerMap = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
              const iframe = mapSection.querySelector("iframe");
              const mapText = mapSection.querySelector(".text-center");

              if (mapText) {
                mapText.classList.add("animate-fade-in-fast");
              }

              if (iframe) {
                setTimeout(() => {
                  iframe.classList.add("animate-fade-in-fast");
                }, 200);
              }

              observerMap.unobserve(mapSection);
            }
          },
          { threshold: 0.2 }
        );

        observerMap.observe(mapSection);
      }

      // ========== ANIMAÇÃO PARA BOTÕES DE SERVIÇOS RÁPIDO ==========
      const serviceItems = document.querySelectorAll("#servicos .group");
      serviceItems.forEach((item, index) => {
        item.addEventListener("mouseenter", () => {
          const icon = item.querySelector(".w-14.h-14");
          if (icon) {
            icon.style.transform = "scale(1.15) rotate(5deg)";
            icon.style.transition =
              "transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)";
          }
        });

        item.addEventListener("mouseleave", () => {
          const icon = item.querySelector(".w-14.h-14");
          if (icon) {
            icon.style.transform = "";
            icon.style.transition = "transform 0.3s ease";
          }
        });
      });

      // ========== ANIMAÇÃO PARA LOGO (PULSO SUAVE) ==========
      const logo = document.getElementById("logo-text");
      if (logo) {
        setTimeout(() => {
          logo.classList.add("animate-pulse-gentle-fast");
          logo.style.animationDelay = "1s";
        }, 1500);
      }

      // ========== ANIMAÇÃO PARA SCROLL SMOOTH RÁPIDO ==========
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault();

          const targetId = this.getAttribute("href");
          if (targetId === "#") return;

          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 80,
              behavior: "smooth",
            });
          }
        });
      });

      console.log(
        "✅ Todas as animações RÁPIDAS foram configuradas com sucesso!"
      );
    }
  });

  // ========== POLYFILL PARA INTERSECTION OBSERVER ==========
  if (!("IntersectionObserver" in window)) {
    const script = document.createElement("script");
    script.src =
      "https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver";
    document.head.appendChild(script);

    // Fallback se polyfill não carregar
    setTimeout(() => {
      if (!("IntersectionObserver" in window)) {
        console.log("Polyfill não carregou - Ativando animações fallback");
        document.addEventListener("DOMContentLoaded", () => {
          setTimeout(() => {
            document.querySelectorAll("section").forEach((section) => {
              section.classList.add("animate-fade-in-fast");
            });
          }, 300);
        });
      }
    }, 1000);
  }
})();
