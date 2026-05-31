/**
 * components/Truck.jsx
 * Representa el camión de recolección de residuos.
 *
 * Lógica principal:
 *  - Sigue una ruta definida como array de puntos [x, 0, z].
 *  - Se mueve con interpolación lineal (lerp) entre puntos sucesivos.
 *  - Al pasar cerca de un basural (distancia < PICKUP_RADIUS), lo elimina.
 *  - Emite un tick de tiempo cada frame (para métricas).
 *
 * Para modificar la ruta: edita el array ROUTE_POINTS.
 */
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ── Ruta del camión: puntos en el plano XZ ────────────────────────────────────
// El camión recorre estos puntos en orden y vuelve al inicio (loop).
// Coordenadas en unidades del plano (-6 a +6).
const WEST_ROAD_X = -5.575;
const EAST_ROAD_X = 5.725;
const ROAD_ZS = [-5.68, -2.84, -0.0, 2.84, 5.68];

const ROUTE_POINTS = [
  [WEST_ROAD_X, 0, ROAD_ZS[0]],
  [EAST_ROAD_X, 0, ROAD_ZS[0]],
  [EAST_ROAD_X, 0, ROAD_ZS[1]],
  [WEST_ROAD_X, 0, ROAD_ZS[1]],
  [WEST_ROAD_X, 0, ROAD_ZS[2]],
  [EAST_ROAD_X, 0, ROAD_ZS[2]],
  [EAST_ROAD_X, 0, ROAD_ZS[3]],
  [WEST_ROAD_X, 0, ROAD_ZS[3]],
  [WEST_ROAD_X, 0, ROAD_ZS[4]],
  [EAST_ROAD_X, 0, ROAD_ZS[4]],
  [EAST_ROAD_X, 0, ROAD_ZS[4]],
  [WEST_ROAD_X, 0, ROAD_ZS[4]],
  [WEST_ROAD_X, 0, ROAD_ZS[0]], // cierre del loop
];

// El modelo del camión está construido apuntando en eje X, no en eje Z.
// Este offset lo alinea con la dirección de viaje calculada sobre la ruta.
const TRUCK_HEADING_OFFSET = Math.PI / 2;

// Radio de captura: si el camión pasa a menos de esta distancia de un basural, lo recoge
const PICKUP_RADIUS = 1.2;

// ── Componente de la carrocería del camión (geometría compuesta) ───────────────
function TruckMesh() {
  const wheelPositions = [
    [-0.6, -0.08, 0.32],
    [-0.6, -0.08, -0.32],
    [0.55, -0.08, 0.32],
    [0.55, -0.08, -0.32],
  ];

  return (
    <group>
      {/* Cabina */}
      <mesh castShadow position={[-0.55, 0.28, 0]}>
        <boxGeometry args={[0.6, 0.55, 0.55]} />
        <meshStandardMaterial color="#f59e0b" roughness={0.4} metalness={0.3} />
      </mesh>
      {/* Techo de cabina */}
      <mesh castShadow position={[-0.55, 0.58, 0]}>
        <boxGeometry args={[0.52, 0.08, 0.5]} />
        <meshStandardMaterial color="#c36213" roughness={0.4} metalness={0.2} />
      </mesh>
      {/* Ventana lateral */}
      <mesh position={[-0.6, 0.36, 0.25]}>
        <boxGeometry args={[0.04, 0.22, 0.18]} />
        <meshStandardMaterial color="#93c5fd" transparent opacity={0.7} />
      </mesh>
      {/* Parabrisas */}
      <mesh position={[-0.28, 0.36, 0]}>
        <boxGeometry args={[0.05, 0.25, 0.46]} />
        <meshStandardMaterial color="#7dd3fc" transparent opacity={0.7} />
      </mesh>
      {/* Paragolpes frontal */}
      <mesh castShadow position={[-0.86, 0.12, 0]}>
        <boxGeometry args={[0.12, 0.2, 0.52]} />
        <meshStandardMaterial color="#374151" roughness={0.7} />
      </mesh>
      {/* Faro frontal */}
      <mesh position={[-0.92, 0.26, 0.18]}>
        <boxGeometry args={[0.04, 0.08, 0.08]} />
        <meshStandardMaterial color="#fde68a" roughness={0.4} />
      </mesh>
      <mesh position={[-0.92, 0.26, -0.18]}>
        <boxGeometry args={[0.04, 0.08, 0.08]} />
        <meshStandardMaterial color="#fde68a" roughness={0.4} />
      </mesh>
      {/* Espejo lateral */}
      <mesh castShadow position={[-0.8, 0.42, 0.32]}>
        <boxGeometry args={[0.06, 0.1, 0.04]} />
        <meshStandardMaterial color="#1f2937" roughness={0.6} />
      </mesh>
      <mesh castShadow position={[-0.8, 0.42, -0.32]}>
        <boxGeometry args={[0.06, 0.1, 0.04]} />
        <meshStandardMaterial color="#1f2937" roughness={0.6} />
      </mesh>
      {/* Caja de carga */}
      <mesh castShadow position={[0.3, 0.22, 0]}>
        <boxGeometry args={[1.2, 0.42, 0.6]} />
        <meshStandardMaterial color="#f9cb16" roughness={0.6} />
      </mesh>
      {/* Paneles laterales */}
      {[0.0, 0.35, 0.7].map((xPos) => (
        <mesh key={xPos} castShadow position={[xPos, 0.3, 0.31]}>
          <boxGeometry args={[0.26, 0.18, 0.04]} />
          <meshStandardMaterial color="#ea580c" roughness={0.6} />
        </mesh>
      ))}
      {/* Tapa trasera */}
      <mesh position={[0.91, 0.22, 0]}>
        <boxGeometry args={[0.05, 0.42, 0.6]} />
        <meshStandardMaterial color="#ea580c" />
      </mesh>
      {/* Luces traseras */}
      <mesh position={[0.95, 0.16, 0.25]}>
        <boxGeometry args={[0.03, 0.08, 0.1]} />
        <meshStandardMaterial color="#f87171" roughness={0.4} />
      </mesh>
      <mesh position={[0.95, 0.16, -0.25]}>
        <boxGeometry args={[0.03, 0.08, 0.1]} />
        <meshStandardMaterial color="#f87171" roughness={0.4} />
      </mesh>
      {/* Chasis */}
      <mesh castShadow position={[0.1, 0.04, 0]}>
        <boxGeometry args={[1.7, 0.12, 0.7]} />
        <meshStandardMaterial color="#1f2937" roughness={0.8} />
      </mesh>
      {/* Ruedas */}
      {wheelPositions.map((pos, i) => (
        <group key={i} position={pos} rotation={[Math.PI / 2, 0, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.22, 0.22, 0.14, 14]} />
            <meshStandardMaterial color="#1c1917" roughness={0.9} />
          </mesh>
          <mesh position={[0, 0, 0.08]}>
            <cylinderGeometry args={[0.12, 0.12, 0.04, 12]} />
            <meshStandardMaterial color="#6b7280" roughness={0.6} />
          </mesh>
        </group>
      ))}
      {/* Luz delantera */}
      <pointLight
        position={[-0.9, 0.3, 0]}
        intensity={0.8}
        color="#fef9c3"
        distance={3}
      />
      {/* Baliza superior */}
      <mesh position={[-0.7, 0.64, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.06, 12]} />
        <meshStandardMaterial
          color="#f59e0b"
          roughness={0.3}
          emissive="#f59e0b"
          emissiveIntensity={0.6}
        />
      </mesh>
    </group>
  );
}

