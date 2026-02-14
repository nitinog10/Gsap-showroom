import { useRef, useEffect } from 'react';

/**
 * Starfield — stars only fly forward when user scrolls.
 * Stays still when not scrolling. Scroll faster = warp speed.
 */
const Starfield = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animId: number;
        const STAR_COUNT = 900;
        const stars: { x: number; y: number; z: number; pz: number }[] = [];
        let velocity = 0;        // current star speed
        let targetVelocity = 0;  // from scroll input

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Scroll drives star speed
        const onWheel = (e: WheelEvent) => {
            targetVelocity = Math.min(Math.abs(e.deltaY) * 0.08, 15);
        };
        window.addEventListener('wheel', onWheel, { passive: true });

        for (let i = 0; i < STAR_COUNT; i++) {
            stars.push({
                x: Math.random() * 2400 - 1200,
                y: Math.random() * 2400 - 1200,
                z: Math.random() * 1500,
                pz: 0,
            });
        }

        // Initial draw — static stars
        const drawStatic = () => {
            ctx.fillStyle = 'rgb(8, 8, 16)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            const cx = canvas.width / 2;
            const cy = canvas.height / 2;
            for (const star of stars) {
                const sx = (star.x / star.z) * 500 + cx;
                const sy = (star.y / star.z) * 500 + cy;
                const r = Math.max(0.3, (1 - star.z / 1500) * 1.8);
                const a = Math.max(0.1, (1 - star.z / 1500) * 0.5);
                ctx.fillStyle = `rgba(160, 190, 255, ${a})`;
                ctx.beginPath();
                ctx.arc(sx, sy, r, 0, Math.PI * 2);
                ctx.fill();
            }
        };
        drawStatic();

        const draw = () => {
            // Lerp velocity — decelerate when not scrolling
            velocity += (targetVelocity - velocity) * 0.1;
            targetVelocity *= 0.92; // decay target

            // Only draw trails if moving
            if (velocity > 0.05) {
                const fadeAlpha = Math.min(0.35, 0.15 + velocity * 0.015);
                ctx.fillStyle = `rgba(8, 8, 16, ${fadeAlpha})`;
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                const cx = canvas.width / 2;
                const cy = canvas.height / 2;

                for (const star of stars) {
                    star.pz = star.z;
                    star.z -= velocity;

                    if (star.z <= 0) {
                        star.x = Math.random() * 2400 - 1200;
                        star.y = Math.random() * 2400 - 1200;
                        star.z = 1500;
                        star.pz = 1500;
                    }

                    const sx = (star.x / star.z) * 500 + cx;
                    const sy = (star.y / star.z) * 500 + cy;
                    const px = (star.x / star.pz) * 500 + cx;
                    const py = (star.y / star.pz) * 500 + cy;

                    const size = Math.max(0, (1 - star.z / 1500) * 2.5);
                    const alpha = Math.max(0, (1 - star.z / 1500) * 0.8);

                    // Draw streak lines when moving fast, dots when slow
                    if (velocity > 1.5) {
                        ctx.strokeStyle = `rgba(140, 180, 255, ${alpha})`;
                        ctx.lineWidth = size;
                        ctx.beginPath();
                        ctx.moveTo(px, py);
                        ctx.lineTo(sx, sy);
                        ctx.stroke();
                    } else {
                        ctx.fillStyle = `rgba(160, 190, 255, ${alpha})`;
                        ctx.beginPath();
                        ctx.arc(sx, sy, size * 0.6, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
            } else if (velocity <= 0.05 && velocity > 0.001) {
                // Redraw static when almost stopped
                velocity = 0;
                drawStatic();
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
