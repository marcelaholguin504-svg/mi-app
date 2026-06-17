import { useState } from "react";

// TODO: Replace with actual BetterMe API integration
// TODO: Add real user tracking / analytics

const COLORS = {
  themePrimary: "#332726",
  themeAccent: "#806D59",
  bgPrimary: "#FFFCF5",
  bgSecondary: "#F7F1E8",
  bgInverse: "#311E17",
  contentPrimary: "#1F1000",
  contentSecondary: "rgba(31, 16, 0, 0.72)",
  contentTertiary: "rgba(31, 16, 0, 0.56)",
  contentPositive: "#71A31D",
  contentNegative: "#E15651",
  contentWarning: "#E9A43F",
  borderTertiary: "rgba(31, 16, 0, 0.08)",
  answerBg: "#FFFCF5",
  answerBgActive: "#F7F1E8",
  answerBorder: "#F1EADF",
  answerBorderActive: "#F7F1E8",
};

const LOGO_URL =
  "https://image-service.betterme.world/57355568-8766-44a5-a327-6266bc0080f7/image/upload/f_auto/q_auto:eco/fl_lossy/c_fit/vlzgadxfpkojbod5mcro";

const AGE_CARDS = [
  {
    id: "18-29",
    label: "18–29",
    img: "https://image-service.betterme.world/57355568-8766-44a5-a327-6266bc0080f7/image/upload/c_fill,w_512/f_webp/q_auto:eco/fl_lossy/c_fit/a8fwzajystyopuejnf9j",
  },
  {
    id: "30-39",
    label: "30–39",
    img: "https://image-service.betterme.world/57355568-8766-44a5-a327-6266bc0080f7/image/upload/c_fill,w_512/f_webp/q_auto:eco/fl_lossy/c_fit/glxh8naie0nmqmbkr5yb",
  },
  {
    id: "40-49",
    label: "40–49",
    img: "https://image-service.betterme.world/57355568-8766-44a5-a327-6266bc0080f7/image/upload/c_fill,w_512/f_webp/q_auto:eco/fl_lossy/c_fit/ytmbjwz6tdjp2rxl2zaf",
  },
  {
    id: "50+",
    label: "50+",
    img: "https://image-service.betterme.world/57355568-8766-44a5-a327-6266bc0080f7/image/upload/c_fill,w_512/f_webp/q_auto:eco/fl_lossy/c_fit/edqxixuxdwnunmimdlc0",
  },
];

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "¿Cuál es tu objetivo principal?",
    type: "single",
    options: [
      { id: "a", emoji: "🏋️", text: "Perder peso" },
      { id: "b", emoji: "💪", text: "Tonificar el cuerpo" },
      { id: "c", emoji: "🧘", text: "Mejorar la flexibilidad" },
      { id: "d", emoji: "❤️", text: "Mejorar la salud general" },
    ],
  },
  {
    id: 2,
    question: "¿Cuál es tu nivel de experiencia con el Pilates?",
    type: "single",
    options: [
      { id: "a", emoji: "🌱", text: "Principiante total" },
      { id: "b", emoji: "📚", text: "He probado algunas clases" },
      { id: "c", emoji: "🏃", text: "Practico regularmente" },
      { id: "d", emoji: "⭐", text: "Nivel avanzado" },
    ],
  },
  {
    id: 3,
    question: "¿Cuánto tiempo puedes dedicar al entrenamiento al día?",
    type: "single",
    options: [
      { id: "a", emoji: "⚡", text: "Menos de 15 minutos" },
      { id: "b", emoji: "🕐", text: "15 – 30 minutos" },
      { id: "c", emoji: "🕑", text: "30 – 45 minutos" },
      { id: "d", emoji: "🕒", text: "Más de 45 minutos" },
    ],
  },
  {
    id: 4,
    question: "¿Con qué frecuencia quieres entrenar?",
    type: "single",
    options: [
      { id: "a", emoji: "📅", text: "2–3 veces por semana" },
      { id: "b", emoji: "🗓️", text: "4–5 veces por semana" },
      { id: "c", emoji: "💯", text: "Todos los días" },
      { id: "d", emoji: "🔄", text: "Según me lo pida el cuerpo" },
    ],
  },
  {
    id: 5,
    question: "¿Tienes alguna limitación física o lesión?",
    type: "single",
    options: [
      { id: "a", emoji: "✅", text: "No, estoy en perfectas condiciones" },
      { id: "b", emoji: "🦵", text: "Problemas en rodillas o piernas" },
      { id: "c", emoji: "🔙", text: "Dolor de espalda o columna" },
      { id: "d", emoji: "🤷", text: "Otras limitaciones" },
    ],
  },
  {
    id: 6,
    question: "¿Cómo describirías tu alimentación actual?",
    type: "single",
    options: [
      { id: "a", emoji: "🥗", text: "Equilibrada y saludable" },
      { id: "b", emoji: "🍕", text: "Como de todo sin restricciones" },
      { id: "c", emoji: "🌿", text: "Vegetariana o vegana" },
      { id: "d", emoji: "🔄", text: "Estoy intentando mejorarla" },
    ],
  },
  {
    id: 7,
    question: "¿Qué área del cuerpo quieres trabajar más?",
    type: "multi",
    options: [
      { id: "a", emoji: "🫃", text: "Abdomen y core" },
      { id: "b", emoji: "🍑", text: "Glúteos y piernas" },
      { id: "c", emoji: "💪", text: "Brazos y hombros" },
      { id: "d", emoji: "🔙", text: "Espalda y postura" },
    ],
  },
  {
    id: 8,
    question: "¿Qué te motivó a empezar con Pilates?",
    type: "single",
    options: [
      { id: "a", emoji: "👯", text: "Lo recomendó un amigo o familiar" },
      { id: "b", emoji: "📱", text: "Lo vi en redes sociales" },
      { id: "c", emoji: "👨‍⚕️", text: "Recomendación médica" },
      { id: "d", emoji: "💡", text: "Investigación propia" },
    ],
  },
];

