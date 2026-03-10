import { useState } from "react";
import { useNavigate } from "react-router-dom";

import roadmapData from "../data/techlead-roadmap.json";

const { phases, principles } = roadmapData;

export default function TechLeadRoadmap() {
  const navigate = useNavigate();
  const [activePhase, setActivePhase] = useState(1);
  const [checkedItems, setCheckedItems] = useState(() => {
    try {
      const saved = localStorage.getItem("techlead-checked");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [activeTab, setActiveTab] = useState("roadmap");

  const phase = phases.find(p => p.id === activePhase);

  const toggleCheck = (phaseId, catIndex, itemIndex) => {
    const key = `${phaseId}-${catIndex}-${itemIndex}`;
    setCheckedItems(prev => {
      const next = { ...prev, [key]: !prev[key] };
      localStorage.setItem("techlead-checked", JSON.stringify(next));
      return next;
    });
  };

  const getPhaseProgress = (phaseId) => {
    const p = phases.find(ph => ph.id === phaseId);
    if (!p) return 0;
    let total = 0, done = 0;
    p.goals.forEach((cat, ci) => {
      cat.items.forEach((_, ii) => {
        total++;
        if (checkedItems[`${phaseId}-${ci}-${ii}`]) done++;
      });
    });
    return total ? Math.round((done / total) * 100) : 0;
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0f",
      color: "#e2e8f0",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      padding: "0"
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #0f0f1a 100%)",
        borderBottom: "1px solid #1e1e3a",
        padding: "32px 24px 24px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 50% 0%, rgba(96, 165, 250, 0.08) 0%, transparent 60%)"
        }} />
        <div style={{ position: "relative" }}>
          <button
            onClick={() => navigate("/")}
            style={{
              background: "none", border: "1px solid #1e1e3a", borderRadius: 8,
              color: "#475569", cursor: "pointer", fontSize: 12, padding: "6px 14px",
              marginBottom: 16, transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.color = "#94a3b8"; e.currentTarget.style.borderColor = "#334155"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "#475569"; e.currentTarget.style.borderColor = "#1e1e3a"; }}
          >
            ← Tất cả Roadmaps
          </button>
          <div style={{ fontSize: 11, letterSpacing: 4, color: "#60A5FA", marginBottom: 8, textTransform: "uppercase" }}>
            Junior Backend → Technical Leader
          </div>
          <h1 style={{
            fontSize: "clamp(24px, 5vw, 36px)",
            fontWeight: 800,
            margin: "0 0 8px",
            background: "linear-gradient(135deg, #fff 0%, #60A5FA 50%, #A78BFA 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            5–7 Năm Roadmap
          </h1>
          <p style={{ color: "#64748b", fontSize: 14, margin: 0 }}>
            Node.js · Enterprise · Review mỗi 6 tháng · Adjust as you go
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: "flex", gap: 0,
        borderBottom: "1px solid #1e1e3a",
        background: "#0d0d18",
        padding: "0 24px"
      }}>
        {[
          { id: "roadmap", label: "🗺 Roadmap" },
          { id: "progress", label: "📊 Progress" },
          { id: "principles", label: "⚡ Principles" }
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            background: "none", border: "none", cursor: "pointer",
            padding: "14px 20px", fontSize: 13, fontWeight: 600,
            color: activeTab === tab.id ? "#60A5FA" : "#475569",
            borderBottom: activeTab === tab.id ? "2px solid #60A5FA" : "2px solid transparent",
            transition: "all 0.2s"
          }}>{tab.label}</button>
        ))}
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "24px 16px" }}>

        {/* ROADMAP TAB */}
        {activeTab === "roadmap" && (
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {/* Phase Selector */}
            <div style={{ width: "100%", display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
              {phases.map(p => {
                const prog = getPhaseProgress(p.id);
                return (
                  <button key={p.id} onClick={() => setActivePhase(p.id)} style={{
                    background: activePhase === p.id
                      ? `linear-gradient(135deg, ${p.color}22, ${p.color}11)`
                      : "#111120",
                    border: `1px solid ${activePhase === p.id ? p.color : "#1e1e3a"}`,
                    borderRadius: 10, cursor: "pointer", padding: "10px 14px",
                    color: activePhase === p.id ? p.color : "#475569",
                    fontSize: 12, fontWeight: 600, transition: "all 0.2s",
                    position: "relative", overflow: "hidden",
                    minWidth: 120, textAlign: "left"
                  }}>
                    <div style={{ fontSize: 18 }}>{p.icon}</div>
                    <div style={{ marginTop: 2 }}>{p.period}</div>
                    <div style={{ fontSize: 10, color: "#475569" }}>{p.year}</div>
                    {prog > 0 && (
                      <div style={{
                        position: "absolute", bottom: 0, left: 0,
                        height: 3, width: `${prog}%`,
                        background: p.color, borderRadius: "0 2px 2px 0",
                        transition: "width 0.5s"
                      }} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Phase Detail */}
            {phase && (
              <div style={{ width: "100%" }}>
                {/* Header */}
                <div style={{
                  background: `linear-gradient(135deg, ${phase.color}15 0%, ${phase.color}05 100%)`,
                  border: `1px solid ${phase.color}40`,
                  borderRadius: 16, padding: "20px 24px", marginBottom: 16,
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  flexWrap: "wrap", gap: 12
                }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 28 }}>{phase.icon}</span>
                      <div>
                        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: phase.color }}>
                          {phase.title}
                        </h2>
                        <div style={{ fontSize: 13, color: "#94a3b8" }}>{phase.subtitle} · {phase.period} · {phase.year}</div>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <span style={{
                      background: `${phase.color}20`, color: phase.color,
                      padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700
                    }}>{phase.level}</span>
                    <span style={{
                      background: "#1e1e3a", color: "#94a3b8",
                      padding: "4px 12px", borderRadius: 20, fontSize: 12
                    }}>Focus: {phase.focus}</span>
                  </div>
                </div>

                {/* Goals */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12, marginBottom: 16 }}>
                  {phase.goals.map((cat, ci) => (
                    <div key={ci} style={{
                      background: "#0d0d18", border: "1px solid #1e1e3a",
                      borderRadius: 12, padding: "16px", overflow: "hidden"
                    }}>
                      <div style={{
                        display: "flex", alignItems: "center", gap: 8,
                        marginBottom: 12, paddingBottom: 10,
                        borderBottom: "1px solid #1e1e3a"
                      }}>
                        <span style={{ fontSize: 18 }}>{cat.icon}</span>
                        <span style={{ fontWeight: 700, fontSize: 13, color: "#cbd5e1" }}>{cat.category}</span>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {cat.items.map((item, ii) => {
                          const key = `${phase.id}-${ci}-${ii}`;
                          const done = checkedItems[key];
                          return (
                            <div key={ii}
                              onClick={() => toggleCheck(phase.id, ci, ii)}
                              style={{
                                display: "flex", gap: 10, cursor: "pointer",
                                alignItems: "flex-start", padding: "6px 8px",
                                borderRadius: 8, transition: "background 0.15s",
                                background: done ? `${phase.color}10` : "transparent"
                              }}
                            >
                              <div style={{
                                width: 18, height: 18, borderRadius: 5, flexShrink: 0, marginTop: 1,
                                border: `2px solid ${done ? phase.color : "#2d2d4a"}`,
                                background: done ? phase.color : "transparent",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                transition: "all 0.2s"
                              }}>
                                {done && <span style={{ fontSize: 10, color: "#000", fontWeight: 900 }}>✓</span>}
                              </div>
                              <span style={{
                                fontSize: 13, lineHeight: 1.5,
                                color: done ? "#475569" : "#94a3b8",
                                textDecoration: done ? "line-through" : "none"
                              }}>{item}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Milestone */}
                <div style={{
                  background: `linear-gradient(135deg, ${phase.color}20, ${phase.color}08)`,
                  border: `1px solid ${phase.color}50`,
                  borderRadius: 12, padding: "14px 20px",
                  display: "flex", alignItems: "center", gap: 12
                }}>
                  <span style={{ fontSize: 22 }}>🏁</span>
                  <div>
                    <div style={{ fontSize: 11, color: phase.color, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>
                      Milestone 6-tháng
                    </div>
                    <div style={{ fontSize: 14, color: "#e2e8f0", marginTop: 3 }}>{phase.milestone}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* PROGRESS TAB */}
        {activeTab === "progress" && (
          <div>
            <div style={{
              display: "grid", gap: 12
            }}>
              {phases.map(p => {
                const prog = getPhaseProgress(p.id);
                return (
                  <div key={p.id} style={{
                    background: "#0d0d18", border: "1px solid #1e1e3a",
                    borderRadius: 12, padding: "16px 20px"
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 20 }}>{p.icon}</span>
                        <div>
                          <span style={{ fontWeight: 700, fontSize: 14, color: "#cbd5e1" }}>{p.title}</span>
                          <span style={{ color: "#475569", fontSize: 12, marginLeft: 8 }}>{p.period} · {p.year}</span>
                        </div>
                      </div>
                      <span style={{
                        fontWeight: 800, fontSize: 16,
                        color: prog === 100 ? "#4ADE80" : prog > 0 ? p.color : "#2d2d4a"
                      }}>
                        {prog}%
                      </span>
                    </div>
                    <div style={{ height: 6, background: "#1a1a2e", borderRadius: 3, overflow: "hidden" }}>
                      <div style={{
                        height: "100%", width: `${prog}%`,
                        background: prog === 100
                          ? "linear-gradient(90deg, #4ADE80, #22d3ee)"
                          : `linear-gradient(90deg, ${p.color}, ${p.color}99)`,
                        borderRadius: 3, transition: "width 0.8s ease"
                      }} />
                    </div>
                    <button onClick={() => { setActivePhase(p.id); setActiveTab("roadmap"); }}
                      style={{
                        background: "none", border: `1px solid ${p.color}40`,
                        color: p.color, borderRadius: 6, padding: "5px 12px",
                        fontSize: 11, cursor: "pointer", marginTop: 10
                      }}>
                      Xem chi tiết →
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* PRINCIPLES TAB */}
        {activeTab === "principles" && (
          <div>
            <div style={{
              background: "linear-gradient(135deg, #60A5FA15, #A78BFA10)",
              border: "1px solid #60A5FA30",
              borderRadius: 16, padding: "20px 24px", marginBottom: 20
            }}>
              <h3 style={{ margin: "0 0 8px", color: "#60A5FA" }}>💭 Mindset của một Tech Lead</h3>
              <p style={{ margin: 0, color: "#94a3b8", fontSize: 14, lineHeight: 1.7 }}>
                Roadmap chỉ là bản đồ. Điều tạo ra sự khác biệt là <strong style={{ color: "#e2e8f0" }}>tư duy và thói quen hàng ngày</strong>.
                Dưới đây là những nguyên tắc cốt lõi để accelerate career của bạn.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
              {principles.map((p, i) => (
                <div key={i} style={{
                  background: "#0d0d18", border: "1px solid #1e1e3a",
                  borderRadius: 12, padding: "20px"
                }}>
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{p.icon}</div>
                  <h4 style={{ margin: "0 0 8px", color: "#e2e8f0", fontSize: 15 }}>{p.title}</h4>
                  <p style={{ margin: 0, color: "#64748b", fontSize: 13, lineHeight: 1.6 }}>{p.desc}</p>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: 20,
              background: "#0d0d18", border: "1px solid #1e1e3a",
              borderRadius: 12, padding: "20px 24px"
            }}>
              <h4 style={{ margin: "0 0 12px", color: "#F59E0B", fontSize: 15 }}>📖 Sách nên đọc theo từng giai đoạn</h4>
              {[
                { phase: "Năm 1 — Node.js Foundation", books: ["Node.js Design Patterns — Casciaro", "TypeScript Deep Dive — Basarat", "Clean Code — Robert Martin"] },
                { phase: "Năm 2 — Systems & Scale", books: ["Designing Data-Intensive Apps — Kleppmann", "Building Microservices — Sam Newman", "NestJS Docs (toàn bộ)"] },
                { phase: "Năm 3 — Senior & Architecture", books: ["System Design Interview — Alex Xu", "Domain-Driven Design — Eric Evans", "SRE Book — Google"] },
                { phase: "Năm 4–5 — Enterprise Leadership", books: ["An Elegant Puzzle — Will Larson", "The Staff Engineer's Path — Tanya Reilly", "Accelerate — Nicole Forsgren"] },
              ].map((row, i) => (
                <div key={i} style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 12, color: "#475569", marginBottom: 6, fontWeight: 700 }}>{row.phase}</div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {row.books.map((b, j) => (
                      <span key={j} style={{
                        background: "#111120", border: "1px solid #1e1e3a",
                        borderRadius: 6, padding: "4px 10px", fontSize: 12, color: "#94a3b8"
                      }}>{b}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{ textAlign: "center", padding: "20px", color: "#1e1e3a", fontSize: 12 }}>
        Review mỗi 6 tháng · Adjust · Keep shipping 🚀
      </div>
    </div>
  );
}
