import { useState } from "react";

const phases = [
  {
    id: 1,
    period: "Tháng 1–6",
    year: "Năm 1",
    title: "Consolidate Core",
    subtitle: "Củng cố nền tảng Node.js",
    color: "#4ADE80",
    icon: "⚙️",
    level: "Junior → Mid",
    focus: "Node.js Deep Dive",
    goals: [
      {
        category: "Node.js Internals",
        icon: "💚",
        items: [
          "Hiểu sâu Event Loop: call stack, task queue, microtask queue, libuv",
          "Node.js Streams: Readable/Writable/Transform — xử lý file lớn không OOM",
          "Worker Threads vs Cluster: biết khi nào dùng để bypass single-thread limit",
          "Memory model: heap snapshot, V8 GC tuning, detect memory leak bằng clinic.js",
          "Package.json mastery: workspace, peer deps, bundledDeps cho monorepo"
        ]
      },
      {
        category: "TypeScript & Code Quality",
        icon: "🔷",
        items: [
          "TypeScript strict mode: utility types, generics, discriminated unions",
          "ESLint + Prettier + Husky: enforce standards tự động trong CI",
          "Unit test với Jest: mock, spy, coverage >80% cho service layer",
          "REST API best practices: versioning, pagination, error response format chuẩn"
        ]
      },
      {
        category: "Enterprise Basics",
        icon: "🏢",
        items: [
          "Đọc hiểu và tuân thủ existing ADRs (Architecture Decision Records)",
          "Viết technical documentation theo template của công ty",
          "Tham gia code review — comment có context, không chỉ nitpick syntax"
        ]
      }
    ],
    milestone: "Được tin tưởng giao task độc lập, code không cần review từng dòng"
  },
  {
    id: 2,
    period: "Tháng 7–12",
    year: "Năm 1",
    title: "System Thinking",
    subtitle: "Tư duy hệ thống & Enterprise patterns",
    color: "#60A5FA",
    icon: "🏗️",
    level: "Mid Junior",
    focus: "Architecture & DevOps",
    goals: [
      {
        category: "NestJS & Enterprise Patterns",
        icon: "🐈",
        items: [
          "NestJS deep dive: DI container, interceptors, guards, pipes, custom decorators",
          "Repository pattern + Unit of Work với TypeORM/Prisma",
          "CQRS cơ bản trong NestJS: Commands, Queries, Events",
          "Message queue: Bull/BullMQ (Redis-backed) — job processing, retry, dead-letter queue"
        ]
      },
      {
        category: "Database & Caching",
        icon: "🗄️",
        items: [
          "PostgreSQL nâng cao: EXPLAIN ANALYZE, partial index, JSONB queries, connection pooling (PgBouncer)",
          "Redis: caching patterns, pub/sub, distributed lock (Redlock algorithm)",
          "Database migration strategy: zero-downtime migration trong enterprise environment"
        ]
      },
      {
        category: "DevOps & CI/CD",
        icon: "🚀",
        items: [
          "Docker multi-stage build: optimize image size cho Node.js app",
          "Jenkins / GitHub Actions: pipeline as code, parallel jobs, artifacts",
          "SonarQube: integrate code quality gate vào pipeline — không merge nếu quality fail"
        ]
      }
    ],
    milestone: "Tự thiết kế module mới từ đầu, explain được trade-offs cho senior review"
  },
  {
    id: 3,
    period: "Tháng 13–18",
    year: "Năm 2",
    title: "Scale & Reliability",
    subtitle: "Xây dựng hệ thống enterprise-grade",
    color: "#F59E0B",
    icon: "⚡",
    level: "Mid",
    focus: "Performance & Observability",
    goals: [
      {
        category: "Node.js Performance",
        icon: "🔧",
        items: [
          "Profiling: Chrome DevTools, 0x flame graph — identify CPU bottleneck trong production",
          "HTTP/2 & keep-alive tuning: optimize connection reuse cho high-throughput API",
          "Kafka integration với Node.js: consumer groups, offset management, exactly-once semantics",
          "GraphQL với Apollo Server: DataLoader để solve N+1, persisted queries, caching"
        ]
      },
      {
        category: "Enterprise Reliability",
        icon: "🛡️",
        items: [
          "Circuit breaker với opossum: fallback strategy, half-open state handling",
          "Distributed tracing: OpenTelemetry + Jaeger — trace request qua microservices Node.js",
          "SLI/SLO: define availability & latency targets cho service, setup alerting tương ứng",
          "Chaos engineering nhỏ: simulate failure trong staging, verify resilience"
        ]
      },
      {
        category: "Leadership Prep",
        icon: "👥",
        items: [
          "Mentor 1 junior Node.js dev: pair programming, explain event loop & async patterns",
          "Viết RFC đầu tiên: propose technical decision với pros/cons rõ ràng",
          "On-call: participate incident response, write post-mortem đầu tiên"
        ]
      }
    ],
    milestone: "Được giao phụ trách service quan trọng end-to-end — từ design đến production"
  },
  {
    id: 4,
    period: "Tháng 19–24",
    year: "Năm 2",
    title: "Tech Ownership",
    subtitle: "Security, Cloud & Enterprise Compliance",
    color: "#A78BFA",
    icon: "🎯",
    level: "Mid → Senior",
    focus: "Security & Cloud",
    goals: [
      {
        category: "Security (Enterprise-grade)",
        icon: "🔐",
        items: [
          "OWASP Top 10 cho Node.js: Injection, XSS, SSRF — viết được exploit demo & fix",
          "OAuth2 / OIDC: integrate Keycloak hoặc Azure AD — SSO trong enterprise environment",
          "npm audit automation: Dependabot + Snyk trong pipeline, triage CVEs",
          "Secret scanning: git-secrets, detect-secrets — prevent credentials leak",
          "GDPR/data privacy: PII masking trong logs, right-to-erasure implementation"
        ]
      },
      {
        category: "Cloud & Kubernetes",
        icon: "☁️",
        items: [
          "AWS hoặc Azure: deploy Node.js app lên EKS/AKS, hiểu resource requests/limits",
          "Kubernetes: Deployment, Service, ConfigMap, HPA — scale Node.js service theo load",
          "Helm charts: package và version Node.js app deployments",
          "Terraform: provision được RDS, ElastiCache, MSK (Kafka) cho Node.js stack"
        ]
      },
      {
        category: "Enterprise Influence",
        icon: "💡",
        items: [
          "Propose và drive 1 significant improvement (performance, DX, hoặc security)",
          "Tham gia technical interview panel cho vị trí backend Node.js",
          "Tech talk nội bộ về Node.js topic (ít nhất 1 lần)"
        ]
      }
    ],
    milestone: "Go-to person cho Node.js questions — team tìm bạn trước khi Google"
  },
  {
    id: 5,
    period: "Tháng 25–36",
    year: "Năm 3",
    title: "Senior Mastery",
    subtitle: "Architecture Leadership trong Enterprise",
    color: "#F472B6",
    icon: "🌟",
    level: "Senior",
    focus: "Architecture & Org Impact",
    goals: [
      {
        category: "Enterprise Architecture",
        icon: "🏛️",
        items: [
          "Lead design Node.js microservices platform từ 0 → production (>5 services)",
          "Event Sourcing + CQRS với EventStoreDB hoặc Kafka — implement trong Node.js",
          "DDD: model bounded contexts cho enterprise domain, define ubiquitous language với business",
          "API versioning strategy: deprecation policy, backward compatibility, consumer-driven contract testing (Pact)"
        ]
      },
      {
        category: "Cross-team Impact",
        icon: "🌐",
        items: [
          "Define Node.js coding standards, security guidelines cho cả engineering org",
          "Architecture Review Board: review và approve designs của các team khác",
          "Inner source: tạo shared Node.js libraries được dùng bởi nhiều team",
          "Collaborate với Enterprise Architect để align Node.js stack với org-wide standards"
        ]
      },
      {
        category: "External Presence",
        icon: "📢",
        items: [
          "Technical blog: ít nhất 6 bài/năm về Node.js, architecture, enterprise patterns",
          "Contribute vào Node.js ecosystem: npm package hoặc PR cho popular library",
          "NodeConf / JSConf Vietnam: submit talk proposal"
        ]
      }
    ],
    milestone: "Senior Engineer — được mời vào technical strategy discussions của tổ chức"
  },
  {
    id: 6,
    period: "Tháng 37–48",
    year: "Năm 4",
    title: "Lead Transition",
    subtitle: "People, Process & Enterprise Navigation",
    color: "#FB923C",
    icon: "🧭",
    level: "Senior → Staff / Tech Lead",
    focus: "People & Enterprise Politics",
    goals: [
      {
        category: "People Leadership",
        icon: "👨‍👩‍👧‍👦",
        items: [
          "Formal mentor 2–3 engineers, own their growth plan và quarterly reviews",
          "Navigate enterprise stakeholders: CTO, Product VP, Security team — communicate technical decisions lên C-level",
          "Conflict resolution: technical disagreements giữa teams, build consensus không dùng authority",
          "Define career ladder cho Backend engineer trong team"
        ]
      },
      {
        category: "Enterprise Process",
        icon: "⚙️",
        items: [
          "ITIL/Change Management: hiểu enterprise release process, CAB (Change Advisory Board)",
          "FinOps: present cloud cost optimization proposals với ROI rõ ràng cho leadership",
          "Vendor evaluation: RFP process cho enterprise tools (APM, API Gateway, Service Mesh)",
          "Compliance: SOC 2, ISO 27001 awareness — know what engineering needs to do"
        ]
      },
      {
        category: "Strategic Technical",
        icon: "🗺️",
        items: [
          "Tech debt roadmap: quantify business impact, get budget approval từ management",
          "Node.js platform strategy: runtime upgrades, LTS planning, migration playbooks",
          "Build vs Buy: evaluate enterprise vendors vs custom Node.js solutions"
        ]
      }
    ],
    milestone: "Engineering Lead — dẫn nhóm 4–8 người, được tin tưởng về cả technical lẫn delivery"
  },
  {
    id: 7,
    period: "Tháng 49–72",
    year: "Năm 5–6",
    title: "Technical Leader",
    subtitle: "Vision & Enterprise-wide Impact",
    color: "#EF4444",
    icon: "👑",
    level: "Principal / Tech Lead",
    focus: "Vision & Org Transformation",
    goals: [
      {
        category: "Technical Vision",
        icon: "🔭",
        items: [
          "Define Node.js/JS platform vision 3 năm: runtime strategy, edge computing, serverless adoption",
          "Technology radar cho org: Adopt/Trial/Assess/Hold framework, communicate quarterly",
          "AI/ML integration strategy: LLM APIs trong Node.js services, agentic workflows, RAG patterns",
          "Present engineering strategy cho Board / C-suite — link technical decisions đến business outcomes"
        ]
      },
      {
        category: "Org Transformation",
        icon: "🏢",
        items: [
          "Platform Engineering: build Internal Developer Platform (IDP) — golden paths cho Node.js teams",
          "Engineering excellence program: internal certifications, guilds, communities of practice",
          "Grow senior engineers thành leads — replicate yourself",
          "Engineering brand: make company attractive to Node.js talent (blog, talks, open source)"
        ]
      },
      {
        category: "Legacy & Impact",
        icon: "🎓",
        items: [
          "Known in Vietnam Node.js community as a trusted voice",
          "Onboard toàn bộ engineering team mới trong <3 months với playbooks bạn xây",
          "Đã deliver ít nhất 1 enterprise-scale system xử lý >1M requests/day"
        ]
      }
    ],
    milestone: "🎉 Technical Leader — Định hình engineering direction của enterprise"
  }
];

