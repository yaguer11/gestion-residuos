import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Billboard, RoundedBox } from "@react-three/drei";

export default function DumpMarker({ position, active }) {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    const scale = active ? 1 + Math.sin(t * 3) * 0.08 : 0;
    groupRef.current.scale.setScalar(scale);
  });

  if (!active) return null;

  return (
    <group ref={groupRef} position={position}>
      <RoundedBox
        args={[0.22, 0.22, 0.22]}
        radius={0.05}
        smoothness={4}
        castShadow
        position={[0, 0.12, 0]}
      >
        <meshStandardMaterial color="#facc15" roughness={0.8} />
      </RoundedBox>
      <RoundedBox
        args={[0.16, 0.16, 0.16]}
        radius={0.04}
        smoothness={4}
        castShadow
        position={[0.14, 0.08, 0.05]}
      >
        <meshStandardMaterial color="#eab308" roughness={0.8} />
      </RoundedBox>
      <RoundedBox
        args={[0.14, 0.14, 0.14]}
        radius={0.035}
        smoothness={4}
        castShadow
        position={[-0.1, 0.06, -0.05]}
      >
        <meshStandardMaterial color="#f59e0b" roughness={0.8} />
      </RoundedBox>
      <Billboard position={[0, 0.45, 0]}>
        <Text
          fontSize={0.16}
          color="#fbbf24"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          ⚠️ Basura
        </Text>
      </Billboard>
    </group>
  );
}
