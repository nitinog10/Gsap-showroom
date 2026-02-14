import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ── Floating particle field — subtle, ambient, rotates slowly ── */
const ParticleField = () => {
    const meshRef = useRef<THREE.Points>(null);
    const count = 1200;

    const [positions, sizes] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const sz = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 12;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
            sz[i] = Math.random() * 2 + 0.5;
        }
        return [pos, sz];
    }, []);

    useFrame(({ clock }) => {
        if (!meshRef.current) return;
        meshRef.current.rotation.y = clock.getElapsedTime() * 0.02;
        meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.01) * 0.1;
    });

    return (
        <points ref={meshRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                    count={count}
                />
                <bufferAttribute
                    attach="attributes-size"
                    args={[sizes, 1]}
                    count={count}
                />
            </bufferGeometry>
            <pointsMaterial
                color="#4488ff"
                size={0.02}
                sizeAttenuation
                transparent
                opacity={0.35}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};

/* ── Gradient sphere — glassy orb in the center ── */
const GlowSphere = () => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame(({ clock }) => {
        if (!meshRef.current) return;
        meshRef.current.rotation.y = clock.getElapsedTime() * 0.15;
        meshRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.1) * 0.15;
        const s = 1 + Math.sin(clock.getElapsedTime() * 0.3) * 0.05;
        meshRef.current.scale.set(s, s, s);
    });

    return (
        <mesh ref={meshRef} position={[0, 0, 0]}>
            <icosahedronGeometry args={[1.6, 4]} />
            <meshStandardMaterial
                color="#1a1a3e"
                emissive="#0044aa"
                emissiveIntensity={0.15}
                wireframe
                transparent
                opacity={0.18}
            />
        </mesh>
    );
};

const HeroCanvas = () => (
    <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ position: 'absolute', inset: 0 }}
    >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.4} color="#6644ff" />
        <pointLight position={[-5, -3, 3]} intensity={0.3} color="#00aaff" />
        <ParticleField />
        <GlowSphere />
    </Canvas>
);

export default HeroCanvas;