const principles = [
  { icon: "📚", title: "Learn in Public", desc: "Viết blog, làm talks — dạy người khác là cách học sâu nhất" },
  { icon: "🔁", title: "Depth before Breadth", desc: "Master 1 thứ trước khi nhảy sang cái khác. T-shaped knowledge." },
  { icon: "🤝", title: "Invest in People", desc: "Career của bạn tăng tốc khi bạn giúp người khác tăng tốc" },
  { icon: "⚡", title: "Ship & Iterate", desc: "Done > Perfect. Build, measure, learn. Đừng over-engineer" },
  { icon: "🧭", title: "Context Switching", desc: "Tech Lead = Technical + Communication + Business. Develop tất cả" },
  { icon: "📊", title: "Measure Progress", desc: "Review roadmap mỗi 6 tháng. Điều chỉnh, đừng cứng nhắc" }
];

export default function TechLeadRoadmap() {
  const [activePhase, setActivePhase] = useState(1);
  const [checkedItems, setCheckedItems] = useState({});
  const [activeTab, setActiveTab] = useState("roadmap");

  const phase = phases.find(p => p.id === activePhase);

  const toggleCheck = (phaseId, catIndex, itemIndex) => {
    const key = `${phaseId}-${catIndex}-${itemIndex}`;
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
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
