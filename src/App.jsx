/**
 * App.jsx
 * Componente raíz: gestiona el estado global de la simulación y
 * conecta la escena 3D con el panel de control UI.
 */
import React, { useState, useCallback, useEffect, useRef } from "react";
import Scene from "./Scene.jsx";
import ControlPanel from "./ui/ControlPanel.jsx";
import PresentationModal from "./components/PresentationModal.jsx";
import ConceptMapModal from "./components/ConceptMapModal.jsx";
import OperacionalizacionModal from "./components/OperacionalizacionModal.jsx";
import CuestionarioLikert from "./components/CuestionarioLikert.jsx";
import { PRESENTATION_SLIDES } from "./data/presentationSlides.js";
import { Presentation, FileDown } from "lucide-react";
import pdfTrabajoFinal from "../src/assets/trabajo-final-german-adrian-munoz.pdf";

// ─── Posiciones iniciales de los vecinos en el plano XZ ───────────────────────
export const NEIGHBOR_POSITIONS = [
  { id: 1, name: "Juan", x: -3.3, z: -0.6, color: "#1c6294" },
  { id: 2, name: "Maria", x: 2.3, z: 2.2, color: "#e23ce8" },
  {
    id: 3,
    name: "Walter",
    x: -3.25,
    z: 5.15,
    color: "#ef4444",
    houseOffset: [-0.8, 0, -1.4],
    figureRotationY: Math.PI / 2,
    indicatorOffset: [0.2, 0.9, -0.5],
    indicatorRotationZ: 0,
  },
];
const initialDumps = NEIGHBOR_POSITIONS.map((n) => ({
  id: n.id,
  x: n.x + 0.3,
  z: n.z + 0.3,
}));
export default function App() {
  // Control de la simulación
  const [playing, setPlaying] = useState(true);
  const [speed, setSpeed] = useState(1.1);
  const [panelOpen, setPanelOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [showConceptMap, setShowConceptMap] = useState(false);
  const [showOperacionalizacion, setShowOperacionalizacion] = useState(false);
  const [showLikert, setShowLikert] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [revealIndex, setRevealIndex] = useState(-1);
  const [autoNotify, setAutoNotify] = useState(true);
  const [autoInterval, setAutoInterval] = useState(10);

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
  const activeSlide = PRESENTATION_SLIDES[slideIndex];
  const dynamicStepsCount = Math.max(activeSlide.steps.length - 1, 0);
  const activeDynamicIndex = Math.max(revealIndex, -1);
  const visibleBlocks = Math.min(
    activeDynamicIndex + 2,
    activeSlide.steps.length,
  );
  const totalSteps = activeSlide.steps.length;
  const atLastStep =
    dynamicStepsCount === 0 || activeDynamicIndex >= dynamicStepsCount - 1;
  const atLastSlide = slideIndex >= PRESENTATION_SLIDES.length - 1;
  const progress = Math.round((visibleBlocks / totalSteps) * 100);
  const atEnd = atLastSlide && atLastStep;

  const handleNextBlock = useCallback(() => {
    if (!atLastStep) {
      setRevealIndex((prev) => prev + 1);
    }
  }, [atLastStep]);

  const handlePrevBlock = useCallback(() => {
    setRevealIndex((prev) => Math.max(prev - 1, -1));
  }, []);

  const handleNextSlide = useCallback(() => {
    if (!atLastSlide) {
      setSlideIndex((prev) => prev + 1);
      setRevealIndex(-1);
    }
  }, [atLastSlide]);

  const handlePrev = useCallback(() => {
    if (slideIndex === 0) return;
    const prevIndex = slideIndex - 1;
    setSlideIndex(prevIndex);
    setRevealIndex(
      Math.max(PRESENTATION_SLIDES[prevIndex].steps.length - 2, -1),
    );
  }, [slideIndex]);

  const [isSmallScreen, setIsSmallScreen] = useState(
    () => window.innerWidth < 640,
  );
  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const hideOnMobilePresentation = showIntro && isSmallScreen;

  const logoSrc = `${import.meta.env.BASE_URL}logoUNVIME.png`;

  const headerChipStyle = {
    position: "fixed",
    zIndex: 30,
    background:
      "linear-gradient(135deg, rgba(15, 23, 42, 0.94) 0%, rgba(30, 58, 138, 0.35) 100%)",
    border: "1px solid rgba(59, 130, 246, 0.45)",
    borderRadius: "12px",
    boxShadow:
      "0 8px 24px rgba(15, 23, 42, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
    backdropFilter: "blur(10px)",
    pointerEvents: "none",
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        position: "relative",
      }}
    >
      {/* ── Marca: logo UNVIME + materia (esquina superior izquierda) ── */}
      <div
        style={{
          ...headerChipStyle,
          top: "calc(16px + env(safe-area-inset-top))",
          left: "calc(16px + env(safe-area-inset-left))",
          display: hideOnMobilePresentation ? "none" : "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: isSmallScreen ? "4px" : "8px",
          padding: isSmallScreen ? "6px 8px" : "10px 14px",
          maxWidth:
            "min(220px, calc(100vw - 32px - env(safe-area-inset-left) - env(safe-area-inset-right)))",
        }}
        aria-label="UNVIME — Metodología de la Investigación"
      >
        <img
          src={logoSrc}
          alt="UNVIME — Universidad Nacional de Villa Mercedes"
          style={{
            height: isSmallScreen ? "22px" : "34px",
            width: "auto",
            maxWidth: "148px",
            objectFit: "contain",
            display: "block",
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontSize: isSmallScreen ? "9px" : "12px",
            fontWeight: 600,
            lineHeight: 1.3,
            color: "#e2e8f0",
            letterSpacing: "0.01em",
            textAlign: "center",
            maxWidth: "190px",
          }}
        >
          Metodología de la Investigación
        </span>
      </div>

      {/* ── Alumno y profesora (esquina superior derecha) ── */}
      <div
        style={{
          ...headerChipStyle,
          top: "calc(16px + env(safe-area-inset-top))",
          // Si esta activado el panel 64px right: "calc(64px + env(safe-area-inset-right))",
          right: "calc(16px + env(safe-area-inset-right))",
          display: hideOnMobilePresentation ? "none" : "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: isSmallScreen ? "2px" : "4px",
          padding: isSmallScreen ? "6px 8px" : "10px 14px",
          textAlign: "right",
        }}
        aria-label="Alumno y profesora"
      >
        <span
          style={{
            fontSize: isSmallScreen ? "9px" : "12px",
            fontWeight: 600,
            lineHeight: 1.35,
            color: "#e2e8f0",
            letterSpacing: "0.01em",
          }}
        >
          Alum. Germán Adrián Muñoz
        </span>
        <span
          style={{
            fontSize: isSmallScreen ? "9px" : "12px",
            fontWeight: 600,
            lineHeight: 1.35,
            color: "#94a3b8",
            letterSpacing: "0.01em",
          }}
        >
          Prof. Helga Myrna Blanco
        </span>
      </div>

      {/* ── Escena 3D (ocupa toda la pantalla) ── */}
      <Scene
        playing={playing}
        speed={speed}
        dumps={dumps}
        onClearDump={clearDump}
        onTruckTick={onTruckTick}
      />

      {/* ── Panel de control superpuesto ── */}
      {/* <ControlPanel
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
      /> */}

      {/* ── Boton de presentacion ── */}
      {!showIntro && (
        <button
          type="button"
          onClick={() => {
            setSlideIndex(0);
            setRevealIndex(-1);
            setShowIntro(true);
          }}
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
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <Presentation size={16} style={{ flexShrink: 0 }} />
          Presentacion
        </button>
      )}

      {showConceptMap && (
        <ConceptMapModal onClose={() => setShowConceptMap(false)} />
      )}

      {showOperacionalizacion && (
        <OperacionalizacionModal
          onClose={() => setShowOperacionalizacion(false)}
        />
      )}

      {showLikert && (
        <CuestionarioLikert onClose={() => setShowLikert(false)} />
      )}

      {/* ── Boton de descarga del trabajo final ── */}
      <a
        href={
          "https://drive.google.com/file/d/1fPl2mOrjVjLzBvE_Mc1MNNPpSRFKD3za/view?usp=drive_link"
        }
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed",
          right: "calc(16px + env(safe-area-inset-right))",
          bottom: "calc(16px + env(safe-area-inset-bottom))",
          padding: "8px 12px",
          background: "rgba(15, 23, 42, 0.9)",
          color: "#e2e8f0",
          border: "1px solid #1e40af",
          borderRadius: "8px",
          cursor: "pointer",
          zIndex: 30,
          textDecoration: "none",
          fontSize: "14px",
          display: hideOnMobilePresentation ? "none" : "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <FileDown size={16} style={{ flexShrink: 0 }} />
        Trabajo Final
      </a>

      {showIntro &&
        !showConceptMap &&
        !showOperacionalizacion &&
        !showLikert && (
          <PresentationModal
            slide={activeSlide}
            slideIndex={slideIndex}
            revealIndex={activeDynamicIndex}
            hasDynamicStep={dynamicStepsCount > 0}
            visibleBlocks={visibleBlocks}
            totalSteps={totalSteps}
            atLastStep={atLastStep}
            atEnd={atEnd}
            progress={progress}
            onNextBlock={handleNextBlock}
            onPrevBlock={handlePrevBlock}
            onNextSlide={handleNextSlide}
            onPrev={handlePrev}
            onClose={() => setShowIntro(false)}
            onOpenConceptMap={() => setShowConceptMap(true)}
            onOpenOperacionalizacion={() => setShowOperacionalizacion(true)}
            onOpenLikert={() => setShowLikert(true)}
          />
        )}
    </div>
  );
}
