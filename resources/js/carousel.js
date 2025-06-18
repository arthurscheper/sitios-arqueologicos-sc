let slideIndex = {};

document.addEventListener("DOMContentLoaded", function() {
    const carousels = document.querySelectorAll('.carousel-container');
    carousels.forEach(carousel => {
        const carouselId = carousel.id;
        if (carouselId) {
            slideIndex[carouselId] = 1;
            showSlides(1, carouselId);
        }
    });
});

function plusSlides(n, carouselId) {
  showSlides(slideIndex[carouselId] += n, carouselId);
}

function currentSlide(n, carouselId) {
  showSlides(slideIndex[carouselId] = n, carouselId);
}

function showSlides(n, carouselId) {
  let i;
  const carousel = document.getElementById(carouselId);
  if (!carousel) return;

  let slides = carousel.getElementsByClassName("carousel-slide");
  let dots = carousel.getElementsByClassName("dot");

  if (n > slides.length) {slideIndex[carouselId] = 1}
  if (n < 1) {slideIndex[carouselId] = slides.length}

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex[carouselId]-1].style.display = "block";
  if (dots.length > 0) {
    dots[slideIndex[carouselId]-1].className += " active";
  }
}