export default function Truck({ playing, speed, dumps, onClearDump, onTick }) {
  const groupRef = useRef();
  const segmentRef = useRef(0); // índice del segmento actual en ROUTE_POINTS
  const progressRef = useRef(0); // progreso 0-1 dentro del segmento actual

  // Vectores reutilizables (evita allocations en cada frame)
  const fromVec = useRef(new THREE.Vector3());
  const toVec = useRef(new THREE.Vector3());
  const posVec = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    if (!playing || !groupRef.current) return;

    // ── Notificar tiempo transcurrido para métricas ──────────────────────────
    onTick(delta);

    // ── Calcular posición interpolada ────────────────────────────────────────
    const segments = ROUTE_POINTS.length - 1;
    const seg = segmentRef.current;
    const from = ROUTE_POINTS[seg];
    const to = ROUTE_POINTS[seg + 1] || ROUTE_POINTS[0];

    fromVec.current.set(...from);
    toVec.current.set(...to);

    // Avanzar progreso según velocidad y longitud del segmento
    const segLen = fromVec.current.distanceTo(toVec.current);
    const step = (delta * speed * 1.5) / Math.max(segLen, 0.001);
    progressRef.current = Math.min(progressRef.current + step, 1);

    // Interpolación lineal entre puntos
    posVec.current.lerpVectors(
      fromVec.current,
      toVec.current,
      progressRef.current,
    );
    groupRef.current.position.copy(posVec.current);
    groupRef.current.position.y = 0.18; // elevar sobre el suelo

    // ── Orientación: el camión mira hacia el siguiente punto ─────────────────
    const dir = toVec.current.clone().sub(fromVec.current);
    if (dir.length() > 0.001) {
      const angle = Math.atan2(dir.x, dir.z);
      groupRef.current.rotation.y = angle + TRUCK_HEADING_OFFSET;
    }

    // ── Avanzar al siguiente segmento cuando se completa el actual ───────────
    if (progressRef.current >= 1) {
      progressRef.current = 0;
      segmentRef.current = (seg + 1) % segments;
    }

    // ── Verificar recogida de basurales ──────────────────────────────────────
    dumps.forEach((dump) => {
      if (!dump.active) return;
      const dumpVec = new THREE.Vector3(dump.x, 0, dump.z);
      if (posVec.current.distanceTo(dumpVec) < PICKUP_RADIUS) {
        onClearDump(dump.id);
      }
    });
  });

  return (
    <group
      ref={groupRef}
      position={[ROUTE_POINTS[0][0], 0.18, ROUTE_POINTS[0][2]]}
      rotation={[0, TRUCK_HEADING_OFFSET, 0]}
    >
      <TruckMesh />
    </group>
  );
}