const RESULTS = {
  title: "¡Tu plan personalizado está listo!",
  subtitle: "Basado en tus respuestas, hemos creado el plan de Pilates perfecto para ti",
  features: [
    { icon: "🧘", title: "Rutinas adaptadas", desc: "Ejercicios específicos para tu nivel y objetivos" },
    { icon: "🥗", title: "Guía nutricional", desc: "Plan de alimentación personalizado según tu perfil" },
    { icon: "📈", title: "Seguimiento de progreso", desc: "Monitoriza tus avances día a día" },
    { icon: "🎯", title: "Metas alcanzables", desc: "Objetivos realistas basados en tu disponibilidad" },
  ],
};

// ──────────────────────────────────────────────────────────────
// Sub-components
// ──────────────────────────────────────────────────────────────

function Header({ onMenuClick }) {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 20px",
        backgroundColor: COLORS.bgPrimary,
        borderBottom: `1px solid ${COLORS.borderTertiary}`,
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <img
        src={LOGO_URL}
        alt="BetterMe logo"
        style={{ height: 32, objectFit: "contain" }}
        // TODO: Replace with local asset if CORS issues arise
      />
      <button
        onClick={onMenuClick}
        aria-label="Menú"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          gap: 5,
          padding: 8,
        }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              display: "block",
              width: 22,
              height: 2,
              backgroundColor: COLORS.contentPrimary,
              borderRadius: 2,
            }}
          />
        ))}
      </button>
    </header>
  );
}

function MenuDrawer({ open, onClose }) {
  return (
    <>
      {open && (
        <div
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.4)",
            zIndex: 200,
          }}
        />
      )}
      <nav
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100%",
          width: 260,
          backgroundColor: COLORS.bgPrimary,
          zIndex: 300,
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease",
          boxShadow: "-4px 0 20px rgba(0,0,0,0.15)",
          display: "flex",
          flexDirection: "column",
          padding: "60px 24px 32px",
          gap: 8,
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 24,
            color: COLORS.contentPrimary,
          }}
        >
          ✕
        </button>
        {["Inicio", "Sobre nosotros", "Privacidad", "Términos y condiciones", "Contacto"].map(
          (item) => (
            <button
              key={item}
              onClick={onClose}
              style={{
                background: "none",
                border: "none",
                textAlign: "left",
                padding: "12px 0",
                fontSize: 16,
                fontWeight: 500,
                color: COLORS.contentPrimary,
                cursor: "pointer",
                borderBottom: `1px solid ${COLORS.borderTertiary}`,
                // TODO: Add real navigation routes
              }}
            >
              {item}
            </button>
          )
        )}
      </nav>
    </>
  );
}

