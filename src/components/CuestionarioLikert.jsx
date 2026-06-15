import React, { useState, useEffect } from "react";

const LIKERT_OPTIONS = [
  { value: 1, label: "Totalmente en desacuerdo" },
  { value: 2, label: "En desacuerdo" },
  { value: 3, label: "Ni de acuerdo ni en desacuerdo" },
  { value: 4, label: "De acuerdo" },
  { value: 5, label: "Totalmente de acuerdo" },
];

const QUESTIONS = [
  {
    id: "UP1",
    text: "Creo que la app me ayudará a saber exactamente a qué hora pasa el camión por mi barrio.",
  },
  {
    id: "UP2",
    text: "Pienso que usar la aplicación haría que mi cuadra y mi barrio se mantengan más limpios.",
  },
  {
    id: "UP3",
    text: "Considero que la app me sería útil para no sacar la basura en horarios en que todavía no pasa el camión.",
  },
  {
    id: "FU1",
    text: "Me resultaría fácil aprender a usar la aplicación de alertas.",
  },
  {
    id: "FU2",
    text: "Me imagino que manejar la app sería sencillo y no me llevaría mucho tiempo.",
  },
  {
    id: "FU3",
    text: "Creo que las pantallas y los avisos de la aplicación serían claros y fáciles de entender.",
  },
];

