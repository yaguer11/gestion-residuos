import React from "react";
import { Text, Billboard, RoundedBox } from "@react-three/drei";

export default function NeighborStatusIndicator({
  notified,
  position = [0.4, 0.9, 0],
  rotationZ = 0,
}) {
  return (
    <Billboard position={position}>
      <group rotation={[0, 0, rotationZ]}>
        <RoundedBox args={[0.3, 0.42, 0.05]} radius={0.04} smoothness={4}>
          <meshStandardMaterial color="#e5e7eb" roughness={0.35} />
        </RoundedBox>
        <RoundedBox
          args={[0.23, 0.34, 0.03]}
          radius={0.02}
          smoothness={4}
          position={[0, 0, 0.03]}
        >
          <meshStandardMaterial
            color={notified ? "#22c55e" : "#111827"}
            roughness={0.4}
          />
        </RoundedBox>
        <RoundedBox
          args={[0.08, 0.015, 0.01]}
          radius={0.006}
          smoothness={4}
          position={[0, 0.17, 0.045]}
        >
          <meshStandardMaterial color="#111827" roughness={0.6} />
        </RoundedBox>
        <mesh position={[0, -0.17, 0.045]}>
          <circleGeometry args={[0.02, 16]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.4} />
        </mesh>
        {notified && (
          <Text
            position={[0, 0, 0.06]}
            fontSize={0.16}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            ✓
          </Text>
        )}
      </group>
    </Billboard>
  );
}