function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div style={{ padding: "12px 20px 0" }}>
      <div
        style={{
          height: 4,
          backgroundColor: COLORS.borderTertiary,
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            backgroundColor: COLORS.themePrimary,
            borderRadius: 8,
            transition: "width 0.4s ease",
          }}
        />
      </div>
      <p
        style={{
          textAlign: "right",
          fontSize: 12,
          color: COLORS.contentTertiary,
          marginTop: 4,
        }}
      >
        {current}/{total}
      </p>
    </div>
  );
}

function AgeCard({ card, onClick, hoveredId, setHoveredId }) {
  const isHovered = hoveredId === card.id;
  return (
    <button
      onClick={() => onClick(card.id)}
      onMouseEnter={() => setHoveredId(card.id)}
      onMouseLeave={() => setHoveredId(null)}
      style={{
        background: "none",
        border: `2px solid ${isHovered ? COLORS.themeAccent : COLORS.answerBorder}`,
        borderRadius: 16,
        cursor: "pointer",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transition: "border-color 0.2s, transform 0.2s, box-shadow 0.2s",
        transform: isHovered ? "translateY(-4px) scale(1.02)" : "none",
        boxShadow: isHovered
          ? "0 8px 24px rgba(51, 39, 38, 0.15)"
          : "0 2px 8px rgba(51, 39, 38, 0.06)",
        backgroundColor: COLORS.answerBg,
        flex: "1 1 calc(50% - 8px)",
        minWidth: 0,
        maxWidth: "calc(50% - 8px)",
      }}
    >
      <img
        src={card.img}
        alt={`Grupo de edad ${card.label}`}
        style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover" }}
        // TODO: Add fallback image on error
      />
      <p
        style={{
          padding: "10px 0 12px",
          fontSize: 18,
          fontWeight: 700,
          color: COLORS.contentPrimary,
          margin: 0,
        }}
      >
        {card.label}
      </p>
    </button>
  );
}

function AnswerOption({ option, selected, multi, onClick }) {
  const [hovered, setHovered] = useState(false);
  const active = selected;
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "14px 16px",
        backgroundColor:
          active
            ? COLORS.answerBgActive
            : hovered
            ? COLORS.bgSecondary
            : COLORS.answerBg,
        border: `1.5px solid ${active ? COLORS.themeAccent : COLORS.answerBorder}`,
        borderRadius: 16,
        cursor: "pointer",
        transition: "all 0.2s ease",
        textAlign: "left",
      }}
    >
      {multi && (
        <span
          style={{
            width: 20,
            height: 20,
            borderRadius: 6,
            border: `2px solid ${active ? COLORS.themeAccent : COLORS.borderTertiary}`,
            backgroundColor: active ? COLORS.themeAccent : "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "all 0.2s",
          }}
        >
          {active && (
            <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
              <path
                d="M1 4L4.5 7.5L11 1"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>
      )}
      <span style={{ fontSize: 22 }}>{option.emoji}</span>
      <span
        style={{
          fontSize: 15,
          fontWeight: active ? 600 : 400,
          color: COLORS.contentPrimary,
          lineHeight: 1.4,
        }}
      >
        {option.text}
      </span>
      {!multi && (
        <span
          style={{
            marginLeft: "auto",
            width: 20,
            height: 20,
            borderRadius: "50%",
            border: `2px solid ${active ? COLORS.themeAccent : COLORS.borderTertiary}`,
            backgroundColor: active ? COLORS.themeAccent : "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "all 0.2s",
          }}
        >
          {active && (
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#fff",
                display: "block",
              }}
            />
          )}
        </span>
      )}
    </button>
  );
}

