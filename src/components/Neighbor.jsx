/**
 * components/Neighbor.jsx
 * Representa a un vecino y su posible microbasural.
 *
 * Cada vecino se muestra como:
 *  - Una figura cilíndrica + esfera (silueta humana simple).
 *  - Un cartel flotante con su nombre.
 *  - Un marcador de basura (cubos grises animados) cuando dumpActive = true.
 *
 * Props:
 *  - data: { id, name, x, z, color, houseOffset?, houseRotationY?, figureRotationY?, indicatorOffset?, indicatorRotationZ? }
 *  - dumpActive: boolean
 *  - dumpPos: [x, y, z]
 */
import React, { useEffect, useRef, useState } from "react";
import { Text, Billboard } from "@react-three/drei";
import NeighborHouse from "./NeighborHouse.jsx";
import DumpMarker from "./DumpMarker.jsx";
import NeighborFigure from "./NeighborFigure.jsx";
import NeighborStatusIndicator from "./NeighborStatusIndicator.jsx";

export default function Neighbor({ data, dumpActive, dumpPos }) {
  const isMaria = String(data.name || "").toLowerCase() === "maria";
  const houseOffset = data.houseOffset ?? [-1.1, 0, -0.85];
  const houseRotationY = data.houseRotationY ?? 0;
  const figureRotationY = data.figureRotationY ?? 0;
  const indicatorOffset = data.indicatorOffset ?? [0.4, 0.9, 0];
  const indicatorRotationZ = data.indicatorRotationZ ?? 0;
  const [notified, setNotified] = useState(false);
  const [showDump, setShowDump] = useState(false);
  const notifyTimerRef = useRef(null);

  useEffect(() => {
    if (!dumpActive) {
      setNotified(false);
      setShowDump(false);
      if (notifyTimerRef.current) {
        clearTimeout(notifyTimerRef.current);
        notifyTimerRef.current = null;
      }
      return;
    }

    setNotified(true);
    if (notifyTimerRef.current) {
      clearTimeout(notifyTimerRef.current);
    }
    notifyTimerRef.current = setTimeout(() => {
      setShowDump(true);
      notifyTimerRef.current = null;
    }, 5000);

    return () => {
      if (notifyTimerRef.current) {
        clearTimeout(notifyTimerRef.current);
        notifyTimerRef.current = null;
      }
    };
  }, [dumpActive]);

  return (
    <group position={[data.x, 0, data.z]}>
      {/* Casa al lado del vecino */}
      <group position={houseOffset} rotation={[0, houseRotationY, 0]}>
        <NeighborHouse position={[0, 0, 0]} />
      </group>

      {/* Figura del vecino */}
      <group rotation={[0, figureRotationY, 0]}>
        <NeighborFigure
          color={data.color}
          seed={data.id * 1.37}
          isMaria={isMaria}
        />
      </group>

      {/* Nombre sobre la cabeza */}
      <Billboard position={[0, 1.1, 0]}>
        <Text
          fontSize={0.2}
          color={data.color}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          {data.name}
        </Text>
      </Billboard>

      {/* Indicador de estado (ícono de app) */}
      <NeighborStatusIndicator
        notified={notified}
        position={indicatorOffset}
        rotationZ={indicatorRotationZ}
      />

      {/* Microbasural asociado a este vecino */}
      <DumpMarker
        position={[dumpPos[0] - data.x, 0, dumpPos[2] - data.z]}
        active={showDump}
      />
    </group>
  );
}
