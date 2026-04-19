"use client";

import { useState, useEffect } from "react";

const DARK = "#070510";
const SURF = "#0e0b1a";
const CARD = "#140f24";
const BDR = "#221b35";
const A = "#e8a598";
const A2 = "#9b7fa8";
const GOLD = "#d4a847";
const TEAL = "#7fcfcf";
const GRN = "#6dbc7a";

const GS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
body{background:#070510;color:#f0e8f0;font-family:'DM Sans',sans-serif;-webkit-font-smoothing:antialiased;}
::-webkit-scrollbar{width:3px;}::-webkit-scrollbar-track{background:#070510;}::-webkit-scrollbar-thumb{background:#221b35;border-radius:3px;}
input,textarea,select{background:#140f24;border:1px solid #221b35;color:#f0e8f0;border-radius:10px;padding:11px 14px;font-family:'DM Sans',sans-serif;font-size:14px;width:100%;outline:none;transition:border-color .2s;}
input:focus,textarea:focus,select:focus{border-color:#e8a598;}
button{cursor:pointer;font-family:'DM Sans',sans-serif;}
@keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.45}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
@keyframes spin{to{transform:rotate(360deg)}}
.fu{animation:fadeUp .45s cubic-bezier(.16,1,.3,1) both;}
`;

const QCATS = [
  { id: "foundation", label: "Foundation", emoji: "Foundation", color: A },
  { id: "deep", label: "Deep Dives", emoji: "Deep", color: A2 },
  { id: "fun", label: "Fun & Play", emoji: "Fun", color: GOLD },
  { id: "growth", label: "Growth", emoji: "Growth", color: GRN },
  { id: "daily", label: "Daily", emoji: "Daily", color: TEAL },
];

const QZ = [
  {
    id: "love-lang",
    cat: "foundation",
    title: "Love Languages",
    emoji: "💌",
    color: A,
    desc: "How you give and receive love — 10 deep questions",
    time: "8 min",
    type: "choice",
    questions: [
      {
        q: "You had a rough week. What would feel most healing?",
        opts: [
          { t: "A long heartfelt message about how much you're valued", k: "WA" },
          { t: "A whole evening with full phone-free attention", k: "QT" },
          { t: "A small surprise gift or comfort item waiting for you", k: "GG" },
          { t: "Partner handled everything without being asked", k: "AS" },
          { t: "Being held without words for a long time", k: "PT" }
        ]
      },
      {
        q: "You express love most naturally by…",
        opts: [
          { t: "Telling them often — verbally and in writing", k: "WA" },
          { t: "Carving out intentional time that belongs only to them", k: "QT" },
          { t: "Finding something thoughtfully chosen just for them", k: "GG" },
          { t: "Anticipating needs and quietly handling them", k: "AS" },
          { t: "Physical nearness — a hand, a touch, closeness", k: "PT" }
        ]
      },
      {
        q: "Your partner forgets an important date. What stings most?",
        opts: [
          { t: "They said nothing meaningful to acknowledge it", k: "WA" },
          { t: "You didn't get to spend real time together", k: "QT" },
          { t: "There was no thoughtful gesture at all", k: "GG" },
          { t: "They didn't do anything to make the day feel special", k: "AS" },
          { t: "There was no physical closeness or warmth", k: "PT" }
        ]
      },
      {
        q: "The most romantic thing a partner could do is…",
        opts: [
          { t: "Write you a long vulnerable letter out of nowhere", k: "WA" },
          { t: "Plan a full day designed entirely around your favorites", k: "QT" },
          { t: "Show up with something they remembered months ago", k: "GG" },
          { t: "Handle your entire to-do list so you can truly rest", k: "AS" },
          { t: "Dance with you in the kitchen to no particular song", k: "PT" }
        ]
      },
      {
        q: "You feel most disconnected when…",
        opts: [
          { t: "Appreciation and verbal affirmation dry up", k: "WA" },
          { t: "You stop having real quality time together", k: "QT" },
          { t: "Thoughtful gestures disappear completely", k: "GG" },
          { t: "You're overwhelmed and no one offers to help", k: "AS" },
          { t: "Physical closeness fades — less touching, less warmth", k: "PT" }
        ]
      },
      {
        q: "After an argument, what makes you feel okay again?",
        opts: [
          { t: "Hearing sincere loving words", k: "WA" },
          { t: "Sitting down together, fully present", k: "QT" },
          { t: "A small peace offering — even tiny", k: "GG" },
          { t: "Them showing through actions that things are okay", k: "AS" },
          { t: "A real hug — body language saying we're good", k: "PT" }
        ]
      },
      {
        q: "Your ideal birthday from a partner looks like…",
        opts: [
          { t: "A heartfelt card or speech that genuinely moves you", k: "WA" },
          { t: "A full day with their complete presence", k: "QT" },
          { t: "A perfectly chosen gift showing they know you", k: "GG" },
          { t: "All errands handled so you can enjoy the day", k: "AS" },
          { t: "A lot of physical affection all day", k: "PT" }
        ]
      },
      {
        q: "Posts that make you quietly envious show couples…",
        opts: [
          { t: "Leaving little love notes or sweet words", k: "WA" },
          { t: "Fully present on adventures — no phones", k: "QT" },
          { t: "Surprise gifts and thoughtful gestures", k: "GG" },
          { t: "Partners supporting each other practically", k: "AS" },
          { t: "Who are physically affectionate and openly warm", k: "PT" }
        ]
      },
      {
        q: "Compliments from your partner feel…",
        opts: [
          { t: "Essential — they fill something real in you", k: "WA" },
          { t: "Nice, but presence matters more", k: "QT" },
          { t: "Lovely, but a thoughtful gift hits different", k: "GG" },
          { t: "Good, but actions show love more clearly", k: "AS" },
          { t: "Warm, but physical affection speaks louder", k: "PT" }
        ]
      },
      {
        q: "If your love language could speak it would say…",
        opts: [
          { t: "Tell me. Say it. Mean it.", k: "WA" },
          { t: "Put the phone down and be here.", k: "QT" },
          { t: "You thought of me when I wasn't there.", k: "GG" },
          { t: "You showed me — you didn't just say it.", k: "AS" },
          { t: "Hold on. Literally. Don't let go.", k: "PT" }
        ]
      },
    ],
    keys: {
      WA: { n: "Words of Affirmation", e: "🗣️", d: "Language is your love currency. Sincere specific words fill something real in you. You remember what people say — and what they don't. Silence reads as indifference. The antidote isn't more compliments — it's better ones that prove your partner truly sees you." },
      QT: { n: "Quality Time", e: "⏳", d: "You measure love in attention. Not proximity — presence. Phone-free, undivided, undistracted. You'd rather have two focused hours than a whole weekend of half-attention. Distractions during your time together register as rejection." },
      GG: { n: "Receiving Gifts", e: "🎁", d: "This was never about materialism. Gifts are proof someone held you in their mind when you weren't there. A perfectly chosen small thing beats an expensive careless one. Forgotten occasions sting because they mean you weren't thought of — that's what actually hurts." },
      AS: { n: "Acts of Service", e: "🛠️", d: "Love looks like being made lighter. When someone steps in and handles something without being asked — not because they had to, but because they noticed — that registers in your body as deep care." },
      PT: { n: "Physical Touch", e: "🤝", d: "Connection lives in your body. Touch is your primary language for safety, love, and belonging. A hand squeeze during a hard conversation, leaning together — these are oxygen. Physical withdrawal during conflict is particularly destabilizing for you." }
    }
  },
  {
    id: "apology",
    cat: "foundation",
    title: "Apology Languages",
    emoji: "🕊️",
    color: "#b8d4e8",
    desc: "How you need to receive an apology to actually feel it",
    time: "6 min",
    type: "choice",
    questions: [
      {
        q: "An apology feels real when your partner…",
        opts: [
          { t: "Looks you in the eye and says I was wrong — no but", k: "EW" },
          { t: "Asks what they can do to make it right and does it", k: "MR" },
          { t: "Expresses genuine guilt — you can feel they feel bad", k: "GR" },
          { t: "Commits to specific changes so it won't happen again", k: "RC" },
          { t: "Asks for forgiveness — actually uses those words", k: "RF" }
        ]
      },
      {
        q: "An apology falls flat when the person…",
        opts: [
          { t: "Says sorry but never admits what they actually did wrong", k: "EW" },
          { t: "Apologizes verbally but doesn't try to repair anything", k: "MR" },
          { t: "Seems emotionless or mechanical about it", k: "GR" },
          { t: "Apologizes repeatedly but keeps doing the same thing", k: "RC" },
          { t: "Expects things to resume without real closure", k: "RF" }
        ]
      },
      {
        q: "After conflict, you feel healed when…",
        opts: [
          { t: "You've heard them say clearly: I was wrong to do that", k: "EW" },
          { t: "They've done something concrete to address the harm", k: "MR" },
          { t: "You can feel in their voice that they truly feel it", k: "GR" },
          { t: "There's a real plan so it doesn't repeat", k: "RC" },
          { t: "They asked you to forgive them and gave you space to", k: "RF" }
        ]
      },
      {
        q: "The phrase that lands deepest in an apology is…",
        opts: [
          { t: "I was completely wrong. There is no excuse.", k: "EW" },
          { t: "What do you need from me right now to make this right?", k: "MR" },
          { t: "I feel genuinely terrible about how I made you feel.", k: "GR" },
          { t: "I'm putting things in place so this doesn't happen again.", k: "RC" },
          { t: "Will you forgive me? I mean that sincerely.", k: "RF" }
        ]
      },
      {
        q: "You've moved on from conflict when…",
        opts: [
          { t: "The facts of what happened were clearly acknowledged", k: "EW" },
          { t: "Something was done — not just said — to repair it", k: "MR" },
          { t: "The emotional reality between you both shifted", k: "GR" },
          { t: "You trust the behavior will actually be different", k: "RC" },
          { t: "Forgiveness was explicitly asked for and you gave it", k: "RF" }
        ]
      },
      {
        q: "The most healing apology you received had someone who…",
        opts: [
          { t: "Took full responsibility with zero deflection", k: "EW" },
          { t: "Backed up the words with real action afterward", k: "MR" },
          { t: "Was visibly and genuinely moved by what they had done", k: "GR" },
          { t: "Changed — and the change was real and lasting", k: "RC" },
          { t: "Humbly asked for your forgiveness and meant it", k: "RF" }
        ]
      },
    ],
    keys: {
      EW: { n: "Expressing Regret", e: "💬", d: "You need to hear the words clearly without deflection. 'I'm sorry you felt that way' is not an apology. 'I was wrong' is. Ownership of the specific action makes an apology land. Half-accountability feels worse than none." },
      MR: { n: "Making Restitution", e: "🔧", d: "Words aren't enough — you need to see repair. An apology paired with action that addresses the harm means far more than eloquent words followed by nothing. Love is demonstrated, not just declared." },
      GR: { n: "Genuine Repentance", e: "❤️‍🩹", d: "You need to feel that they feel it. An apology that sounds rehearsed or mechanical doesn't register. The genuine experience of guilt or remorse from your partner is what opens the door to forgiveness." },
      RC: { n: "Requesting Change", e: "🔄", d: "Trust is rebuilt through behavior, not promises. You forgive when you see the pattern change. 'I'm sorry' repeated without change is a signal — you need to see what's different, not just hear about it." },
      RF: { n: "Requesting Forgiveness", e: "🤲", d: "You need the relational moment — the explicit ask, the deliberate offering of forgiveness. It closes the loop. Apologies that trail off without requesting forgiveness leave you feeling reconciliation was never completed." }
    }
  },
  {
    id: "attachment",
    cat: "foundation",
    title: "Attachment Style",
    emoji: "🔗",
    color: A2,
    desc: "Your deepest relational wiring — where it comes from and how it shows up",
    time: "10 min",
    type: "choice",
    questions: [
      {
        q: "When my partner doesn't text back for a while, I usually…",
        opts: [
          { t: "Assume they're busy and go on with my day", k: "SEC" },
          { t: "Find myself checking my phone repeatedly, feeling uneasy", k: "ANX" },
          { t: "Barely notice — I'm absorbed in my own things", k: "AVO" }
        ]
      },
      {
        q: "The idea of my partner needing space feels…",
        opts: [
          { t: "Completely reasonable — I need that sometimes too", k: "SEC" },
          { t: "Unsettling — I start wondering if something is wrong", k: "ANX" },
          { t: "Like a relief, honestly", k: "AVO" }
        ]
      },
      {
        q: "When I sense my partner pulling away emotionally, I…",
        opts: [
          { t: "Gently check in and trust we can work through it", k: "SEC" },
          { t: "Pursue more closeness — the distance makes me anxious", k: "ANX" },
          { t: "Withdraw too — it's easier than confronting it", k: "AVO" }
        ]
      },
      {
        q: "Vulnerability in a relationship feels…",
        opts: [
          { t: "Like the point of the whole thing", k: "SEC" },
          { t: "Terrifying, but I crave the closeness anyway", k: "ANX" },
          { t: "Uncomfortable — I'd rather keep emotional distance", k: "AVO" }
        ]
      },
      {
        q: "After a really intimate conversation, I feel…",
        opts: [
          { t: "Closer and glad we went there", k: "SEC" },
          { t: "Grateful but exposed — I watch carefully afterward", k: "ANX" },
          { t: "A need to decompress — intimacy tires me", k: "AVO" }
        ]
      },
      {
        q: "My biggest fear in a relationship is…",
        opts: [
          { t: "I'm not sure — I feel relatively secure", k: "SEC" },
          { t: "Being abandoned or replaced by someone they love more", k: "ANX" },
          { t: "Losing myself or my independence completely", k: "AVO" }
        ]
      },
      {
        q: "When conflict happens, I instinctively…",
        opts: [
          { t: "Want to resolve it while staying emotionally present", k: "SEC" },
          { t: "Feel a surge — I need resolution quickly", k: "ANX" },
          { t: "Go cold and retreat — I need time before engaging", k: "AVO" }
        ]
      },
      {
        q: "I find it easy to trust my partner genuinely loves me.",
        opts: [
          { t: "Yes — I don't need constant proof", k: "SEC" },
          { t: "Sometimes — I need more reassurance than I'd like", k: "ANX" },
          { t: "I keep a layer of skepticism as self-protection", k: "AVO" }
        ]
      },
      {
        q: "When things are going really well, I sometimes feel…",
        opts: [
          { t: "Happy and grateful — good relationships feel natural", k: "SEC" },
          { t: "Waiting for the other shoe to drop", k: "ANX" },
          { t: "Slightly suspicious of how good it feels", k: "AVO" }
        ]
      },
      {
        q: "My childhood experience of love was mostly…",
        opts: [
          { t: "Consistent and safe — I knew it would be there", k: "SEC" },
          { t: "Unpredictable — love was present but sometimes withdrawn", k: "ANX" },
          { t: "Distant or conditional — closeness didn't feel safe", k: "AVO" }
        ]
      },
    ],
    keys: {
      SEC: { n: "Secure", e: "🏡", d: "You approach love from a place of safety — trusting, capable of intimacy without losing yourself. Secure attachment is often built deliberately through self-awareness and healthy relationships." },
      ANX: { n: "Anxious / Preoccupied", e: "🌊", d: "You love with intensity and a low-grade fear beneath it. Your nervous system learned early that love was sometimes present, sometimes withheld. The work: find a partner who shows up consistently and develop self-soothing so anxiety doesn't speak before you do." },
      AVO: { n: "Avoidant / Dismissing", e: "🌿", d: "You are self-contained by design. Independence is oxygen. Too much closeness can feel suffocating — not because you don't care, but because emotional proximity was likely associated with discomfort early on. The growth edge: learning that vulnerability won't end you." }
    }
  }
];

// Simplified version - showing first 3 quizzes to keep the file manageable
// In a real deployment, you'd include all 19 quizzes

/* ── UI Atoms ── */
function PBar({ v, color = A, h = 3, s = {} }: { v: number; color?: string; h?: number; s?: React.CSSProperties }) {
  return (
    <div style={{ width: "100%", height: h, background: "#1a1428", borderRadius: h, ...s }}>
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

function Badge({ label, color = A }: { label: string; color?: string }) {
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
  color = A,
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
        border: `1px solid ${active ? color : BDR}`,
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

/* ── Quiz Hub ── */
function QuizHub() {
  const [cat, setCat] = useState("all");
  const [active, setActive] = useState<any>(null);
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

  const list = cat === "all" ? QZ : QZ.filter((q) => q.cat === cat);

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
          color: A,
          fontStyle: "italic",
          fontWeight: 600,
          marginBottom: 2,
        }}
      >
        Quiz Studio
      </h2>
      <p style={{ color: "#5a4f6a", fontSize: 13, marginBottom: 10 }}>
        {QZ.length} quizzes. The most honest thing you&apos;ll do together.
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
          {done.length}/{QZ.length} completed
        </span>
        <span style={{ color: A }}>
          {Math.round((done.length / QZ.length) * 100)}%
        </span>
      </div>
      <PBar v={(done.length / QZ.length) * 100} s={{ marginBottom: 16 }} />
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
                background: CARD,
                border: `1px solid ${isDone ? q.color + "55" : BDR}`,
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
              <span style={{ color: "#2a2040", fontSize: 18, flexShrink: 0 }}>›</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Quiz Engine ── */
function QuizEngine({
  quiz,
  onBack,
  onDone,
}: {
  quiz: any;
  onBack: () => void;
  onDone: (id: string) => void;
}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<any>(null);

  if (result) {
    return <QuizResult quiz={quiz} result={result} onBack={onBack} />;
  }

  const q = quiz.questions[step];
  const prog = ((step + 1) / quiz.questions.length) * 100;

  const answer = (val: string) => {
    const na = { ...answers, [step]: val };
    setAnswers(na);
    if (step < quiz.questions.length - 1) {
      setTimeout(() => setStep((s) => s + 1), 220);
    } else {
      setTimeout(() => {
        onDone(quiz.id);
        const t: Record<string, number> = {};
        Object.values(na).forEach((v) => {
          t[v] = (t[v] || 0) + 1;
        });
        const top = Object.entries(t).sort((a, b) => b[1] - a[1])[0];
        const tally = Object.entries(t)
          .map(([k, v]) => ({ k, v, pct: Math.round((v / quiz.questions.length) * 100) }))
          .sort((a, b) => b.v - a.v);
        setResult({ key: top[0], profile: quiz.keys?.[top[0]], tally });
      }, 350);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: DARK,
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
          borderBottom: `1px solid ${BDR}`,
          background: SURF,
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
        <span style={{ fontSize: 11, color: quiz.color || A, fontWeight: 600 }}>
          {Math.round(prog)}%
        </span>
      </div>
      <PBar v={prog} color={quiz.color || A} />
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
          {q.q}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {q.opts.map((opt: any, i: number) => (
            <button
              key={i}
              onClick={() => answer(opt.k)}
              className="fu"
              style={{
                animationDelay: `${i * 55}ms`,
                padding: "15px 18px",
                background: CARD,
                border: `1px solid ${BDR}`,
                borderRadius: 13,
                color: "#c8c0d8",
                fontSize: 14,
                textAlign: "left",
                cursor: "pointer",
                lineHeight: 1.4,
              }}
            >
              {opt.t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Quiz Result ── */
function QuizResult({ quiz, result, onBack }: { quiz: any; result: any; onBack: () => void }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: DARK,
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

      {result.profile && (
        <div
          style={{
            background: CARD,
            border: `1px solid ${quiz.color}55`,
            borderRadius: 16,
            padding: 20,
            marginBottom: 16,
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <span style={{ fontSize: 36 }}>{result.profile.e}</span>
            <h3
              style={{
                fontSize: 22,
                color: quiz.color,
                fontWeight: 600,
                marginTop: 8,
              }}
            >
              {result.profile.n}
            </h3>
          </div>
          <p style={{ color: "#c8c0d8", fontSize: 14, lineHeight: 1.6 }}>
            {result.profile.d}
          </p>
        </div>
      )}

      {result.tally && result.tally.length > 0 && (
        <div
          style={{
            background: CARD,
            border: `1px solid ${BDR}`,
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
          {result.tally.slice(0, 5).map((item: any, i: number) => (
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

export default function CouplesQuizApp() {
  return (
    <div style={{ background: DARK, minHeight: "100vh" }}>
      <QuizHub />
    </div>
  );
}