import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function NeighborFigure({ color, seed, isMaria }) {
  const torsoRef = useRef();
  const headRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();
  const leftLegRef = useRef();
  const rightLegRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const sway = Math.sin(t * 0.9 + seed) * 0.012;
    const bob = Math.sin(t * 1.2 + seed) * 0.008;
    const armSwing = Math.sin(t * 1.1 + seed) * 0.03;
    const headTurn = Math.sin(t * 0.7 + seed) * 0.03;

    if (torsoRef.current) {
      torsoRef.current.rotation.z = sway;
      torsoRef.current.position.y = 0.15 + bob;
    }
    if (headRef.current) {
      headRef.current.rotation.z = sway * 0.45;
      headRef.current.rotation.y = headTurn;
      headRef.current.position.y = 0.85 + bob;
    }
    if (leftArmRef.current) {
      leftArmRef.current.rotation.x = -0.12 + armSwing;
    }
    if (rightArmRef.current) {
      rightArmRef.current.rotation.x = -0.12 - armSwing;
    }
    if (leftLegRef.current) {
      leftLegRef.current.rotation.x = 0.05;
    }
    if (rightLegRef.current) {
      rightLegRef.current.rotation.x = 0.05;
    }
  });

  return (
    <group>
      <group ref={leftLegRef} position={[-0.1, 0.3, 0]} rotation={[0.01, 0, 0]}>
        <mesh castShadow position={[0, -0.25, 0]}>
          <cylinderGeometry args={[0.06, 0.07, 0.5, 6]} />
          <meshStandardMaterial color="#334155" roughness={0.7} />
        </mesh>
        <mesh castShadow position={[0, -0.515, 0.04]}>
          <boxGeometry args={[0.12, 0.51, 0.2]} />
          <meshStandardMaterial color="#111827" roughness={0.8} />
        </mesh>
        <mesh castShadow position={[0, -0.52, 0.12]}>
          <boxGeometry args={[0.12, 0.51, 0.15]} />
          <meshStandardMaterial color="#30353c" roughness={0.6} />
        </mesh>
        <mesh castShadow position={[0, -0.56, 0.065]}>
          <boxGeometry args={[0.125, 0.54, 0.26]} />
          <meshStandardMaterial color="#e5e7eb" roughness={0.5} />
        </mesh>
      </group>

      <group ref={rightLegRef} position={[0.1, 0.3, 0]} rotation={[0.01, 0, 0]}>
        <mesh castShadow position={[0, -0.25, 0]}>
          <cylinderGeometry args={[0.06, 0.07, 0.5, 6]} />
          <meshStandardMaterial color="#334155" roughness={0.7} />
        </mesh>
        <mesh castShadow position={[0, -0.515, 0.04]}>
          <boxGeometry args={[0.12, 0.51, 0.2]} />
          <meshStandardMaterial color="#111827" roughness={0.8} />
        </mesh>
        <mesh castShadow position={[0, -0.52, 0.12]}>
          <boxGeometry args={[0.12, 0.51, 0.15]} />
          <meshStandardMaterial color="#30353c" roughness={0.6} />
        </mesh>
        <mesh castShadow position={[0, -0.56, 0.065]}>
          <boxGeometry args={[0.125, 0.54, 0.26]} />
          <meshStandardMaterial color="#e5e7eb" roughness={0.5} />
        </mesh>
      </group>

      <group ref={torsoRef}>
        <mesh castShadow position={[0, 0.32, 0]}>
          <cylinderGeometry args={[0.16, 0.19, 0.44, 10]} />
          <meshStandardMaterial color={color} roughness={0.5} />
        </mesh>
        <mesh castShadow position={[0, 0.32, 0.11]}>
          <boxGeometry args={[0.16, 0.24, 0.06]} />
          <meshStandardMaterial color="#e5e7eb" roughness={0.6} />
        </mesh>
      </group>

      <group
        ref={leftArmRef}
        position={[-0.18, 0.6, 0]}
        rotation={[0, 0, -0.2]}
      >
        <mesh castShadow position={[0, -0.12, 0]}>
          <cylinderGeometry args={[0.045, 0.05, 0.24, 8]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.6} />
        </mesh>
        <mesh castShadow position={[0, -0.26, 0.02]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#fcd9b0" roughness={0.6} />
        </mesh>
      </group>

      <group ref={rightArmRef} position={[0.18, 0.6, 0]} rotation={[0, 0, 0.2]}>
        <mesh castShadow position={[0, -0.12, 0]}>
          <cylinderGeometry args={[0.045, 0.05, 0.24, 8]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.6} />
        </mesh>
        <mesh castShadow position={[0, -0.26, 0.02]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#fcd9b0" roughness={0.6} />
        </mesh>
      </group>

      <group ref={headRef} position={[0, 0.86, 0]}>
        <mesh castShadow position={[0, 0, 0]}>
          <sphereGeometry args={[0.16, 14, 14]} />
          <meshStandardMaterial color="#fcd9b0" roughness={0.6} />
        </mesh>
        <mesh castShadow position={[-0.05, 0.02, 0.14]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshStandardMaterial color="#111827" roughness={0.4} />
        </mesh>
        <mesh castShadow position={[0.05, 0.02, 0.14]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshStandardMaterial color="#111827" roughness={0.4} />
        </mesh>
        <mesh
          castShadow
          position={[-0.05, 0.055, 0.135]}
          rotation={[0, 0, 0.2]}
        >
          <boxGeometry args={[0.04, 0.008, 0.008]} />
          <meshStandardMaterial color="#111827" roughness={0.4} />
        </mesh>
        <mesh
          castShadow
          position={[0.05, 0.055, 0.135]}
          rotation={[0, 0, -0.2]}
        >
          <boxGeometry args={[0.04, 0.008, 0.008]} />
          <meshStandardMaterial color="#111827" roughness={0.4} />
        </mesh>
        <mesh
          castShadow
          position={[0, -0.005, 0.155]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <coneGeometry args={[0.018, 0.055, 8]} />
          <meshStandardMaterial color="#d7b18a" roughness={0.6} />
        </mesh>
        <mesh
          castShadow
          position={[0, -0.05, 0.145]}
          rotation={[Math.PI, 0, 0]}
        >
          <torusGeometry args={[0.045, 0.008, 8, 24, Math.PI]} />
          <meshStandardMaterial color="#111827" roughness={0.4} />
        </mesh>
        <mesh castShadow position={[0, 0.06, -0.02]}>
          <sphereGeometry args={[0.12, 12, 12]} />
          <meshStandardMaterial color="#3f2d1f" roughness={0.9} />
        </mesh>
        {isMaria && (
          <group>
            <mesh castShadow position={[0, 0.02, -0.08]}>
              <sphereGeometry args={[0.13, 12, 12]} />
              <meshStandardMaterial color="#3f2d1f" roughness={0.9} />
            </mesh>
            <mesh castShadow position={[0, -0.02, -0.12]}>
              <sphereGeometry args={[0.11, 12, 12]} />
              <meshStandardMaterial color="#3f2d1f" roughness={0.9} />
            </mesh>
            <mesh castShadow position={[0, 0.085, 0.03]}>
              <sphereGeometry args={[0.1, 12, 12]} />
              <meshStandardMaterial color="#3f2d1f" roughness={0.9} />
            </mesh>
          </group>
        )}
      </group>
    </group>
  );
}
