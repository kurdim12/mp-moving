import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
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

/**
 * A single body part that lerps from a scattered origin to its assembled position.
 * `assembleAt` is 0-1 within the assembly phase for staggered arrival.
 */
function BodyPart({
  children,
  assembledPos,
  scatteredPos,
  assembleProgress,
  assembleAt = 0,
  groupRef,
}: {
  children: React.ReactNode;
  assembledPos: [number, number, number];
  scatteredPos: [number, number, number];
  assembleProgress: number;
  assembleAt?: number;
  groupRef?: React.Ref<THREE.Group>;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame(() => {
    const g = (groupRef as any)?.current ?? ref.current;
    if (!g) return;
    // Staggered assembly: each part starts assembling at its `assembleAt` offset
    const partProgress = THREE.MathUtils.clamp((assembleProgress - assembleAt) / (1 - assembleAt), 0, 1);
    // Smooth easing
    const t = partProgress * partProgress * (3 - 2 * partProgress);
    g.position.x = THREE.MathUtils.lerp(scatteredPos[0], assembledPos[0], t);
    g.position.y = THREE.MathUtils.lerp(scatteredPos[1], assembledPos[1], t);
    g.position.z = THREE.MathUtils.lerp(scatteredPos[2], assembledPos[2], t);
    // Spin while scattered, settle when assembled
    if (!groupRef) {
      g.rotation.x = (1 - t) * scatteredPos[0] * 2;
      g.rotation.z = (1 - t) * scatteredPos[1] * 1.5;
    }
  });

  return <group ref={groupRef ?? ref}>{children}</group>;
}

/** Abstract humanoid built from geometric primitives */
function Humanoid({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Group>(null);
  const rightLegRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const headMeshRef = useRef<THREE.Mesh>(null);

  // Assembly happens in first 25% of scroll, walking in remaining 75%
  const assembleProgress = THREE.MathUtils.clamp(scrollProgress / 0.25, 0, 1);
  const walkProgress = THREE.MathUtils.clamp((scrollProgress - 0.25) / 0.75, 0, 1);
  const isAssembled = assembleProgress >= 1;

  useFrame(() => {
    if (!groupRef.current) return;

    // Move figure across screen only after assembled
    const xPos = THREE.MathUtils.lerp(-6, 6, walkProgress);
    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x, xPos, 0.05
    );

    // Subtle lean
    groupRef.current.rotation.z = isAssembled
      ? Math.sin(walkProgress * Math.PI * 8) * 0.03
      : 0;

    // Walking swing (only after assembled)
    const walkCycle = walkProgress * Math.PI * 16;
    const swingAmount = isAssembled ? 0.5 : 0;

    if (leftArmRef.current) leftArmRef.current.rotation.x = Math.sin(walkCycle) * swingAmount;
    if (rightArmRef.current) rightArmRef.current.rotation.x = -Math.sin(walkCycle) * swingAmount;
    if (leftLegRef.current) leftLegRef.current.rotation.x = -Math.sin(walkCycle) * swingAmount * 0.8;
    if (rightLegRef.current) rightLegRef.current.rotation.x = Math.sin(walkCycle) * swingAmount * 0.8;

    if (headMeshRef.current) {
      headMeshRef.current.position.y = isAssembled
        ? Math.abs(Math.sin(walkCycle * 2)) * 0.08
        : 0;
    }
  });

  const darkMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: new THREE.Color(0x0a0a0a), roughness: 0.3, metalness: 0.8 }),
    []
  );
  const lightMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: new THREE.Color(0xd4d4d4), roughness: 0.2, metalness: 0.6, emissive: new THREE.Color(0x222222), emissiveIntensity: 0.3 }),
    []
  );
  const wireMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: new THREE.Color(0x1a1a1a), wireframe: true, transparent: true, opacity: 0.3 }),
    []
  );

  return (
    <group ref={groupRef} position={[-6, -1.5, 0]} scale={0.85}>
      {/* Head */}
      <BodyPart
        assembledPos={[0, 2.6, 0]}
        scatteredPos={[2.5, 5, -3]}
        assembleProgress={assembleProgress}
        assembleAt={0.1}
        groupRef={headRef}
      >
        <mesh ref={headMeshRef}>
          <icosahedronGeometry args={[0.38, 2]} />
          <primitive object={lightMat} attach="material" />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[0.42, 1]} />
          <primitive object={wireMat} attach="material" />
        </mesh>
      </BodyPart>

      {/* Torso */}
      <BodyPart
        assembledPos={[0, 1.4, 0]}
        scatteredPos={[-1.5, 4, 2]}
        assembleProgress={assembleProgress}
        assembleAt={0}
      >
        <mesh scale={[0.5, 1.1, 0.35]}>
          <octahedronGeometry args={[0.8, 0]} />
          <primitive object={darkMat} attach="material" />
        </mesh>
        <mesh scale={[0.55, 1.15, 0.4]}>
          <octahedronGeometry args={[0.8, 0]} />
          <primitive object={wireMat} attach="material" />
        </mesh>
      </BodyPart>

      {/* Left Arm */}
      <BodyPart
        assembledPos={[-0.55, 2.0, 0]}
        scatteredPos={[-4, 3.5, -2]}
        assembleProgress={assembleProgress}
        assembleAt={0.3}
        groupRef={leftArmRef}
      >
        <mesh position={[0, -0.5, 0]} scale={[0.12, 0.55, 0.12]}>
          <cylinderGeometry args={[1, 0.7, 1, 6]} />
          <primitive object={lightMat} attach="material" />
        </mesh>
        <mesh position={[-0.05, -1.0, 0]} scale={[0.1, 0.45, 0.1]}>
          <cylinderGeometry args={[0.7, 0.5, 1, 6]} />
          <primitive object={darkMat} attach="material" />
        </mesh>
      </BodyPart>

      {/* Right Arm */}
      <BodyPart
        assembledPos={[0.55, 2.0, 0]}
        scatteredPos={[4, 2, 1.5]}
        assembleProgress={assembleProgress}
        assembleAt={0.35}
        groupRef={rightArmRef}
      >
        <mesh position={[0, -0.5, 0]} scale={[0.12, 0.55, 0.12]}>
          <cylinderGeometry args={[1, 0.7, 1, 6]} />
          <primitive object={darkMat} attach="material" />
        </mesh>
        <mesh position={[0.05, -1.0, 0]} scale={[0.1, 0.45, 0.1]}>
          <cylinderGeometry args={[0.7, 0.5, 1, 6]} />
          <primitive object={lightMat} attach="material" />
        </mesh>
      </BodyPart>

      {/* Left Leg */}
      <BodyPart
        assembledPos={[-0.22, 0.4, 0]}
        scatteredPos={[-3, -2, -2.5]}
        assembleProgress={assembleProgress}
        assembleAt={0.2}
        groupRef={leftLegRef}
      >
        <mesh position={[0, -0.5, 0]} scale={[0.14, 0.6, 0.14]}>
          <cylinderGeometry args={[1, 0.8, 1, 6]} />
          <primitive object={darkMat} attach="material" />
        </mesh>
        <mesh position={[0, -1.1, 0]} scale={[0.12, 0.5, 0.12]}>
          <cylinderGeometry args={[0.8, 0.6, 1, 6]} />
          <primitive object={lightMat} attach="material" />
        </mesh>
        <mesh position={[0, -1.5, 0.1]} scale={[0.13, 0.06, 0.22]}>
          <boxGeometry args={[1, 1, 1]} />
          <primitive object={darkMat} attach="material" />
        </mesh>
      </BodyPart>

      {/* Right Leg */}
      <BodyPart
        assembledPos={[0.22, 0.4, 0]}
        scatteredPos={[3.5, -1.5, 2]}
        assembleProgress={assembleProgress}
        assembleAt={0.25}
        groupRef={rightLegRef}
      >
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
      </BodyPart>
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
