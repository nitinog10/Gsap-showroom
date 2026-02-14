# NITIN MISHRA — AI Portfolio 🚀

A high-performance, immersive 3D portfolio experience built at the intersection of **Generative AI** and **Modern Web Design**. This project features a "spaceship" scrolling mechanic where content "flies" towards the user through a starfield, creating a cinematic narrative.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18-blue)
![GSAP](https://img.shields.io/badge/GSAP-3.14-green)
![Three.js](https://img.shields.io/badge/Three.js-R182-orange)

---

## ✨ Key Features

### 🌌 Immersive UI/UX
- **Spaceship Scroll Mechanic**: A custom scroll-based 3D navigation where sections act as "celestial bodies" or stations that approach the viewer from deep space.
- **Starfield Background**: A dynamic `Three.js` + `React Three Fiber` starfield with depth and movement.
- **Magnetic Cursor**: An interactive, customized cursor that docks to buttons and follow-links with elastic physics.
- **Noise & Grain**: A subtle film grain overlay for a premium, textured aesthetic.

### 🎭 Advanced Animations (GSAP)
- **3D Card Transitions**: Cards use `rotateY`, `scale`, and `z-translation` to simulate movement through a 3D tunnel.
- **Staggered Content Cascade**: Individual elements within cards slide, scale, and de-blur in a choreographed sequence upon arrival.
- **Lenis Smooth Scroll**: Integrated smooth scrolling for a buttery-feel navigation across the entire experience.

### 🛠️ Tech Stack
- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS (Glassmorphism & Custom Gradient Systems)
- **Animation**: GSAP (GreenSock) + ScrollTrigger
- **3D Graphics**: Three.js, @react-three/fiber, @react-three/drei
- **Smooth Scrolling**: Lenis
- **Icons**: Lucide React, React Icons (SiLinkedIn, SiGithub, etc.)

---

## 📂 Project Structure

```text
├── src/
│   ├── components/
│   │   ├── Starfield.tsx        # 3 fiber star background
│   │   ├── MagneticCursor.tsx   # Custom cursor logic
│   │   ├── HeroSection.tsx      # Landing entry point
│   │   ├── Navbar.tsx           # Glassmorphism navigation
│   │   └── ...                  # Individual card renderers
│   ├── pages/
│   │   └── Index.tsx            # Main "Spaceship" orchestration & GSAP timeline
│   └── index.css                # Global design system & design tokens
└── ...
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm / bun

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nitinog10/Gsap-showroom.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

---

## 👨‍💻 About Nitin Mishra
A **GenAI Architect** and **ML Engineer** focused on building intelligent systems. 
- **NASA Space Apps Challenge 2025 Winner**
- Finalist in 15+ Hackathons
- Expert in RAG Systems, NLP Fine-Tuning, and Computer Vision.

---

## 📄 License
This project is licensed under the MIT License.

---

*Built with ❤️ by [Nitin Mishra](https://github.com/nitinog10)*
