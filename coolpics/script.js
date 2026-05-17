// Menu responsive

const menuBtn = document.querySelector(".menu-button");
const nav = document.querySelector("nav");

menuBtn.addEventListener("click", () => {
  if (nav.style.display === "block") {
    nav.style.display = "none";
  } else {
    nav.style.display = "block";
  }
});
// Modal images
const gallery = document.querySelector(".gallery");
const modal = document.querySelector("dialog");
const modalImg = modal.querySelector("img");
const closeBtn = modal.querySelector(".close-viewer");

gallery.addEventListener("click", (e) => {
  if (e.target.tagName !== "IMG") return;

  const src = e.target.getAttribute("src");
  const alt = e.target.getAttribute("alt");

  const full = src.replace("sm", "full");

  modalImg.src = full;
  modalImg.alt = alt;

  modal.showModal();
});

closeBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  modal.close();
});

// close modal if clicking outside the image
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.close();
  }
});
