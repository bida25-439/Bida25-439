console.log("JavaScript is connected!"); 
//  DARK MODE TOGGLE
const toggleButton = document.getElementById('theme-toggle');

if (toggleButton) {
    toggleButton.addEventListener('click', function () {
        // FIX: toggle once, then read the result — don't toggle twice
        const isDark = document.body.classList.toggle('dark-mode');

        if (isDark) {
            toggleButton.textContent = 'Light Mode';
            localStorage.setItem('theme', 'dark');
        } else {
            toggleButton.textContent = 'Dark Mode';
            localStorage.setItem('theme', 'light');
        }
    });

    //  REMEMBER THEME ON PAGE LOAD
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        toggleButton.textContent = 'Light Mode';
    }
}


//  TYPING EFFECT
const typingElement = document.getElementById('typing-headline');

if (typingElement) {
    const texts = [
        "Welcome to Mindspace Hub",
        "Your Safe Space ",
        "Grow. Heal. Thrive."
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex--);
        } else {
            typingElement.textContent = currentText.substring(0, charIndex++);
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1500);
            return;
        }

        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }

        setTimeout(typeEffect, isDeleting ? 50 : 100);
    }

    typeEffect();
}


// ⬆️ BACK TO TOP BUTTON
const backToTopButton = document.getElementById('back-to-top');

if (backToTopButton) {
    window.addEventListener('scroll', function () {
        backToTopButton.style.display = window.scrollY > 300 ? 'block' : 'none';
    });

    backToTopButton.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}


// FILTER PROJECTS / RESOURCES
const filterButtons = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('.project-card');

if (filterButtons.length > 0 && projects.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', function () {

            // Update active button style
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            projects.forEach(project => {
                const categories = project.getAttribute('data-category') || "";

                if (filterValue === 'all' || categories.includes(filterValue)) {
                    project.classList.remove('hidden');
                } else {
                    project.classList.add('hidden');
                }
            });
        });
    });
}