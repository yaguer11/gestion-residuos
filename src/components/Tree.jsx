import React from "react";

export default function Tree({ position, scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      <mesh castShadow position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 0.6, 8]} />
        <meshStandardMaterial color="#7c4a1f" roughness={0.8} />
      </mesh>
      <mesh castShadow position={[0, 0.8, 0]}>
        <sphereGeometry args={[0.28, 12, 12]} />
        <meshStandardMaterial color="#2f7d32" roughness={0.7} />
      </mesh>
    </group>
  );
}
