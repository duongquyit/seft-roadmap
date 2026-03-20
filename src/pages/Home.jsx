import { useNavigate } from "react-router-dom";

const roadmaps = [
  {
    path: "/techlead",
    icon: "👑",
    title: "Tech Lead Roadmap",
    subtitle: "Junior Backend → Technical Leader",
    duration: "5–7 năm",
    tags: ["Node.js", "Enterprise", "Architecture"],
    color: "#60A5FA",
  },
  {
    path: "/claude",
    icon: "🤖",
    title: "Claude AI Cheat Sheet",
    subtitle: "Best practices để dùng Claude Code hiệu quả",
    duration: "Cập nhật liên tục",
    tags: ["Claude Code", "Prompting", "Workflow"],
    color: "#A78BFA",
  },
  // Thêm roadmap mới vào đây, ví dụ:
  // {
  //   path: "/frontend",
  //   icon: "🎨",
  //   title: "Frontend Lead Roadmap",
  //   subtitle: "Junior → Senior Frontend Engineer",
  //   duration: "3–5 năm",
  //   tags: ["React", "TypeScript", "Performance"],
  //   color: "#F472B6",
  // },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0f",
      color: "#e2e8f0",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #0f0f1a 100%)",
        borderBottom: "1px solid #1e1e3a",
        padding: "48px 24px 40px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 50% 0%, rgba(96, 165, 250, 0.08) 0%, transparent 60%)",
        }} />
        <div style={{ position: "relative" }}>
          <div style={{ fontSize: 11, letterSpacing: 4, color: "#60A5FA", marginBottom: 12, textTransform: "uppercase" }}>
            Engineering Career Paths
          </div>
          <h1 style={{
            fontSize: "clamp(28px, 5vw, 42px)",
            fontWeight: 800,
            margin: "0 0 12px",
            background: "linear-gradient(135deg, #fff 0%, #60A5FA 50%, #A78BFA 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Career Roadmaps
          </h1>
          <p style={{ color: "#64748b", fontSize: 15, margin: 0 }}>
            Chọn lộ trình phù hợp với mục tiêu của bạn
          </p>
        </div>
      </div>

      {/* Roadmap Cards */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 16px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {roadmaps.map((rm) => (
            <div
              key={rm.path}
              onClick={() => navigate(rm.path)}
              style={{
                background: "#0d0d18",
                border: `1px solid ${rm.color}40`,
                borderRadius: 16,
                padding: "28px 24px",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.border = `1px solid ${rm.color}90`;
                e.currentTarget.style.background = `linear-gradient(135deg, ${rm.color}12, #0d0d18)`;
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.border = `1px solid ${rm.color}40`;
                e.currentTarget.style.background = "#0d0d18";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 16 }}>{rm.icon}</div>
              <h2 style={{ margin: "0 0 6px", fontSize: 18, fontWeight: 800, color: rm.color }}>
                {rm.title}
              </h2>
              <p style={{ margin: "0 0 16px", color: "#94a3b8", fontSize: 13 }}>
                {rm.subtitle}
              </p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
                {rm.tags.map(tag => (
                  <span key={tag} style={{
                    background: `${rm.color}15`,
                    color: rm.color,
                    border: `1px solid ${rm.color}30`,
                    borderRadius: 20,
                    padding: "2px 10px",
                    fontSize: 11,
                    fontWeight: 600,
                  }}>{tag}</span>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 12, color: "#475569" }}>⏱ {rm.duration}</span>
                <span style={{ fontSize: 12, color: rm.color, fontWeight: 600 }}>Xem ngay →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
