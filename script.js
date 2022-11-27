const testimonial = document.querySelectorAll(".testimonials");
const testimonialCount = testimonial.length;
const authorSlidersEl = document.querySelector(".author-sliders");
const defaultActive = Math.round(testimonialCount / 2);
const navItem = document.querySelectorAll(".nav-bar__list__item--more");
const navLink = document.querySelectorAll(".nav-link");
const mobileNav = document.querySelector(".mobile-nav");
const navBar = document.querySelector(".nav-bar");
const ratingContainer = document.querySelector(".rating");

let currentSlide = defaultActive - 1;
let slider;
let sliderHTML = `<div class="author-slider"></div>`;
const options = {
  root: null,
  threshold: 1,
  rootMargin: "30px",
};

const ratingObs = new IntersectionObserver(slideRating, options);
console.log(currentSlide);

// testimonial functions
const loadSliders = (howMany) => {
  for (i = 0; i < howMany; i++) {
    authorSlidersEl.insertAdjacentHTML("afterbegin", sliderHTML);
  }
  slider = document.querySelectorAll(".author-slider");
  slider[defaultActive - 1].classList.add("active");
};
const loadTestimonials = (slide) => {
  testimonial.forEach((e) => {
    // let trasform = testimonialWidth * slide;
    let viewPort = 100 * slide;
    e.style.transform = "translateX(-" + viewPort + "vw)";
  });
};

loadTestimonials(currentSlide);
loadSliders(testimonialCount);

slider.forEach((e, i) => {
  e.addEventListener("click", (g) => {
    loadTestimonials(i);
    slider.forEach((rm) => rm.classList.remove("active"));
    if (!g.target.classList.contains("active"))
      g.target.classList.add("active");
  });
});

// navigation display list

const hideNavList = (nav) => {
  nav.target.classList.add("hide");
};
const displayNavList = (nav) => {
  const list = nav.target.parentElement;
  list.classList.remove("hide");
};

navLink.forEach((e) => {
  e.addEventListener("mouseenter", displayNavList);
});

navItem.forEach((e) => e.addEventListener("mouseleave", hideNavList));

// document
//   .querySelectorAll(".expanded")
//   .forEach((ex) => ex.addEventListener("mouseleave", hideNavList));

//sticky navigation

//mobile navigation
const setStickyNav = () => {
  distanceScrooled = document.documentElement.scrollTop;
  if (distanceScrooled > 800) {
    navBar.classList.add("sticky-nav");
  } else {
    navBar.classList.remove("sticky-nav");
  }
};
window.addEventListener("scroll", setStickyNav);

const showMobileNav = (e) => {
  e.currentTarget.classList.toggle("mobile-nav--open");
};
mobileNav.addEventListener("click", showMobileNav);

//sections animations

//rating animation
let starsInterval;
let howManyStars = 5;
const addStars = () => {
  const starsContainer = document.querySelector(".rating__flex");
  const starHTML = `<ion-icon class="icon" name="star"></ion-icon>`;
  if (howManyStars > 0) {
    starsContainer.insertAdjacentHTML("beforeend", starHTML);
    howManyStars--;
    console.log(howManyStars);
  } else {
    clearInterval(starsInterval);
    // console.log("hi");
  }
};

function slideRating(ob) {
  const [el] = ob;
  if (el.isIntersecting) {
    ratingContainer.style.animationPlayState = "running";
    setTimeout((e) => {
      starsInterval = setInterval(addStars, 250);
    }, 10);
  }
}
ratingObs.observe(ratingContainer.parentElement);
