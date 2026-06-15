/**
 * ui/ControlPanel.jsx
 * Panel de control superpuesto a la escena 3D.
 *
 * Incluye:
 *  - Botones Play / Pause / Reset
 *  - Slider de velocidad (0.5× – 3×)
 *  - Botones de notificación por vecino
 *  - Métricas en tiempo real
 *  - Feed de notificaciones enviadas
 */
import React from "react";

// ── Paleta de colores ──────────────────────────────────────────────────────────
const PANEL_WIDTH = 300;
const TOGGLE_WIDTH = 34;
const C = {
  bg: "rgba(10, 14, 26, 0.92)",
  border: "#1e40af",
  accent: "#3b82f6",
  green: "#22c55e",
  yellow: "#facc15",
  red: "#ef4444",
  text: "#e2e8f0",
  muted: "#94a3b8",
};

// ── Estilos reutilizables ──────────────────────────────────────────────────────
const styles = {
  panelWrapper: {
    position: "absolute",
    top: 0,
    right: 0,
    height: "100%",
    transition: "transform 0.2s ease",
    zIndex: 10,
  },
  panel: {
    position: "absolute",
    top: 0,
    right: 0,
    width: `${PANEL_WIDTH}px`,
    height: "100%",
    background: C.bg,
    borderLeft: `2px solid ${C.border}`,
    color: C.text,
    fontFamily: "'Segoe UI', sans-serif",
    fontSize: "13px",
    display: "flex",
    flexDirection: "column",
    padding: "0",
    overflowY: "auto",
    backdropFilter: "blur(8px)",
    zIndex: 10,
  },
  toggleBtn: {
    position: "absolute",
    left: `-${TOGGLE_WIDTH}px`,
    top: "18px",
    width: `${TOGGLE_WIDTH}px`,
    height: "36px",
    borderRadius: "6px 0 0 6px",
    border: `1px solid ${C.border}`,
    borderRight: "none",
    background: "rgba(15, 23, 42, 0.9)",
    color: "#e2e8f0",
    cursor: "pointer",
    fontWeight: "700",
    zIndex: 11,
  },
  header: {
    background: "linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)",
    padding: "14px 16px",
    borderBottom: `1px solid ${C.border}`,
  },
  headerTitle: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#93c5fd",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
  },
  headerSub: {
    fontSize: "11px",
    color: C.muted,
    marginTop: "2px",
  },
  section: {
    padding: "12px 16px",
    borderBottom: `1px solid rgba(30,64,175,0.3)`,
  },
  sectionTitle: {
    fontSize: "11px",
    fontWeight: "700",
    color: C.accent,
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    marginBottom: "10px",
  },
  btn: {
    padding: "7px 14px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "13px",
    transition: "transform 0.1s",
  },
  metricCard: {
    background: "rgba(30, 64, 175, 0.15)",
    border: "1px solid rgba(59,130,246,0.25)",
    borderRadius: "8px",
    padding: "8px 12px",
    marginBottom: "6px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  notifItem: {
    background: "rgba(250, 204, 21, 0.08)",
    border: "1px solid rgba(250,204,21,0.2)",
    borderRadius: "6px",
    padding: "6px 10px",
    marginBottom: "5px",
    fontSize: "11px",
    color: "#fde68a",
    lineHeight: "1.4",
  },
};

