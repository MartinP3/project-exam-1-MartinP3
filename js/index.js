// url to populate latest posts
const baseUrl = "https://koyanskaya.com/wp-json/wp/v2/posts?categories=7&per_page=20";

let theCarousel = "";
const carouselPosts = document.querySelector(".carousel__track");

async function latestPosts(url) {

    // Fetching the first 10 posts.

    try {
        const response = await fetch(url)
        const posts = await response.json()
        console.log(posts);

        carouselPosts.innerHTML = "";

        // Displaying post details
    
        posts.forEach((post) => {
            carouselPosts.innerHTML += `
            <li class="carousel__slide current-slide">
                                <img class="carousel__image" src="${post.better_featured_image.source_url}" alt="${post.better_featured_image.alt_text}">
                            </li>`
        });
    } catch (error) {
        carouselPosts.innerHTML += `<div class="container">Sorry there was an issue loading in the blog list page, let us know through the contact form and we'll get to it asap!</div>`;
    }
}
latestPosts(baseUrl);

// Carousel stuff

const track = document.querySelector(".carousel__track");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".carousel__button--right");
const prevButton = document.querySelector(".carousel__button--left");
const dotsNav = document.querySelector(".carousel__nav");
const dots = Array.from(dotsNav.children);

console.log(track.children);

const slideWidth = slides[0].getBoundingClientRect().width;


// Arranges the slides next to one another
const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + "px";
}
slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = "translateX(-" + targetSlide.style.left + ")";
    currentSlide.classList.remove("current-slide");
    targetSlide.classList.add("current-slide");
}

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove("current-slide");
    targetDot.classList.add("current-slide");
}

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
    if (targetIndex === 0) {
        prevButton.classList.add("is-hidden");
        nextButton.classList.remove("is-hidden");
    } else if (targetIndex === slides.length - 1) {
        prevButton.classList.remove("is-hidden");
        nextButton.classList.add("is-hidden");
    } else {
        prevButton.classList.remove("is-hidden");
        nextButton.classList.remove("is-hidden");
    }
}

// When I click left, move slides to the left
prevButton.addEventListener("click", e => {
    const currentSlide = track.querySelector(".current-slide");
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector(".current-slide");
    const prevDot = currentDot.previousElementSibling;
    const prevIndex = slides.findIndex(slide => slide === prevSlide);

    moveToSlide(track, currentSlide, prevSlide);
    updateDots(currentDot, prevDot);
    hideShowArrows(slides, prevButton, nextButton, prevIndex);
})

// When I click right, move slides to the right
nextButton.addEventListener("click", e => {
    const currentSlide = track.querySelector(".current-slide");
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector(".current-slide");
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === nextSlide);

    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
    hideShowArrows(slides, prevButton, nextButton, nextIndex);
})

// when I click the dots and indicators, move to that slide
dotsNav.addEventListener("click", e => {
    // What indicator was clicked on?
    const targetDot = e.target.closest("button");

    if (!targetDot) return;
    
    const currentSlide = track.querySelector(".current-slide");
    const currentDot = dotsNav.querySelector(".current-slide");
    const targetIndex = dots.findIndex(dot => dot === targetDot)
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
    hideShowArrows(slides, prevButton, nextButton, targetIndex);
})