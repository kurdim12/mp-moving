import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

/** Scroll progress hook */
function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return progress;
}

/** Abstract humanoid built from geometric primitives */
function Humanoid({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Group>(null);
  const rightLegRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);

  // Walking cycle driven by scroll
  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Move figure across screen based on scroll
    const xPos = THREE.MathUtils.lerp(-6, 6, scrollProgress);
    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      xPos,
      0.05
    );

    // Subtle lean forward
    groupRef.current.rotation.z = Math.sin(scrollProgress * Math.PI * 8) * 0.03;

    // Walking swing
    const walkCycle = scrollProgress * Math.PI * 16;
    const swingAmount = 0.5;

    if (leftArmRef.current) leftArmRef.current.rotation.x = Math.sin(walkCycle) * swingAmount;
    if (rightArmRef.current) rightArmRef.current.rotation.x = -Math.sin(walkCycle) * swingAmount;
    if (leftLegRef.current) leftLegRef.current.rotation.x = -Math.sin(walkCycle) * swingAmount * 0.8;
    if (rightLegRef.current) rightLegRef.current.rotation.x = Math.sin(walkCycle) * swingAmount * 0.8;

    // Head bob
    if (headRef.current) {
      headRef.current.position.y = 2.6 + Math.abs(Math.sin(walkCycle * 2)) * 0.08;
    }
  });

  const darkMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x0a0a0a),
        roughness: 0.3,
        metalness: 0.8,
      }),
    []
  );

  const lightMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0xd4d4d4),
        roughness: 0.2,
        metalness: 0.6,
        emissive: new THREE.Color(0x222222),
        emissiveIntensity: 0.3,
      }),
    []
  );

  const wireMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x1a1a1a),
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      }),
    []
  );

  return (
    <group ref={groupRef} position={[-6, -1.5, 0]} scale={0.85}>
      {/* Head — light sphere with wireframe overlay */}
      <mesh ref={headRef} position={[0, 2.6, 0]}>
        <icosahedronGeometry args={[0.38, 2]} />
        <primitive object={lightMat} attach="material" />
      </mesh>
      <mesh position={[0, 2.6, 0]}>
        <icosahedronGeometry args={[0.42, 1]} />
        <primitive object={wireMat} attach="material" />
      </mesh>

      {/* Torso — dark elongated octahedron */}
      <mesh position={[0, 1.4, 0]} scale={[0.5, 1.1, 0.35]}>
        <octahedronGeometry args={[0.8, 0]} />
        <primitive object={darkMat} attach="material" />
      </mesh>
      {/* Torso wireframe halo */}
      <mesh position={[0, 1.4, 0]} scale={[0.55, 1.15, 0.4]}>
        <octahedronGeometry args={[0.8, 0]} />
        <primitive object={wireMat} attach="material" />
      </mesh>

      {/* Left Arm */}
      <group ref={leftArmRef} position={[-0.55, 2.0, 0]}>
        <mesh position={[0, -0.5, 0]} scale={[0.12, 0.55, 0.12]}>
          <cylinderGeometry args={[1, 0.7, 1, 6]} />
          <primitive object={lightMat} attach="material" />
        </mesh>
        {/* Forearm */}
        <mesh position={[-0.05, -1.0, 0]} scale={[0.1, 0.45, 0.1]}>
          <cylinderGeometry args={[0.7, 0.5, 1, 6]} />
          <primitive object={darkMat} attach="material" />
        </mesh>
      </group>

      {/* Right Arm */}
      <group ref={rightArmRef} position={[0.55, 2.0, 0]}>
        <mesh position={[0, -0.5, 0]} scale={[0.12, 0.55, 0.12]}>
          <cylinderGeometry args={[1, 0.7, 1, 6]} />
          <primitive object={darkMat} attach="material" />
        </mesh>
        <mesh position={[0.05, -1.0, 0]} scale={[0.1, 0.45, 0.1]}>
          <cylinderGeometry args={[0.7, 0.5, 1, 6]} />
          <primitive object={lightMat} attach="material" />
        </mesh>
      </group>

      {/* Left Leg */}
      <group ref={leftLegRef} position={[-0.22, 0.4, 0]}>
        <mesh position={[0, -0.5, 0]} scale={[0.14, 0.6, 0.14]}>
          <cylinderGeometry args={[1, 0.8, 1, 6]} />
          <primitive object={darkMat} attach="material" />
        </mesh>
        <mesh position={[0, -1.1, 0]} scale={[0.12, 0.5, 0.12]}>
          <cylinderGeometry args={[0.8, 0.6, 1, 6]} />
          <primitive object={lightMat} attach="material" />
        </mesh>
        {/* Foot */}
        <mesh position={[0, -1.5, 0.1]} scale={[0.13, 0.06, 0.22]}>
          <boxGeometry args={[1, 1, 1]} />
          <primitive object={darkMat} attach="material" />
        </mesh>
      </group>

      {/* Right Leg */}
      <group ref={rightLegRef} position={[0.22, 0.4, 0]}>
        <mesh position={[0, -0.5, 0]} scale={[0.14, 0.6, 0.14]}>
          <cylinderGeometry args={[1, 0.8, 1, 6]} />
          <primitive object={lightMat} attach="material" />
        </mesh>
        <mesh position={[0, -1.1, 0]} scale={[0.12, 0.5, 0.12]}>
          <cylinderGeometry args={[0.8, 0.6, 1, 6]} />
          <primitive object={darkMat} attach="material" />
        </mesh>
        <mesh position={[0, -1.5, 0.1]} scale={[0.13, 0.06, 0.22]}>
          <boxGeometry args={[1, 1, 1]} />
          <primitive object={lightMat} attach="material" />
        </mesh>
      </group>
    </group>
  );
}

/** Floating geometric fragments around the figure */
function Fragments({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);

  const fragments = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      pos: [
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 3 - 1,
      ] as [number, number, number],
      rot: Math.random() * Math.PI,
      scale: 0.04 + Math.random() * 0.08,
      speed: 0.3 + Math.random() * 0.5,
      isDark: i % 2 === 0,
    }));
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((child, i) => {
      const f = fragments[i];
      child.rotation.x += f.speed * 0.01;
      child.rotation.y += f.speed * 0.008;
      child.position.y = f.pos[1] + Math.sin(state.clock.elapsedTime * f.speed + i) * 0.3;
    });
  });

  return (
    <group ref={groupRef}>
      {fragments.map((f, i) => (
        <mesh key={i} position={f.pos} scale={f.scale} rotation={[f.rot, f.rot, 0]}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={f.isDark ? "#0a0a0a" : "#c8c8c8"}
            roughness={0.4}
            metalness={0.7}
            transparent
            opacity={0.4}
          />
        </mesh>
      ))}
    </group>
  );
}

/** The main scene */
function Scene({ scrollProgress }: { scrollProgress: number }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} color="#ffffff" />
      <directionalLight position={[-3, 4, -2]} intensity={0.4} color="#888888" />
      <pointLight position={[0, 3, 2]} intensity={0.6} color="#d4d4d4" distance={10} />

      <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.3}>
        <Humanoid scrollProgress={scrollProgress} />
      </Float>

      <Fragments scrollProgress={scrollProgress} />
    </>
  );
}

const StrideFigure3D = () => {
  const scrollProgress = useScrollProgress();

  return (
    <div
      className="fixed inset-0 z-[1] pointer-events-none"
      aria-hidden="true"
      style={{ opacity: 0.7 }}
    >
      <Canvas
        camera={{ position: [0, 1, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
};

export default StrideFigure3D;
