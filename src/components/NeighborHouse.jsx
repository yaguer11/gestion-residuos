import React, { useMemo } from "react";
import { BufferGeometry, Float32BufferAttribute } from "three";

// Modernized Neighbor house: flat roof, monochrome facade and large window
export default function NeighborHouse({ position, baseColor = "#f3f4f6" }) {
  const roofGeometry = useMemo(() => {
    const width = 1.12;
    const depth = 0.92;
    const heightFront = 0.18;
    const heightBack = 0.06;

    const hw = width / 2;
    const hd = depth / 2;

    // Wedge: higher at front (z+), lower at back (z-), flat bottom.
    const vertices = new Float32Array([
      -hw,
      0,
      -hd,
      hw,
      0,
      -hd,
      hw,
      0,
      hd,
      -hw,
      0,
      hd,
      -hw,
      heightBack,
      -hd,
      hw,
      heightBack,
      -hd,
      hw,
      heightFront,
      hd,
      -hw,
      heightFront,
      hd,
    ]);

    const indices = [
      0, 1, 2, 0, 2, 3, 4, 6, 5, 4, 7, 6, 0, 5, 1, 0, 4, 5, 3, 2, 6, 3, 6, 7, 0,
      3, 7, 0, 7, 4, 1, 5, 6, 1, 6, 2,
    ];

    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new Float32BufferAttribute(vertices, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }, []);

  return (
    <group position={position}>
      {/* Clean monochrome volume */}
      <mesh castShadow position={[0, 0.44, 0]}>
        <boxGeometry args={[1.08, 0.88, 0.86]} />
        <meshStandardMaterial
          color={baseColor}
          roughness={0.75}
          metalness={0}
        />
      </mesh>

      {/* Wedge roof: slope is in the geometry, no rotation needed */}
      <mesh castShadow position={[0, 0.88, 0]} geometry={roofGeometry}>
        <meshStandardMaterial
          color="#0f172a"
          roughness={0.6}
          metalness={0.02}
        />
      </mesh>

      {/* Two smaller windows (same style) with visible light behind */}
      <group position={[-0.32, 0.6, 0.44]}>
        <mesh castShadow position={[0, 0.076, 0]}>
          <boxGeometry args={[0.22, 0.008, 0.006]} />
          <meshStandardMaterial color="#0b0f14" roughness={0.6} />
        </mesh>
        <mesh castShadow position={[0, -0.076, 0]}>
          <boxGeometry args={[0.22, 0.008, 0.006]} />
          <meshStandardMaterial color="#0b0f14" roughness={0.6} />
        </mesh>
        <mesh castShadow position={[-0.106, 0, 0]}>
          <boxGeometry args={[0.008, 0.16, 0.006]} />
          <meshStandardMaterial color="#0b0f14" roughness={0.6} />
        </mesh>
        <mesh castShadow position={[0.106, 0, 0]}>
          <boxGeometry args={[0.008, 0.16, 0.006]} />
          <meshStandardMaterial color="#0b0f14" roughness={0.6} />
        </mesh>
      </group>
      <mesh castShadow position={[-0.32, 0.6, 0.435]}>
        <boxGeometry args={[0.18, 0.12, 0.01]} />
        <meshPhysicalMaterial
          color="#9fb6c8"
          transparent={true}
          opacity={0.6}
          roughness={0.12}
          metalness={0}
          emissive="#ffd7a6"
          emissiveIntensity={1.0}
        />
      </mesh>
      <pointLight
        position={[-0.32, 0.6, 0.38]}
        intensity={0.5}
        distance={1.0}
        color="#ffd7a6"
      />

      <group position={[0.32, 0.6, 0.44]}>
        <mesh castShadow position={[0, 0.076, 0]}>
          <boxGeometry args={[0.22, 0.008, 0.006]} />
          <meshStandardMaterial color="#0b0f14" roughness={0.6} />
        </mesh>
        <mesh castShadow position={[0, -0.076, 0]}>
          <boxGeometry args={[0.22, 0.008, 0.006]} />
          <meshStandardMaterial color="#0b0f14" roughness={0.6} />
        </mesh>
        <mesh castShadow position={[-0.106, 0, 0]}>
          <boxGeometry args={[0.008, 0.16, 0.006]} />
          <meshStandardMaterial color="#0b0f14" roughness={0.6} />
        </mesh>
        <mesh castShadow position={[0.106, 0, 0]}>
          <boxGeometry args={[0.008, 0.16, 0.006]} />
          <meshStandardMaterial color="#0b0f14" roughness={0.6} />
        </mesh>
      </group>
      <mesh castShadow position={[0.32, 0.6, 0.435]}>
        <boxGeometry args={[0.18, 0.12, 0.01]} />
        <meshPhysicalMaterial
          color="#9fb6c8"
          transparent={true}
          opacity={0.6}
          roughness={0.12}
          metalness={0}
          emissive="#ffd7a6"
          emissiveIntensity={1.0}
        />
      </mesh>
      <pointLight
        position={[0.32, 0.6, 0.38]}
        intensity={0.5}
        distance={1.0}
        color="#ffd7a6"
      />

      {/* Simple recessed door (minimal) */}
      <mesh castShadow position={[0, 0.18, 0.435]}>
        <boxGeometry args={[0.22, 0.42, 0.02]} />
        <meshStandardMaterial color="#111827" roughness={0.7} />
      </mesh>
    </group>
  );
}
