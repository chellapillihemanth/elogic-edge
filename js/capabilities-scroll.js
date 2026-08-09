/* ============================================================
   capabilities-scroll.js — Stacked Scroll Cards (8 Capabilities)
   GSAP + ScrollTrigger
   ============================================================ */

gsap.registerPlugin(ScrollTrigger);

const section = document.getElementById("csc-section");
const wrapper = document.getElementById("csc-wrapper");
const cards = gsap.utils.toArray(".csc-card");
const dots = gsap.utils.toArray(".csc-progress-dot");
const N = cards.length; // 8

/* ── Progress dot state ───────────────────────────────────── */
function setActiveDot(index) {
  dots.forEach((dot, i) =>
    dot.classList.toggle("csc-progress-dot--active", i === index),
  );
}

/* ── matchMedia — desktop vs mobile ──────────────────────── */
const mm = gsap.matchMedia();

/* ============================================================
   DESKTOP (≥ 768px) — pinned stacked scroll
   ============================================================ */
mm.add("(min-width: 768px)", () => {
  /* CSS hook: switches .csc-card to position:absolute */
  document.body.classList.add("csc-desktop");

  /* Center all cards absolutely within the pinned wrapper */
  gsap.set(cards, {
    xPercent: -50,
    yPercent: -50,
    top: "50%",
    left: "50%",
    width: "min(92vw, 1100px)",
  });

  /*
   * Z-index: higher-index cards slide OVER lower-index cards.
   * cards[0] = 1, cards[1] = 2, … cards[7] = 8
   */
  cards.forEach((card, i) => gsap.set(card, { zIndex: i + 1 }));

  /* Cards 1–7 start below the viewport, invisible */
  gsap.set(cards.slice(1), {
    y: () => window.innerHeight * 1.05,
    opacity: 0,
    scale: 0.95,
  });

  /* ── Build the stacking timeline ──────────────────────── */
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      /* 7 transitions × 110vh each */
      end: () => "+=" + (N - 1) * window.innerHeight * 1.1,
      scrub: 1.5,
      pin: wrapper,
      anticipatePin: 1,
      onUpdate(self) {
        const segSize = 1 / (N - 1);
        const idx = Math.min(N - 1, Math.floor(self.progress / segSize + 0.05));
        setActiveDot(idx);
      },
    },
  });

  /*
   * For each transition i (card[i] → card[i+1]):
   *   card[i+1]   enters from below → level 0 (active)
   *   card[i]     retreats          → level 1 (slightly behind)
   *   card[i-1]   retreats further  → level 2 (more behind)
   *   card[<i-1]  fade to invisible → level 3+
   *
   * Stack levels:
   *   0 (active) : y=0,        scale=1,    opacity=1
   *   1 (behind) : y=-7%vh,    scale=0.92, opacity=0.45
   *   2 (deeper) : y=-13%vh,   scale=0.85, opacity=0.20
   *   3+ (hidden): y=-18%vh,   scale=0.79, opacity=0
   */
  for (let i = 0; i < N - 1; i++) {
    /* Card entering */
    tl.to(cards[i + 1], {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "none",
    });

    /* Active card retreats to level 1 */
    tl.to(
      cards[i],
      {
        y: () => -window.innerHeight * 0.07,
        scale: 0.92,
        opacity: 0.45,
        duration: 1,
        ease: "none",
      },
      "<",
    );

    /* Level 1 card retreats to level 2 */
    if (i >= 1) {
      tl.to(
        cards[i - 1],
        {
          y: () => -window.innerHeight * 0.13,
          scale: 0.85,
          opacity: 0.2,
          duration: 1,
          ease: "none",
        },
        "<",
      );
    }

    /* All earlier cards go fully invisible */
    if (i >= 2) {
      tl.to(
        cards.slice(0, i - 1),
        {
          y: () => -window.innerHeight * 0.18,
          scale: 0.79,
          opacity: 0,
          duration: 1,
          ease: "none",
        },
        "<",
      );
    }
  }

  /* ── Intro fade as section enters ─────────────────────── */
  gsap.to(".csc-intro-inner", {
    opacity: 0,
    y: -28,
    ease: "none",
    scrollTrigger: {
      trigger: ".csc-intro",
      start: "center center",
      end: "bottom top",
      scrub: true,
    },
  });

  /* ── Hide scroll hint after first movement ────────────── */
  ScrollTrigger.create({
    start: "80px top",
    onEnter: () =>
      gsap.to(".csc-intro-scroll-hint", { opacity: 0, duration: 0.4 }),
    once: true,
  });

  /* Cleanup when breakpoint no longer matches */
  return () => {
    document.body.classList.remove("csc-desktop");
    gsap.set(cards, { clearProps: "all" });
  };
});

/* ============================================================
   MOBILE (< 768px) — vertical stack, fade-up reveals
   ============================================================ */
mm.add("(max-width: 767px)", () => {
  cards.forEach((card) => {
    gsap.fromTo(
      card,
      { opacity: 0, y: 44 },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      },
    );
  });
});

/* ============================================================
   SHARED — CTA fade-up (all breakpoints)
   ============================================================ */
gsap.fromTo(
  ".cap-cta-inner",
  { opacity: 0, y: 50 },
  {
    opacity: 1,
    y: 0,
    duration: 0.9,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".cap-cta",
      start: "top 82%",
      toggleActions: "play none none none",
    },
  },
);

/* Recalculate after all assets load */
window.addEventListener("load", () => ScrollTrigger.refresh());

/* ============================================================
   FILTER SCROLL NAVIGATION
============================================================ */

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const filterBtns = document.querySelectorAll(".csc-filter-btn");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    /* active state */
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    /* target */
    const targetId = btn.getAttribute("data-target");
    const targetEl = document.getElementById(targetId);

    if (targetEl) {
      const targetPosition =
        targetEl.getBoundingClientRect().top + window.pageYOffset - 120;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

window.addEventListener("load", () => {
  const hash = window.location.hash;

  if (hash) {
    const target = document.querySelector(hash);

    if (target) {
      setTimeout(() => {
        target.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 500);
    }
  }
});

window.addEventListener("load", () => {

  const hash = window.location.hash;

  if (!hash) return;

  const map = {
    "#csc-card-0": 0,
    "#csc-card-1": 1,
    "#csc-card-2": 2,
    "#csc-card-3": 3,
    "#csc-card-4": 4,
    "#csc-card-5": 5,
    "#csc-card-6": 6,
    "#csc-card-7": 7
  };

  const index = map[hash];

  if (index === undefined) return;

  setTimeout(() => {

    const scrollDistance =
      index * window.innerHeight * 1.1;

    window.scrollTo({
      top:
        document.getElementById("csc-section").offsetTop +
        scrollDistance,
      behavior: "smooth"
    });

  }, 800);

});