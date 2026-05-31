/**
 * App.jsx
 * Componente raíz: gestiona el estado global de la simulación y
 * conecta la escena 3D con el panel de control UI.
 */
import React, { useState, useCallback, useEffect, useRef } from "react";
import Scene from "./Scene.jsx";
import ControlPanel from "./ui/ControlPanel.jsx";
// ─── Posiciones iniciales de los vecinos en el plano XZ ───────────────────────
export const NEIGHBOR_POSITIONS = [
  { id: 1, name: "Juan", x: -3.3, z: -0.6, color: "#1c6294" },
  { id: 2, name: "Maria", x: 2.3, z: 2.2, color: "#e23ce8" },
];
const initialDumps = NEIGHBOR_POSITIONS.map((n) => ({
  id: n.id,
  x: n.x + 0.3,
  z: n.z + 0.3,
}));
export default function App() {
  // Control de la simulación
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [panelOpen, setPanelOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [autoNotify, setAutoNotify] = useState(false);
  const [autoInterval, setAutoInterval] = useState(15);

  // Estado de los microbasurales
  const [dumps, setDumps] = useState(initialDumps);

  // Notificaciones enviadas (array de strings)
  const [notifications, setNotifications] = useState([]);

  // Métricas simuladas
  const [metrics, setMetrics] = useState({
    travelTime: 0, // segundos de recorrido del camión
    notifsSent: 0,
  });

  // Referencia para evitar closures stale en callbacks del loop 3D
  const metricsRef = useRef(metrics);
  metricsRef.current = metrics;
  const autoIndexRef = useRef(0);

  // ── Activa/desactiva un basural por vecino ID ─────────────────────────────
  const toggleDump = useCallback((neighborId, active) => {
    setDumps((prev) =>
      prev.map((d) => (d.id === neighborId ? { ...d, active } : d)),
    );
  }, []);

  // ── Elimina un basural cuando el camión pasa cerca ────────────────────────
  const clearDump = useCallback((neighborId) => {
    setDumps((prev) =>
      prev.map((d) => (d.id === neighborId ? { ...d, active: false } : d)),
    );
  }, []);

  // ── Envía notificación simulada a un vecino ────────────────────────────────
  const sendNotification = useCallback(
    (neighborId) => {
      const neighbor = NEIGHBOR_POSITIONS.find((n) => n.id === neighborId);
      const msg = `🔔 ${neighbor.name}: "El camión llega en ~2 min. ¡Saque la basura ahora!"`;
      setNotifications((prev) => [msg, ...prev].slice(0, 5));
      setMetrics((prev) => ({ ...prev, notifsSent: prev.notifsSent + 1 }));
      // Activa el basural del vecino notificado (saca la basura)
      toggleDump(neighborId, true);
    },
    [toggleDump],
  );

  useEffect(() => {
    if (!autoNotify) return;
    const safeInterval = Number.isFinite(autoInterval)
      ? Math.max(5, autoInterval)
      : 15;
    const timerId = setInterval(() => {
      const neighbor =
        NEIGHBOR_POSITIONS[autoIndexRef.current % NEIGHBOR_POSITIONS.length];
      autoIndexRef.current += 1;
      sendNotification(neighbor.id);
    }, safeInterval * 1000);
    return () => clearInterval(timerId);
  }, [autoNotify, autoInterval, sendNotification]);

  // ── Actualiza el tiempo de recorrido desde la escena 3D ───────────────────
  const onTruckTick = useCallback((dt) => {
    setMetrics((prev) => ({ ...prev, travelTime: prev.travelTime + dt }));
  }, []);

  // ── Calcula % calles limpias (ficticio) ───────────────────────────────────
  const activeDumps = dumps.filter((d) => d.active).length;
  const cleanPercent = activeDumps === 0 ? 100 : activeDumps === 1 ? 65 : 30;
  const slides = [
    {
      key: "problema",
      icon: "🧭",
      title: "Problema y justificacion",
      subtitle:
        "Desincronizacion entre horarios de recoleccion y deposito de residuos.",
      bullets: [
        "Contexto: Villa Mercedes, residuos solidos urbanos.",
        "Problema: microbasurales y obstruccion de desagues.",
        "Pregunta: aceptacion de app web de alertas vecinales.",
        "Impacto: higiene urbana y costos municipales.",
      ],
      schemaTitle: "Mapa del problema",
      schemaItems: [
        { label: "Causa", value: "Falta de informacion oportuna" },
        { label: "Efecto", value: "Basura fuera de horario" },
        { label: "Consecuencia", value: "Microbasurales" },
        { label: "Solucion", value: "Alertas vecinales" },
      ],
      tags: ["Social", "Ambiental", "Operativo"],
    },
    {
      key: "objetivos",
      icon: "🎯",
      title: "Objetivos e hipotesis",
      subtitle: "Analizar adopcion y su impacto en la recoleccion.",
      bullets: [
        "General: medir adopcion de la plataforma y su impacto operativo.",
        "Especificos: acceso a informacion, uso en prueba, carga de camiones.",
        "Hipotesis: alta aceptacion de la app como solucion a la desinformacion.",
      ],
      schemaTitle: "Logica de estudio",
      schemaItems: [
        { label: "Variable 1", value: "Aceptacion tecnologica" },
        { label: "Variable 2", value: "Eficiencia operativa" },
        { label: "Indicador", value: "Uso de app y recorridos" },
      ],
      tags: ["Medible", "Verificable"],
    },
    {
      key: "marco",
      icon: "📚",
      title: "Marco teorico",
      subtitle:
        "Bases conceptuales y antecedentes para interpretar resultados.",
      bullets: [
        "Residuos urbanos y ciclo de recoleccion.",
        "Comunicacion municipal y brecha informacional.",
        "Tecnologia civica y sistemas de alertas.",
        "Modelos TAM y UTAUT para adopcion tecnologica.",
      ],
      schemaTitle: "Ejes del marco",
      schemaItems: [
        { label: "Gestion RSU", value: "Impacto y actores" },
        { label: "Comunicacion", value: "Canales y conductas" },
        { label: "Tecnologia", value: "Apps y notificaciones" },
        { label: "Aceptacion", value: "Percepcion de utilidad" },
      ],
      tags: ["Conceptos", "Antecedentes"],
    },
    {
      key: "metodo",
      icon: "🧪",
      title: "Marco metodologico (propuesta)",
      subtitle: "Estructura sugerida para completar el trabajo.",
      bullets: [
        "Enfoque cuantitativo con apoyo documental.",
        "Nivel descriptivo-correlacional.",
        "Diseno no experimental, de campo, transeccional.",
        "Tecnica: encuesta. Instrumento: cuestionario estructurado.",
      ],
      schemaTitle: "Ficha metodologica",
      schemaItems: [
        { label: "Poblacion", value: "Vecinos de Villa Mercedes" },
        { label: "Muestra", value: "Probabilistica o por conveniencia" },
        { label: "Analisis", value: "Estadistica descriptiva" },
        { label: "Etica", value: "Consentimiento informado" },
      ],
      tags: ["Pendiente", "Ajustable"],
    },
  ];
  const activeSlide = slides[slideIndex];

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        position: "relative",
      }}
    >
      {/* ── Escena 3D (ocupa toda la pantalla) ── */}
      <Scene
        playing={playing}
        speed={speed}
        dumps={dumps}
        onClearDump={clearDump}
        onTruckTick={onTruckTick}
      />

      {/* ── Panel de control superpuesto ── */}
      <ControlPanel
        playing={playing}
        speed={speed}
        dumps={dumps}
        notifications={notifications}
        metrics={{ ...metrics, cleanPercent, activeDumps }}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onSpeedChange={setSpeed}
        onSendNotification={sendNotification}
        autoNotify={autoNotify}
        autoInterval={autoInterval}
        onToggleAuto={setAutoNotify}
        onAutoIntervalChange={setAutoInterval}
        collapsed={!panelOpen}
        onToggle={() => setPanelOpen((prev) => !prev)}
        onReset={() => {
          setPlaying(false);
          setDumps(initialDumps);
          setNotifications([]);
          setMetrics({ travelTime: 0, notifsSent: 0 });
        }}
      />

      {/* ── Boton de presentacion ── */}
      <button
        type="button"
        onClick={() => setShowIntro(true)}
        style={{
          position: "fixed",
          left: "calc(16px + env(safe-area-inset-left))",
          bottom: "calc(16px + env(safe-area-inset-bottom))",
          padding: "8px 12px",
          background: "rgba(15, 23, 42, 0.9)",
          color: "#e2e8f0",
          border: "1px solid #1e40af",
          borderRadius: "8px",
          cursor: "pointer",
          zIndex: 30,
        }}
      >
        Ver presentacion
      </button>

      {/* ── Modal de presentacion ── */}
      {showIntro && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background:
              "radial-gradient(circle at 20% 20%, rgba(148, 163, 184, 0.18), transparent 50%), radial-gradient(circle at 80% 30%, rgba(59, 130, 246, 0.16), transparent 45%), rgba(15, 23, 42, 0.25)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "stretch",
            justifyContent: "flex-end",
            zIndex: 20,
            padding: "18px",
          }}
          className="intro-overlay"
        >
          <div
            style={{
              width: "860px",
              maxWidth: "92vw",
              height: "100%",
              maxHeight: "100%",
              background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
              border: "1px solid rgba(148, 163, 184, 0.6)",
              borderRadius: "16px",
              padding: "22px 24px",
              color: "#0f172a",
              boxShadow: "0 18px 50px rgba(15, 23, 42, 0.18)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
            className="intro-card"
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  display: "grid",
                  placeItems: "center",
                  background: "rgba(59, 130, 246, 0.12)",
                  border: "1px solid rgba(59, 130, 246, 0.35)",
                  fontSize: "22px",
                }}
              >
                {activeSlide.icon}
              </div>
              <div>
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: 700,
                    letterSpacing: "0.02em",
                    fontFamily: "'Space Grotesk', 'Rubik', sans-serif",
                  }}
                >
                  {activeSlide.title}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "#475569",
                    fontFamily: "'Space Grotesk', 'Rubik', sans-serif",
                  }}
                >
                  {activeSlide.subtitle}
                </div>
              </div>
              <div style={{ marginLeft: "auto", display: "flex", gap: "8px" }}>
                {activeSlide.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: "4px 10px",
                      borderRadius: "999px",
                      background: "rgba(148, 163, 184, 0.2)",
                      border: "1px solid rgba(148, 163, 184, 0.5)",
                      fontSize: "11px",
                      color: "#1e293b",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div
              className="intro-content"
              style={{
                display: "grid",
                gap: "18px",
                marginTop: "18px",
                flex: 1,
                overflowY: "auto",
                paddingBottom: "8px",
              }}
            >
              <div>
                <div style={{ display: "grid", gap: "10px" }}>
                  {activeSlide.bullets.map((item, index) => (
                    <div
                      key={item}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "24px 1fr",
                        gap: "10px",
                        padding: "10px 12px",
                        background: "rgba(241, 245, 249, 0.95)",
                        borderRadius: "10px",
                        border: "1px solid rgba(148, 163, 184, 0.45)",
                      }}
                    >
                      <div
                        style={{
                          width: "24px",
                          height: "24px",
                          borderRadius: "6px",
                          background: "rgba(34, 197, 94, 0.15)",
                          display: "grid",
                          placeItems: "center",
                          fontSize: "12px",
                          color: "#15803d",
                          fontWeight: 700,
                        }}
                      >
                        {index + 1}
                      </div>
                      <div
                        style={{
                          fontSize: "13px",
                          color: "#0f172a",
                          lineHeight: 1.5,
                        }}
                      >
                        {item}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="intro-schema"
                style={{
                  background: "rgba(241, 245, 249, 0.9)",
                  borderRadius: "12px",
                  border: "1px solid rgba(16, 185, 129, 0.35)",
                  padding: "14px",
                  display: "grid",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    fontSize: "12px",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "#0f766e",
                    fontWeight: 700,
                  }}
                >
                  {activeSlide.schemaTitle}
                </div>
                {activeSlide.schemaItems.map((item) => (
                  <div
                    key={item.label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "10px",
                      padding: "8px 10px",
                      borderRadius: "8px",
                      background: "#ffffff",
                      border: "1px solid rgba(148, 163, 184, 0.45)",
                    }}
                  >
                    <span style={{ fontSize: "12px", color: "#64748b" }}>
                      {item.label}
                    </span>
                    <span style={{ fontSize: "12px", color: "#0f172a" }}>
                      {item.value}
                    </span>
                  </div>
                ))}
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    flexWrap: "wrap",
                  }}
                >
                  {["🧩 Variables", "📊 Indicadores", "🧠 Evidencia"].map(
                    (item) => (
                      <span
                        key={item}
                        style={{
                          padding: "4px 8px",
                          borderRadius: "8px",
                          background: "rgba(59, 130, 246, 0.12)",
                          border: "1px solid rgba(59, 130, 246, 0.4)",
                          fontSize: "11px",
                          color: "#1d4ed8",
                        }}
                      >
                        {item}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: "8px", marginTop: "18px" }}>
              <button
                type="button"
                onClick={() => setShowIntro(false)}
                style={{
                  padding: "8px 12px",
                  background: "#f1f5f9",
                  color: "#1e293b",
                  border: "1px solid #cbd5f5",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Cerrar
              </button>
              <div style={{ marginLeft: "auto", display: "flex", gap: "8px" }}>
                <button
                  type="button"
                  onClick={() => setSlideIndex((i) => Math.max(i - 1, 0))}
                  disabled={slideIndex === 0}
                  style={{
                    padding: "8px 12px",
                    background: slideIndex === 0 ? "#e2e8f0" : "#ffffff",
                    color: slideIndex === 0 ? "#94a3b8" : "#0f172a",
                    border: "1px solid #cbd5e1",
                    borderRadius: "8px",
                    cursor: slideIndex === 0 ? "default" : "pointer",
                  }}
                >
                  Anterior
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setSlideIndex((i) => Math.min(i + 1, slides.length - 1))
                  }
                  disabled={slideIndex === slides.length - 1}
                  style={{
                    padding: "8px 12px",
                    background:
                      slideIndex === slides.length - 1 ? "#e2e8f0" : "#2563eb",
                    color:
                      slideIndex === slides.length - 1 ? "#94a3b8" : "#ffffff",
                    border: "1px solid #1d4ed8",
                    borderRadius: "8px",
                    cursor:
                      slideIndex === slides.length - 1 ? "default" : "pointer",
                  }}
                >
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
