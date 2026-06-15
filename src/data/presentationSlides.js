export const PRESENTATION_SLIDES = [
  {
    key: "planteamiento",
    icon: "🧭",
    title: "Planteamiento y justificación",
    subtitle: "Del problema real a la necesidad de investigar",
    tags: ["Contexto", "Impacto"],
    steps: [
      {
        type: "list",
        title: "Situación problemática",
        items: [
          "Desincronización entre horarios de recolección y depósito de desechos.",
          "Obstrucción de desagües pluviales y proliferación de microbasurales.",
          "Aumento de costos operativos municipales por camiones de refuerzo.",
          "Afectación directa a la higiene urbana y el gasto público.",
        ],
      },
      {
        type: "grid",
        title: "Contextualización del problema",
        items: [
          {
            title: "Ámbito General",
            text: "Presiones presupuestarias y ambientales en la gestión global de residuos sólidos urbanos.",
          },
          {
            title: "Escenario Regional",
            text: "Desafíos de optimización operativa y brechas de comunicación en ciudades intermedias.",
          },
          {
            title: "Contexto Local",
            text: "Villa Mercedes: desinformación ciudadana y desincronización horaria en el servicio local.",
          },
        ],
      },
      {
        type: "grid",
        title: "Justificación",
        items: [
          {
            title: "Social",
            text: "Disminución de la desinformación para optimizar la higiene en los barrios.",
          },
          {
            title: "Operativa",
            text: "Reducción del despliegue de camiones de refuerzo y ahorro de gasto público.",
          },
          {
            title: "Teórica",
            text: "Aporte de evidencia empírica sobre la relación entre acceso a la información y conducta ambiental.",
          },
          {
            title: "Metodológica",
            text: "Instrumento estructurado y validado replicable en municipios con problemáticas análogas.",
          },
        ],
      },
    ],
  },
  {
    key: "pregunta",
    icon: "🔍",
    title: "Pregunta de investigación",
    subtitle: "Formulación clara y delimitada",
    tags: ["Problema", "Delimitación"],
    steps: [
      {
        type: "hero",
        title: "Pregunta central del Trabajo Final",
        text: "¿Qué grado de aceptación tendría una aplicación web de alertas vecinales enfocada en la gestión de residuos urbanos en los residentes de Villa Mercedes y en qué medida su uso contribuye a la optimización del servicio de recolección durante el año 2026?",
      },
      {
        type: "schema",
        title: "Componentes de la pregunta",
        items: [
          {
            label: "Palabra interrogativa",
            value: "¿Qué...? / ¿En qué medida...?",
          },
          {
            label: "Variable Independiente (Causa)",
            value:
              "Implementación y uso de la aplicación web de alertas vecinales",
          },
          {
            label: "Variables Dependientes (Efectos)",
            value:
              "Grado de aceptación ciudadana y Optimización del servicio de recolección",
          },
          {
            label: "Unidad de análisis",
            value: "Residentes de Villa Mercedes",
          },
          {
            label: "Contexto espaciotemporal",
            value: "Villa Mercedes, San Luis (Año 2026)",
          },
        ],
      },
      {
        type: "list",
        title: "Criterios metodológicos cumplidos",
        items: [
          "Medible de forma objetiva, la variable debe poder traducirse en datos",
          "Abierta, orientada a la cuantificación de una variable, no a un sí/no.",
          "Redactada sin juicios de valor ni adjetivos subjetivos.",
          "Delimitada rigurosamente en tiempo, espacio y población.",
        ],
      },
    ],
  },
  {
    key: "objetivos",
    icon: "🎯",
    title: "Objetivos e hipótesis",
    subtitle: "Dirección y contrastación de la investigación",
    tags: ["Metas", "Hipótesis"],
    steps: [
      {
        type: "hero",
        title: "Objetivo General",
        text: "Evaluar el grado de aceptación de una aplicación web de alertas vecinales enfocada en la gestión de residuos urbanos en los residentes de Villa Mercedes y determinar en qué medida su uso contribuye a la optimización del servicio de recolección durante el año 2026.",
      },
      {
        type: "list",
        title: "Objetivos Específicos",
        items: [
          "Determinar el nivel actual de acceso a la información sobre los horarios de recolección de basura que poseen los vecinos de Villa Mercedes.",
          "Evaluar el grado de aceptación de la aplicación web mediante el monitoreo de métricas e indicadores de uso.",
          "Determinar el volumen de trabajo de los camiones municipales de refuerzo antes y después de la implementación",
        ],
      },
      {
        type: "hero",
        title: "Hipótesis de Trabajo",
        text: "La ciudadanía de Villa Mercedes presenta un alto grado de aceptación hacia la implementación de una aplicación web de alertas vecinales, lo que a su vez produce una reducción en el volumen de trabajo y costos de los camiones municipales de refuerzo.",
      },
    ],
  },
  {
    key: "marco",
    icon: "📚",
    title: "Marco teórico",
    subtitle: "Bases conceptuales de la investigación",
    tags: ["TAM", "RSU"],
    steps: [
      {
        type: "grid",
        title: "Ejes teóricos fundamentales",
        items: [
          {
            title: "Gestión de RSU",
            text: "Servicio de recolección, desincronización horaria e higiene urbana.",
          },
          {
            title: "Comunicación Pública",
            text: "Brechas informacionales e impacto en las conductas ciudadanas ambientales.",
          },
          {
            title: "Tecnología Cívica",
            text: "Plataformas digitales orientadas a la participación y optimización de servicios locales.",
          },
          {
            title: "Aceptación Tecnológica",
            text: "Modelos teóricos de adopción de innovaciones en entornos comunitarios.",
          },
        ],
      },
      {
        type: "schema",
        title: "Modelo de Aceptación Tecnológica (TAM)",
        items: [
          {
            label: "Utilidad Percibida",
            value:
              "Percepción del vecino sobre la mejora en la recolección y limpieza.",
          },
          {
            label: "Facilidad de Uso Percibida",
            value:
              "Esfuerzo requerido para interactuar con la interfaz de alertas.",
          },
          {
            label: "Intención de Adopción",
            value:
              "Disposición declarada y real para integrar la herramienta en la rutina diaria.",
          },
        ],
      },
    ],
  },
  {
    key: "metodo",
    icon: "🧪",
    title: "Marco metodológico",
    subtitle: "Estrategia y diseño de la investigación",
    tags: ["Cuantitativo", "Aplicada"],
    steps: [
      {
        type: "schema",
        title: "Enfoque y Alcance",
        items: [
          {
            label: "Enfoque",
            value: "Cuantitativo, busca medir valores numéricos objetivos",
          },
          {
            label: "Finalidad",
            value:
              "Aplicada, orientada a resolver un problema concreto de desinformación",
          },
          {
            label: "Alcance",
            value: "Explicativo, busca comprobar relaciones de causa-efecto",
          },
          {
            label: "Diseño y Dimensión",
            value:
              "Cuasi-experimental y Longitudinal, medición del antes y después",
          },
        ],
      },
      {
        type: "schema",
        title: "Población y Muestra",
        items: [
          {
            label: "Población",
            value: "Vecinos residentes de la ciudad de Villa Mercedes",
          },
          {
            label: "Muestreo",
            value:
              "Probabilístico Estratificado (asegura representación proporcional por zonas)",
          },
          {
            label: "Cálculo Muestral",
            value: "Fórmula para poblaciones finitas (95% confianza, 5% error)",
          },
        ],
      },
      {
        type: "list",
        title: "Técnicas e Instrumentos",
        items: [
          "1. Cuestionario estructurado (Escala Likert) basado en el Modelo TAM.",
          "2. Métricas de uso del sistema (Analítica de adopción y retención de la app).",
          "3. Métricas de impacto operativo (Tiempos de camiones de refuerzo antes/después).",
        ],
      },
    ],
  },
];