export default function ControlPanel({
  playing,
  speed,
  dumps,
  notifications,
  metrics,
  onPlay,
  onPause,
  onSpeedChange,
  onSendNotification,
  onReset,
  collapsed,
  onToggle,
  autoNotify,
  autoInterval,
  onToggleAuto,
  onAutoIntervalChange,
}) {
  const activeDumps = dumps.filter((d) => d.active).length;

  // Color del indicador de calles limpias
  const cleanColor =
    metrics.cleanPercent >= 80
      ? C.green
      : metrics.cleanPercent >= 50
        ? C.yellow
        : C.red;

  const wrapperWidth = collapsed ? TOGGLE_WIDTH : PANEL_WIDTH;

  return (
    <div
      style={{
        ...styles.panelWrapper,
        width: `${wrapperWidth}px`,
      }}
    >
      <button
        type="button"
        style={{
          ...styles.toggleBtn,
          left: collapsed ? "0" : `-${TOGGLE_WIDTH}px`,
        }}
        onClick={onToggle}
        aria-label={collapsed ? "Mostrar panel" : "Ocultar panel"}
      >
        {collapsed ? "<" : ">"}
      </button>
      {!collapsed && (
        <div style={styles.panel}>
          {/* ── Encabezado ── */}
          <div style={styles.header}>
            {/* <div style={styles.headerTitle}>🗑️ Simulador</div>
            <div style={styles.headerSub}>
              Gestión de Residuos · Villa Mercedes, SL
            </div> */}
          </div>

          {/* ── Controles de simulación ── */}
          <div style={styles.section}>
            <div style={styles.sectionTitle}>▶ Simulación</div>
            <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
              <button
                style={{
                  ...styles.btn,
                  background: playing ? "#374151" : C.green,
                  color: "#fff",
                  flex: 1,
                }}
                onClick={onPlay}
                disabled={playing}
              >
                ▶ Play
              </button>
              <button
                style={{
                  ...styles.btn,
                  background: playing ? C.yellow : "#374151",
                  color: playing ? "#000" : "#888",
                  flex: 1,
                }}
                onClick={onPause}
                disabled={!playing}
              >
                ⏸ Pausa
              </button>
              <button
                style={{
                  ...styles.btn,
                  background: "#7f1d1d",
                  color: "#fca5a5",
                }}
                onClick={onReset}
                title="Reiniciar simulación"
              >
                ↺
              </button>
            </div>

            {/* Slider de velocidad */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  color: C.muted,
                  fontSize: "12px",
                  whiteSpace: "nowrap",
                }}
              >
                Vel:{" "}
                <strong style={{ color: C.text }}>{speed.toFixed(1)}×</strong>
              </span>
              <input
                type="range"
                min={0.5}
                max={3}
                step={0.1}
                value={speed}
                onChange={(e) => onSpeedChange(Number(e.target.value))}
                style={{ flex: 1, accentColor: C.accent }}
              />
            </div>
          </div>

          {/* ── Métricas ── */}
          <div style={styles.section}>
            <div style={styles.sectionTitle}>📊 Métricas</div>

            <div style={styles.metricCard}>
              <span style={{ color: C.muted }}>Calles limpias</span>
              <strong style={{ color: cleanColor, fontSize: "16px" }}>
                {metrics.cleanPercent}%
              </strong>
            </div>

            <div style={styles.metricCard}>
              <span style={{ color: C.muted }}>
                Basura pendiente de recolección
              </span>
              <strong
                style={{
                  color: activeDumps > 0 ? C.red : C.green,
                  fontSize: "16px",
                }}
              >
                {activeDumps}
              </strong>
            </div>

            <div style={styles.metricCard}>
              <span style={{ color: C.muted }}>Notificaciones</span>
              <strong style={{ color: C.accent, fontSize: "16px" }}>
                {metrics.notifsSent}
              </strong>
            </div>

            <div style={styles.metricCard}>
              <span style={{ color: C.muted }}>Tiempo recorrido</span>
              <strong style={{ color: C.text, fontSize: "14px" }}>
                {Math.floor(metrics.travelTime / 60)}m{" "}
                {Math.floor(metrics.travelTime % 60)}s
              </strong>
            </div>
          </div>

          {/* ── Notificaciones a vecinos ── */}
          <div style={styles.section}>
            <div style={styles.sectionTitle}>📱 Alertas a Vecinos</div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "8px",
              }}
            >
              <input
                type="checkbox"
                checked={autoNotify}
                onChange={(e) => onToggleAuto(e.target.checked)}
              />
              <span style={{ color: C.text, fontSize: "12px" }}>
                Auto notificar
              </span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "10px",
              }}
            >
              <span style={{ color: C.muted, fontSize: "11px" }}>Cada (s)</span>
              <input
                type="number"
                min={5}
                max={120}
                step={1}
                value={autoInterval}
                disabled={!autoNotify}
                onChange={(e) => onAutoIntervalChange(Number(e.target.value))}
                style={{
                  width: "70px",
                  background: "#0f172a",
                  border: "1px solid #1f2937",
                  borderRadius: "6px",
                  color: C.text,
                  padding: "4px 6px",
                }}
              />
            </div>
            {/* <p
              style={{ color: C.muted, fontSize: "11px", marginBottom: "10px" }}
            >
              Presiona para simular que el vecino recibe la alerta y saca la
              basura.
            </p> */}
            {[
              { id: 1, name: "Vecino A", color: "#4ade80" },
              { id: 2, name: "Vecino B", color: "#60a5fa" },
              { id: 3, name: "Vecino C", color: "#f87171" },
            ].map((n) => {
              const dump = dumps.find((d) => d.id === n.id);
              return (
                <button
                  key={n.id}
                  style={{
                    ...styles.btn,
                    background: dump?.active
                      ? "rgba(239, 68, 68, 0.15)"
                      : "rgba(34, 197, 94, 0.15)",
                    border: `1px solid ${dump?.active ? C.red : C.green}`,
                    color: dump?.active ? C.red : C.green,
                    width: "100%",
                    marginBottom: "6px",
                    textAlign: "left",
                  }}
                  onClick={() => onSendNotification(n.id)}
                >
                  📲 Notificar a <strong>{n.name}</strong>
                  {dump?.active && (
                    <span style={{ float: "right", fontSize: "11px" }}>
                      ⚠️ basura afuera
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* ── Feed de notificaciones ── */}
          {notifications.length > 0 && (
            <div style={{ ...styles.section, flex: 1 }}>
              <div style={styles.sectionTitle}>📨 Historial</div>
              {notifications.map((n, i) => (
                <div key={i} style={styles.notifItem}>
                  {n}
                </div>
              ))}
            </div>
          )}

          {/* ── Leyenda ── */}
          <div
            style={{
              padding: "12px 16px",
              borderTop: `1px solid ${C.border}`,
              marginTop: "auto",
              background: "rgba(0,0,0,0.3)",
            }}
          >
            {/* <div
              style={{ fontSize: "11px", color: C.muted, lineHeight: "1.8" }}
            >
              <span style={{ color: "#f97316" }}>■</span> Camión &nbsp;
              <span style={{ color: "#4ade80" }}>●</span> Vecino A &nbsp;
              <span style={{ color: "#60a5fa" }}>●</span> Vecino B &nbsp;
              <span style={{ color: "#fbbf24" }}>▲</span> Basural
            </div> */}
            <div
              style={{ fontSize: "10px", color: "#475569", marginTop: "4px" }}
            >
              🖱️ Arrastrar: rotar vista · Scroll: zoom
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
