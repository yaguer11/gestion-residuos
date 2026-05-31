# SimBarrio – Simulación de Gestión de Residuos Urbanos

Demo interactiva 3D para ilustrar cómo una aplicación de alertas mejora la sincronización entre vecinos y el servicio municipal de recolección de residuos.

**Desarrollada para:** Presentación de investigación · Villa Mercedes, San Luis, Argentina.

---

## Requisitos

| Herramienta | Versión mínima |
|-------------|---------------|
| Node.js     | 18.x o superior |
| npm         | 9.x o superior  |

---

## Instalación y ejecución

```bash
# 1. Entrar a la carpeta del proyecto
cd waste-sim

# 2. Instalar dependencias (primera vez)
npm install

# 3. Iniciar servidor de desarrollo
npm run dev
```

Abrir el navegador en `http://localhost:5173`

Para generar la versión de producción:
```bash
npm run build
npm run preview   # para verificar el build
```

---

## Estructura del proyecto

```
waste-sim/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx          ← Punto de entrada React
    ├── App.jsx           ← Estado global y composición
    ├── Scene.jsx         ← Canvas Three.js / react-three/fiber
    ├── components/
    │   ├── Map.jsx       ← Mapa del barrio (textura procedural)
    │   ├── Truck.jsx     ← Camión con ruta y lógica de recogida
    │   └── Neighbor.jsx  ← Vecinos y marcadores de basurales
    └── ui/
        └── ControlPanel.jsx  ← Panel de control (Play/Pause, métricas, alertas)
```

---

## Cómo modificar la simulación

### Cambiar la ruta del camión
Edita el array `ROUTE_POINTS` en `src/components/Truck.jsx`:
```js
const ROUTE_POINTS = [
  [-5, 0, -4],   // punto inicial
  [ 0, 0, -4],   // esquina calle horizontal
  // ... agrega o modifica puntos [x, 0, z]
]
```
El plano tiene coordenadas de **-6 a +6** en ambos ejes.

### Cambiar posiciones de los vecinos
Edita `NEIGHBOR_POSITIONS` en `src/App.jsx`:
```js
export const NEIGHBOR_POSITIONS = [
  { id: 1, name: 'Vecino A', x: -3.5, z: -1.5, color: '#4ade80' },
  { id: 2, name: 'Vecino B', x:  2.8, z:  1.8, color: '#60a5fa' },
]
```

### Agregar un tercer vecino
1. Agrega una entrada en `NEIGHBOR_POSITIONS`.
2. En `ControlPanel.jsx`, agrega el botón correspondiente en el array del mapa de vecinos.

### Cambiar radio de captura del camión
En `Truck.jsx`:
```js
const PICKUP_RADIUS = 1.2   // unidades del plano
```

### Usar un PNG real como mapa
En `Map.jsx`, reemplaza la función `buildMapTexture()` por:
```js
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import mapaUrl from '../assets/mapa.png'

export default function NeighborhoodMap() {
  const texture = useLoader(TextureLoader, mapaUrl)
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[12, 12]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  )
}
```

---

## Descripción de la demo (narrativa para presentación)

### Escenario "Sin app" (problema)
> El camión sale a las 7:00. Los vecinos no saben a qué hora llega a su cuadra. Algunos sacan la basura a las 5:00 (muy temprano) y el viento la dispersa. Otros la sacan a las 9:00 y el camión ya pasó. **Resultado: microbasurales, calles sucias, vectores sanitarios.**

### Escenario "Con app" (solución)
> La app municipal envía una notificación push cuando el camión está a ~2 minutos. El vecino saca la basura en el momento justo. El camión la recoge y sigue su ruta. **Resultado: 0 basurales activos, 100% calles limpias.**

---

## Cómo grabar la demo (60–90 segundos)

### Herramientas recomendadas
- **OBS Studio** (gratuito, Windows/Mac/Linux): https://obsproject.com
- **Loom** (grabación rápida con narración): https://www.loom.com
- **ShareX** (Windows, ligero): https://getsharex.com

### Guion sugerido (90 s)

| Tiempo | Acción |
|--------|--------|
| 0–10 s | Mostrar la escena inicial: mapa, vecinos, camión detenido. Narrar el problema. |
| 10–15 s | Presionar **Play**. El camión empieza a moverse. |
| 15–25 s | Sin notificaciones: los vecinos no sacan la basura. Mostrar métricas (calles limpias 100%, basurales 0). |
| 25–35 s | Hacer clic en "Notificar a Vecino A": aparece el basural ⚠️. |
| 35–45 s | El camión se acerca al basural → el marcador desaparece. Explicar la sincronización. |
| 45–55 s | Notificar a Vecino B. Mismo ciclo. Mostrar el feed de notificaciones. |
| 55–70 s | Subir la velocidad a 2×. El camión completa la ruta. Métricas: tiempo de recorrido, notificaciones enviadas. |
| 70–90 s | Resetear y contrastar: "sin app vs con app". Conclusión. |

### Configuración OBS recomendada
- Captura: **Captura de ventana** (seleccionar el navegador)
- Resolución: 1920×1080 o 1280×720
- FPS: 30
- Formato de salida: MP4 (H.264)

---

## Stack tecnológico

| Librería | Rol |
|----------|-----|
| React 18 | UI y gestión de estado |
| Vite 5 | Bundler y servidor de desarrollo |
| three.js | Motor 3D |
| @react-three/fiber | Integración React ↔ Three.js |
| @react-three/drei | Helpers: OrbitControls, Text, Billboard, Grid |

---

## Posibles mejoras

1. **Mapa real**: Integrar un PNG/SVG de Villa Mercedes exportado desde QGIS u OpenStreetMap.
2. **Modelos GLB**: Reemplazar las geometrías básicas con modelos 3D de camión y casas (SketchFab tiene modelos CC0).
3. **Audio**: Añadir sonido de camión y "ding" de notificación (Web Audio API).
4. **Rutas reales**: Importar las coordenadas de la ruta actual del camión desde un CSV/GeoJSON municipal.
5. **Horarios automáticos**: Programar activaciones de vecinos en `t = 3s` y `t = 6s` usando `useEffect` con `setTimeout`.
6. **Panel "antes/después"**: Split-screen mostrando la simulación con y sin app simultáneamente.
7. **Export PDF**: Botón para exportar un reporte de métricas al final de la simulación.

---

## Licencia

MIT — uso libre para investigación y presentaciones académicas.
