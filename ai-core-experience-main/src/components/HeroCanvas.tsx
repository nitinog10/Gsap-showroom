import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ── Floating particle field — ambient cosmic dust ── */
const ParticleField = () => {
    const meshRef = useRef<THREE.Points>(null);
    const count = 1600;

    const [positions, sizes] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const sz = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 16;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 16;
            sz[i] = Math.random() * 2 + 0.3;
        }
        return [pos, sz];
    }, []);

    useFrame(({ clock }) => {
        if (!meshRef.current) return;
        meshRef.current.rotation.y = clock.getElapsedTime() * 0.015;
        meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.008) * 0.12;
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
                color="#5599ff"
                size={0.018}
                sizeAttenuation
                transparent
                opacity={0.3}
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
        meshRef.current.rotation.y = clock.getElapsedTime() * 0.12;
        meshRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.08) * 0.18;
        const s = 1 + Math.sin(clock.getElapsedTime() * 0.25) * 0.06;
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

/* ── Floating mini asteroids — small irregular rocks ── */
const FloatingRocks = () => {
    const groupRef = useRef<THREE.Group>(null);
    const rockCount = 8;

    const rocks = useMemo(() => {
        return Array.from({ length: rockCount }, () => ({
            position: [
                (Math.random() - 0.5) * 12,
                (Math.random() - 0.5) * 8,
                (Math.random() - 0.5) * 10,
            ] as [number, number, number],
            scale: 0.05 + Math.random() * 0.12,
            rotSpeed: (Math.random() - 0.5) * 0.3,
            detail: Math.floor(Math.random() * 2),
        }));
    }, []);

    useFrame(({ clock }) => {
        if (!groupRef.current) return;
        groupRef.current.rotation.y = clock.getElapsedTime() * 0.008;
        groupRef.current.children.forEach((child, i) => {
            child.rotation.x += rocks[i].rotSpeed * 0.01;
            child.rotation.z += rocks[i].rotSpeed * 0.008;
            // Subtle float
            child.position.y += Math.sin(clock.getElapsedTime() * 0.3 + i) * 0.0003;
        });
    });

    return (
        <group ref={groupRef}>
            {rocks.map((rock, i) => (
                <mesh key={i} position={rock.position} scale={rock.scale}>
                    <dodecahedronGeometry args={[1, rock.detail]} />
                    <meshStandardMaterial
                        color="#2a2520"
                        roughness={0.95}
                        metalness={0.1}
                        transparent
                        opacity={0.35}
                    />
                </mesh>
            ))}
        </group>
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
        <pointLight position={[0, 3, -5]} intensity={0.2} color="#ff44aa" />
        <ParticleField />
        <GlowSphere />
        <FloatingRocks />
    </Canvas>
);

export default HeroCanvas;
