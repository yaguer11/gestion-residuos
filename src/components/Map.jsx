/**
 * components/Map.jsx
 * Renderiza el "mapa" del barrio como un plano 3D con una textura
 * procedural (canvas 2D) que dibuja calles, manzanas y etiquetas.
 *
 * Para reemplazar con un PNG real:
 *   1. Coloca el archivo en /src/assets/mapa.png
 *   2. Importa: import mapaUrl from '../assets/mapa.png'
 *   3. Usa: const texture = useLoader(TextureLoader, mapaUrl)
 */
import React, { useMemo } from "react";
import * as THREE from "three";

const MAP_SIZE = 1024;
const WORLD_MIN = -6;
const WORLD_MAX = 6;
const X_ROAD_WIDTHS = [0.85, 0.6, 0.6, 0.6, 0.55];
const Y_ROAD_WIDTHS = [0.64, 0.64, 0.64, 0.64, 0.64];
const BLOCK_SIZE = 2.2;

function buildAxisLayout(roadWidths) {
  const roadCenters = [];
  const blockStarts = [];
  let cursor = WORLD_MIN;

  roadWidths.forEach((roadWidth, index) => {
    roadCenters.push(cursor + roadWidth / 2);
    cursor += roadWidth;

    if (index < roadWidths.length - 1) {
      blockStarts.push(cursor);
      cursor += BLOCK_SIZE;
    }
  });

  return { roadCenters, blockStarts };
}

// ── Genera la textura del mapa con canvas 2D ──────────────────────────────────
function buildMapTexture() {
  const size = MAP_SIZE;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  const scale = size / (WORLD_MAX - WORLD_MIN);
  const toPx = (value) => (value - WORLD_MIN) * scale;
  const xLayout = buildAxisLayout(X_ROAD_WIDTHS);
  const yLayout = buildAxisLayout(Y_ROAD_WIDTHS);

  // Fondo base: calles exteriores e interiores.
  ctx.fillStyle = "#2e2924";
  ctx.fillRect(0, 0, size, size);

  // Manzanas iguales en una grilla 4x4, separadas por calles del mismo ancho.
  ctx.fillStyle = "#24472a";
  ctx.strokeStyle = "#3d6b3d";
  ctx.lineWidth = 2;
  for (let row = 0; row < 4; row += 1) {
    for (let col = 0; col < 4; col += 1) {
      const px = toPx(xLayout.blockStarts[col]);
      const py = toPx(yLayout.blockStarts[row]);
      const blockPx = BLOCK_SIZE * scale;

      ctx.fillRect(px, py, blockPx, blockPx);
      ctx.strokeRect(px, py, blockPx, blockPx);
    }
  }

  // Líneas de carril: la avenida lateral izquierda es doble mano y la derecha,
  // más angosta, se dibuja como un único sentido.
  ctx.setLineDash([30, 20]);
  ctx.strokeStyle = "#f7d772";
  ctx.lineWidth = 3;
  yLayout.roadCenters.forEach((center) => {
    ctx.beginPath();
    ctx.moveTo(0, toPx(center));
    ctx.lineTo(size, toPx(center));
    ctx.stroke();
  });
  xLayout.roadCenters.forEach((center, index) => {
    if (index === 0) {
      const offsets = [-0.14, 0.14];
      offsets.forEach((offset) => {
        ctx.beginPath();
        ctx.moveTo(toPx(center + offset), 0);
        ctx.lineTo(toPx(center + offset), size);
        ctx.stroke();
      });
      return;
    }

    ctx.beginPath();
    ctx.moveTo(toPx(center), 0);
    ctx.lineTo(toPx(center), size);
    ctx.stroke();
  });
  ctx.setLineDash([]);

  ctx.fillStyle = "rgba(0, 0, 0, 0.18)";
  ctx.fillRect(toPx(xLayout.roadCenters[0] - 0.03), 0, 6, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export default function NeighborhoodMap() {
  // useMemo evita recrear la textura en cada frame
  const texture = useMemo(() => buildMapTexture(), []);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
      {/* El plano cubre de -6 a +6 en X y Z (12 unidades = 1 unidad ≈ 1 cuadra) */}
      <planeGeometry args={[12, 12]} />
      <meshStandardMaterial map={texture} roughness={0.8} />
    </mesh>
  );
}
