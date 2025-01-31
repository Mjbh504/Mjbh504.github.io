document.addEventListener("DOMContentLoaded", () => {
  const skills = document.querySelectorAll(".skill");

  skills.forEach((skill) => {
    skill.dataset.originalBg = skill.style.backgroundColor; // Guarda el color original
    skill.dataset.originalColor = skill.style.color;

    skill.addEventListener("mouseover", () => {
      skill.style.backgroundColor = "#4CAF50";
      skill.style.color = "white";
    });

    skill.addEventListener("mouseout", () => {
      skill.style.backgroundColor = skill.dataset.originalBg;
      skill.style.color = skill.dataset.originalColor;
    });
  });

  // Corregir la selección del enlace de email
  const emailLink = document.querySelector("#contact a");

  if (emailLink) {
    emailLink.addEventListener("click", (e) => {
      e.preventDefault();
      alert(`Email: ${emailLink.textContent}`);
    });
  }
});
