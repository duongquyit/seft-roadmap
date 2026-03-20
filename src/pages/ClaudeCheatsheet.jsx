import { useState } from "react";
import { useNavigate } from "react-router-dom";
import data from "../data/claude-cheatsheet.json";

const { categories, cards, tips } = data;

const CAT_COLOR = {
  setup:    "#A78BFA",
  workflow: "#34D399",
  context:  "#FBBF24",
  prompt:   "#60A5FA",
  git:      "#F87171",
  advanced: "#F472B6",
};

function Badge({ text, color }) {
  return (
    <span style={{
      background: `${color}18`,
      color,
      border: `1px solid ${color}35`,
      borderRadius: 20,
      padding: "2px 9px",
      fontSize: 10,
      fontWeight: 700,
      whiteSpace: "nowrap",
      marginLeft: "auto",
    }}>{text}</span>
  );
}

function Snippet({ code }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div style={{ position: "relative", marginTop: 10 }}>
      <pre style={{
        background: "#060610",
        border: "1px solid #1e1e3a",
        borderRadius: 8,
        padding: "10px 36px 10px 12px",
        fontFamily: "'Fira Code', 'Cascadia Code', monospace",
        fontSize: 11,
        color: "#7dd3fc",
        lineHeight: 1.6,
        margin: 0,
        whiteSpace: "pre-wrap",
        wordBreak: "break-all",
      }}>{code}</pre>
      <button onClick={handleCopy} style={{
        position: "absolute", top: 7, right: 7,
        background: copied ? "#22c55e20" : "#1e1e3a",
        border: `1px solid ${copied ? "#22c55e60" : "#2d2d4a"}`,
        borderRadius: 5, padding: "2px 7px", cursor: "pointer",
        fontSize: 10, color: copied ? "#22c55e" : "#475569",
        transition: "all 0.2s",
      }}>{copied ? "✓" : "copy"}</button>
    </div>
  );
}

function RefLink({ label, url }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "flex", alignItems: "center", gap: 5,
        fontSize: 11, color: "#60A5FA", textDecoration: "none",
        lineHeight: 1.7, transition: "color 0.15s",
      }}
      onMouseEnter={e => e.currentTarget.style.color = "#93C5FD"}
      onMouseLeave={e => e.currentTarget.style.color = "#60A5FA"}
    >
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ flexShrink: 0, opacity: 0.7 }}>
        <path d="M1 5h8M5 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      {label}
    </a>
  );
}

