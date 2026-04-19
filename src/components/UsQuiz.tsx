"use client";

import { useState, useEffect } from "react";
import { QUIZZ, QCATS, THEME, type Quiz, type QuestionItem } from "@/lib/us-quiz-data";

function PBar({ v, color = THEME.A, h = 3, style }: { v: number; color?: string; h?: number; style?: React.CSSProperties }) {
  return (
    <div style={{ width: "100%", height: h, background: "#1a1428", borderRadius: h, ...style }}>
      <div
        style={{
          width: `${Math.min(100, v)}%`,
          height: "100%",
          background: color,
          borderRadius: h,
          transition: "width .6s",
        }}
      />
    </div>
  );
}

function Badge({ label, color = THEME.A }: { label: string; color?: string }) {
  return (
    <span
      style={{
        padding: "3px 9px",
        border: `1px solid ${color}`,
        borderRadius: 10,
        fontSize: 10,
        color,
        letterSpacing: ".08em",
      }}
    >
      {label}
    </span>
  );
}

function Pill({
  label,
  active,
  color = THEME.A,
  onClick,
}: {
  label: string;
  active?: boolean;
  color?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "7px 14px",
        background: active ? color : "transparent",
        border: `1px solid ${active ? color : THEME.BDR}`,
        borderRadius: 20,
        color: active ? "#070510" : "#7a6d8a",
        fontSize: 12,
        fontWeight: active ? 600 : 400,
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}

function QuizHub() {
  const [cat, setCat] = useState("all");
  const [active, setActive] = useState<Quiz | null>(null);
  const [done, setDone] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("us-quiz-done");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return [];
        }
      }
    }
    return [];
  });

  const handleDone = (id: string) => {
    const n = [...new Set([...done, id])];
    setDone(n);
    localStorage.setItem("us-quiz-done", JSON.stringify(n));
  };

  const list = cat === "all" ? QUIZZ : QUIZZ.filter((q) => q.cat === cat);
  const currentCat = QCATS.find((c) => c.id === cat);

  if (active) {
    return (
      <QuizEngine
        quiz={active}
        onBack={() => setActive(null)}
        onDone={handleDone}
      />
    );
  }

  return (
    <div style={{ padding: 16, paddingBottom: 80 }}>
      <h2
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 28,
          color: THEME.A,
          fontStyle: "italic",
          fontWeight: 600,
          marginBottom: 2,
        }}
      >
        Quiz Studio
      </h2>
      <p style={{ color: "#5a4f6a", fontSize: 13, marginBottom: 10 }}>
        {QUIZZ.length} quizzes. The most honest thing you&apos;ll do together.
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 11,
          color: "#3a2f4a",
          marginBottom: 5,
        }}
      >
        <span>
          {done.length}/{QUIZZ.length} completed
        </span>
        <span style={{ color: THEME.A }}>
          {Math.round((done.length / QUIZZ.length) * 100)}%
        </span>
      </div>
      <PBar v={(done.length / QUIZZ.length) * 100} style={{ marginBottom: 16 }} />
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
        <Pill label="All" active={cat === "all"} onClick={() => setCat("all")} />
        {QCATS.map((c) => (
          <Pill
            key={c.id}
            label={c.label}
            active={cat === c.id}
            color={c.color}
            onClick={() => setCat(c.id)}
          />
        ))}
      </div>
      <div style={{ display: "grid", gap: 10 }}>
        {list.map((q) => {
          const isDone = done.includes(q.id);
          return (
            <button
              key={q.id}
              onClick={() => setActive(q)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: 16,
                width: "100%",
                background: THEME.CARD,
                border: `1px solid ${isDone ? q.color + "55" : THEME.BDR}`,
                borderRadius: 14,
                textAlign: "left",
                cursor: "pointer",
                borderLeft: `3px solid ${q.color}`,
              }}
            >
              <span style={{ fontSize: 26, flexShrink: 0 }}>{q.emoji}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 3,
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      color: "#f0e8f0",
                      fontSize: 15,
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 600,
                    }}
                  >
                    {q.title}
                  </span>
                  {isDone && <Badge label="Done" color={q.color} />}
                </div>
                <div style={{ color: "#4a3f5a", fontSize: 12, lineHeight: 1.4 }}>
                  {q.desc}
                </div>
                <div style={{ fontSize: 10, color: "#3a2f4a", marginTop: 3 }}>
                  ⏱ {q.time} · {q.questions?.length || "open"} q
                </div>
              </div>
              <span style={{ color: "#2a2040", fontSize: 18, flexShrink: 0 }}>
                ›
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function QuizEngine({
  quiz,
  onBack,
  onDone,
}: {
  quiz: Quiz;
  onBack: () => void;
  onDone: (id: string) => void;
}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<unknown>(null);

  const q = quiz.questions[step] as QuestionItem;
  const prog = ((step + 1) / quiz.questions.length) * 100;

  const answer = (val: string) => {
    const na = { ...answers, [step]: val };
    setAnswers(na);
    if (step < quiz.questions.length - 1) {
      setTimeout(() => setStep((s) => s + 1), 220);
    } else {
      setTimeout(() => {
        onDone(quiz.id);
        if (quiz.type === "this-or-that") {
          const tA = Object.values(na).filter((v) => v === "a").length;
          setResult({
            pairs: quiz.questions.map((qq: QuestionItem, i: number) => ({ question: qq, picked: na[i] })),
            totA: tA,
            totB: quiz.questions.length - tA,
          });
        } else if (quiz.type === "scale") {
          const all = Object.values(na).map(Number);
          const avg = all.reduce((a, b) => a + b, 0) / all.length;
          setResult({ score: Math.round((avg / 5) * 100) });
        } else {
          const t: Record<string, number> = {};
          Object.values(na).forEach((v) => {
            t[v] = (t[v] || 0) + 1;
          });
          const top = Object.entries(t).sort((a, b) => b[1] - a[1])[0];
          const tally = Object.entries(t)
            .map(([k, v]) => ({ k, v, pct: Math.round((v / quiz.questions.length) * 100) }))
            .sort((a, b) => b.v - a.v);
          setResult({ key: top[0], profile: quiz.keys?.[top[0]], tally });
        }
      }, 350);
    }
  };

  const getQuestionText = () => {
    if (typeof q === "string") return q;
    if (q.q) return q.q;
    if (q.a) return null;
    return "";
  };

  const getOptions = () => {
    if (typeof q === "string") return [];
    if (quiz.type === "this-or-that" && q.a && q.b) {
      return [
        { text: q.a, key: "a" },
        { text: q.b, key: "b" },
      ];
    }
    if (q.opts) {
      return q.opts.map((opt, i) => {
        if (typeof opt === "string") {
          return { text: opt, key: opt };
        }
        return { text: opt.t, key: opt.k || String(i) };
      });
    }
    return [];
  };

  if (result) {
    return (
      <QuizResult quiz={quiz} result={result} onBack={onBack} />
    );
  }

  const questionText = getQuestionText();
  const options = getOptions();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: THEME.DARK,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "14px 16px",
          borderBottom: `1px solid ${THEME.BDR}`,
          background: THEME.SURF,
        }}
      >
        <button
          onClick={onBack}
          style={{ background: "none", border: "none", color: "#7a6d8a", fontSize: 22 }}
        >
          ←
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, color: "#f0e8f0", fontWeight: 500 }}>
            {quiz.title}
          </div>
          <div style={{ fontSize: 10, color: "#4a3f5a", marginTop: 1 }}>
            {step + 1} of {quiz.questions.length}
          </div>
        </div>
        <span style={{ fontSize: 11, color: quiz.color || THEME.A, fontWeight: 600 }}>
          {Math.round(prog)}%
        </span>
      </div>
      <PBar v={prog} color={quiz.color || THEME.A} />
      <div
        style={{
          flex: 1,
          padding: "28px 20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          key={step}
          className="fu"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 21,
            color: "#f0e8f0",
            lineHeight: 1.5,
            marginBottom: 32,
            fontWeight: 600,
          }}
        >
          {questionText}
        </div>
        {quiz.type === "this-or-that" && options.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {options.map((opt, i) => (
              <button
                key={i}
                onClick={() => answer(opt.key)}
                className="fu"
                style={{
                  animationDelay: `${i * 55}ms`,
                  padding: "15px 18px",
                  background: THEME.CARD,
                  border: `1px solid ${THEME.BDR}`,
                  borderRadius: 13,
                  color: "#c8c0d8",
                  fontSize: 14,
                  textAlign: "left",
                  cursor: "pointer",
                  lineHeight: 1.4,
                }}
              >
                {opt.text}
              </button>
            ))}
          </div>
        )}
        {quiz.type === "choice" && options.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {options.map((opt, i) => (
              <button
                key={i}
                onClick={() => answer(opt.key)}
                className="fu"
                style={{
                  animationDelay: `${i * 55}ms`,
                  padding: "15px 18px",
                  background: THEME.CARD,
                  border: `1px solid ${THEME.BDR}`,
                  borderRadius: 13,
                  color: "#c8c0d8",
                  fontSize: 14,
                  textAlign: "left",
                  cursor: "pointer",
                  lineHeight: 1.4,
                }}
              >
                {opt.text}
              </button>
            ))}
          </div>
        )}
        {quiz.type === "scale" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ color: "#7a6d8a", fontSize: 12 }}>Strongly Disagree</span>
              <span style={{ color: "#7a6d8a", fontSize: 12 }}>Strongly Agree</span>
            </div>
            <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => answer(String(n))}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: answers[step] === String(n) ? quiz.color : THEME.CARD,
                    border: `1px solid ${
                      answers[step] === String(n) ? quiz.color : THEME.BDR
                    }`,
                    color: answers[step] === String(n) ? "#fff" : "#c8c0d8",
                    fontSize: 16,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {n}
                </button>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 8 }}>
              <span style={{ color: "#5a4f6a", fontSize: 14 }}>
                {answers[step] ? `Selected: ${answers[step]}/5` : "Tap a number"}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function QuizResult({
  quiz,
  result,
  onBack,
}: {
  quiz: Quiz;
  result: unknown;
  onBack: () => void;
}) {
  const res = result as { key?: string; profile?: { n: string; e: string; d: string }; tally?: { k: string; v: number; pct: number }[]; score?: number; totA?: number; totB?: number };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: THEME.DARK,
        padding: 20,
      }}
    >
      <button
        onClick={onBack}
        style={{
          background: "none",
          border: "none",
          color: "#7a6d8a",
          fontSize: 22,
          marginBottom: 16,
        }}
      >
        ← Back to quizzes
      </button>

      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <span style={{ fontSize: 48 }}>{quiz.emoji}</span>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 28,
            color: "#f0e8f0",
            fontWeight: 600,
            marginTop: 8,
          }}
        >
          {quiz.title}
        </h2>
      </div>

      {quiz.type === "this-or-that" && (
        <div
          style={{
            background: THEME.CARD,
            border: `1px solid ${THEME.BDR}`,
            borderRadius: 16,
            padding: 20,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 16 }}>
            {(res.totA ?? 0) > (res.totB ?? 0) ? "😊" : "😄"}
          </div>
          <p style={{ color: "#c8c0d8", fontSize: 16, lineHeight: 1.5 }}>
            You agreed on{" "}
            <span style={{ color: quiz.color, fontWeight: 600 }}>
              {Math.max(res.totA || 0, res.totB || 0)}/
              {quiz.questions.length}
            </span>{" "}
            questions!
          </p>
        </div>
      )}

      {quiz.type === "scale" && (
        <div
          style={{
            background: THEME.CARD,
            border: `1px solid ${THEME.BDR}`,
            borderRadius: 16,
            padding: 20,
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: `conic-gradient(${quiz.color} ${res.score || 0}%, #1a1428 0%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
            }}
          >
            <div
              style={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                background: THEME.CARD,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: 28, fontWeight: 700, color: quiz.color }}>
                {res.score}%
              </span>
            </div>
          </div>
          <p style={{ color: "#c8c0d8", fontSize: 14 }}>
            Your relationship health score
          </p>
        </div>
      )}

      {(quiz.type === "choice" || quiz.type === "never-have-i") && res.profile && (
        <div
          style={{
            background: THEME.CARD,
            border: `1px solid ${quiz.color}55`,
            borderRadius: 16,
            padding: 20,
            marginBottom: 16,
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <span style={{ fontSize: 36 }}>{res.profile.e}</span>
            <h3
              style={{
                fontSize: 22,
                color: quiz.color,
                fontWeight: 600,
                marginTop: 8,
              }}
            >
              {res.profile.n}
            </h3>
          </div>
          <p style={{ color: "#c8c0d8", fontSize: 14, lineHeight: 1.6 }}>
            {res.profile.d}
          </p>
        </div>
      )}

      {res.tally && res.tally.length > 0 && !res.profile && (
        <div
          style={{
            background: THEME.CARD,
            border: `1px solid ${THEME.BDR}`,
            borderRadius: 16,
            padding: 20,
          }}
        >
          <h3
            style={{
              fontSize: 14,
              color: "#7a6d8a",
              marginBottom: 12,
              textTransform: "uppercase",
              letterSpacing: ".1em",
            }}
          >
            Breakdown
          </h3>
          {res.tally.slice(0, 5).map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 8,
              }}
            >
              <span style={{ color: "#5a4f6a", fontSize: 12, width: 80 }}>
                {item.k}
              </span>
              <div style={{ flex: 1, height: 6, background: "#1a1428", borderRadius: 3 }}>
                <div
                  style={{
                    width: `${item.pct}%`,
                    height: "100%",
                    background: i === 0 ? quiz.color : "#3a2f4a",
                    borderRadius: 3,
                  }}
                />
              </div>
              <span style={{ color: "#7a6d8a", fontSize: 12, width: 30 }}>
                {item.pct}%
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function UsQuiz() {
  return (
    <div style={{ background: THEME.DARK, minHeight: "100vh" }}>
      <QuizHub />
    </div>
  );
}