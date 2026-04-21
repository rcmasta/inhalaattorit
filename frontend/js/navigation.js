document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector("nav");

    navToggle.addEventListener("click", () => {
        nav.classList.toggle("open");
    });


    const yearEl = document.getElementById("current-year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
});