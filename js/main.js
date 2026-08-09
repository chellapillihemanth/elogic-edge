/* ============================================================
   eLT Edge — main.js
   Handles: Navbar scroll, mobile drawer, works expansion, testimonials
   ============================================================ */

(function () {
  "use strict";

  /* ----------------------------------------------------------
     NAVBAR: Add scrolled class for shadow
  ---------------------------------------------------------- */
  const navbar = document.getElementById("navbar");

  function handleNavScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleNavScroll, { passive: true });
  handleNavScroll(); // run on load

  /* ----------------------------------------------------------
     MOBILE DRAWER
  ---------------------------------------------------------- */
  const hamburger = document.getElementById("hamburger");
  const mobileDrawer = document.getElementById("mobileDrawer");
  const drawerClose = document.getElementById("drawerClose");
  const drawerBackdrop = document.getElementById("drawerBackdrop");

  function openDrawer() {
    mobileDrawer.classList.add("open");
    drawerBackdrop.classList.add("open");
    hamburger.classList.add("open");
    hamburger.setAttribute("aria-expanded", "true");
    mobileDrawer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    mobileDrawer.classList.remove("open");
    drawerBackdrop.classList.remove("open");
    hamburger.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    mobileDrawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  hamburger.addEventListener("click", openDrawer);
  drawerClose.addEventListener("click", closeDrawer);
  drawerBackdrop.addEventListener("click", closeDrawer);

  // Close on Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeDrawer();
  });

  // Close drawer links on click (navigate)
  document.querySelectorAll(".drawer-links a").forEach(function (link) {
    link.addEventListener("click", closeDrawer);
  });

  /* ----------------------------------------------------------
     OUR WORKS — Active card switching
     • Hover on desktop/tablet  → move active to hovered card
     • Click on all sizes       → move active to clicked card
     • Mouse leaves grid        → restore active to card 0
  ---------------------------------------------------------- */
  var worksFlex = document.querySelector(".works-flex");
  var workCards = worksFlex
    ? Array.from(worksFlex.querySelectorAll(".work-card"))
    : [];

  function isMobile() {
    return window.innerWidth <= 768;
  }

  function setActiveCard(targetCard) {
    workCards.forEach(function (card) {
      card.classList.toggle("active", card === targetCard);
    });
  }

  if (workCards.length) {
    workCards.forEach(function (card) {
      /* Hover — desktop & tablet only */
      card.addEventListener("mouseenter", function () {
        if (!isMobile()) {
          setActiveCard(card);
        }
      });

      /* Click — all sizes (touch-friendly) */
      card.addEventListener("click", function () {
        setActiveCard(card);
      });
    });

    /* When the cursor leaves the whole row, clear active state */
    worksFlex.addEventListener("mouseleave", function () {
      if (!isMobile()) {
        setActiveCard(null);
      }
    });
  }

  /* ----------------------------------------------------------
     TESTIMONIALS SLIDER — Infinite loop carousel
  ---------------------------------------------------------- */
  function initTestimonials() {
    const track = document.getElementById("testTrack");
    const viewport = document.getElementById("testViewport");
    const prevBtn = document.getElementById("testPrev");
    const nextBtn = document.getElementById("testNext");
    if (!track || !viewport) return;

    const origCards = Array.from(track.querySelectorAll(".test-card"));
    const total = origCards.length;
    if (total === 0) return;

    // Clone first and last for seamless looping
    const firstClone = origCards[0].cloneNode(true);
    const lastClone = origCards[total - 1].cloneNode(true);
    firstClone.setAttribute("aria-hidden", "true");
    lastClone.setAttribute("aria-hidden", "true");
    firstClone.classList.remove("active");
    lastClone.classList.remove("active");

    track.insertBefore(lastClone, origCards[0]);
    track.appendChild(firstClone);

    // allCards = [lastClone, card0, card1, ..., cardN, firstClone]
    const allCards = Array.from(track.querySelectorAll(".test-card"));
    let current = 1; // index of real first card
    let isJumping = false;
    let autoInterval = null;

    function getOffset(idx) {
      const vpW = viewport.offsetWidth;
      const card = allCards[idx];
      const cardLeft = card.offsetLeft;
      const cardW = card.offsetWidth;
      return vpW / 2 - (cardLeft + cardW / 2);
    }

    function setActive(idx) {
      allCards.forEach(function (c, i) {
        c.classList.toggle("active", i === idx);
      });
    }

    function moveTo(idx, animate) {
      if (animate) {
        track.style.transition =
          "transform 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
      } else {
        track.style.transition = "none";
        // Force reflow to apply the transition: none instantly
        void track.offsetHeight;
      }
      track.style.transform = "translateX(" + getOffset(idx) + "px)";
    }

    function advance() {
      if (isJumping) return;
      current++;
      setActive(current);
      moveTo(current, true);

      // If we've shown firstClone, silently jump back to real card[0]
      if (current === total + 1) {
        isJumping = true;
        setTimeout(function () {
          current = 1;
          moveTo(current, false);
          setActive(current);
          isJumping = false;
        }, 700);
      }
    }
    function previous() {
      if (isJumping) return;

      current--;

      setActive(current);
      moveTo(current, true);

      if (current === 0) {
        isJumping = true;

        setTimeout(function () {
          current = total;
          moveTo(current, false);
          setActive(current);
          isJumping = false;
        }, 700);
      }
    }

    // Initial position & state
    moveTo(current, false);
    setActive(current);

    // Start auto-advance
    autoInterval = setInterval(advance, 3800);
    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        advance();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        previous();
      });
    }

    // Pause on hover
    viewport.addEventListener("mouseenter", function () {
      clearInterval(autoInterval);
    });

    viewport.addEventListener("mouseleave", function () {
      autoInterval = setInterval(advance, 3800);
    });

    // Recalculate offsets on resize
    let resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        moveTo(current, false);
      }, 150);
    });
  }

  initTestimonials();

  /* ----------------------------------------------------------
     SCROLL REVEAL — subtle fade-in for sections
  ---------------------------------------------------------- */
  if ("IntersectionObserver" in window) {
    var revealEls = document.querySelectorAll(
      ".stat-card, .cap-card, .work-card, .why-card, .why-main-card",
    );

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = entry.target.style.transform
              ? entry.target.style.transform.replace("translateY(20px)", "")
              : "";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    revealEls.forEach(function (el) {
      el.style.opacity = "0";
      el.style.transition = "opacity 0.55s ease, transform 0.55s ease";
      observer.observe(el);
    });
  }
})();

document.querySelectorAll(".cap-card").forEach((card) => {
  card.addEventListener("click", function () {
    const target = this.getAttribute("data-target");

    window.location.href = "capabilities-scroll.html#" + target;
  });
});
