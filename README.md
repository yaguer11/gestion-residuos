# Simulación de Gestión de Residuos Urbanos

Demo interactiva 3D para ilustrar cómo una aplicación de alertas mejora la sincronización entre vecinos y el servicio municipal de recolección de residuos.

**Desarrollada para:** Presentación de Metodología de la investigación · Universidad Nacional de Villa Mercedes · Villa Mercedes, San Luis, Argentina.

## Descripción de la demo (narrativa para presentación)

### Escenario "Sin app" (problema)

> El camión sale a las 7:00. Los vecinos no saben a qué hora llega a su cuadra. Algunos sacan la basura a las 5:00 (muy temprano). Otros la sacan a las 9:00 y el camión ya pasó. **Resultado: microbasurales, calles sucias, vectores sanitarios.**

### Escenario "Con app" (solución)

> La app municipal envía una notificación push cuando el camión está por pasar. El vecino saca la basura en el momento justo. El camión la recoge y sigue su ruta. **Resultado: 0 basurales activos, 100% calles limpias.**

## Stack tecnológico

| Librería           | Rol                                           |
| ------------------ | --------------------------------------------- |
| React 18           | UI y gestión de estado                        |
| Vite 5             | Bundler y servidor de desarrollo              |
| three.js           | Motor 3D                                      |
| @react-three/fiber | Integración React ↔ Three.js                  |
| @react-three/drei  | Helpers: OrbitControls, Text, Billboard, Grid |

---

## Licencia

Germán Adrián Muñoz.