function Card({ card, accentColor }) {
  return (
    <div style={{
      background: "#0d0d18",
      border: `1px solid ${accentColor}30`,
      borderRadius: 14,
      padding: "18px 18px 16px",
      display: "flex",
      flexDirection: "column",
      gap: 0,
      transition: "border-color 0.2s, transform 0.2s",
    }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${accentColor}70`;
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = `${accentColor}30`;
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Head */}
      <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 10 }}>
        <div style={{
          width: 30, height: 30, borderRadius: 7, flexShrink: 0,
          background: `${accentColor}18`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 15,
        }}>{card.icon}</div>
        <span style={{ fontWeight: 700, fontSize: 13, color: "#e2e8f0", lineHeight: 1.3 }}>{card.title}</span>
        <Badge text={card.badge} color={accentColor} />
      </div>

      {/* Body */}
      <p style={{ fontSize: 12.5, color: "#64748b", lineHeight: 1.6, margin: "0 0 10px" }}>
        {card.body}
      </p>

      {/* Commands (if any) */}
      {card.commands && (
        <div style={{ marginBottom: 10 }}>
          {card.commands.map((c, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 5 }}>
              <code style={{
                background: "#111120", border: "1px solid #2d2d4a",
                borderRadius: 5, padding: "2px 8px",
                fontFamily: "'Fira Code', monospace", fontSize: 11,
                color: "#e2e8f0", whiteSpace: "nowrap",
              }}>{c.cmd}</code>
              <span style={{ fontSize: 11.5, color: "#475569" }}>{c.desc}</span>
            </div>
          ))}
        </div>
      )}

      {/* Tips */}
      {card.tips && card.tips.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: card.snippet ? 0 : 10 }}>
          {card.tips.map((tip, i) => (
            <div key={i} style={{ display: "flex", gap: 7, alignItems: "flex-start" }}>
              <div style={{
                width: 5, height: 5, borderRadius: "50%", flexShrink: 0,
                marginTop: 6, background: accentColor,
              }} />
              <span style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.55 }}>{tip}</span>
            </div>
          ))}
        </div>
      )}

      {/* Code snippet */}
      {card.snippet && <Snippet code={card.snippet} />}

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Refs */}
      {card.refs && card.refs.length > 0 && (
        <div style={{
          marginTop: 14,
          paddingTop: 10,
          borderTop: "1px solid #1e1e3a",
        }}>
          <div style={{
            fontSize: 9.5, color: "#334155",
            textTransform: "uppercase", letterSpacing: 1,
            marginBottom: 5, fontWeight: 700,
          }}>Đọc thêm</div>
          {card.refs.map((ref, i) => (
            <RefLink key={i} label={ref.label} url={ref.url} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ClaudeCheatsheet() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("cheatsheet");

  const filtered = activeFilter === "all"
    ? cards
    : cards.filter(c => c.cat === activeFilter);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0f",
      color: "#e2e8f0",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    }}>

      {/* ── Header ── */}
      <div style={{
        background: "linear-gradient(135deg, #0f0f1a 0%, #130d1e 50%, #0f0f1a 100%)",
        borderBottom: "1px solid #1e1e3a",
        padding: "32px 24px 24px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 50% 0%, rgba(167,139,250,0.09) 0%, transparent 60%)",
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
          <div style={{ fontSize: 11, letterSpacing: 4, color: "#A78BFA", marginBottom: 8, textTransform: "uppercase" }}>
            Claude Code · Best Practices
          </div>
          <h1 style={{
            fontSize: "clamp(24px, 5vw, 36px)",
            fontWeight: 800,
            margin: "0 0 8px",
            background: "linear-gradient(135deg, #fff 0%, #A78BFA 50%, #60A5FA 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Claude AI Cheat Sheet
          </h1>
          <p style={{ color: "#64748b", fontSize: 14, margin: 0 }}>
            Tổng hợp best practices · Cập nhật từ tài liệu chính thức & cộng đồng
          </p>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div style={{
        display: "flex", gap: 0,
        borderBottom: "1px solid #1e1e3a",
        background: "#0d0d18",
        padding: "0 24px",
      }}>
        {[
          { id: "cheatsheet", label: "📋 Cheat Sheet" },
          { id: "principles", label: "⚡ Key Principles" },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            background: "none", border: "none", cursor: "pointer",
            padding: "14px 20px", fontSize: 13, fontWeight: 600,
            color: activeTab === tab.id ? "#A78BFA" : "#475569",
            borderBottom: activeTab === tab.id ? "2px solid #A78BFA" : "2px solid transparent",
            transition: "all 0.2s",
          }}>{tab.label}</button>
        ))}
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 16px" }}>

        {/* ── CHEATSHEET TAB ── */}
        {activeTab === "cheatsheet" && (
          <>
            {/* Filter chips */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
              <button
                onClick={() => setActiveFilter("all")}
                style={{
                  padding: "5px 14px", borderRadius: 20, fontSize: 12, cursor: "pointer",
                  border: `1px solid ${activeFilter === "all" ? "#A78BFA" : "#1e1e3a"}`,
                  background: activeFilter === "all" ? "#A78BFA18" : "#111120",
                  color: activeFilter === "all" ? "#A78BFA" : "#475569",
                  fontWeight: activeFilter === "all" ? 700 : 400,
                  transition: "all 0.15s",
                }}
              >Tất cả</button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  style={{
                    padding: "5px 14px", borderRadius: 20, fontSize: 12, cursor: "pointer",
                    border: `1px solid ${activeFilter === cat.id ? cat.color : "#1e1e3a"}`,
                    background: activeFilter === cat.id ? `${cat.color}18` : "#111120",
                    color: activeFilter === cat.id ? cat.color : "#475569",
                    fontWeight: activeFilter === cat.id ? 700 : 400,
                    transition: "all 0.15s",
                  }}
                >{cat.label}</button>
              ))}
            </div>

            {/* Cards grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))",
              gap: 14,
            }}>
              {filtered.map(card => (
                <Card key={card.id} card={card} accentColor={CAT_COLOR[card.cat]} />
              ))}
            </div>

            {filtered.length === 0 && (
              <div style={{ textAlign: "center", padding: "60px 0", color: "#334155", fontSize: 14 }}>
                Không có card nào trong category này.
              </div>
            )}
          </>
        )}

        {/* ── PRINCIPLES TAB ── */}
        {activeTab === "principles" && (
          <div>
            {/* Intro */}
            <div style={{
              background: "linear-gradient(135deg, #A78BFA18, #60A5FA10)",
              border: "1px solid #A78BFA30",
              borderRadius: 16, padding: "20px 24px", marginBottom: 20,
            }}>
              <h3 style={{ margin: "0 0 8px", color: "#A78BFA", fontSize: 16 }}>💭 Nguyên tắc cốt lõi khi dùng Claude Code</h3>
              <p style={{ margin: 0, color: "#94a3b8", fontSize: 14, lineHeight: 1.7 }}>
                Cheat sheet chỉ là công cụ. Điều tạo ra sự khác biệt thực sự là{" "}
                <strong style={{ color: "#e2e8f0" }}>tư duy và thói quen hàng ngày</strong>.
                Dưới đây là 4 nguyên tắc quan trọng nhất.
              </p>
            </div>

            {/* Principle cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12, marginBottom: 24 }}>
              {tips.map((p, i) => (
                <div key={i} style={{
                  background: "#0d0d18", border: "1px solid #1e1e3a",
                  borderRadius: 12, padding: "20px",
                }}>
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{p.icon}</div>
                  <h4 style={{ margin: "0 0 8px", color: "#e2e8f0", fontSize: 15, fontWeight: 700 }}>{p.title}</h4>
                  <p style={{ margin: 0, color: "#64748b", fontSize: 13, lineHeight: 1.6 }}>{p.desc}</p>
                </div>
              ))}
            </div>

            {/* Quick reference — key commands */}
            <div style={{
              background: "#0d0d18", border: "1px solid #1e1e3a",
              borderRadius: 12, padding: "20px 24px", marginBottom: 16,
            }}>
              <h4 style={{ margin: "0 0 14px", color: "#FBBF24", fontSize: 15 }}>⌨️ Slash commands hay dùng nhất</h4>
              {[
                { cmd: "/clear",             desc: "Reset context — dùng khi bắt đầu task mới" },
                { cmd: "/compact",           desc: "Tóm tắt context window khi gần đầy" },
                { cmd: "/init",              desc: "Tự động tạo CLAUDE.md từ codebase hiện tại" },
                { cmd: "/hooks",             desc: "Cấu hình hooks qua menu tương tác" },
                { cmd: "/install-github-app",desc: "Bật auto PR review trên GitHub" },
                { cmd: "/terminal-setup",    desc: "Fix Shift+Enter và các quirk terminal" },
                { cmd: "/permissions",       desc: "Whitelist domain cho URL references" },
              ].map((row, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "7px 0",
                  borderBottom: i < 6 ? "1px solid #111120" : "none",
                }}>
                  <code style={{
                    background: "#111120", border: "1px solid #1e1e3a",
                    borderRadius: 5, padding: "3px 10px", minWidth: 195,
                    fontFamily: "'Fira Code', monospace", fontSize: 11.5,
                    color: "#A78BFA",
                  }}>{row.cmd}</code>
                  <span style={{ fontSize: 13, color: "#64748b" }}>{row.desc}</span>
                </div>
              ))}
            </div>

            {/* Context window thresholds */}
            <div style={{
              background: "#0d0d18", border: "1px solid #1e1e3a",
              borderRadius: 12, padding: "20px 24px",
            }}>
              <h4 style={{ margin: "0 0 14px", color: "#F87171", fontSize: 15 }}>📊 Context Window — Ngưỡng cần nhớ</h4>
              {[
                { range: "0 – 50%",  color: "#4ADE80", action: "Thoải mái làm việc, context tốt" },
                { range: "50 – 70%", color: "#FBBF24", action: "Bắt đầu chú ý, tránh nhồi thêm context không cần" },
                { range: "70 – 90%", color: "#F97316", action: "Dùng /compact để tóm tắt và giải phóng context" },
                { range: "90%+",     color: "#F87171", action: "/clear bắt buộc — Claude bắt đầu hallucinate" },
              ].map((row, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "8px 0",
                  borderBottom: i < 3 ? "1px solid #111120" : "none",
                }}>
                  <span style={{
                    background: `${row.color}18`, color: row.color,
                    border: `1px solid ${row.color}35`,
                    borderRadius: 6, padding: "3px 10px",
                    fontWeight: 700, fontSize: 12, minWidth: 80, textAlign: "center",
                  }}>{row.range}</span>
                  <span style={{ fontSize: 13, color: "#94a3b8" }}>{row.action}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{ textAlign: "center", padding: "20px", color: "#1e1e3a", fontSize: 12 }}>
        Claude Code Best Practices · Review thường xuyên · Keep shipping 🚀
      </div>
    </div>
  );
}
