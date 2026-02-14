import { useRef, useEffect } from 'react';

/**
 * Starfield + Asteroids — immersive space background.
 * Stars warp on scroll. Asteroids tumble gently.
 * Nebula color zones add depth.
 */

type Star = { x: number; y: number; z: number; pz: number };
type Asteroid = {
    x: number; y: number; z: number;
    size: number;
    rotation: number; rotSpeed: number;
    vertices: number[];         // pre-generated irregular shape
    brightness: number;
    driftX: number; driftY: number;
};

const createAsteroidVertices = (points: number): number[] => {
    const verts: number[] = [];
    for (let i = 0; i < points; i++) {
        const angle = (i / points) * Math.PI * 2;
        const radius = 0.6 + Math.random() * 0.4; // irregular radius
        verts.push(Math.cos(angle) * radius, Math.sin(angle) * radius);
    }
    return verts;
};

const Starfield = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animId: number;
        const STAR_COUNT = 1100;
        const ASTEROID_COUNT = 35;
        const stars: Star[] = [];
        const asteroids: Asteroid[] = [];
        let velocity = 0;
        let targetVelocity = 0;
        let time = 0;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Scroll drives warp speed
        const onWheel = (e: WheelEvent) => {
            targetVelocity = Math.min(Math.abs(e.deltaY) * 0.1, 18);
        };
        window.addEventListener('wheel', onWheel, { passive: true });

        // Create stars
        for (let i = 0; i < STAR_COUNT; i++) {
            stars.push({
                x: Math.random() * 2800 - 1400,
                y: Math.random() * 2800 - 1400,
                z: Math.random() * 1800,
                pz: 0,
            });
        }

        // Create asteroids
        for (let i = 0; i < ASTEROID_COUNT; i++) {
            asteroids.push({
                x: Math.random() * 3000 - 1500,
                y: Math.random() * 3000 - 1500,
                z: 200 + Math.random() * 1400,
                size: 3 + Math.random() * 12,
                rotation: Math.random() * Math.PI * 2,
                rotSpeed: (Math.random() - 0.5) * 0.008,
                vertices: createAsteroidVertices(5 + Math.floor(Math.random() * 4)),
                brightness: 0.15 + Math.random() * 0.2,
                driftX: (Math.random() - 0.5) * 0.15,
                driftY: (Math.random() - 0.5) * 0.1,
            });
        }

        const drawAsteroid = (a: Asteroid, cx: number, cy: number) => {
            const proj = 500 / a.z;
            const sx = a.x * proj + cx;
            const sy = a.y * proj + cy;
            const scale = proj * a.size;

            if (sx < -100 || sx > canvas.width + 100 || sy < -100 || sy > canvas.height + 100) return;
            if (scale < 0.5) return;

            const depthAlpha = Math.max(0.05, (1 - a.z / 1800) * a.brightness);

            ctx.save();
            ctx.translate(sx, sy);
            ctx.rotate(a.rotation);
            ctx.globalAlpha = depthAlpha;

            // Asteroid body
            const verts = a.vertices;
            ctx.beginPath();
            ctx.moveTo(verts[0] * scale, verts[1] * scale);
            for (let j = 2; j < verts.length; j += 2) {
                ctx.lineTo(verts[j] * scale, verts[j + 1] * scale);
            }
            ctx.closePath();

            // Gradient fill for rocky look
            const grad = ctx.createRadialGradient(
                -scale * 0.2, -scale * 0.2, 0,
                0, 0, scale
            );
            grad.addColorStop(0, `rgba(120, 110, 100, ${depthAlpha * 1.5})`);
            grad.addColorStop(0.6, `rgba(70, 65, 60, ${depthAlpha})`);
            grad.addColorStop(1, `rgba(40, 38, 35, ${depthAlpha * 0.5})`);
            ctx.fillStyle = grad;
            ctx.fill();

            // Subtle edge outline
            ctx.strokeStyle = `rgba(160, 150, 140, ${depthAlpha * 0.4})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();

            ctx.restore();
        };

        const drawNebula = (cx: number, cy: number) => {
            // Subtle nebula clouds
            const nebulaAlpha = 0.015;
            const t = time * 0.0003;

            // Purple nebula
            const n1x = cx + Math.sin(t * 0.7) * 200;
            const n1y = cy * 0.3 + Math.cos(t * 0.5) * 150;
            const n1g = ctx.createRadialGradient(n1x, n1y, 0, n1x, n1y, 400);
            n1g.addColorStop(0, `rgba(120, 60, 200, ${nebulaAlpha * 1.5})`);
            n1g.addColorStop(0.5, `rgba(80, 40, 160, ${nebulaAlpha})`);
            n1g.addColorStop(1, 'transparent');
            ctx.fillStyle = n1g;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Cyan nebula
            const n2x = cx + Math.cos(t * 0.4) * 300;
            const n2y = cy * 1.5 + Math.sin(t * 0.6) * 100;
            const n2g = ctx.createRadialGradient(n2x, n2y, 0, n2x, n2y, 350);
            n2g.addColorStop(0, `rgba(0, 180, 220, ${nebulaAlpha})`);
            n2g.addColorStop(0.5, `rgba(0, 120, 160, ${nebulaAlpha * 0.7})`);
            n2g.addColorStop(1, 'transparent');
            ctx.fillStyle = n2g;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        };

        const draw = () => {
            time++;
            velocity += (targetVelocity - velocity) * 0.08;
            targetVelocity *= 0.93;

            const cx = canvas.width / 2;
            const cy = canvas.height / 2;

            // Clear with dark space color
            ctx.fillStyle = 'rgb(8, 8, 16)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw nebula clouds (subtle, always present)
            drawNebula(cx, cy);

            // ── Stars ──
            for (const star of stars) {
                star.pz = star.z;
                star.z -= velocity;

                if (star.z <= 0) {
                    star.x = Math.random() * 2800 - 1400;
                    star.y = Math.random() * 2800 - 1400;
                    star.z = 1800;
                    star.pz = 1800;
                }

                const sx = (star.x / star.z) * 500 + cx;
                const sy = (star.y / star.z) * 500 + cy;
                const px = (star.x / star.pz) * 500 + cx;
                const py = (star.y / star.pz) * 500 + cy;

                const depth = 1 - star.z / 1800;
                const size = Math.max(0, depth * 2.8);
                const alpha = Math.max(0, depth * 0.85);

                // Twinkling for stationary stars
                const twinkle = velocity < 0.3
                    ? 0.5 + Math.sin(time * 0.03 + star.x * 0.01) * 0.3
                    : 1;

                if (velocity > 2) {
                    // Warp streaks
                    ctx.strokeStyle = `rgba(160, 200, 255, ${alpha * twinkle})`;
                    ctx.lineWidth = size * 0.8;
                    ctx.beginPath();
                    ctx.moveTo(px, py);
                    ctx.lineTo(sx, sy);
                    ctx.stroke();
                } else if (velocity > 0.3) {
                    // Short streaks
                    const mx = px + (sx - px) * 0.4;
                    const my = py + (sy - py) * 0.4;
                    ctx.strokeStyle = `rgba(160, 200, 255, ${alpha * 0.7 * twinkle})`;
                    ctx.lineWidth = size * 0.5;
                    ctx.beginPath();
                    ctx.moveTo(mx, my);
                    ctx.lineTo(sx, sy);
                    ctx.stroke();
                } else {
                    // Static dots with twinkle
                    ctx.fillStyle = `rgba(170, 200, 255, ${alpha * 0.5 * twinkle})`;
                    ctx.beginPath();
                    ctx.arc(sx, sy, size * 0.5, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // ── Asteroids ──
            for (const a of asteroids) {
                // Drift movement
                a.x += a.driftX;
                a.y += a.driftY;
                a.rotation += a.rotSpeed;

                // Move with scroll (slower than stars for depth)
                a.z -= velocity * 0.3;

                // Reset if past viewer
                if (a.z <= 10) {
                    a.x = Math.random() * 3000 - 1500;
                    a.y = Math.random() * 3000 - 1500;
                    a.z = 1600 + Math.random() * 200;
                }

                // Wrap if drifted too far
                if (Math.abs(a.x) > 2000) a.x *= -0.5;
                if (Math.abs(a.y) > 2000) a.y *= -0.5;

                drawAsteroid(a, cx, cy);
            }

            animId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
            window.removeEventListener('wheel', onWheel);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
        />
    );
};

export default Starfield;
