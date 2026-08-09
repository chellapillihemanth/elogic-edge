(function () {
  "use strict";

  /* ====================================================================
     HERO SHOWCASE CAROUSEL — Right-to-Left Slide with Arrows & Caption
     ==================================================================== */

  var slides = Array.prototype.slice.call(
    document.querySelectorAll(".showcase-slide")
  );
  var dots = Array.prototype.slice.call(document.querySelectorAll(".hero-dot"));
  var captionEl = document.getElementById("heroCardCaption");
  var prevBtn = document.getElementById("heroPrevBtn");
  var nextBtn = document.getElementById("heroNextBtn");

  var CAPTIONS = [
    "Digital IoT Gas Detection Module",
    "Gas Flow Metering System",
    "Industrial IO Module",
    "Smart Automation & Controls"
  ];

  var CYCLE_TIME = 5000; // 5 seconds per slide
  var ANIMATION_DURATION = 750; // milliseconds for smooth transition
  var current = 0;
  var autoTimer = null;
  var isAnimating = false;

  function getCarouselPosClass(offset) {
    switch (offset) {
      case 0:
        return "carousel-pos--active";
      case 1:
        return "carousel-pos--next";
      case 2:
        return "carousel-pos--far";
      case 3:
        return "carousel-pos--farfar";
      default:
        return "";
    }
  }

  function updateCarouselPositions() {
    slides.forEach(function (slide, idx) {
      var offset = (idx - current + slides.length) % slides.length;
      slide.classList.remove(
        "carousel-pos--active",
        "carousel-pos--next",
        "carousel-pos--far",
        "carousel-pos--farfar",
        "carousel-animate"
      );
      slide.classList.add("carousel-animate");
      var posClass = getCarouselPosClass(offset);
      if (posClass) {
        slide.classList.add(posClass);
      }
    });

    if (captionEl && CAPTIONS[current]) {
      captionEl.textContent = CAPTIONS[current];
    }
  }

  function cycleNext() {
    if (isAnimating || slides.length < 2) return;
    isAnimating = true;

    current = (current + 1) % slides.length;
    updateCarouselPositions();

    dots.forEach(function (d, i) {
      d.classList.toggle("active", i === current);
    });

    setTimeout(function () {
      isAnimating = false;
    }, ANIMATION_DURATION);
  }

  function cyclePrev() {
    if (isAnimating || slides.length < 2) return;
    isAnimating = true;

    current = (current - 1 + slides.length) % slides.length;
    updateCarouselPositions();

    dots.forEach(function (d, i) {
      d.classList.toggle("active", i === current);
    });

    setTimeout(function () {
      isAnimating = false;
    }, ANIMATION_DURATION);
  }

  function goToSlide(idx) {
    if (isAnimating || idx === current || slides.length < 2) return;
    isAnimating = true;

    current = idx;
    updateCarouselPositions();

    dots.forEach(function (d, i) {
      d.classList.toggle("active", i === current);
    });

    setTimeout(function () {
      isAnimating = false;
    }, ANIMATION_DURATION);
  }

  function startAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(cycleNext, CYCLE_TIME);
  }

  function init() {
    if (slides.length > 0) {
      updateCarouselPositions();
      startAuto();
    }
  }

  dots.forEach(function (dot, i) {
    dot.addEventListener("click", function () {
      goToSlide(i);
      startAuto();
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      cyclePrev();
      startAuto();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      cycleNext();
      startAuto();
    });
  }

  init();
})();

window.addEventListener("load", () => {

  const params = new URLSearchParams(window.location.search);
  const project = params.get("project");

  if (!project) return;

  setTimeout(() => {

    const card = document.querySelector(
      `[data-project="${project}"]`
    );

    if(card){
      card.click();
    }

  }, 500);

});