function QuestionStep({ question, onAnswer, onNext, answers }) {
  const isMulti = question.type === "multi";
  const currentAnswers = answers[question.id] || [];
  const hasAnswer = currentAnswers.length > 0;

  const handleSelect = (optId) => {
    if (isMulti) {
      const updated = currentAnswers.includes(optId)
        ? currentAnswers.filter((x) => x !== optId)
        : [...currentAnswers, optId];
      onAnswer(question.id, updated);
    } else {
      onAnswer(question.id, [optId]);
      setTimeout(() => onNext(), 350);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        animation: "fadeSlideIn 0.35s ease",
      }}
    >
      <h2
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: COLORS.contentPrimary,
          margin: "0 0 4px",
          lineHeight: 1.35,
        }}
      >
        {question.question}
      </h2>
      {isMulti && (
        <p style={{ fontSize: 13, color: COLORS.contentTertiary, margin: "0 0 4px" }}>
          Puedes elegir varias opciones
        </p>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {question.options.map((opt) => (
          <AnswerOption
            key={opt.id}
            option={opt}
            selected={currentAnswers.includes(opt.id)}
            multi={isMulti}
            onClick={() => handleSelect(opt.id)}
          />
        ))}
      </div>
      {isMulti && (
        <button
          onClick={onNext}
          disabled={!hasAnswer}
          style={{
            marginTop: 8,
            padding: "14px 48px",
            backgroundColor: hasAnswer ? COLORS.themePrimary : "rgba(51,39,38,0.3)",
            color: "#fff",
            border: "none",
            borderRadius: 24,
            fontSize: 16,
            fontWeight: 600,
            cursor: hasAnswer ? "pointer" : "not-allowed",
            transition: "background-color 0.2s, transform 0.1s",
            width: "100%",
          }}
        >
          Continuar
        </button>
      )}
    </div>
  );
}

