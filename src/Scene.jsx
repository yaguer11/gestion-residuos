/**
 * Scene.jsx
 * Configura el Canvas de react-three/fiber y renderiza todos los
 * elementos 3D: mapa, camión, vecinos y marcadores de basura.
 */
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import NeighborhoodMap from "./components/Map.jsx";
import Truck from "./components/Truck.jsx";
import Neighbor from "./components/Neighbor.jsx";
import RecyclingCenter from "./components/RecyclingCenter.jsx";
import Tree from "./components/Tree.jsx";
import { NEIGHBOR_POSITIONS } from "./App.jsx";

const TREE_POSITIONS = [
  { id: "t1", position: [-4.5, 0, -4.2], scale: 1 },
  { id: "t2", position: [-2.8, 0, -4.3], scale: 0.9 },
  { id: "t3", position: [-4.2, 0, -2.4], scale: 1.1 },
  { id: "t4", position: [4.2, 0, 4.3], scale: 1 },
  { id: "t5", position: [2.6, 0, 4.1], scale: 0.85 },
  { id: "t6", position: [4.4, 0, 2.2], scale: 1.05 },
  { id: "t8", position: [0.6, 0, -3.6], scale: 0.9 },
];

export default function Scene({
  playing,
  speed,
  dumps,
  onClearDump,
  onTruckTick,
}) {
  return (
    <Canvas
      style={{ width: "100%", height: "100%" }}
      camera={{ position: [0, 10, 8], fov: 45 }}
      shadows
    >
      {/* ── Iluminación ── */}
      <ambientLight intensity={1} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-4, 4, -4]} intensity={0.4} color="#a0c4ff" />

      {/* ── Mapa del barrio (plano texturizado) ── */}
      <NeighborhoodMap />

      {/* ── Camión de recolección ── */}
      <Truck
        playing={playing}
        speed={speed}
        dumps={dumps}
        onClearDump={onClearDump}
        onTick={onTruckTick}
      />

      {/* ── Centro de reciclado ── */}
      <RecyclingCenter position={[4.3, 0, -4.2]} />

      {/* ── Vecinos ── */}
      {NEIGHBOR_POSITIONS.map((n) => {
        const dump = dumps.find((d) => d.id === n.id);
        return (
          <Neighbor
            key={n.id}
            data={n}
            dumpActive={dump?.active ?? false}
            dumpPos={dump ? [dump.x, 0, dump.z] : [n.x, 0, n.z]}
          />
        );
      })}

      {/* ── Arboles en cuadrantes vacios ── */}
      {TREE_POSITIONS.map((tree) => (
        <Tree key={tree.id} position={tree.position} scale={tree.scale} />
      ))}

      {/* ── Controles de órbita para rotar/zoom con mouse ── */}
      <OrbitControls
        target={[0, 0, 0]}
        maxPolarAngle={Math.PI / 2.2}
        minDistance={4}
        maxDistance={20}
      />
    </Canvas>
  );
}
