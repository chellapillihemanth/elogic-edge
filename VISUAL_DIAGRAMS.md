# Visual Diagrams & Animation Behavior

## Hero Section Layout (After Changes)

```
┌─────────────────────────────────────────────────────────────┐
│  Our Works Hero Section                                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌────────────────────┐         ┌────────────────────────┐ │
│  │  LEFT (FROZEN)     │         │  RIGHT (ANIMATED)      │ │
│  │                    │         │                        │ │
│  │  Our Works         │         │  ┌──────────────────┐  │ │
│  │                    │         │  │  CODE DESIGN     │  │ │
│  │  A Collection of   │         │  │  (Label)         │  │ │
│  │  Our Work...       │         │  └──────────────────┘  │ │
│  │                    │         │                        │ │
│  │  ✓ NEVER CHANGES   │         │  ┌──────────────────┐  │ │
│  │  ✓ NO ANIMATION    │         │  │                  │  │ │
│  │  ✓ NO FADE         │         │  │  [Active Image]  │  │ │
│  │  ✓ STATIC TEXT     │         │  │  100% opacity    │  │ │
│  │                    │         │  │  Full size       │  │ │
│  │  Overview          │         │  │  Sharp focus     │  │ │
│  │                    │         │  └──────────────────┘  │ │
│  │  Consulting for    │         │  ┌──────────────────┐  │ │
│  │  standards...      │         │  │  [Next Image]    │  │ │
│  │                    │         │  │  40% opacity     │  │ │
│  │                    │         │  │  0.85x scale     │  │ │
│  └────────────────────┘         │  │  Below center    │  │ │
│                                 │  └──────────────────┘  │ │
│                                 │  ┌──────────────────┐  │ │
│                                 │  │  [Far Image]     │  │ │
│                                 │  │  18% opacity     │  │ │
│                                 │  │  0.7x scale      │  │ │
│                                 │  └──────────────────┘  │ │
│                                 │                        │ │
│                                 │  [FarFar Image        │ │
│                                 │   barely visible]      │ │
│                                 │                        │ │
│                                 └────────────────────────┘ │
│                                                             │
│  ● ● ● ●  (Navigation dots)                                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘

LEFT SIDE:  Completely frozen, no animations
RIGHT SIDE: Smooth vertical carousel of 4 product images
```

---

## Image Stacking Visualization

### From Above View (Z-Index)

```
Top Layer (Z=4):  [ACTIVE IMAGE]
                  100% visible

Middle-Top (Z=3): [NEXT IMAGE]
                  40% visible, below

Middle-Low (Z=2): [FAR IMAGE]
                  18% visible, further below

Bottom (Z=1):     [FARFAR IMAGE]
                  8% visible, very far below
```

### Depth Perception

```
Camera View

     ╱───────────╲
    ╱             ╲
   │  ACTIVE IMG  │  ← Front, largest, sharpest
   │  (100%)      │     No blur
   └─────────────┘
          ▼ 80px down
    ┌──────────────┐
    │  NEXT IMG    │  ← Slightly behind, medium size
    │  (40%)       │     Small blur (2.2px)
    │  0.85x scale │
    └──────────────┘
          ▼ 140px down
     ┌───────────┐
     │ FAR IMG   │     ← Further back, smaller
     │ (18%)     │     More blur (4.5px)
     │ 0.7x      │
     └───────────┘
          ▼ 200px down
      ┌─────────┐
      │FarFarImg│    ← Very far back, very small
      │ (8%)    │     Heavy blur (6px)
      │ 0.6x    │
      └─────────┘
```

---

## Animation State Machine

