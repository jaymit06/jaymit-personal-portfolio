const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");

menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  menuButton.textContent = isOpen ? "×" : "☰";
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open menu");
    menuButton.textContent = "☰";
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

// Smoothly reveal sections as they enter view, with a safe fallback.
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".about-grid, .project-card, .toolkit-grid, .contact-panel").forEach((element) => {
    element.classList.add("reveal");
    observer.observe(element);
  });
}


/* Enlarge the personal poster-wall photo in an accessible lightbox. */
const posterPhoto = document.querySelector(".personal-photo-note");
const photoLightbox = document.getElementById("photo-lightbox");
const photoLightboxClose = document.querySelector(".photo-lightbox-close");

function openPhotoLightbox() {
  if (!posterPhoto || !photoLightbox) return;
  photoLightbox.hidden = false;
  document.body.style.overflow = "hidden";
  photoLightboxClose.focus();
}
function closePhotoLightbox() {
  if (!photoLightbox || photoLightbox.hidden) return;
  photoLightbox.hidden = true;
  document.body.style.overflow = "";
  posterPhoto.focus();
}
if (posterPhoto && photoLightbox && photoLightboxClose) {
  posterPhoto.addEventListener("click", openPhotoLightbox);
  posterPhoto.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openPhotoLightbox();
    }
  });
  photoLightboxClose.addEventListener("click", (event) => {
    event.stopPropagation();
    closePhotoLightbox();
  });
  photoLightbox.addEventListener("click", (event) => {
    if (event.target === photoLightbox) closePhotoLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closePhotoLightbox();
  });
}
