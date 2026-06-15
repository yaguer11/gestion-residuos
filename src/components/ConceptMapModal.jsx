import React, { useState, useEffect } from "react";

const BRANCHES = [
  {
    id: "problema",
    title: "Problema de Investigación",
    formula: "INTERROGANTE + VARIABLE + UNIDAD DE OBSERVACIÓN + CONTEXTO",
    leaves: [
      "Indica el tipo de investigación",
      "Atributos que se estudiarán",
      "Población",
      "Ámbito donde se va a trabajar\n(temporal / espacial)",
    ],
  },
  {
    id: "objetivos",
    title: "Objetivos de Investigación",
    formula: "VERBO + VARIABLE + UNIDAD DE OBSERVACIÓN + CONTEXTO",
    leaves: [
      "Acción cognitiva",
      "Atributos que se van a analizar",
      "Sujetos sobre los que se producirá el conocimiento",
      "Contexto en que se conocerá el fenómeno bajo estudio",
    ],
  },
  {
    id: "hipotesis",
    title: "Hipótesis",
    formula:
      "RELACIÓN SUPUESTA + VARIABLES + UNIDAD DE OBSERVACIÓN + CONTEXTUALIZACIÓN",
    leaves: [
      "Es lo que se afirma",
      "Atributos que se consideran",
      "Sujetos en los que se observará la supuesta relación",
      "Condiciones bajo las cuales se realiza la observación",
    ],
  },
];

const MAX_STEP = 5;
const STEP_LABELS = [
  "Raíz",
  "Ramas",
  "Fórmulas",
  "Componentes · Problema",
  "Componentes · Objetivos",
  "Componentes · Hipótesis",
];
const LINE = "rgba(59,130,246,0.55)";

const nodeBase = {
  background:
    "linear-gradient(135deg,rgba(15,23,42,0.97) 0%,rgba(30,58,138,0.75) 100%)",
  border: "1.5px solid rgba(59,130,246,0.45)",
  borderRadius: 10,
  color: "#e2e8f0",
  backdropFilter: "blur(8px)",
  textAlign: "center",
};

