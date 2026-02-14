<div align="center">

# 🚀 GSAP Showroom — Cinematic Scroll Portfolio

### A scroll-driven, spaceship-like immersive portfolio experience

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![GSAP](https://img.shields.io/badge/GSAP-3.14-88CE02?logo=greensock&logoColor=white)](https://gsap.com)
[![Three.js](https://img.shields.io/badge/Three.js-R182-000000?logo=threedotjs&logoColor=white)](https://threejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

</div>

---

## 🎬 How It Works — The Cinematic Scroll Experience

This is **not** a typical portfolio website. The entire page behaves like a **continuous, animated scene** — a cinematic timeline where **scroll = time**.

### 🌀 Scroll Is the Timeline

The page doesn't jump between sections. Instead, as the user scrolls:

- **Content morphs and transforms** in real-time based on scroll position and speed.
- Each section **smoothly translates, scales, rotates, and fades** — never hard-cuts.
- The layout continuously **morphs** in response to scroll position, creating a fluid, film-like narrative.
- **Lenis Smooth Scroll** provides buttery-smooth inertia — the entire experience feels alive and responsive.

### 📌 Pinned Sections & Scroll-Locked Animations

Sections don't just scroll past — they **pin in place** and stay locked on screen until their animation sequence completes:

1. **Hero Section** pins itself, the name animates letter-by-letter with 3D rotation (`rotateX: -80°`), then the entire hero scales up (`1.06×`) and fades out as the user scrolls deeper.
2. **Card Tunnel** — The main content pins a full-height viewport. Cards don't scroll linearly — they **fly toward the user from deep in space**, like approaching space stations.

### 🃏 The 3D Card Flight System

Each content card goes through a **4-phase animation lifecycle**, all driven by scroll:

| Phase | What Happens | Scroll % |
|-------|-------------|----------|
| **🔭 Peek** | Next card appears in the far distance — tiny, blurred, rotated | ~35% of segment |
| **🛬 Approach** | Card drifts closer — scale grows, blur reduces, rotation unwinds | 0–25% |
| **✨ Landing** | Card snaps to center with `back.out` overshoot — border flashes cyan glow | 25–50% |
| **🚀 Exit** | Card warps past the viewer — scales to `1.5×`, blurs, rotates away | 75–100% |

Inner content (text, badges, images) animates with a **staggered cascade** — each element slides up, de-blurs, and un-rotates in sequence for a dramatic reveal.

### 🔄 Zig-Zag Layout

Cards alternate positions — even-indexed cards align **left** (`left: 5%`), odd-indexed cards align **right** (`right: 5%`), each with mirrored rotation angles (`±18° rotateY`). This creates a zig-zag spatial flow as the user navigates through space.

---

## 🌌 The Space Background — Starfield & Asteroids

The background is a **persistent, scroll-reactive starfield** canvas rendered at 60fps:

| Feature | Description |
|---------|-------------|
| **900 Stars** | Distributed in 3D space across a 2400×2400×1500 volume |
| **Scroll-Driven Speed** | Stars are stationary when idle — scroll to accelerate them forward |
| **Warp Streaks** | At high scroll velocity (`> 1.5`), stars transform into motion-blur streaks |
| **Depth Parallax** | Stars closer to the viewer appear brighter and larger |
| **Smooth Deceleration** | Velocity lerps to zero when scrolling stops — no abrupt halt |

### 🪨 Hero Asteroids & Particles

The hero section includes a **Three.js** scene with:

- **1200 Floating Particles** — a slowly rotating particle cloud using additive blending for a cosmic glow
- **Wireframe Icosahedron Orb** — a glassy, breathing sphere that subtly pulses and rotates at the center
- **Dual-colored Point Lights** — purple (`#6644ff`) and blue (`#00aaff`) lights creating atmospheric depth

---

## 🖱️ Interactive Elements

### Magnetic Cursor
A custom GSAP-powered cursor system (desktop only):
- **Dot** — 2px white circle with `power3.out` tracking (12ms response)
- **Ring** — 36px trailing circle that expands to 90px on interactive hover
- **Label** — Shows contextual text (e.g., "View", "GitHub", "Send") on hoverable elements
- **Mix-blend-difference** — cursor inverts underlying colors for visibility

### Glassmorphism Navbar
- Transparent on top, then morphs to `blur(20px) + 85% opacity` dark glass on scroll
- **Auto-hides** on scroll-down, **reappears** on scroll-up
- Smooth `power3.out` entrance animation with 1.6s delay

### Scroll Progress Indicator
- Vertical progress bar on the right edge — fills with accent color as user scrolls
- Section dot indicators for quick orientation

---

## 🎨 Design System

Built on a premium, dark editorial aesthetic:

```
Fonts:    Inter (body) · Space Grotesk (headings) · JetBrains Mono (code/labels)
Palette:  Deep Navy (#080810) · Cyan (#00d4ff) · Purple (#7c3aed) · Blue (#3b82f6)
Effects:  Glassmorphism · Film Grain Overlay · Radial Gradient Glows
Cards:    Rounded-14px · Subtle borders · Hover lift + purple glow shadow
```

### Key CSS Components

| Class | Purpose |
|-------|---------|
| `.card-agency` | Vercel-style dark card with hover lift & glow |
| `.text-gradient` | Cyan → Blue → Purple gradient text |
| `.btn-glow` | CTA button with gradient background + hover glow |
| `.pill` | Rounded badge with border glow on hover |
| `.noise-overlay` | Fixed full-screen SVG film grain at 2% opacity |
| `.social-btn` | Circular icon button with hover lift |

---

## 📂 Project Architecture

```
src/
├── pages/
│   └── Index.tsx              ← Main orchestrator — all card data, GSAP master timeline,
│                                 zig-zag card layout & 3D flight animations
├── components/
│   ├── Starfield.tsx          ← Canvas-rendered 900-star scroll-reactive space background
│   ├── HeroCanvas.tsx         ← Three.js particle field + wireframe orb (React Three Fiber)
│   ├── HeroSection.tsx        ← Pinned hero with letter-split animation & scroll-out
│   ├── MagneticCursor.tsx     ← GSAP quickTo cursor with label system
│   ├── Navbar.tsx             ← Glassmorphism navbar with scroll hide/show
│   ├── ScrollProgress.tsx     ← Vertical progress bar + section dots
│   ├── NoiseOverlay.tsx       ← Film grain texture overlay
│   └── ui/                    ← Radix UI + shadcn/ui component library
├── index.css                  ← Full design system — tokens, components, utilities
└── ...
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 18, TypeScript |
| **Build** | Vite 5 |
| **Animation** | GSAP 3.14 + ScrollTrigger |
| **3D** | Three.js, @react-three/fiber, @react-three/drei |
| **Smooth Scroll** | Lenis (Studio Freight) |
| **Styling** | Tailwind CSS 3.4 + Custom Design Tokens |
| **UI Library** | Radix UI + shadcn/ui |
| **Icons** | React Icons (Si*, Hi*), Lucide React |
| **Routing** | React Router DOM v6 |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18+
- **npm** or **bun**

### Installation

```bash
# Clone the repository
git clone https://github.com/nitinog10/Gsap-showroom.git
cd Gsap-showroom

# Install dependencies
cd ai-core-experience-main
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🧑‍💻 About the Developer

**Nitin Kumar Mishra** — GenAI Architect · ML Engineer · AI Developer

| | |
|---|---|
| 🏆 | **NASA Space Apps Challenge 2025 Winner** |
| 🎯 | **15+ Hackathons** — 3 Wins |
| 🧠 | Expert in RAG, NLP Fine-Tuning, Computer Vision |
| 🔗 | [LinkedIn](https://www.linkedin.com/in/nitin-kumar-mishra-520615331) · [GitHub](https://github.com/nitinog10) |

---

## 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">

*Built with ❤️ and GSAP magic by [Nitin Mishra](https://github.com/nitinog10)*

**Scroll = Timeline · Stars = Speed · Cards = Space Stations**

</div>
