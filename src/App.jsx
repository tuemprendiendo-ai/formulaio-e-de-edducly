import { useState, useEffect } from "react";

// TODO: Reemplazar con preguntas reales del quiz de Educly (API o JSON del funnel)
const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "¿Cuál es tu principal objetivo financiero ahora mismo?",
    emoji: "🎯",
    options: [
      { id: "a", text: "Salir de deudas", value: "deudas" },
      { id: "b", text: "Ahorrar para el futuro", value: "ahorro" },
      { id: "c", text: "Invertir mi dinero", value: "inversion" },
      { id: "d", text: "Aumentar mis ingresos", value: "ingresos" },
    ],
  },
  {
    id: 2,
    question: "¿Cómo describirías tu relación actual con el dinero?",
    emoji: "💸",
    options: [
      { id: "a", text: "Gasto más de lo que gano", value: "negativo" },
      { id: "b", text: "Llego justo a fin de mes", value: "neutro" },
      { id: "c", text: "Ahorro algo cada mes", value: "positivo" },
      { id: "d", text: "Invierto regularmente", value: "avanzado" },
    ],
  },
  {
    id: 3,
    question: "¿Tienes un presupuesto mensual?",
    emoji: "📊",
    options: [
      { id: "a", text: "No, no sé por dónde empezar", value: "sin_presupuesto" },
      { id: "b", text: "Lo intento pero no lo sigo", value: "intento" },
      { id: "c", text: "Sí, aunque no siempre lo cumplo", value: "parcial" },
      { id: "d", text: "Sí, lo sigo estrictamente", value: "completo" },
    ],
  },
  {
    id: 4,
    question: "¿Cuánto tienes en tu fondo de emergencia?",
    emoji: "🛡️",
    options: [
      { id: "a", text: "No tengo fondo de emergencia", value: "cero" },
      { id: "b", text: "Menos de 1 mes de gastos", value: "bajo" },
      { id: "c", text: "Entre 1 y 3 meses", value: "medio" },
      { id: "d", text: "Más de 3 meses", value: "alto" },
    ],
  },
  {
    id: 5,
    question: "¿Cómo te sientes cuando piensas en tu futuro financiero?",
    emoji: "😰",
    options: [
      { id: "a", text: "Muy estresado/a y preocupado/a", value: "estresado" },
      { id: "b", text: "Un poco ansioso/a", value: "ansioso" },
      { id: "c", text: "Relativamente tranquilo/a", value: "tranquilo" },
      { id: "d", text: "Seguro/a y confiado/a", value: "seguro" },
    ],
  },
  {
    id: 6,
    question: "¿Inviertes actualmente en algún instrumento financiero?",
    emoji: "📈",
    options: [
      { id: "a", text: "No sé cómo funciona invertir", value: "novato" },
      { id: "b", text: "Tengo dinero en cuenta de ahorros", value: "basico" },
      { id: "c", text: "Invierto en fondos o acciones", value: "intermedio" },
      { id: "d", text: "Tengo un portafolio diversificado", value: "avanzado" },
    ],
  },
  {
    id: 7,
    question: "¿Tienes deudas pendientes?",
    emoji: "💳",
    options: [
      { id: "a", text: "Sí, y me cuesta pagarlas", value: "alto" },
      { id: "b", text: "Sí, pero las manejo bien", value: "controlado" },
      { id: "c", text: "Solo deuda hipotecaria", value: "hipoteca" },
      { id: "d", text: "No tengo deudas", value: "libre" },
    ],
  },
  {
    id: 8,
    question: "¿Cuánto tiempo llevas pensando en mejorar tus finanzas?",
    emoji: "⏰",
    options: [
      { id: "a", text: "Recién empiezo a pensar en ello", value: "inicio" },
      { id: "b", text: "Hace algunos meses", value: "reciente" },
      { id: "c", text: "Hace más de un año", value: "tiempo" },
      { id: "d", text: "Siempre ha sido una prioridad", value: "prioridad" },
    ],
  },
  {
    id: 9,
    question: "¿Cuánto tiempo puedes dedicar a aprender sobre finanzas?",
    emoji: "📚",
    options: [
      { id: "a", text: "10-15 minutos al día", value: "poco" },
      { id: "b", text: "30 minutos al día", value: "medio" },
      { id: "c", text: "1 hora al día", value: "bastante" },
      { id: "d", text: "Más de 1 hora diaria", value: "mucho" },
    ],
  },
  {
    id: 10,
    question: "¿Qué describe mejor tu situación laboral?",
    emoji: "💼",
    options: [
      { id: "a", text: "Empleado/a a tiempo completo", value: "empleado" },
      { id: "b", text: "Autónomo/a o freelance", value: "autonomo" },
      { id: "c", text: "Emprendedor/a con negocio propio", value: "emprendedor" },
      { id: "d", text: "Tengo múltiples fuentes de ingreso", value: "multiple" },
    ],
  },
];

