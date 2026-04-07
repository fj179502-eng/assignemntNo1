const slidesData = [
    {
        id: 1,
        title: "Aether AI Engine",
        desc: "Harness the power of cognitive architectures and neural visualization to drive your business intelligence.",
        image: "C:/Users/User/.gemini/antigravity/brain/3f6c9468-2f34-4225-9bf7-42c2c4120bb5/ai_project_demo_v2_1775491946059.png",
        ctaText: "Explore AI",
        link: "#"
    },
    {
        id: 2,
        title: "Modern Web Systems",
        desc: "Building high-performance, minimalist web experiences with cutting-edge technology and aesthetic design.",
        image: "C:/Users/User/.gemini/antigravity/brain/3f6c9468-2f34-4225-9bf7-42c2c4120bb5/web_dev_services_v2_1775492112110.png",
        ctaText: "Our Services",
        link: "#"
    },
    {
        id: 3,
        title: "Wellness Hub App",
        desc: "A revolutionary mobile-first platform designed for health tracking and vibrant lifestyle management.",
        image: "C:/Users/User/.gemini/antigravity/brain/3f6c9468-2f34-4225-9bf7-42c2c4120bb5/app_portfolio_v3_1775492840577.png",
        ctaText: "View Case Study",
        link: "#"
    }
];

const slidesContainer = document.getElementById("slides-container");
const dotsContainer = document.getElementById("dots-container");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const sliderElement = document.getElementById("main-slider");

let currentIndex = 0;
let slideInterval;
const INTERVAL_TIME = 5000;

function initSlider() {
    generateSlides();
    startAutoSlide();
    updateSliderUI();
}

function generateSlides() {
    slidesData.forEach((slide, index) => {
        const slideDiv = document.createElement("div");
        slideDiv.classList.add("slide");
        if (index === 0) slideDiv.classList.add("active");

        slideDiv.innerHTML = `
            <img src="${slide.image}" alt="${slide.title}">
            <div class="overlay">
                <div class="content glass-box">
                    <h1>${slide.title}</h1>
                    <p>${slide.desc}</p>
                    <div class="cta-group">
                        <a href="${slide.link}" class="btn">${slide.ctaText}</a>
                    </div>
                </div>
            </div>
        `;
        slidesContainer.appendChild(slideDiv);

        const dot = document.createElement("button");
        dot.classList.add("dot");
        if (index === 0) dot.classList.add("active");
        dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
        dot.addEventListener("click", () => {
            goToSlide(index);
            restartAutoSlide();
        });
        dotsContainer.appendChild(dot);
    });
}

function updateSliderUI() {
    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");

    slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === currentIndex);
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentIndex);
    });
}
function goToSlide(index) {
    currentIndex = index;
    updateSliderUI();
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slidesData.length;
    updateSliderUI();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + slidesData.length) % slidesData.length;
    updateSliderUI();
}
function startAutoSlide() {
    slideInterval = setInterval(nextSlide, INTERVAL_TIME);
}

function restartAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
}
nextBtn.addEventListener("click", () => {
    nextSlide();
    restartAutoSlide();
});

prevBtn.addEventListener("click", () => {
    prevSlide();
    restartAutoSlide();
});

sliderElement.addEventListener("mouseenter", () => clearInterval(slideInterval));
sliderElement.addEventListener("mouseleave", () => startAutoSlide());
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
        nextSlide();
        restartAutoSlide();
    } else if (e.key === "ArrowLeft") {
        prevSlide();
        restartAutoSlide();
    }
});

initSlider();