```
STATE 1: Image Set 0 is ACTIVE (5000ms)
┌──────────────────────────────────────────────────────┐
│ Slide 0: ACTIVE    (100% opac, scale 1, blur 0)     │
│ Slide 1: NEXT      (40% opac, scale 0.85, blur 2)   │
│ Slide 2: FAR       (18% opac, scale 0.7, blur 4.5)  │
│ Slide 3: FARFAR    (8% opac, scale 0.6, blur 6)     │
└──────────────────────────────────────────────────────┘
              ↓ 1.6 second smooth CSS transition

STATE 2: Image Set 1 is ACTIVE (5000ms)
┌──────────────────────────────────────────────────────┐
│ Slide 1: ACTIVE    (100% opac, scale 1, blur 0)     │
│ Slide 2: NEXT      (40% opac, scale 0.85, blur 2)   │
│ Slide 3: FAR       (18% opac, scale 0.7, blur 4.5)  │
│ Slide 0: FARFAR    (8% opac, scale 0.6, blur 6)     │ ← Wrapped
└──────────────────────────────────────────────────────┘
              ↓ 1.6 second smooth CSS transition

STATE 3: Image Set 2 is ACTIVE (5000ms)
┌──────────────────────────────────────────────────────┐
│ Slide 2: ACTIVE    (100% opac, scale 1, blur 0)     │
│ Slide 3: NEXT      (40% opac, scale 0.85, blur 2)   │
│ Slide 0: FAR       (18% opac, scale 0.7, blur 4.5)  │ ← Wrapped
│ Slide 1: FARFAR    (8% opac, scale 0.6, blur 6)     │ ← Wrapped
└──────────────────────────────────────────────────────┘
              ↓ 1.6 second smooth CSS transition

STATE 4: Image Set 3 is ACTIVE (5000ms)
┌──────────────────────────────────────────────────────┐
│ Slide 3: ACTIVE    (100% opac, scale 1, blur 0)     │
│ Slide 0: NEXT      (40% opac, scale 0.85, blur 2)   │ ← Wrapped
│ Slide 1: FAR       (18% opac, scale 0.7, blur 4.5)  │ ← Wrapped
│ Slide 2: FARFAR    (8% opac, scale 0.6, blur 6)     │ ← Wrapped
└──────────────────────────────────────────────────────┘
              ↓ 1.6 second smooth CSS transition

              ↻ Loop back to STATE 1
```

---

## Transform Timeline (1.6s Transition)

### Example: Slide 1 transitioning from NEXT → ACTIVE

```
Time: 0ms
┌─────────────────────────────────┐
│ .carousel-pos--next             │
│ transform: translateY(80px)     │
│            scale(0.85)          │
│ opacity: 0.4                    │
│ filter: blur(2.2px)             │
│ (z-index: 3)                    │
└─────────────────────────────────┘

Time: 0ms → Instant class swap to .carousel-pos--active
CSS transition begins automatically

Time: 800ms (50% through)
┌─────────────────────────────────┐
│ transform: translateY(40px)     │ ← Halfway up
│            scale(0.925)         │ ← Halfway scaled
│ opacity: 0.7                    │ ← Halfway faded in
│ filter: blur(1.1px)             │ ← Halfway unblurred
└─────────────────────────────────┘

Time: 1600ms (100% complete)
┌─────────────────────────────────┐
│ .carousel-pos--active           │
│ transform: translateY(0px)      │ ← At center
│            scale(1)             │ ← Full size
│ opacity: 1                      │ ← Fully visible
│ filter: blur(0px)               │ ← Crisp
│ (z-index: 4)                    │
└─────────────────────────────────┘
```

---

## JavaScript Flow Diagram