// Wrapper que colapsa altura cuando está oculto (evita espacios vacíos)
function Reveal({ visible, delay = 0, maxH = 600, children }) {
  return (
    <div
      style={{
        width: "100%",
        maxHeight: visible ? maxH : 0,
        overflow: "hidden",
        opacity: visible ? 1 : 0,
        transition: `max-height 0.4s ease ${delay}s, opacity 0.35s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function Formula({ text }) {
  const parts = text.split("+");
  return (
    <>
      {parts.map((part, i) => (
        <React.Fragment key={i}>
          {part.trim()}
          {i < parts.length - 1 && (
            <span
              style={{ color: "#fbbf24", fontWeight: 800, margin: "0 5px" }}
            >
              +
            </span>
          )}
        </React.Fragment>
      ))}
    </>
  );
}

function btnStyle(disabled) {
  return {
    padding: "8px 20px",
    background: disabled ? "rgba(30,41,59,0.4)" : "rgba(30,58,138,0.7)",
    border: `1px solid ${
      disabled ? "rgba(59,130,246,0.2)" : "rgba(59,130,246,0.6)"
    }`,
    borderRadius: 8,
    color: disabled ? "#475569" : "#e2e8f0",
    cursor: disabled ? "default" : "pointer",
    fontSize: 13,
    fontWeight: 600,
  };
}

export default function ConceptMapModal({ onClose }) {
  const [step, setStep] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(
    () => window.innerWidth < 640,
  );
  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        alignItems: isSmallScreen ? "flex-start" : "center",
        overflow: "auto",
        paddingBottom: isSmallScreen ? 0 : 72,
      }}
    >
      {/* ── Cerrar ── */}
      <button
        onClick={onClose}
        style={{
          position: isSmallScreen ? "sticky" : "fixed",
          top: 16,
          right: isSmallScreen ? undefined : 16,
          alignSelf: isSmallScreen ? "flex-end" : undefined,
          marginRight: isSmallScreen ? 16 : undefined,
          zIndex: 52,
          width: 36,
          height: 36,
          flexShrink: 0,
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
          margin: "20px 0 0",
        }}
      >
        RELACIÓN ENTRE PROBLEMA, OBJETIVOS E HIPÓTESIS DE INVESTIGACIÓN
      </p>

      <div
        style={{
          width: "100%",
          maxWidth: 980,
          minWidth: isSmallScreen ? "560px" : undefined,
          padding: "16px 16px 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* ── Nodo raíz ── */}
        <div
          style={{
            ...nodeBase,
            border: "2px solid rgba(59,130,246,0.75)",
            padding: "14px 48px",
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: "0.06em",
            color: "#f1f5f9",
          }}
        >
          Componentes
        </div>

        {/* ── Conector raíz → 3 ramas (T invertida) ── */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: 40,
            opacity: step >= 1 ? 1 : 0,
            transition: "opacity 0.35s ease",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: 2,
              height: 20,
              background: LINE,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 20,
              left: "calc(100% / 6)",
              right: "calc(100% / 6)",
              height: 2,
              background: LINE,
            }}
          />
          {[1 / 6, 1 / 2, 5 / 6].map((pos, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: 20,
                left: `calc(${pos * 100}% - 1px)`,
                width: 2,
                height: 20,
                background: LINE,
              }}
            />
          ))}
        </div>

        {/* ── 3 columnas ── */}
        <div
          style={{
            display: "flex",
            gap: 12,
            width: "100%",
            alignItems: "flex-start",
          }}
        >
          {BRANCHES.map((branch, i) => {
            const formulaVisible = step >= 2;
            const leavesVisible = step >= 3 + i;

            return (
              <div
                key={branch.id}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {/* Título de rama */}
                <Reveal visible={step >= 1} delay={i * 0.08}>
                  <div
                    style={{
                      ...nodeBase,
                      padding: "10px 8px",
                      fontSize: 16,
                      fontWeight: 700,
                      color: "#bfdbfe",
                    }}
                  >
                    {branch.title}
                  </div>
                </Reveal>

                {/* Conector vertical + fórmula */}
                <Reveal visible={formulaVisible} delay={i * 0.06} maxH={200}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <div style={{ width: 2, height: 16, background: LINE }} />
                    <div style={{ width: "100%" }}>
                      <div
                        style={{
                          ...nodeBase,
                          border: "1.5px solid rgba(99,102,241,0.55)",
                          background:
                            "linear-gradient(135deg,rgba(15,23,42,0.97) 0%,rgba(49,46,129,0.97) 100%)",
                          padding: "10px 8px",
                          fontSize: 14,
                          fontWeight: 700,
                          color: "#c7d2fe",
                          letterSpacing: "0.03em",
                        }}
                      >
                        <Formula text={branch.formula} />
                      </div>
                    </div>
                  </div>
                </Reveal>

                {/* Conector en codo (L) + hojas desplazadas a la derecha */}
                <Reveal visible={leavesVisible} delay={i * 0.1} maxH={600}>
                  {/*
                   * Codo: baja desde el centro de la fórmula,
                   * gira a la izquierda y baja al tronco.
                   */}
                  <div
                    style={{ position: "relative", width: "100%", height: 24 }}
                  >
                    {/* Bajada vertical desde centro */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: 2,
                        height: 12,
                        background: LINE,
                      }}
                    />
                    {/* Rama horizontal hacia la izquierda */}
                    <div
                      style={{
                        position: "absolute",
                        top: 12,
                        left: 0,
                        width: "calc(50% + 1px)",
                        height: 2,
                        background: LINE,
                      }}
                    />
                    {/* Bajada vertical al inicio del tronco */}
                    <div
                      style={{
                        position: "absolute",
                        top: 12,
                        left: 0,
                        width: 2,
                        height: 12,
                        background: LINE,
                      }}
                    />
                  </div>

                  {/* Tronco principal + ramas horizontales a cada hoja */}
                  <div style={{ width: "100%" }}>
                    {branch.leaves.map((leaf, j) => {
                      const isLast = j === branch.leaves.length - 1;
                      return (
                        <div
                          key={j}
                          style={{
                            position: "relative",
                            paddingLeft: 20,
                            marginBottom: isLast ? 0 : 6,
                          }}
                        >
                          {/* Segmento de tronco (sube desde arriba hasta el centro,
                              y baja hasta el siguiente ítem si no es el último) */}
                          <div
                            style={{
                              position: "absolute",
                              left: 0,
                              top: 0,
                              bottom: isLast ? "50%" : -6,
                              width: 2,
                              background: LINE,
                            }}
                          />
                          {/* Rama horizontal 90° hacia la caja */}
                          <div
                            style={{
                              position: "absolute",
                              left: 0,
                              top: "calc(50% - 1px)",
                              width: 20,
                              height: 2,
                              background: LINE,
                            }}
                          />
                          {/* Caja hoja — desplazada a la derecha del tronco */}
                          <div
                            style={{
                              ...nodeBase,
                              border: "1px solid rgba(59,130,246,0.3)",
                              padding: "7px 10px",
                              fontSize: 13,
                              color: "#cbd5e1",
                              whiteSpace: "pre-line",
                              textAlign: "left",
                            }}
                          >
                            {leaf}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Barra de navegación inferior ── */}
      <div
        style={{
          position: isSmallScreen ? "sticky" : "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          marginTop: isSmallScreen ? "auto" : undefined,
          width: isSmallScreen ? "100%" : undefined,
          zIndex: 51,
          background: "rgba(8,14,30,0.96)",
          borderTop: "1px solid rgba(59,130,246,0.2)",
          padding: "12px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <button
          style={btnStyle(step <= 0)}
          disabled={step <= 0}
          onClick={() => setStep((s) => Math.max(s - 1, 0))}
        >
          ← Anterior
        </button>
        <span style={{ color: "#64748b", fontSize: 12 }}>
          {step}/{MAX_STEP}
        </span>
        <button
          style={btnStyle(step >= MAX_STEP)}
          disabled={step >= MAX_STEP}
          onClick={() => setStep((s) => Math.min(s + 1, MAX_STEP))}
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}
