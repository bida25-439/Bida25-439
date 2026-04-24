console.log("JavaScript is connected!"); 
// 🌿 Smooth scrolling
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        section.scrollIntoView({
            behavior: 'smooth'
        });
    });
});


// 🌿 Active nav link
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.style.opacity = "0.5";
        if (link.getAttribute("href") === "#" + current) {
            link.style.opacity = "1";
        }
    });
});


// 🌿 Form submission (feedback)
const form = document.querySelector("form");

if (form) {
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        alert("Thank you for your feedback!");
        form.reset();
    });
}


// 🌿 Card animation on scroll
const cards = document.querySelectorAll(".card");

window.addEventListener("scroll", () => {
    cards.forEach(card => {
        const position = card.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if (position < screenHeight - 50) {
            card.style.transform = "translateY(0)";
            card.style.opacity = "1";
        }
    });
});

// Initial hidden state
cards.forEach(card => {
    card.style.transform = "translateY(40px)";
    card.style.opacity = "0";
    card.style.transition = "0.5s ease";
});