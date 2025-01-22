// Add interactivity to the portfolio
// Example: Highlight skills on hover
document.addEventListener("DOMContentLoaded", () => {
  const skills = document.querySelectorAll(".skill");

  skills.forEach((skill) => {
    skill.addEventListener("mouseover", () => {
      skill.style.backgroundColor = "#4CAF50";
      skill.style.color = "white";
    });

    skill.addEventListener("mouseout", () => {
      skill.style.backgroundColor = "#e8f5e9";
      skill.style.color = "#4CAF50";
    });
  });

  // Example functionality: Display an alert when clicking a contact link
  const contactSection = document.getElementById("contact");
  const emailLink = contactSection.querySelector("strong:nth-child(2)");

  emailLink.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Email: mauritcio.bonilla@outlook.com");
  });
});