function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [label, setLabel] = useState("Analizando tus respuestas...");

  useState(() => {
    const labels = [
      "Analizando tus respuestas...",
      "Calculando tu perfil...",
      "Seleccionando ejercicios...",
      "Preparando tu plan nutricional...",
      "¡Casi listo!",
    ];
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setProgress(current * 20);
      if (labels[Math.floor(current / (100 / labels.length))]) {
        setLabel(labels[Math.floor(current / 22)] || labels[labels.length - 1]);
      }
      if (current >= 5) {
        clearInterval(interval);
        setTimeout(onDone, 400);
      }
    }, 600);
    return () => clearInterval(interval);
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        gap: 24,
        padding: "40px 20px",
        animation: "fadeSlideIn 0.4s ease",
      }}
    >
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          border: `4px solid ${COLORS.borderTertiary}`,
          borderTop: `4px solid ${COLORS.themePrimary}`,
          animation: "spin 1s linear infinite",
        }}
      />
      <h2
        style={{
          fontSize: 20,
          fontWeight: 700,
          color: COLORS.contentPrimary,
          textAlign: "center",
        }}
      >
        Creando tu plan personalizado
      </h2>
      <p style={{ fontSize: 15, color: COLORS.contentTertiary, textAlign: "center" }}>
        {label}
      </p>
      <div
        style={{
          width: "100%",
          maxWidth: 300,
          height: 6,
          backgroundColor: COLORS.borderTertiary,
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress * 20}%`,
            backgroundColor: COLORS.themePrimary,
            borderRadius: 8,
            transition: "width 0.5s ease",
          }}
        />
      </div>
    </div>
  );
}

function ResultScreen({ age, answers }) {
  const [hovered, setHovered] = useState(false);
  // TODO: Calculate personalized plan based on actual answers
  return (
    <div
      style={{
        animation: "fadeSlideIn 0.5s ease",
        paddingBottom: 40,
      }}
    >
      {/* Hero */}
      <div
        style={{
          background: `linear-gradient(135deg, ${COLORS.themePrimary} 0%, ${COLORS.themeAccent} 100%)`,
          padding: "32px 20px",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <span style={{ fontSize: 48 }}>🎉</span>
        <h2
          style={{
            fontSize: 24,
            fontWeight: 700,
            margin: "12px 0 8px",
            lineHeight: 1.3,
            color: "#fff",
          }}
        >
          {RESULTS.title}
        </h2>
        <p
          style={{
            fontSize: 15,
            color: "rgba(255,255,255,0.85)",
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          {RESULTS.subtitle}
        </p>
      </div>

      {/* Age badge */}
      <div
        style={{
          backgroundColor: COLORS.bgSecondary,
          margin: "0 20px",
          marginTop: -16,
          borderRadius: 16,
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          boxShadow: "0 4px 16px rgba(51,39,38,0.1)",
        }}
      >
        <span style={{ fontSize: 28 }}>👤</span>
        <div>
          <p style={{ margin: 0, fontSize: 12, color: COLORS.contentTertiary }}>
            Tu grupo de edad
          </p>
          <p
            style={{
              margin: 0,
              fontSize: 18,
              fontWeight: 700,
              color: COLORS.contentPrimary,
            }}
          >
            {age} años
          </p>
        </div>
      </div>

      {/* Features */}
      <div
        style={{
          padding: "24px 20px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        <h3
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: COLORS.contentPrimary,
            margin: "0 0 4px",
          }}
        >
          Tu plan incluye:
        </h3>
        {RESULTS.features.map((f, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 14,
              backgroundColor: COLORS.bgPrimary,
              border: `1px solid ${COLORS.answerBorder}`,
              borderRadius: 16,
              padding: "14px 16px",
            }}
          >
            <span style={{ fontSize: 28, flexShrink: 0 }}>{f.icon}</span>
            <div>
              <p
                style={{
                  margin: "0 0 2px",
                  fontSize: 15,
                  fontWeight: 600,
                  color: COLORS.contentPrimary,
                }}
              >
                {f.title}
              </p>
              <p style={{ margin: 0, fontSize: 13, color: COLORS.contentTertiary }}>
                {f.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div
        style={{
          margin: "0 20px",
          backgroundColor: COLORS.bgSecondary,
          borderRadius: 16,
          padding: "20px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 16,
          textAlign: "center",
        }}
      >
        {[
          { num: "28", unit: "días", label: "Plan inicial" },
          { num: "15", unit: "min", label: "Por sesión" },
          { num: "+500K", unit: "", label: "Usuarias" },
        ].map((s, i) => (
          <div key={i}>
            <p
              style={{
                margin: 0,
                fontSize: 22,
                fontWeight: 700,
                color: COLORS.themePrimary,
              }}
            >
              {s.num}
              <span style={{ fontSize: 14, fontWeight: 500 }}>{s.unit}</span>
            </p>
            <p style={{ margin: 0, fontSize: 11, color: COLORS.contentTertiary }}>
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Testimonial */}
      <div
        style={{
          margin: "20px 20px 0",
          backgroundColor: COLORS.bgPrimary,
          border: `1px solid ${COLORS.answerBorder}`,
          borderRadius: 16,
          padding: "16px",
        }}
      >
        <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
          {"★★★★★".split("").map((s, i) => (
            <span key={i} style={{ color: COLORS.contentWarning, fontSize: 16 }}>
              {s}
            </span>
          ))}
        </div>
        <p
          style={{
            margin: "0 0 8px",
            fontSize: 14,
            color: COLORS.contentSecondary,
            lineHeight: 1.5,
            fontStyle: "italic",
          }}
        >
          "¡Increíble! En solo 4 semanas noté cambios reales en mi cuerpo. Las rutinas son
          perfectas para hacer en casa y el plan nutricional me ayudó muchísimo."
        </p>
        <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: COLORS.contentPrimary }}>
          — María G., 34 años
        </p>
      </div>

      {/* CTA */}
      <div style={{ padding: "24px 20px 0" }}>
        <button
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            width: "100%",
            padding: "16px 48px",
            backgroundColor: hovered
              ? "#1a1211"
              : COLORS.themePrimary,
            color: "#fff",
            border: "none",
            borderRadius: 24,
            fontSize: 17,
            fontWeight: 700,
            cursor: "pointer",
            transition: "background-color 0.2s, transform 0.1s, box-shadow 0.2s",
            transform: hovered ? "scale(1.01)" : "scale(1)",
            boxShadow: hovered
              ? "0 8px 24px rgba(51,39,38,0.35)"
              : "0 4px 12px rgba(51,39,38,0.2)",
            // TODO: Link to actual BetterMe subscription / download page
          }}
          // TODO: Add onClick to redirect to BetterMe app store or subscription
        >
          Obtener mi plan ahora →
        </button>
        <p
          style={{
            textAlign: "center",
            fontSize: 12,
            color: COLORS.contentTertiary,
            marginTop: 10,
          }}
        >
          {/* TODO: Add real privacy policy link */}
          Al continuar, aceptas nuestros Términos y Política de Privacidad
        </p>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Main App
// ──────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState("home"); // home | quiz | loading | result
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedAge, setSelectedAge] = useState(null);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [hoveredCardId, setHoveredCardId] = useState(null);

  const totalSteps = QUIZ_QUESTIONS.length;
  const currentQuestion = QUIZ_QUESTIONS[quizStep];

  const handleAgeSelect = (ageId) => {
    setSelectedAge(ageId);
    setScreen("quiz");
    setQuizStep(0);
  };

  const handleAnswer = (questionId, value) => {
    setQuizAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (quizStep < totalSteps - 1) {
      setQuizStep((s) => s + 1);
    } else {
      setScreen("loading");
    }
  };

  const handleBack = () => {
    if (quizStep > 0) {
      setQuizStep((s) => s - 1);
    } else {
      setScreen("home");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: COLORS.bgPrimary,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        maxWidth: 480,
        margin: "0 auto",
        position: "relative",
      }}
    >
      {/* Global keyframe styles injected via style tag */}
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background-color: ${COLORS.bgPrimary}; }
        button:focus-visible { outline: 2px solid ${COLORS.themeAccent}; outline-offset: 2px; }
      `}</style>

      <Header onMenuClick={() => setMenuOpen(true)} />
      <MenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* ── HOME SCREEN ── */}
      {screen === "home" && (
        <main style={{ padding: "24px 20px 40px", animation: "fadeSlideIn 0.4s ease" }}>
          {/* Title */}
          <div style={{ marginBottom: 24 }}>
            <h1
              style={{
                fontSize: 26,
                fontWeight: 700,
                color: COLORS.contentPrimary,
                lineHeight: 1.3,
                marginBottom: 8,
                textTransform: "uppercase",
                letterSpacing: "-0.3px",
              }}
            >
              Estudio de entrenamiento de{" "}
              <span style={{ color: COLORS.themePrimary }}>Pilates en casa</span>
            </h1>
            <p
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: COLORS.contentTertiary,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              SEGÚN TU EDAD
            </p>
          </div>

          {/* Age cards */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              marginBottom: 24,
            }}
          >
            {AGE_CARDS.map((card) => (
              <AgeCard
                key={card.id}
                card={card}
                onClick={handleAgeSelect}
                hoveredId={hoveredCardId}
                setHoveredId={setHoveredCardId}
              />
            ))}
          </div>

          {/* Legal note */}
          <p
            style={{
              fontSize: 11,
              color: COLORS.contentTertiary,
              textAlign: "center",
              lineHeight: 1.5,
            }}
          >
            {/* TODO: Add real legal/disclaimer text from BetterMe */}
            Al seleccionar tu grupo de edad, aceptas nuestros Términos de uso y Política de
            privacidad. Los resultados pueden variar según el individuo.
          </p>
        </main>
      )}

      {/* ── QUIZ SCREEN ── */}
      {screen === "quiz" && (
        <main style={{ animation: "fadeSlideIn 0.3s ease" }}>
          <ProgressBar current={quizStep + 1} total={totalSteps} />

          {/* Back button */}
          <div style={{ padding: "8px 20px 0" }}>
            <button
              onClick={handleBack}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
                color: COLORS.contentTertiary,
                fontSize: 14,
                padding: "4px 0",
              }}
            >
              ← Volver
            </button>
          </div>

          <div style={{ padding: "16px 20px 40px" }}>
            <QuestionStep
              question={currentQuestion}
              onAnswer={handleAnswer}
              onNext={handleNext}
              answers={quizAnswers}
            />
          </div>
        </main>
      )}

      {/* ── LOADING SCREEN ── */}
      {screen === "loading" && (
        <LoadingScreen onDone={() => setScreen("result")} />
      )}

      {/* ── RESULT SCREEN ── */}
      {screen === "result" && (
        <ResultScreen age={selectedAge} answers={quizAnswers} />
      )}
    </div>
  );
}