// TODO: Conectar con lógica real de perfiles de Educly
const getFinancialProfile = (answers) => {
  const profiles = {
    principiante: {
      title: "Explorador Financiero",
      emoji: "🌱",
      description:
        "Estás dando tus primeros pasos en el mundo de las finanzas personales. Con la guía correcta, puedes transformar tu situación rápidamente.",
      color: "#6C63FF",
      tips: [
        "Crea tu primer presupuesto mensual",
        "Establece un fondo de emergencia",
        "Aprende los conceptos básicos de ahorro",
      ],
    },
    intermedio: {
      title: "Constructor de Riqueza",
      emoji: "🏗️",
      description:
        "Ya tienes bases financieras sólidas. Es el momento perfecto para optimizar y hacer crecer tu patrimonio con estrategias avanzadas.",
      color: "#FF6B35",
      tips: [
        "Diversifica tus inversiones",
        "Optimiza tu carga fiscal",
        "Automatiza tus ahorros",
      ],
    },
    avanzado: {
      title: "Inversor Estratégico",
      emoji: "🚀",
      description:
        "Tienes un excelente control financiero. Ahora es momento de escalar y generar múltiples fuentes de ingreso pasivo.",
      color: "#00C896",
      tips: [
        "Explora activos alternativos",
        "Planifica tu libertad financiera",
        "Construye ingresos pasivos",
      ],
    },
  };

  const lastAnswers = Object.values(answers);
  const advancedCount = lastAnswers.filter(
    (v) => v === "avanzado" || v === "alto" || v === "mucho" || v === "prioridad" || v === "libre"
  ).length;

  if (advancedCount >= 4) return profiles.avanzado;
  if (advancedCount >= 2) return profiles.intermedio;
  return profiles.principiante;
};

const COLORS = {
  primary: "#6C63FF",
  primaryDark: "#5A52D5",
  secondary: "#FF6B35",
  bg: "#FFFFFF",
  bgLight: "#F8F7FF",
  text: "#1A1A2E",
  textMuted: "#6B7280",
  border: "#E5E7EB",
  success: "#00C896",
  cardBg: "#FFFFFF",
  optionBorder: "#E5E7EB",
  optionHover: "#F0EFFE",
  optionSelected: "#6C63FF",
};