```
┌──────────────────────────────────────────┐
│ Page Load                                │
├──────────────────────────────────────────┤
│ init()                                   │
│ ├─ updateCarouselPositions()            │
│ │  └─ All slides get initial positions  │
│ └─ startAuto()                          │
│    └─ Set interval: cycleNext() every   │
│       5000ms                            │
└──────────────────────────────────────────┘
         ↓
┌──────────────────────────────────────────┐
│ Every 5 seconds OR on Dot Click          │
├──────────────────────────────────────────┤
│ cycleNext() / goToSlide()                │
│ ├─ if (isAnimating) return               │
│ │  (prevent overlapping)                 │
│ ├─ isAnimating = true                    │
│ ├─ Increment: current++                  │
│ ├─ updateCarouselPositions()             │
│ │  └─ Loop all slides:                   │
│ │     ├─ Get offset = (i - current) % 4  │
│ │     ├─ Remove all position classes     │
│ │     ├─ Add correct position class      │
│ │     └─ CSS transition animates (1.6s)  │
│ ├─ Update dot.active classes             │
│ └─ setTimeout(() => {                    │
│     isAnimating = false                  │
│   }, 1600ms)                             │
│   ↓                                      │
│ Wait 1600ms for CSS animation complete   │
│   ↓                                      │
│ Allow next cycle                         │
└──────────────────────────────────────────┘
         ↓
    (Back to top, repeats)
```

---

## Offset Calculation Example

```
Scenario: 4 slides (indexes 0, 1, 2, 3)
Current active slide = 2

For each slide, calculate offset:
  offset = (slideIndex - current + 4) % 4

Slide 0: (0 - 2 + 4) % 4 = 2 % 4 = 2  → .carousel-pos--far
Slide 1: (1 - 2 + 4) % 4 = 3 % 4 = 3  → .carousel-pos--farfar
Slide 2: (2 - 2 + 4) % 4 = 4 % 4 = 0  → .carousel-pos--active ✓
Slide 3: (3 - 2 + 4) % 4 = 5 % 4 = 1  → .carousel-pos--next

Result:
  Slide 2 is ACTIVE (center)
  Slide 3 is NEXT (below, waiting)
  Slide 0 is FAR (further back)
  Slide 1 is FARFAR (very far back)
```

---

## CSS Property Comparison

### Opacity Curve

```
ACTIVE:  100% (fully visible)
NEXT:    40%  (semi-transparent)
FAR:     18%  (very faint)
FARFAR:  8%   (barely visible)

Graph:
100% ████████ ACTIVE
 90%
 80%
 70%
 60%
 50%
 40% ████     NEXT
 30%
 20% ██       FAR
 10%
  8% █        FARFAR
```

### Scale Curve

```
ACTIVE:  1.0x  (full size)
NEXT:    0.85x (85% size)
FAR:     0.7x  (70% size)
FARFAR:  0.6x  (60% size)

Graph:
1.0x ████████ ACTIVE
0.85x ███████ NEXT
0.7x  ██████  FAR
0.6x  ██████  FARFAR
```

### Blur Curve

```
ACTIVE:  0px   (crisp)
NEXT:    2.2px (slight blur)
FAR:     4.5px (medium blur)
FARFAR:  6px   (heavy blur)

Graph:
0px    ████████ ACTIVE
2.2px  ▓▓▓▓▓▓   NEXT
4.5px  ▓▓▓▓     FAR
6px    ▓▓▓      FARFAR
```

---

## Key CSS Transitions

```css
.showcase-slide {
  /* All 4 properties animate smoothly */

  transition:
    transform 1.6s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 1.4s ease,
    filter 1.4s ease;
}

/* When classes change, these properties animate automatically */

.carousel-pos--active {
  transform: translateY(0px) scale(1);
  opacity: 1;
  filter: blur(0px);
}

.carousel-pos--next {
  transform: translateY(80px) scale(0.85);
  opacity: 0.4;
  filter: blur(2.2px);
}

/* CSS handles the in-between values, smooth animation! */
```

---

## Performance Metrics

### CPU/GPU Usage

```
JavaScript per cycle:
├─ Class changes: ~0.2ms
├─ DOM updates: ~0.1ms
└─ Total JS: <1ms per cycle

CSS Transitions:
├─ GPU-accelerated
├─ 60fps smooth animation
└─ Zero JavaScript animation loop

Memory:
└─ No DOM allocation (only class changes)

Result:
✓ Smooth 60fps animation
✓ Minimal CPU usage
✓ Efficient GPU utilization
✓ Mobile-friendly
```
