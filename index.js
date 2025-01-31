document.addEventListener("DOMContentLoaded", () => {
  console.log("Portfolio loaded successfully!");

  // Seleccionar todas las habilidades y aplicar interactividad
  const skills = document.querySelectorAll(".skill-hover");

  skills.forEach((skill) => {
    skill.addEventListener("mouseover", () => {
      skill.classList.add(
        "scale-110",
        "shadow-lg",
        "bg-emerald-500",
        "text-white"
      );
    });

    skill.addEventListener("mouseout", () => {
      skill.classList.remove(
        "scale-110",
        "shadow-lg",
        "bg-emerald-500",
        "text-white"
      );
    });
  });

  // Imagen de perfil - Animación al hacer clic
  const profileImg = document.getElementById("profile-img");

  if (profileImg) {
    profileImg.addEventListener("click", () => {
      profileImg.classList.toggle("rotate-12");
      setTimeout(() => {
        profileImg.classList.toggle("rotate-12");
      }, 500);
    });
  }

  // Alerta en enlaces de contacto
  const contactLinks = document.querySelectorAll(".contact-link");

  contactLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      alert(`Redirecting to: ${link.href}`);
    });
  });

  // Animación suave de aparición al hacer scroll
  const elements = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
        }
      });
    },
    { threshold: 0.1 }
  );

  // Aplicando la animación a los elementos
  elements.forEach((element) => {
    element.classList.add(
      "opacity-0",
      "translate-y-5",
      "transition-all",
      "duration-700"
    );
    observer.observe(element);
  });

  // Configurar la animación para la sección "About"
  const aboutSection = document.getElementById("about");

  if (aboutSection) {
    aboutSection.classList.add(
      "opacity-0",
      "translate-y-5",
      "transition-all",
      "duration-700"
    );

    const aboutObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
          }
        });
      },
      { threshold: 0.1 }
    );

    aboutObserver.observe(aboutSection);
  }
});