const styles = {
  root: {
    minHeight: "100vh",
    background: COLORS.bg,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    overflowX: "hidden",
  },
  container: {
    width: "100%",
    maxWidth: "480px",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  // HEADER
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 20px 12px",
    background: COLORS.bg,
    borderBottom: `1px solid ${COLORS.border}`,
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  logo: {
    fontSize: "20px",
    fontWeight: "700",
    color: COLORS.primary,
    letterSpacing: "-0.5px",
  },
  stepCounter: {
    fontSize: "13px",
    color: COLORS.textMuted,
    fontWeight: "500",
  },
  // PROGRESS
  progressWrapper: {
    padding: "12px 20px 0",
    background: COLORS.bg,
    position: "sticky",
    top: "57px",
    zIndex: 9,
  },
  progressBar: {
    height: "6px",
    borderRadius: "3px",
    background: COLORS.border,
    overflow: "hidden",
    marginBottom: "8px",
  },
  progressFill: {
    height: "100%",
    borderRadius: "3px",
    background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.secondary})`,
    transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  // INTRO SCREEN
  introScreen: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "32px 24px",
    textAlign: "center",
    gap: "24px",
  },
  introBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    background: "#F0EFFE",
    color: COLORS.primary,
    borderRadius: "20px",
    padding: "6px 16px",
    fontSize: "13px",
    fontWeight: "600",
  },
  introEmoji: {
    fontSize: "72px",
    lineHeight: "1",
    marginBottom: "8px",
  },
  introTitle: {
    fontSize: "28px",
    fontWeight: "800",
    color: COLORS.text,
    lineHeight: "1.25",
    marginBottom: "12px",
    letterSpacing: "-0.5px",
  },
  introDesc: {
    fontSize: "16px",
    color: COLORS.textMuted,
    lineHeight: "1.6",
    maxWidth: "340px",
  },
  introStats: {
    display: "flex",
    gap: "16px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  introStat: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: COLORS.bgLight,
    borderRadius: "12px",
    padding: "14px 20px",
    minWidth: "90px",
  },
  introStatNum: {
    fontSize: "20px",
    fontWeight: "800",
    color: COLORS.primary,
  },
  introStatLabel: {
    fontSize: "12px",
    color: COLORS.textMuted,
    marginTop: "2px",
  },
  // QUESTION SCREEN
  questionScreen: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: "20px 20px 32px",
    gap: "20px",
  },
  questionHeader: {
    textAlign: "center",
    paddingTop: "8px",
  },
  questionEmoji: {
    fontSize: "48px",
    lineHeight: "1",
    marginBottom: "12px",
    display: "block",
  },
  questionText: {
    fontSize: "20px",
    fontWeight: "700",
    color: COLORS.text,
    lineHeight: "1.35",
    letterSpacing: "-0.3px",
  },
  optionsGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  optionBtn: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "16px 18px",
    borderRadius: "14px",
    border: `2px solid ${COLORS.optionBorder}`,
    background: COLORS.cardBg,
    cursor: "pointer",
    textAlign: "left",
    transition: "all 0.18s ease",
    fontSize: "15px",
    color: COLORS.text,
    fontWeight: "500",
    fontFamily: "'Inter', sans-serif",
    width: "100%",
    boxSizing: "border-box",
  },
  optionBtnSelected: {
    border: `2px solid ${COLORS.optionSelected}`,
    background: COLORS.optionHover,
    color: COLORS.primary,
    fontWeight: "600",
  },
  optionBadge: {
    minWidth: "28px",
    height: "28px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: "700",
    background: COLORS.border,
    color: COLORS.textMuted,
    flexShrink: 0,
    transition: "all 0.18s ease",
  },
  optionBadgeSelected: {
    background: COLORS.primary,
    color: "#fff",
  },
  // RESULT SCREEN
  resultScreen: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: "24px 20px 40px",
    gap: "20px",
  },
  resultHeader: {
    textAlign: "center",
    paddingTop: "8px",
  },
  resultEmoji: {
    fontSize: "64px",
    lineHeight: "1",
    display: "block",
    marginBottom: "12px",
    animation: "bounceIn 0.6s ease",
  },
  resultBadge: {
    display: "inline-block",
    borderRadius: "20px",
    padding: "5px 16px",
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "1px",
    textTransform: "uppercase",
    marginBottom: "8px",
    color: "#fff",
  },
  resultTitle: {
    fontSize: "26px",
    fontWeight: "800",
    color: COLORS.text,
    lineHeight: "1.25",
    marginBottom: "10px",
    letterSpacing: "-0.5px",
  },
  resultDesc: {
    fontSize: "15px",
    color: COLORS.textMuted,
    lineHeight: "1.6",
  },
  resultCard: {
    borderRadius: "16px",
    padding: "20px",
    background: COLORS.bgLight,
    border: `1px solid ${COLORS.border}`,
  },
  resultCardTitle: {
    fontSize: "13px",
    fontWeight: "700",
    color: COLORS.textMuted,
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    marginBottom: "14px",
  },
  tipItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    marginBottom: "10px",
    fontSize: "14px",
    color: COLORS.text,
    lineHeight: "1.5",
  },
  tipDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: COLORS.primary,
    flexShrink: 0,
    marginTop: "6px",
  },
  testimonialCard: {
    borderRadius: "16px",
    padding: "18px",
    background: "#FFF8F5",
    border: `1px solid #FFE5D9`,
  },
  testimonialText: {
    fontSize: "14px",
    color: COLORS.text,
    lineHeight: "1.6",
    fontStyle: "italic",
    marginBottom: "10px",
  },
  testimonialAuthor: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  testimonialAvatar: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    color: "#fff",
    fontWeight: "700",
  },
  testimonialName: {
    fontSize: "13px",
    fontWeight: "600",
    color: COLORS.text,
  },
  testimonialRole: {
    fontSize: "12px",
    color: COLORS.textMuted,
  },
  starsRow: {
    display: "flex",
    gap: "2px",
    marginBottom: "8px",
  },
  // BUTTON
  btnPrimary: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    width: "100%",
    padding: "16px 24px",
    borderRadius: "14px",
    background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDark})`,
    color: "#fff",
    fontSize: "16px",
    fontWeight: "700",
    border: "none",
    cursor: "pointer",
    transition: "transform 0.15s ease, box-shadow 0.15s ease",
    boxShadow: `0 4px 15px rgba(108, 99, 255, 0.35)`,
    fontFamily: "'Inter', sans-serif",
    letterSpacing: "-0.2px",
  },
  btnSecondary: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: "14px 24px",
    borderRadius: "14px",
    background: "transparent",
    color: COLORS.primary,
    fontSize: "15px",
    fontWeight: "600",
    border: `2px solid ${COLORS.primary}`,
    cursor: "pointer",
    transition: "all 0.15s ease",
    fontFamily: "'Inter', sans-serif",
  },
  // FOOTER NAV
  footerNav: {
    padding: "16px 20px",
    background: COLORS.bg,
    borderTop: `1px solid ${COLORS.border}`,
    display: "flex",
    gap: "10px",
    position: "sticky",
    bottom: 0,
    zIndex: 10,
  },
  backBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    background: COLORS.bgLight,
    border: `1px solid ${COLORS.border}`,
    cursor: "pointer",
    fontSize: "20px",
    flexShrink: 0,
    transition: "all 0.15s ease",
  },
  // LOADING
  loadingScreen: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 24px",
    gap: "20px",
    textAlign: "center",
  },
  loadingSpinner: {
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    border: `5px solid ${COLORS.border}`,
    borderTop: `5px solid ${COLORS.primary}`,
    animation: "spin 0.9s linear infinite",
  },
  loadingTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: COLORS.text,
  },
  loadingDesc: {
    fontSize: "14px",
    color: COLORS.textMuted,
    lineHeight: "1.6",
    maxWidth: "280px",
  },
  loadingSteps: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "100%",
    maxWidth: "280px",
    textAlign: "left",
  },
  loadingStep: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "14px",
    color: COLORS.textMuted,
  },
};

// TODO: Añadir animaciones de transición entre preguntas más elaboradas

export default function App() {
  const [screen, setScreen] = useState("intro"); // intro | quiz | loading | result
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loadingStep, setLoadingStep] = useState(0);
  const [hoveredOption, setHoveredOption] = useState(null);
  const [primaryBtnHover, setPrimaryBtnHover] = useState(false);
  const [backBtnHover, setBackBtnHover] = useState(false);
  const [animating, setAnimating] = useState(false);

  const totalQ = QUIZ_QUESTIONS.length;
  const progress = screen === "quiz" ? ((currentQ) / totalQ) * 100 : screen === "result" ? 100 : 0;

  // Loading sequence
  useEffect(() => {
    if (screen !== "loading") return;
    const steps = [0, 1, 2, 3];
    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      setLoadingStep(idx);
      if (idx >= steps.length) {
        clearInterval(interval);
        setTimeout(() => {
          const p = getFinancialProfile(answers);
          setProfile(p);
          setScreen("result");
        }, 500);
      }
    }, 700);
    return () => clearInterval(interval);
  }, [screen]);

  // Auto-advance when option selected
  const handleOptionSelect = (optionValue) => {
    if (animating) return;
    setSelected(optionValue);
    setAnimating(true);

    setTimeout(() => {
      const newAnswers = { ...answers, [currentQ]: optionValue };
      setAnswers(newAnswers);

      if (currentQ < totalQ - 1) {
        setCurrentQ(currentQ + 1);
        setSelected(null);
        setAnimating(false);
      } else {
        // Last question — go to loading
        setScreen("loading");
        setAnimating(false);
      }
    }, 380);
  };

  const handleBack = () => {
    if (currentQ === 0) {
      setScreen("intro");
      setSelected(null);
    } else {
      setCurrentQ(currentQ - 1);
      setSelected(answers[currentQ - 1] || null);
    }
  };

  const handleStart = () => {
    setScreen("quiz");
    setCurrentQ(0);
    setAnswers({});
    setSelected(null);
  };

  const handleRestart = () => {
    setScreen("intro");
    setCurrentQ(0);
    setAnswers({});
    setSelected(null);
    setProfile(null);
    setLoadingStep(0);
  };

  // TODO: Conectar con el CTA real de Educly (plan de suscripción, checkout Paddle, etc.)
  const handleCTA = () => {
    alert("¡Redirigiendo a tu plan personalizado de Educly!\n\n(TODO: Conectar con checkout real)");
  };

  const loadingStepsData = [
    { icon: "🔍", text: "Analizando tus respuestas..." },
    { icon: "🧠", text: "Identificando tu perfil financiero..." },
    { icon: "📋", text: "Preparando tu plan personalizado..." },
    { icon: "✅", text: "¡Tu resultado está listo!" },
  ];

  return (
    <div style={styles.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes bounceIn {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.1); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .fade-slide { animation: fadeSlideUp 0.35s ease; }
        .fade-in { animation: fadeIn 0.5s ease; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #ddd; border-radius: 2px; }
      `}</style>

      <div style={styles.container}>
        {/* ===== HEADER ===== */}
        {(screen === "quiz" || screen === "result") && (
          <header style={styles.header}>
            <div style={styles.logo}>Educly</div>
            {screen === "quiz" && (
              <span style={styles.stepCounter}>
                {currentQ + 1} / {totalQ}
              </span>
            )}
            {screen === "result" && (
              <span style={{ ...styles.stepCounter, color: COLORS.success, fontWeight: "600" }}>
                ✓ Completado
              </span>
            )}
          </header>
        )}

        {/* ===== PROGRESS BAR ===== */}
        {(screen === "quiz" || screen === "result") && (
          <div style={styles.progressWrapper}>
            <div style={styles.progressBar}>
              <div style={{ ...styles.progressFill, width: `${progress}%` }} />
            </div>
          </div>
        )}

        {/* ===== INTRO SCREEN ===== */}
        {screen === "intro" && (
          <div style={styles.introScreen} className="fade-in">
            {/* Educly logo at top */}
            <div style={{ position: "absolute", top: "16px", left: "20px" }}>
              <div style={{ ...styles.logo }}>Educly</div>
            </div>

            <div>
              <div style={styles.introBadge}>
                ✨ Quiz de Finanzas Personales
              </div>
            </div>

            <div>
              <div style={styles.introEmoji}>💰</div>
              <h1 style={styles.introTitle}>
                Descubre tu perfil<br />financiero en 2 minutos
              </h1>
              <p style={styles.introDesc}>
                Responde {totalQ} preguntas rápidas y recibe un análisis personalizado de tu situación financiera con recomendaciones concretas.
              </p>
            </div>

            <div style={styles.introStats}>
              {[
                { num: "+50K", label: "usuarios" },
                { num: "2 min", label: "duración" },
                { num: "100%", label: "gratis" },
              ].map((s) => (
                <div key={s.label} style={styles.introStat}>
                  <span style={styles.introStatNum}>{s.num}</span>
                  <span style={styles.introStatLabel}>{s.label}</span>
                </div>
              ))}
            </div>

            <div style={{ width: "100%", maxWidth: "340px" }}>
              <button
                style={{
                  ...styles.btnPrimary,
                  transform: primaryBtnHover ? "translateY(-2px)" : "none",
                  boxShadow: primaryBtnHover
                    ? `0 8px 25px rgba(108, 99, 255, 0.45)`
                    : `0 4px 15px rgba(108, 99, 255, 0.35)`,
                }}
                onMouseEnter={() => setPrimaryBtnHover(true)}
                onMouseLeave={() => setPrimaryBtnHover(false)}
                onClick={handleStart}
              >
                Comenzar el quiz →
              </button>
              <p style={{ textAlign: "center", marginTop: "12px", fontSize: "12px", color: COLORS.textMuted }}>
                Sin registro necesario · Resultado inmediato
              </p>
            </div>

            {/* Trust badges */}
            <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
              {["🔒 100% privado", "📱 Mobile friendly", "🎓 Basado en expertos"].map((badge) => (
                <span key={badge} style={{ fontSize: "12px", color: COLORS.textMuted, fontWeight: "500" }}>
                  {badge}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ===== QUIZ SCREEN ===== */}
        {screen === "quiz" && (
          <>
            <div style={styles.questionScreen} className="fade-slide" key={currentQ}>
              {/* Question */}
              <div style={styles.questionHeader}>
                <span style={styles.questionEmoji}>{QUIZ_QUESTIONS[currentQ].emoji}</span>
                <h2 style={styles.questionText}>{QUIZ_QUESTIONS[currentQ].question}</h2>
              </div>

              {/* Options */}
              <div style={styles.optionsGrid}>
                {QUIZ_QUESTIONS[currentQ].options.map((opt) => {
                  const isSelected = selected === opt.value;
                  const isHovered = hoveredOption === opt.id;
                  return (
                    <button
                      key={opt.id}
                      style={{
                        ...styles.optionBtn,
                        ...(isSelected ? styles.optionBtnSelected : {}),
                        ...(isHovered && !isSelected
                          ? { background: COLORS.optionHover, borderColor: COLORS.primary + "60" }
                          : {}),
                        transform: isSelected ? "scale(0.98)" : "scale(1)",
                      }}
                      onMouseEnter={() => setHoveredOption(opt.id)}
                      onMouseLeave={() => setHoveredOption(null)}
                      onClick={() => handleOptionSelect(opt.value)}
                    >
                      <span
                        style={{
                          ...styles.optionBadge,
                          ...(isSelected ? styles.optionBadgeSelected : {}),
                        }}
                      >
                        {isSelected ? "✓" : opt.id.toUpperCase()}
                      </span>
                      {opt.text}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Footer Nav */}
            <div style={styles.footerNav}>
              <button
                style={{
                  ...styles.backBtn,
                  background: backBtnHover ? COLORS.border : COLORS.bgLight,
                }}
                onMouseEnter={() => setBackBtnHover(true)}
                onMouseLeave={() => setBackBtnHover(false)}
                onClick={handleBack}
                title="Volver"
              >
                ←
              </button>
              {selected && (
                <button
                  style={{
                    ...styles.btnPrimary,
                    flex: 1,
                    transform: primaryBtnHover ? "translateY(-1px)" : "none",
                  }}
                  onMouseEnter={() => setPrimaryBtnHover(true)}
                  onMouseLeave={() => setPrimaryBtnHover(false)}
                  onClick={() => handleOptionSelect(selected)}
                >
                  {currentQ < totalQ - 1 ? "Siguiente →" : "Ver mi resultado →"}
                </button>
              )}
            </div>
          </>
        )}

        {/* ===== LOADING SCREEN ===== */}
        {screen === "loading" && (
          <div style={styles.loadingScreen} className="fade-in">
            <div style={styles.loadingSpinner} />
            <div>
              <h2 style={styles.loadingTitle}>Analizando tu perfil...</h2>
              <p style={styles.loadingDesc}>
                Estamos procesando tus respuestas para darte el mejor plan financiero personalizado.
              </p>
            </div>
            <div style={styles.loadingSteps}>
              {loadingStepsData.map((step, i) => (
                <div
                  key={i}
                  style={{
                    ...styles.loadingStep,
                    color: i < loadingStep ? COLORS.success : i === loadingStep ? COLORS.text : COLORS.textMuted,
                    opacity: i > loadingStep ? 0.4 : 1,
                    transition: "all 0.3s ease",
                  }}
                >
                  <span style={{ fontSize: "18px" }}>{step.icon}</span>
                  <span style={{ fontWeight: i < loadingStep ? "600" : "400" }}>{step.text}</span>
                  {i < loadingStep && (
                    <span style={{ marginLeft: "auto", color: COLORS.success, fontSize: "14px" }}>✓</span>
                  )}
                  {i === loadingStep && (
                    <span style={{ marginLeft: "auto", animation: "pulse 1s infinite", color: COLORS.primary, fontSize: "12px" }}>
                      ●
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== RESULT SCREEN ===== */}
        {screen === "result" && profile && (
          <div style={{ overflowY: "auto", flex: 1 }}>
            <div style={styles.resultScreen} className="fade-slide">
              {/* Profile header */}
              <div style={styles.resultHeader}>
                <span style={styles.resultEmoji}>{profile.emoji}</span>
                <span
                  style={{
                    ...styles.resultBadge,
                    background: profile.color,
                  }}
                >
                  Tu Perfil
                </span>
                <h2 style={styles.resultTitle}>{profile.title}</h2>
                <p style={styles.resultDesc}>{profile.description}</p>
              </div>

              {/* Score visual */}
              <div
                style={{
                  borderRadius: "16px",
                  padding: "20px",
                  background: `linear-gradient(135deg, ${profile.color}15, ${profile.color}05)`,
                  border: `1px solid ${profile.color}30`,
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "13px", color: COLORS.textMuted, fontWeight: "600", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.8px" }}>
                  Puntuación financiera
                </div>
                <div style={{ fontSize: "52px", fontWeight: "800", color: profile.color, lineHeight: "1" }}>
                  {Math.floor(70 + Math.random() * 20)}{/* TODO: Calcular score real */}
                </div>
                <div style={{ fontSize: "13px", color: COLORS.textMuted, marginTop: "4px" }}>de 100 puntos</div>
                {/* Bar */}
                <div style={{ height: "8px", borderRadius: "4px", background: COLORS.border, marginTop: "14px", overflow: "hidden" }}>
                  <div
                    style={{
                      height: "100%",
                      width: "75%",
                      borderRadius: "4px",
                      background: `linear-gradient(90deg, ${profile.color}, ${COLORS.secondary})`,
                      transition: "width 1s ease",
                    }}
                  />
                </div>
              </div>

              {/* Tips */}
              <div style={styles.resultCard}>
                <div style={styles.resultCardTitle}>📋 Tus próximos pasos</div>
                {profile.tips.map((tip, i) => (
                  <div key={i} style={styles.tipItem}>
                    <div style={{ ...styles.tipDot, background: profile.color }} />
                    <span>{tip}</span>
                  </div>
                ))}
              </div>

              {/* Testimonial */}
              <div style={styles.testimonialCard}>
                <div style={styles.starsRow}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} style={{ color: "#FF6B35", fontSize: "14px" }}>★</span>
                  ))}
                </div>
                <p style={styles.testimonialText}>
                  "Gracias a Educly pude salir de deudas en 8 meses y hoy tengo mi primer fondo de inversión. El plan personalizado fue clave."
                </p>
                <div style={styles.testimonialAuthor}>
                  <div style={styles.testimonialAvatar}>M</div>
                  <div>
                    {/* TODO: Usar testimonios reales de Educly */}
                    <div style={styles.testimonialName}>María G.</div>
                    <div style={styles.testimonialRole}>Madrid, España · Verificado</div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div
                  style={{
                    background: "#FFF8F0",
                    border: "1px solid #FFE4CC",
                    borderRadius: "12px",
                    padding: "12px 16px",
                    fontSize: "13px",
                    color: "#B45309",
                    fontWeight: "500",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                  }}
                >
                  🔥 <span>Solo quedan <strong>3 plazas</strong> con descuento hoy</span>
                  {/* TODO: Conectar con stock real del backend */}
                </div>

                <button
                  style={{
                    ...styles.btnPrimary,
                    padding: "18px 24px",
                    fontSize: "17px",
                    background: `linear-gradient(135deg, ${profile.color}, ${COLORS.primaryDark})`,
                    transform: primaryBtnHover ? "translateY(-2px)" : "none",
                    boxShadow: primaryBtnHover
                      ? `0 10px 30px rgba(108, 99, 255, 0.4)`
                      : `0 4px 15px rgba(108, 99, 255, 0.3)`,
                  }}
                  onMouseEnter={() => setPrimaryBtnHover(true)}
                  onMouseLeave={() => setPrimaryBtnHover(false)}
                  onClick={handleCTA}
                >
                  Ver mi plan personalizado →
                </button>

                <p style={{ textAlign: "center", fontSize: "12px", color: COLORS.textMuted }}>
                  🔒 Pago seguro · Garantía 30 días
                  {/* TODO: Conectar con condiciones reales de Educly */}
                </p>

                <button
                  style={{
                    ...styles.btnSecondary,
                    fontSize: "14px",
                    padding: "12px",
                  }}
                  onClick={handleRestart}
                >
                  Reiniciar quiz
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}