export default function CuestionarioLikert({ onClose }) {
  const [respuestas, setRespuestas] = useState({});
  const [isSmallScreen, setIsSmallScreen] = useState(
    () => window.innerWidth < 640,
  );
  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSelect = (qId, value) => {
    setRespuestas((prev) => ({ ...prev, [qId]: value }));
  };

  const allAnswered = Object.keys(respuestas).length === QUESTIONS.length;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        background: "rgba(8,14,30,0.10)",
        backdropFilter: "blur(5px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: isSmallScreen ? "center" : "flex-start",
        overflowY: "auto",
        padding: isSmallScreen ? "12px 0" : "20px 16px 40px",
      }}
    >
      {/* ── Cerrar ── */}
      <button
        onClick={onClose}
        style={{
          position: "fixed",
          top: 16,
          right: 16,
          zIndex: 52,
          width: 36,
          height: 36,
          background: "rgba(15,23,42,0.9)",
          border: "1px solid rgba(59,130,246,0.4)",
          borderRadius: 8,
          color: "#e2e8f0",
          fontSize: 16,
          cursor: "pointer",
        }}
      >
        ✕
      </button>

      <p
        style={{
          color: "#475569",
          fontSize: 11,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          margin: isSmallScreen ? "0 0 10px 0" : "0 0 16px 0",
          width: isSmallScreen ? "100%" : undefined,
          textAlign: isSmallScreen ? "center" : undefined,
          padding: isSmallScreen ? "0 10px" : undefined,
          boxSizing: isSmallScreen ? "border-box" : undefined,
        }}
      >
        INSTRUMENTO DE RECOLECCIÓN DE DATOS
      </p>

      {/* ── Recuadro principal ── */}
      <div
        style={{
          width: isSmallScreen ? "calc(100% - 20px)" : "100%",
          maxWidth: 860,
          marginLeft: isSmallScreen ? "auto" : undefined,
          marginRight: isSmallScreen ? "auto" : undefined,
          background:
            "linear-gradient(135deg,rgba(15,23,42,0.97) 0%,rgba(30,58,138,0.75) 100%)",
          border: "1.5px solid rgba(59,130,246,0.45)",
          borderRadius: 12,
          backdropFilter: "blur(8px)",
          boxShadow: "0 10px 25px -5px rgba(0,0,0,0.5)",
          overflow: "hidden",
        }}
      >
        {/* ── Encabezado ── */}
        <div
          style={{
            textAlign: "center",
            padding: isSmallScreen ? "12px 14px 10px" : "20px 24px 16px",
            borderBottom: "1px solid rgba(59,130,246,0.3)",
          }}
        >
          <h2
            style={{
              fontSize: isSmallScreen ? 12 : 15,
              fontWeight: 700,
              color: "#bfdbfe",
              margin: "0 0 4px 0",
              letterSpacing: "0.03em",
            }}
          >
            Cuestionario de Aceptación Tecnológica
          </h2>
          <p style={{ fontSize: isSmallScreen ? 10 : 13, color: "#94a3b8", margin: 0 }}>
            Indique su grado de acuerdo con las siguientes afirmaciones (1 al 5)
          </p>
        </div>

        <div style={{ padding: isSmallScreen ? "10px 12px 14px" : "16px 20px 20px" }}>
          {/* ── Leyenda ── */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              background: "rgba(15,23,42,0.6)",
              borderRadius: 8,
              padding: isSmallScreen ? "6px 10px" : "10px 16px",
              marginBottom: 8,
              border: "1px solid rgba(59,130,246,0.2)",
            }}
          >
            {LIKERT_OPTIONS.map((opt) => (
              <div
                key={opt.value}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "18%",
                  textAlign: "center",
                }}
              >
                <span
                  style={{
                    fontSize: isSmallScreen ? 10 : 12,
                    fontWeight: 800,
                    color: "#60a5fa",
                    marginBottom: isSmallScreen ? 0 : 2,
                  }}
                >
                  {opt.value}
                </span>
                {!isSmallScreen && (
                  <span
                    style={{ fontSize: 10, color: "#cbd5e1", lineHeight: 1.2 }}
                  >
                    {opt.label}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* ── Preguntas ── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              marginBottom: 20,
            }}
          >
            {QUESTIONS.map((q) => (
              <div
                key={q.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: isSmallScreen ? "5px 8px" : "6px 16px",
                  background: respuestas[q.id]
                    ? "rgba(59,130,246,0.15)"
                    : "rgba(30,41,59,0.4)",
                  border: `1px solid ${respuestas[q.id] ? "rgba(59,130,246,0.5)" : "rgba(59,130,246,0.1)"}`,
                  borderRadius: 8,
                  transition: "all 0.3s ease",
                  gap: isSmallScreen ? 6 : 12,
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span
                    style={{
                      display: "inline-block",
                      width: isSmallScreen ? 28 : 38,
                      fontWeight: 700,
                      color: "#fbbf24",
                      fontSize: isSmallScreen ? 10 : 12,
                    }}
                  >
                    {q.id}
                  </span>
                  <span
                    style={{
                      fontSize: isSmallScreen ? 10 : 13,
                      color: respuestas[q.id] ? "#f1f5f9" : "#cbd5e1",
                    }}
                  >
                    {q.text}
                  </span>
                </div>

                <div style={{ display: "flex", gap: isSmallScreen ? 6 : 14, flexShrink: 0 }}>
                  {LIKERT_OPTIONS.map((opt) => {
                    const isSelected = respuestas[q.id] === opt.value;
                    return (
                      <div
                        key={opt.value}
                        onClick={() => handleSelect(q.id, opt.value)}
                        style={{
                          width: isSmallScreen ? 20 : 26,
                          height: isSmallScreen ? 20 : 26,
                          borderRadius: "50%",
                          border: `2px solid ${isSelected ? "#60a5fa" : "#475569"}`,
                          background: isSelected ? "#3b82f6" : "transparent",
                          boxShadow: isSelected
                            ? "0 0 10px rgba(59,130,246,0.6)"
                            : "none",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          flexShrink: 0,
                        }}
                      >
                        {isSelected && (
                          <span
                            style={{
                              color: "#fff",
                              fontSize: isSmallScreen ? 9 : 11,
                              fontWeight: 800,
                            }}
                          >
                            ✓
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* ── Pie del recuadro ── */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: 16,
              borderTop: "1px solid rgba(59,130,246,0.2)",
            }}
          >
            <span style={{ color: "#64748b", fontSize: 12 }}>
              {Object.keys(respuestas).length} / {QUESTIONS.length} respondidas
            </span>
            <button
              disabled={!allAnswered}
              onClick={onClose}
              style={{
                padding: "8px 20px",
                background: allAnswered
                  ? "rgba(30,58,138,0.7)"
                  : "rgba(30,41,59,0.4)",
                border: `1px solid ${allAnswered ? "rgba(59,130,246,0.6)" : "rgba(59,130,246,0.2)"}`,
                borderRadius: 8,
                color: allAnswered ? "#e2e8f0" : "#475569",
                cursor: allAnswered ? "pointer" : "default",
                fontSize: 13,
                fontWeight: 600,
                transition: "all 0.3s ease",
              }}
            >
              {allAnswered ? "Envío de Datos" : "Complete todas las preguntas"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
