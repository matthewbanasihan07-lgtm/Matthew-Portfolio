// =========================
// THEME: MOON / SUN
// =========================
const themeBtn = document.getElementById("themeBtn");
const themeIcon = document.getElementById("themeIcon");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const darkMode = document.body.classList.contains("dark");
    themeIcon.textContent = darkMode ? "☀" : "☾";
    themeBtn.title = darkMode ? "Switch to light mode" : "Switch to dark mode";
});

// =========================
// MOBILE NAVIGATION
// =========================
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
    });
});

// =========================
// ACTIVE NAV LINK WHILE SCROLLING
// =========================
const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-link");

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navItems.forEach(item => item.classList.remove("active"));
                const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                if (active) active.classList.add("active");
            }
        });
    },
    {
        root: null,
        threshold: 0.15,
        rootMargin: "-20% 0px -65% 0px"
    }
);

sections.forEach(section => observer.observe(section));

// =========================
// SCROLL REVEAL EFFECT
// =========================
const revealObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.08 }
);

document.querySelectorAll(".reveal").forEach(item => revealObserver.observe(item));

// =========================
// SKILLS SLIDER
// =========================
const skills = [
    { name: "HTML", percent: 85, description: "Building the structure and content of websites." },
    { name: "CSS", percent: 80, description: "Creating layouts, visual styles, and responsive designs." },
    { name: "JavaScript", percent: 65, description: "Adding interactions and dynamic features to web pages." },
    { name: "Python", percent: 70, description: "Practicing programming, logic, and application development." },
    { name: "Git & GitHub", percent: 60, description: "Learning version control and organizing coding projects." }
];

const skillSlider = document.getElementById("skillSlider");
const skillName = document.getElementById("skillName");
const skillPercent = document.getElementById("skillPercent");
const skillDescription = document.getElementById("skillDescription");
const skillFill = document.getElementById("skillFill");
const skillDots = document.querySelectorAll(".skill-dot");

function showSkill(index) {
    const skill = skills[index];
    skillName.textContent = skill.name;
    skillPercent.textContent = skill.percent + "%";
    skillDescription.textContent = skill.description;
    skillFill.style.width = skill.percent + "%";

    skillDots.forEach(dot => dot.classList.remove("active"));
    skillDots[index].classList.add("active");
}

skillSlider.addEventListener("input", event => showSkill(Number(event.target.value)));

skillDots.forEach(dot => {
    dot.addEventListener("click", () => {
        const index = Number(dot.dataset.index);
        skillSlider.value = index;
        showSkill(index);
    });
});

// =========================
// LEARNING TIMELINE SLIDER
// =========================
const journey = [
    {
        date: "2025",
        title: "Starting the IT Journey",
        text: "Started building my foundation in Information Technology and explored programming and basic web development."
    },
    {
        date: "2026",
        title: "Building More Projects",
        text: "Worked on school activities involving web design, Python programming, databases, and algorithmic problem solving."
    },
    {
        date: "2027",
        title: "Growing as a Developer",
        text: "Goal: build more complete websites, improve JavaScript skills, and create stronger projects for my portfolio."
    },
    {
        date: "GOAL",
        title: "Becoming a Professional Web Developer",
        text: "Continue learning, build real-world projects, and develop the skills needed for a professional web development career."
    }
];

const journeySlider = document.getElementById("journeySlider");
const journeyDate = document.getElementById("journeyDate");
const journeyTitle = document.getElementById("journeyTitle");
const journeyText = document.getElementById("journeyText");
const journeyCount = document.getElementById("journeyCount");

function showJourney(index) {
    const item = journey[index];
    journeyDate.textContent = item.date;
    journeyTitle.textContent = item.title;
    journeyText.textContent = item.text;
    journeyCount.textContent = String(index + 1).padStart(2, "0") + " / 04";
}

journeySlider.addEventListener("input", event => showJourney(Number(event.target.value)));

// =========================
// PROJECT CAROUSEL
// =========================
const track = document.getElementById("projectTrack");
const slides = document.querySelectorAll(".project-slide");
const prevProject = document.getElementById("prevProject");
const nextProject = document.getElementById("nextProject");
const carouselDots = document.querySelectorAll(".carousel-dot");

let currentProject = 0;
let autoSlide;

function updateCarousel(index) {
    currentProject = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentProject * 100}%)`;

    carouselDots.forEach(dot => dot.classList.remove("active"));
    carouselDots[currentProject].classList.add("active");
}

prevProject.addEventListener("click", () => {
    updateCarousel(currentProject - 1);
    restartAutoSlide();
});

nextProject.addEventListener("click", () => {
    updateCarousel(currentProject + 1);
    restartAutoSlide();
});

carouselDots.forEach(dot => {
    dot.addEventListener("click", () => {
        updateCarousel(Number(dot.dataset.index));
        restartAutoSlide();
    });
});

function startAutoSlide() {
    autoSlide = setInterval(() => {
        updateCarousel(currentProject + 1);
    }, 5000);
}

function restartAutoSlide() {
    clearInterval(autoSlide);
    startAutoSlide();
}

startAutoSlide();

// =========================
// CONTACT FORM
// =========================
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("messageBox").value.trim();

    if (!name || !email || !subject || !message) {
        formMessage.textContent = "Please complete all fields before sending.";
        return;
    }

    formMessage.textContent = `Thanks, ${name}! Your message has been received.`;
    contactForm.reset();
});
