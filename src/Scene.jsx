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
import { NEIGHBOR_POSITIONS } from "./App.jsx";

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
