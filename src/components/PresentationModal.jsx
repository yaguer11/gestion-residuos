import React from "react";

function renderStep(step, index) {
  const stepCardBase = {
    background: "rgba(241, 245, 249, 0.95)",
    borderRadius: "14px",
    border: "1px solid rgba(148, 163, 184, 0.5)",
    padding: "12px 14px",
    display: "grid",
    gap: "10px",
    boxShadow: "0 14px 30px rgba(15, 23, 42, 0.08)",
    animation: "step-reveal 0.28s ease-out",
  };

  const stepTitle = {
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.14em",
    color: "#0f766e",
    fontWeight: 700,
  };

  if (step.type === "hero") {
    return (
      <div
        key={`${step.title}-${index}`}
        style={{
          ...stepCardBase,
          background: "linear-gradient(135deg, #ffffff 0%, #eef2ff 100%)",
          border: "1px solid rgba(59, 130, 246, 0.35)",
        }}
      >
        <div style={stepTitle}>{step.title}</div>
        <div
          style={{
            fontSize: "16px",
            fontWeight: 600,
            lineHeight: 1.55,
            color: "#0f172a",
          }}
        >
          {step.text}
        </div>
        {step.note && (
          <div style={{ fontSize: "12px", color: "#475569" }}>{step.note}</div>
        )}
      </div>
    );
  }

  if (step.type === "list") {
    return (
      <div key={`${step.title}-${index}`} style={stepCardBase}>
        <div style={stepTitle}>{step.title}</div>
        <div style={{ display: "grid", gap: "8px" }}>
          {step.items.map((item, itemIndex) => (
            <div
              key={`${item}-${itemIndex}`}
              style={{
                display: "grid",
                gridTemplateColumns: "20px 1fr",
                gap: "8px",
                padding: "8px 10px",
                borderRadius: "10px",
                background: "rgba(255, 255, 255, 0.9)",
                border: "1px solid rgba(148, 163, 184, 0.35)",
              }}
            >
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "6px",
                  background: "rgba(59, 130, 246, 0.12)",
                  color: "#1d4ed8",
                  display: "grid",
                  placeItems: "center",
                  fontSize: "11px",
                  fontWeight: 700,
                }}
              >
                {itemIndex + 1}
              </div>
              <div style={{ fontSize: "13px", color: "#0f172a" }}>{item}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (step.type === "schema") {
    return (
      <div key={`${step.title}-${index}`} style={stepCardBase}>
        <div style={stepTitle}>{step.title}</div>
        <div style={{ display: "grid", gap: "8px" }}>
          {step.items.map((item) => (
            <div
              key={item.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
                padding: "8px 10px",
                borderRadius: "8px",
                background: "#ffffff",
                border: "1px solid rgba(148, 163, 184, 0.4)",
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
        </div>
      </div>
    );
  }

  if (step.type === "grid") {
    return (
      <div key={`${step.title}-${index}`} style={stepCardBase}>
        <div style={stepTitle}>{step.title}</div>
        <div
          style={{
            display: "grid",
            gap: "10px",
            gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
          }}
        >
          {step.items.map((item) => (
            <div
              key={item.title}
              style={{
                padding: "10px 12px",
                borderRadius: "10px",
                background: "rgba(255, 255, 255, 0.95)",
                border: "1px solid rgba(148, 163, 184, 0.35)",
                display: "grid",
                gap: "6px",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#0f172a",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                {item.title}
              </div>
              <div style={{ fontSize: "12px", color: "#475569" }}>
                {item.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

export default function PresentationModal({
  slide,
  slideIndex,
  revealIndex,
  hasDynamicStep,
  visibleBlocks,
  totalSteps,
  atLastStep,
  atEnd,
  progress,
  onNextBlock,
  onPrevBlock,
  onNextSlide,
  onPrev,
  onClose,
  onOpenConceptMap,
  onOpenOperacionalizacion,
}) {
  const fixedStep = slide.steps[0];
  const dynamicSteps = slide.steps.slice(1);
  const activeDynamicStep =
    hasDynamicStep && revealIndex >= 0 ? dynamicSteps[revealIndex] : null;
  const blockStatusLabel = hasDynamicStep
    ? revealIndex >= 0
      ? `bloque ${revealIndex + 1} de ${Math.max(totalSteps - 1, 1)}`
      : "inicio"
    : "sin bloques dinámicos";

  const handleCardClick = (event) => {
    if (
      event.target.closest("button") ||
      event.target.closest("input") ||
      event.target.closest("textarea") ||
      event.target.closest("a")
    ) {
      return;
    }
    if (hasDynamicStep) {
      onNextBlock();
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background:
          "radial-gradient(circle at 20% 20%, rgba(148, 163, 184, 0.12), transparent 55%), radial-gradient(circle at 80% 30%, rgba(59, 130, 246, 0.12), transparent 50%), rgba(15, 23, 42, 0.12)",
        backdropFilter: "blur(2px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 20,
        padding: "24px",
      }}
      className="intro-overlay"
    >
      <div
        style={{
          width: "860px",
          maxWidth: "92vw",
          height: "auto",
          maxHeight: "90vh",
          background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
          border: "1px solid rgba(148, 163, 184, 0.6)",
          borderRadius: "16px",
          padding: "22px 24px",
          color: "#0f172a",
          boxShadow: "0 18px 50px rgba(15, 23, 42, 0.18)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          cursor: hasDynamicStep && !atEnd ? "pointer" : "default",
        }}
        className="intro-card"
        onClick={handleCardClick}
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
            {slide.icon}
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
              {slide.title}
            </div>
            <div
              style={{
                fontSize: "13px",
                color: "#475569",
                fontFamily: "'Space Grotesk', 'Rubik', sans-serif",
              }}
            >
              {slide.subtitle}
            </div>
          </div>
          <div
            style={{
              marginLeft: "auto",
              display: "grid",
              justifyItems: "end",
              gap: "6px",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "6px",
                flexWrap: "wrap",
                justifyContent: "flex-end",
              }}
            >
              {slide.tags.map((tag) => (
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
            <div style={{ fontSize: "11px", color: "#64748b" }}>
              {visibleBlocks} / {totalSteps}
            </div>
            <div
              style={{
                width: "140px",
                height: "6px",
                borderRadius: "999px",
                background: "rgba(148, 163, 184, 0.35)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: "100%",
                  background:
                    "linear-gradient(90deg, #38bdf8 0%, #2563eb 100%)",
                }}
              />
            </div>
          </div>
        </div>

        <div
          className="intro-content"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "16px",
            marginTop: "18px",
            flex: 1,
            overflowY: "auto",
            paddingBottom: "12px",
          }}
        >
          {renderStep(fixedStep, 0)}
          {activeDynamicStep
            ? renderStep(activeDynamicStep, revealIndex + 1)
            : null}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            marginTop: "10px",
          }}
        >
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              type="button"
              onClick={onPrevBlock}
              disabled={!hasDynamicStep || revealIndex < 0}
              aria-label="Bloque anterior"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "999px",
                background:
                  !hasDynamicStep || revealIndex < 0 ? "#e2e8f0" : "#2563eb",
                color:
                  !hasDynamicStep || revealIndex < 0 ? "#94a3b8" : "#ffffff",
                border: "1px solid rgb(203, 213, 225)",
                cursor:
                  !hasDynamicStep || revealIndex < 0 ? "default" : "pointer",
                display: "grid",
                placeItems: "center",
                fontSize: "18px",
              }}
            >
              ←
            </button>
            <button
              type="button"
              onClick={onNextBlock}
              disabled={!hasDynamicStep || atLastStep}
              aria-label="Bloque siguiente"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "999px",
                background:
                  !hasDynamicStep || atLastStep ? "#e2e8f0" : "#2563eb",
                color: !hasDynamicStep || atLastStep ? "#94a3b8" : "#ffffff",
                border: "1px solid #cbd5e1",
                cursor: !hasDynamicStep || atLastStep ? "default" : "pointer",
                display: "grid",
                placeItems: "center",
                fontSize: "18px",
              }}
            >
              →
            </button>
          </div>
        </div>
        {/* Botón mapa conceptual — solo en la lámina "Objetivos e hipótesis" */}
        {slide.key === "objetivos" && onOpenConceptMap && (
          <div style={{ marginTop: "10px" }}>
            <button
              type="button"
              onClick={onOpenConceptMap}
              style={{
                padding: "8px 14px",
                background: "#eef2ff",
                color: "#1d4ed8",
                border: "1px solid #bfdbfe",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: 13,
              }}
            >
              Componentes
            </button>
          </div>
        )}

        {/* Botón operacionalización — solo en la lámina "Marco teórico" */}
        {slide.key === "marco" && onOpenOperacionalizacion && (
          <div style={{ marginTop: "10px" }}>
            <button
              type="button"
              onClick={onOpenOperacionalizacion}
              style={{
                padding: "8px 14px",
                background: "#eef2ff",
                color: "#1d4ed8",
                border: "1px solid #bfdbfe",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: 13,
              }}
            >
              TAM
            </button>
          </div>
        )}

        <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
          <button
            type="button"
            onClick={onClose}
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
              onClick={onPrev}
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
              onClick={onNextSlide}
              disabled={!atLastStep || atEnd}
              style={{
                padding: "8px 12px",
                background: !atLastStep || atEnd ? "#e2e8f0" : "#2563eb",
                color: !atLastStep || atEnd ? "#94a3b8" : "#ffffff",
                border: "1px solid #1d4ed8",
                borderRadius: "8px",
                cursor: !atLastStep || atEnd ? "default" : "pointer",
              }}
            >
              {atEnd ? "Fin" : "Siguiente lamina"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
