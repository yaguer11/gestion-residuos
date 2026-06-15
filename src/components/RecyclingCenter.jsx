import React from "react";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

export default function RecyclingCenter({ position }) {
  const logoTexture = useLoader(
    THREE.TextureLoader,
    import.meta.env.BASE_URL + "logoVM.png",
  );

  return (
    <group position={position}>
      <mesh castShadow position={[0, 0.5, 0]}>
        <boxGeometry args={[2, 1, 1.6]} />
        <meshStandardMaterial color="#facc15" roughness={0.6} />
      </mesh>
      <mesh castShadow position={[0, 1.1, 0]}>
        <boxGeometry args={[2.4, 0.3, 1.8]} />
        <meshStandardMaterial color="#0f172a" roughness={0.7} />
      </mesh>
      <mesh castShadow position={[0, 0.3, 0.82]}>
        <boxGeometry args={[0.45, 0.55, 0.06]} />
        <meshStandardMaterial color="#1f2937" roughness={0.7} />
      </mesh>
      {/* Ventana con logo de la municipalidad */}
      <mesh castShadow position={[0.7, 0.7, 0.82]}>
        <boxGeometry args={[0.4, 0.28, 0.05]} />
        <meshStandardMaterial
          attach="material-0"
          color="#1f2937"
          roughness={0.5}
        />
        <meshStandardMaterial
          attach="material-1"
          color="#1f2937"
          roughness={0.5}
        />
        <meshStandardMaterial
          attach="material-2"
          color="#1f2937"
          roughness={0.5}
        />
        <meshStandardMaterial
          attach="material-3"
          color="#1f2937"
          roughness={0.5}
        />
        <meshStandardMaterial
          attach="material-4"
          map={logoTexture}
          roughness={0.4}
        />
        <meshStandardMaterial
          attach="material-5"
          color="#1f2937"
          roughness={0.5}
        />
      </mesh>
    </group>
  );
}
