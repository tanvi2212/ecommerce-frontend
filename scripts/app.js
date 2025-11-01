console.log("E-Commerce Website Loaded");

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

document.querySelector(".cta-btn").addEventListener("click", () => {
    window.scrollTo({
        top: document.body.scrollHeight / 3,
        behavior: "smooth"
    });
});




