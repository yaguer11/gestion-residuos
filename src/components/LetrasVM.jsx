import React from "react";

function MetalMat({ color }) {
  return (
    <meshStandardMaterial color={color} metalness={0.55} roughness={0.18} />
  );
}

export default function LetrasVM({ position }) {
  return (
    <group position={position}>
      {/* Base de cemento */}
      <mesh castShadow position={[0, 0.07, 0]}>
        <boxGeometry args={[2.02, 0.14, 0.52]} />
        <meshStandardMaterial
          color="#a1a1aa"
          metalness={0.1}
          roughness={0.78}
        />
      </mesh>

      {/* ── Letra V (naranja) ── */}
      {/* Brazo izquierdo */}
      <mesh castShadow position={[-0.69, 0.64, 0]} rotation={[0, 0, 0.44]}>
        <boxGeometry args={[0.22, 1.08, 0.38]} />
        <MetalMat color="#f97316" />
      </mesh>
      {/* Brazo derecho */}
      <mesh castShadow position={[-0.23, 0.64, 0]} rotation={[0, 0, -0.44]}>
        <boxGeometry args={[0.22, 1.08, 0.38]} />
        <MetalMat color="#f97316" />
      </mesh>

      {/* ── Palo del corazón ── */}
      <mesh castShadow position={[-0.46, 0.5, 0]}>
        <boxGeometry args={[0.05, 1, 0.05]} />
        <MetalMat color="#f97316" />
      </mesh>

      {/* ── Corazón (rojo) ── */}
      {/* Cuerpo: caja rotada 45° forma el rombo/punta inferior */}
      <mesh
        castShadow
        position={[-0.46, 1.1, 0]}
        rotation={[0, 0, Math.PI / 4]}
      >
        <boxGeometry args={[0.25, 0.25, 0.15]} />
        <MetalMat color="#dc2626" />
      </mesh>

      {/* ── Letra M (amarilla) ── */}
      {/* Barra izquierda */}
      <mesh castShadow position={[0.19, 0.56, 0]}>
        <boxGeometry args={[0.2, 1.0, 0.38]} />
        <MetalMat color="#eab308" />
      </mesh>
      {/* Diagonal izquierda: baja desde la barra izquierda al centro */}
      <mesh castShadow position={[0.36, 0.68, 0]} rotation={[3.14, 0, -0.45]}>
        <boxGeometry args={[0.2, 0.75, 0.38]} />
        <MetalMat color="#eab308" />
      </mesh>
      {/* Diagonal derecha: sube del centro a la barra derecha */}
      <mesh castShadow position={[0.64, 0.68, 0]} rotation={[3.14, 0, 0.45]}>
        <boxGeometry args={[0.2, 0.75, 0.38]} />
        <MetalMat color="#eab308" />
      </mesh>
      {/* Barra derecha */}
      <mesh castShadow position={[0.81, 0.56, 0]}>
        <boxGeometry args={[0.2, 1.0, 0.38]} />
        <MetalMat color="#eab308" />
      </mesh>
    </group>
  );
}
