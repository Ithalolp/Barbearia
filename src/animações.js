(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    document.addEventListener("DOMContentLoaded", function () {
      document.querySelectorAll("section").forEach((section, index) => {
        setTimeout(() => {
          section.classList.add("animate-fade-in-soft");
        }, index * 100);
      });
    });
    return;
  }

  document.addEventListener("DOMContentLoaded", function () {
    setTimeout(initSmoothAnimations, 100);

    function initSmoothAnimations() {
      const navbar = document.getElementById("navbar");
      if (navbar) {
        navbar.classList.add("navbar-transition");

        window.addEventListener("scroll", () => {
          const scrollY = window.scrollY;

          if (scrollY > 30) {
            navbar.classList.remove("transparent-nav");
            navbar.classList.add("glass-nav");
            navbar.style.backdropFilter = `blur(${Math.min(
              10,
              5 + scrollY / 200
            )}px)`;
          } else {
            navbar.classList.add("transparent-nav");
            navbar.classList.remove("glass-nav");
            navbar.style.backdropFilter = "blur(0px)";
          }
        });
      }

      const sections = document.querySelectorAll("section");

      const sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                entry.target.classList.add("animate-fade-in-soft");

                const children =
                  entry.target.querySelectorAll(".animate-on-scroll");
                children.forEach((child, childIndex) => {
                  setTimeout(() => {
                    child.classList.add("animate-fade-in-soft");
                  }, childIndex * 100);
                });
              }, index * 50);

              sectionObserver.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: "0px 0px -50px 0px",
        }
      );

      sections.forEach((section, index) => {
        section.style.animationDelay = `${index * 0.1}s`;
        sectionObserver.observe(section);
      });

      const heroSection = document.querySelector(".relative.h-screen");
      if (heroSection) {
        const heroContent = heroSection.querySelectorAll("h1, h2, p, .flex");

        heroContent.forEach((element, index) => {
          element.classList.add("animate-fade-in-soft");
          element.style.animationDelay = `${index * 0.2}s`;
        });

        const heroImage = heroSection.querySelector("img");
        if (heroImage) {
          setTimeout(() => {
            heroImage.classList.add("animate-float-soft");
          }, 1000);
        }
      }

      const serviceCards = document.querySelectorAll("#servicos .group");
      serviceCards.forEach((card, index) => {
        card.classList.add("card-hover-soft", "animate-scale-in-soft");
        card.style.animationDelay = `${index * 0.1}s`;

        const icon = card.querySelector("i, svg, img");
        if (icon) {
          card.addEventListener("mouseenter", () => {
            icon.style.transform = "scale(1.1) rotate(5deg)";
            icon.style.transition = "transform 0.3s ease";
          });

          card.addEventListener("mouseleave", () => {
            icon.style.transform = "scale(1) rotate(0deg)";
          });
        }
      });

      const aboutSection = document.querySelector("#sobre");
      if (aboutSection) {
        const aboutImage = aboutSection.querySelector("img");
        const aboutText = aboutSection.querySelector(".text-content");

        if (aboutImage) {
          aboutImage.classList.add("animate-slide-left-soft");
          aboutImage.style.animationDelay = "0.2s";
        }

        if (aboutText) {
          aboutText.classList.add("animate-slide-right-soft");
          aboutText.style.animationDelay = "0.4s";
        }
      }

      const paymentCards = document.querySelectorAll(
        "#Pagamento .payment-card"
      );
      paymentCards.forEach((card, index) => {
        card.classList.add("animate-scale-in-soft");
        card.style.animationDelay = `${index * 0.15}s`;

        const icon = card.querySelector(".payment-icon");
        if (icon) {
          card.addEventListener("mouseenter", () => {
            icon.style.transform = "scale(1.1)";
            icon.style.transition = "transform 0.4s ease";
          });

          card.addEventListener("mouseleave", () => {
            icon.style.transform = "scale(1)";
          });
        }
      });

      const galleryItems = document.querySelectorAll("#galeria .gallery-item");
      galleryItems.forEach((item, index) => {
        item.classList.add("gallery-item-soft");
        item.style.animationDelay = `${index * 0.1}s`;

        item.addEventListener("mouseenter", () => {
          const img = item.querySelector("img");
          if (img) {
            img.style.transform = "scale(1.05)";
            img.style.transition = "transform 0.5s ease";
          }
        });

        item.addEventListener("mouseleave", () => {
          const img = item.querySelector("img");
          if (img) {
            img.style.transform = "scale(1)";
          }
        });
      });

      const bookingForm = document.getElementById("booking-form");
      if (bookingForm) {
        const formFields = bookingForm.querySelectorAll(
          "input, select, textarea"
        );

        formFields.forEach((field, index) => {
          field.classList.add("form-field-fade-in");
          field.style.animationDelay = `${index * 0.1}s`;

          field.addEventListener("focus", () => {
            field.style.transform = "scale(1.02)";
            field.style.transition = "transform 0.2s ease";
          });

          field.addEventListener("blur", () => {
            field.style.transform = "scale(1)";
          });
        });
      }

      const buttons = document.querySelectorAll(
        'a[href="#agendar"], button[type="submit"], .btn-animate'
      );

      buttons.forEach((button) => {
        button.classList.add("transition-smooth");

        button.addEventListener("mouseenter", () => {
          button.style.transform = "translateY(-2px)";
        });

        button.addEventListener("mouseleave", () => {
          button.style.transform = "translateY(0)";
        });

        button.addEventListener("mousedown", () => {
          button.style.transform = "scale(0.98)";
        });

        button.addEventListener("mouseup", () => {
          button.style.transform = "scale(1)";
        });
      });

      const experienceElement = document.querySelector("#sobre h2");
      if (experienceElement && experienceElement.textContent.includes("anos")) {
        const observerExp = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
              let count = 0;
              const maxCount = parseInt(
                experienceElement.textContent.match(/\d+/)[0]
              );

              const interval = setInterval(() => {
                if (count <= maxCount) {
                  experienceElement.textContent =
                    experienceElement.textContent.replace(/\d+/, count);
                  count++;
                } else {
                  clearInterval(interval);
                }
              }, 100);

              observerExp.unobserve(experienceElement);
            }
          },
          { threshold: 0.3 }
        );

        observerExp.observe(experienceElement);
      }

      const slogan = document.querySelector(
        ".text-gray-300.text-lg, .hero-subtitle"
      );
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
                  setTimeout(typeWriter, 50);
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

      const floatingIcons = document.querySelectorAll(
        ".w-14.h-14, .w-16.h-16, .payment-icon"
      );
      floatingIcons.forEach((icon, index) => {
        icon.classList.add("animate-float-soft");
        icon.style.animationDelay = `${index * 0.2}s`;
      });
    }
  });

  if (!("IntersectionObserver" in window)) {
    document.addEventListener("DOMContentLoaded", function () {
      setTimeout(() => {
        document.querySelectorAll("section").forEach((section, index) => {
          setTimeout(() => {
            section.classList.add("animate-fade-in-soft");
          }, index * 200);
        });
      }, 500);
    });
  }
})();
