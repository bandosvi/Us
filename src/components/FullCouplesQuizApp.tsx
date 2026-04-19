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

const DDATES = [
  "Sunset picnic", "Cook a new recipe together", "Star gazing", "Dance class",
  "Museum visit", "Morning hike", "Wine & paint night", "Midnight drive",
  "Farmers market", "Board game night", "Road trip", "Spa day at home",
  "Watch the sunrise", "Pottery class", "Karaoke night", "Bookstore date",
  "Drive-in movie", "Escape room", "Concert", "Breakfast in bed",
  "Botanical garden", "Kayaking"
];

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
      { q: "You had a rough week. What would feel most healing?", opts: [{ t: "A long heartfelt message about how much you're valued", k: "WA" }, { t: "A whole evening with full phone-free attention", k: "QT" }, { t: "A small surprise gift or comfort item waiting for you", k: "GG" }, { t: "Partner handled everything without being asked", k: "AS" }, { t: "Being held without words for a long time", k: "PT" }] },
      { q: "You express love most naturally by…", opts: [{ t: "Telling them often — verbally and in writing", k: "WA" }, { t: "Carving out intentional time that belongs only to them", k: "QT" }, { t: "Finding something thoughtfully chosen just for them", k: "GG" }, { t: "Anticipating needs and quietly handling them", k: "AS" }, { t: "Physical nearness — a hand, a touch, closeness", k: "PT" }] },
      { q: "Your partner forgets an important date. What stings most?", opts: [{ t: "They said nothing meaningful to acknowledge it", k: "WA" }, { t: "You didn't get to spend real time together", k: "QT" }, { t: "There was no thoughtful gesture at all", k: "GG" }, { t: "They didn't do anything to make the day feel special", k: "AS" }, { t: "There was no physical closeness or warmth", k: "PT" }] },
      { q: "The most romantic thing a partner could do is…", opts: [{ t: "Write you a long vulnerable letter out of nowhere", k: "WA" }, { t: "Plan a full day designed entirely around your favorites", k: "QT" }, { t: "Show up with something they remembered months ago", k: "GG" }, { t: "Handle your entire to-do list so you can truly rest", k: "AS" }, { t: "Dance with you in the kitchen to no particular song", k: "PT" }] },
      { q: "You feel most disconnected when…", opts: [{ t: "Appreciation and verbal affirmation dry up", k: "WA" }, { t: "You stop having real quality time together", k: "QT" }, { t: "Thoughtful gestures disappear completely", k: "GG" }, { t: "You're overwhelmed and no one offers to help", k: "AS" }, { t: "Physical closeness fades — less touching, less warmth", k: "PT" }] },
      { q: "After an argument, what makes you feel okay again?", opts: [{ t: "Hearing sincere loving words", k: "WA" }, { t: "Sitting down together, fully present", k: "QT" }, { t: "A small peace offering — even tiny", k: "GG" }, { t: "Them showing through actions that things are okay", k: "AS" }, { t: "A real hug — body language saying we're good", k: "PT" }] },
      { q: "Your ideal birthday from a partner looks like…", opts: [{ t: "A heartfelt card or speech that genuinely moves you", k: "WA" }, { t: "A full day with their complete presence", k: "QT" }, { t: "A perfectly chosen gift showing they know you", k: "GG" }, { t: "All errands handled so you can enjoy the day", k: "AS" }, { t: "A lot of physical affection all day", k: "PT" }] },
      { q: "Compliments from your partner feel…", opts: [{ t: "Essential — they fill something real in you", k: "WA" }, { t: "Nice, but presence matters more", k: "QT" }, { t: "Lovely, but a thoughtful gift hits different", k: "GG" }, { t: "Good, but actions show love more clearly", k: "AS" }, { t: "Warm, but physical affection speaks louder", k: "PT" }] },
      { q: "If your love language could speak it would say…", opts: [{ t: "Tell me. Say it. Mean it.", k: "WA" }, { t: "Put the phone down and be here.", k: "QT" }, { t: "You thought of me when I wasn't there.", k: "GG" }, { t: "You showed me — you didn't just say it.", k: "AS" }, { t: "Hold on. Literally. Don't let go.", k: "PT" }] },
      { q: "Posts that make you quietly envious show couples…", opts: [{ t: "Leaving little love notes or sweet words", k: "WA" }, { t: "Fully present on adventures — no phones", k: "QT" }, { t: "Surprise gifts and thoughtful gestures", k: "GG" }, { t: "Partners supporting each other practically", k: "AS" }, { t: "Who are physically affectionate and openly warm", k: "PT" }] },
    ],
    keys: {
      WA: { n: "Words of Affirmation", e: "🗣️", d: "Language is your love currency. Sincere specific words fill something real in you. You remember what people say — and what they don't. Silence reads as indifference." },
      QT: { n: "Quality Time", e: "⏳", d: "You measure love in attention. Not proximity — presence. Phone-free, undivided, undistracted." },
      GG: { n: "Receiving Gifts", e: "🎁", d: "Gifts are proof someone held you in their mind when you weren't there." },
      AS: { n: "Acts of Service", e: "🛠️", d: "Love looks like being made lighter. When someone steps in and handles something without being asked." },
      PT: { n: "Physical Touch", e: "🤝", d: "Connection lives in your body. Touch is your primary language for safety, love, and belonging." }
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
      { q: "An apology feels real when your partner…", opts: [{ t: "Looks you in the eye and says I was wrong — no but", k: "EW" }, { t: "Asks what they can do to make it right and does it", k: "MR" }, { t: "Expresses genuine guilt — you can feel they feel bad", k: "GR" }, { t: "Commits to specific changes so it won't happen again", k: "RC" }, { t: "Asks for forgiveness — actually uses those words", k: "RF" }] },
      { q: "An apology falls flat when the person…", opts: [{ t: "Says sorry but never admits what they actually did wrong", k: "EW" }, { t: "Apologizes verbally but doesn't try to repair anything", k: "MR" }, { t: "Seems emotionless or mechanical about it", k: "GR" }, { t: "Apologizes repeatedly but keeps doing the same thing", k: "RC" }, { t: "Expects things to resume without real closure", k: "RF" }] },
      { q: "After conflict, you feel healed when…", opts: [{ t: "You've heard them say clearly: I was wrong to do that", k: "EW" }, { t: "They've done something concrete to address the harm", k: "MR" }, { t: "You can feel in their voice that they truly feel it", k: "GR" }, { t: "There's a real plan so it doesn't repeat", k: "RC" }, { t: "They asked you to forgive them and gave you space to", k: "RF" }] },
      { q: "The phrase that lands deepest in an apology is…", opts: [{ t: "I was completely wrong. There is no excuse.", k: "EW" }, { t: "What do you need from me right now to make this right?", k: "MR" }, { t: "I feel genuinely terrible about how I made you feel.", k: "GR" }, { t: "I'm putting things in place so this doesn't happen again.", k: "RC" }, { t: "Will you forgive me? I mean that sincerely.", k: "RF" }] },
      { q: "You've moved on from conflict when…", opts: [{ t: "The facts of what happened were clearly acknowledged", k: "EW" }, { t: "Something was done — not just said — to repair it", k: "MR" }, { t: "The emotional reality between you both shifted", k: "GR" }, { t: "You trust the behavior will actually be different", k: "RC" }, { t: "Forgiveness was explicitly asked for and you gave it", k: "RF" }] },
      { q: "The most healing apology you received had someone who…", opts: [{ t: "Took full responsibility with zero deflection", k: "EW" }, { t: "Backed up the words with real action afterward", k: "MR" }, { t: "Was visibly and genuinely moved by what they had done", k: "GR" }, { t: "Changed — and the change was real and lasting", k: "RC" }, { t: "Humbly asked for your forgiveness and meant it", k: "RF" }] },
    ],
    keys: {
      EW: { n: "Expressing Regret", e: "💬", d: "You need to hear the words clearly without deflection. 'I'm sorry you felt that way' is not an apology." },
      MR: { n: "Making Restitution", e: "🔧", d: "Words aren't enough — you need to see repair." },
      GR: { n: "Genuine Repentance", e: "❤️‍🩹", d: "You need to feel that they feel it." },
      RC: { n: "Requesting Change", e: "🔄", d: "Trust is rebuilt through behavior, not promises." },
      RF: { n: "Requesting Forgiveness", e: "🤲", d: "You need the relational moment — the explicit ask, the deliberate offering of forgiveness." }
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
      { q: "When my partner doesn't text back for a while, I usually…", opts: [{ t: "Assume they're busy and go on with my day", k: "SEC" }, { t: "Find myself checking my phone repeatedly, feeling uneasy", k: "ANX" }, { t: "Barely notice — I'm absorbed in my own things", k: "AVO" }] },
      { q: "The idea of my partner needing space feels…", opts: [{ t: "Completely reasonable — I need that sometimes too", k: "SEC" }, { t: "Unsettling — I start wondering if something is wrong", k: "ANX" }, { t: "Like a relief, honestly", k: "AVO" }] },
      { q: "When I sense my partner pulling away emotionally, I…", opts: [{ t: "Gently check in and trust we can work through it", k: "SEC" }, { t: "Pursue more closeness — the distance makes me anxious", k: "ANX" }, { t: "Withdraw too — it's easier than confronting it", k: "AVO" }] },
      { q: "Vulnerability in a relationship feels…", opts: [{ t: "Like the point of the whole thing", k: "SEC" }, { t: "Terrifying, but I crave the closeness anyway", k: "ANX" }, { t: "Uncomfortable — I'd rather keep emotional distance", k: "AVO" }] },
      { q: "After a really intimate conversation, I feel…", opts: [{ t: "Closer and glad we went there", k: "SEC" }, { t: "Grateful but exposed — I watch carefully afterward", k: "ANX" }, { t: "A need to decompress — intimacy tires me", k: "AVO" }] },
      { q: "My biggest fear in a relationship is…", opts: [{ t: "I'm not sure — I feel relatively secure", k: "SEC" }, { t: "Being abandoned or replaced by someone they love more", k: "ANX" }, { t: "Losing myself or my independence completely", k: "AVO" }] },
      { q: "When conflict happens, I instinctively…", opts: [{ t: "Want to resolve it while staying emotionally present", k: "SEC" }, { t: "Feel a surge — I need resolution quickly", k: "ANX" }, { t: "Go cold and retreat — I need time before engaging", k: "AVO" }] },
      { q: "I find it easy to trust my partner genuinely loves me.", opts: [{ t: "Yes — I don't need constant proof", k: "SEC" }, { t: "Sometimes — I need more reassurance than I'd like", k: "ANX" }, { t: "I keep a layer of skepticism as self-protection", k: "AVO" }] },
      { q: "When things are going really well, I sometimes feel…", opts: [{ t: "Happy and grateful — good relationships feel natural", k: "SEC" }, { t: "Waiting for the other shoe to drop", k: "ANX" }, { t: "Slightly suspicious of how good it feels", k: "AVO" }] },
      { q: "My childhood experience of love was mostly…", opts: [{ t: "Consistent and safe — I knew it would be there", k: "SEC" }, { t: "Unpredictable — love was present but sometimes withdrawn", k: "ANX" }, { t: "Distant or conditional — closeness didn't feel safe", k: "AVO" }] },
    ],
    keys: {
      SEC: { n: "Secure", e: "🏡", d: "You approach love from a place of safety — trusting, capable of intimacy without losing yourself." },
      ANX: { n: "Anxious / Preoccupied", e: "🌊", d: "You love with intensity and a low-grade fear beneath it." },
      AVO: { n: "Avoidant / Dismissing", e: "🌿", d: "You are self-contained by design. Independence is oxygen." }
    }
  },
  {
    id: "conflict",
    cat: "foundation",
    title: "How You Fight",
    emoji: "⚡",
    color: GOLD,
    desc: "Your conflict style — how you engage, escalate, and repair",
    time: "8 min",
    type: "choice",
    questions: [
      { q: "When you're hurt by your partner, your first instinct is to…", opts: [{ t: "Say something directly, even if the timing isn't perfect", k: "DIR" }, { t: "Take time to understand your feelings before speaking", k: "MED" }, { t: "Let it go unless it becomes a real pattern", k: "PAC" }, { t: "Go quiet — you need solo processing time first", k: "WIT" }] },
      { q: "Mid-argument, your partner raises their voice. You…", opts: [{ t: "Match their energy — you're both passionate and that's okay", k: "DIR" }, { t: "Actively try to de-escalate", k: "MED" }, { t: "Apologize quickly just to stop the tension", k: "PAC" }, { t: "Shut down completely or leave the room", k: "WIT" }] },
      { q: "What you actually need during a fight is…", opts: [{ t: "The real issue named clearly and addressed", k: "DIR" }, { t: "Genuine listening — reflection, not just waiting to respond", k: "MED" }, { t: "The tension to stop — resolution can come later", k: "PAC" }, { t: "Time alone before re-engaging", k: "WIT" }] },
      { q: "After a big argument, you feel resolved when…", opts: [{ t: "You've reached an actual conclusion — not just a ceasefire", k: "DIR" }, { t: "You both understood each other's perspective", k: "MED" }, { t: "Things feel normal again", k: "PAC" }, { t: "You've had time alone and then reconnected on your terms", k: "WIT" }] },
      { q: "In conflicts, you tend to be criticized for…", opts: [{ t: "Being too intense or going too hard", k: "DIR" }, { t: "Over-analyzing and making things too complicated", k: "MED" }, { t: "Never saying what you actually think", k: "PAC" }, { t: "Shutting down and leaving your partner hanging", k: "WIT" }] },
      { q: "You feel safest in conflict when your partner…", opts: [{ t: "Is equally direct — no guessing games", k: "DIR" }, { t: "Stays curious and doesn't attack", k: "MED" }, { t: "Keeps their voice calm and doesn't escalate", k: "PAC" }, { t: "Gives you space to re-engage on your own timeline", k: "WIT" }] },
      { q: "Your partner brings up a conflict at the worst time. You…", opts: [{ t: "Engage anyway — the issue matters more than timing", k: "DIR" }, { t: "Ask for 20 minutes to collect yourself, then go deep", k: "MED" }, { t: "Agree with them quickly so it's over", k: "PAC" }, { t: "Say nothing and disappear to process", k: "WIT" }] },
      { q: "The argument you're most likely to have is about…", opts: [{ t: "Your partner being indirect or hiding the real issue", k: "DIR" }, { t: "Feeling misunderstood despite trying to communicate", k: "MED" }, { t: "Tension that built in silence until it exploded", k: "PAC" }, { t: "Your partner misreading your need for space as rejection", k: "WIT" }] },
    ],
    keys: {
      DIR: { n: "Direct Confronter", e: "⚔️", d: "You're not afraid of the conversation — you're afraid of it not happening." },
      MED: { n: "Thoughtful Mediator", e: "🧘", d: "You bring genuine curiosity during disagreement." },
      PAC: { n: "Harmony Keeper", e: "🕊️", d: "Peace is your priority — until suppressed feelings find another way out." },
      WIT: { n: "Internal Processor", e: "🌒", d: "You regulate internally before you can engage externally." }
    }
  },
  {
    id: "communication",
    cat: "foundation",
    title: "Communication Style",
    emoji: "💬",
    color: "#a8d8ea",
    desc: "How you connect, express, and listen — your relational dialect",
    time: "7 min",
    type: "choice",
    questions: [
      { q: "When something's bothering you, you tend to…", opts: [{ t: "Choose your moment and words carefully before speaking", k: "OBS" }, { t: "Work through it out loud — talking helps you understand it", k: "PRB" }, { t: "Address it directly and efficiently", k: "DIR" }, { t: "Use humor or lightness to bring it up", k: "HUM" }] },
      { q: "Your partner says 'I'm fine' but clearly isn't. You…", opts: [{ t: "Give space and check back in later", k: "OBS" }, { t: "Gently press — you want to know what's happening", k: "PRB" }, { t: "Take it at face value and move on", k: "DIR" }, { t: "Make a joke to soften the atmosphere", k: "HUM" }] },
      { q: "You feel most heard when someone…", opts: [{ t: "Gives you space to finish completely before responding", k: "OBS" }, { t: "Asks follow-up questions showing they're tracking", k: "PRB" }, { t: "Responds honestly and directly without softening", k: "DIR" }, { t: "Keeps it light enough you don't feel like a burden", k: "HUM" }] },
      { q: "In a heavy emotional conversation you need your partner to…", opts: [{ t: "Not rush you — let the thought unfold", k: "OBS" }, { t: "Engage actively — ask questions, help you work through it", k: "PRB" }, { t: "Get to the point so you can problem-solve", k: "DIR" }, { t: "Keep it from becoming completely unbearable", k: "HUM" }] },
      { q: "You feel anxious in conversation when…", opts: [{ t: "You're rushed or interrupted before completing a thought", k: "OBS" }, { t: "The topic stays surface-level and never goes deeper", k: "PRB" }, { t: "There's too much hedging or emotional preamble", k: "DIR" }, { t: "The conversation becomes so heavy there's no air in it", k: "HUM" }] },
      { q: "A missed communication usually happens because…", opts: [{ t: "You didn't say what you meant clearly enough", k: "OBS" }, { t: "You both operated from different assumptions", k: "PRB" }, { t: "Someone softened the message until it got lost", k: "DIR" }, { t: "The tension made it impossible to actually listen", k: "HUM" }] },
    ],
    keys: {
      OBS: { n: "Thoughtful Observer", e: "🔭", d: "You're a deep listener and deliberate speaker." },
      PRB: { n: "Curious Explorer", e: "🧩", d: "You communicate by excavating." },
      DIR: { n: "Direct Communicator", e: "🎯", d: "You say what you mean." },
      HUM: { n: "Warm Connector", e: "😄", d: "Levity is your entry point." }
    }
  },
  {
    id: "shadow",
    cat: "deep",
    title: "What You Carry",
    emoji: "🌑",
    color: "#8b7fd4",
    desc: "The unhealed parts you bring into the relationship — honest and necessary",
    time: "10 min",
    type: "choice",
    questions: [
      { q: "When I feel unloved, my most common response is…", opts: [{ t: "I withdraw and wait to see if they notice", k: "WIT" }, { t: "I push for attention or connection", k: "PUR" }, { t: "I act like I'm fine and handle it alone", k: "SUP" }, { t: "I shut down emotionally to protect myself", k: "DEF" }] },
      { q: "My biggest emotional trigger in a relationship is…", opts: [{ t: "Being ignored or deprioritized", k: "WIT" }, { t: "Feeling like they might leave or stop loving me", k: "PUR" }, { t: "Feeling like a burden", k: "SUP" }, { t: "Being criticized or feeling like I'm not enough", k: "DEF" }] },
      { q: "When I'm angry, the thing I do that I'm least proud of is…", opts: [{ t: "Going cold and shutting people out completely", k: "WIT" }, { t: "Pushing too hard and saying things I don't mean", k: "PUR" }, { t: "Pretending I'm not angry at all", k: "SUP" }, { t: "Getting defensive before I've even heard them out", k: "DEF" }] },
      { q: "The relationship pattern I keep recreating is…", opts: [{ t: "Getting close then pushing people away when it gets real", k: "WIT" }, { t: "Loving intensely then being devastated when it shifts", k: "PUR" }, { t: "Giving until I'm empty, then resenting it", k: "SUP" }, { t: "Feeling criticized when I'm being corrected", k: "DEF" }] },
      { q: "The thing I need from a partner that I struggle to ask for is…", opts: [{ t: "Consistent reassurance without having to earn it", k: "PUR" }, { t: "Space to be imperfect without it becoming a conversation", k: "WIT" }, { t: "To be taken care of sometimes — not always the strong one", k: "SUP" }, { t: "To be accepted without conditions", k: "DEF" }] },
      { q: "If my past wounds could speak, they'd say…", opts: [{ t: "You don't deserve to take up emotional space", k: "SUP" }, { t: "Love always leaves eventually", k: "PUR" }, { t: "Getting close makes you vulnerable to getting hurt", k: "WIT" }, { t: "You're never quite good enough", k: "DEF" }] },
      { q: "The hardest thing for me to say in a relationship is…", opts: [{ t: "I need you", k: "WIT" }, { t: "I'm scared you'll leave", k: "PUR" }, { t: "I'm struggling and I need help", k: "SUP" }, { t: "I made a mistake and I feel bad about it", k: "DEF" }] },
      { q: "In conflict, the shame I carry sounds like…", opts: [{ t: "I'm too much", k: "PUR" }, { t: "I'm not enough", k: "DEF" }, { t: "I'm a burden", k: "SUP" }, { t: "I should be able to handle this alone", k: "WIT" }] },
    ],
    keys: {
      WIT: { n: "The Withdrawer", e: "🚪", d: "When things get overwhelming you create distance." },
      PUR: { n: "The Pursuer", e: "🌊", d: "You chase closeness with intensity." },
      SUP: { n: "The Suppressor", e: "🪨", d: "You are fluent in other people's needs and a near-stranger to your own." },
      DEF: { n: "The Defender", e: "🛡️", d: "You arrive at feedback already in armor." }
    }
  },
  {
    id: "trust",
    cat: "deep",
    title: "Trust & Loyalty",
    emoji: "🔐",
    color: "#7fc4a0",
    desc: "Where you stand on fidelity, betrayal, and rebuilding",
    time: "8 min",
    type: "choice",
    questions: [
      { q: "Trust in a relationship, to me, is…", opts: [{ t: "The foundation — everything else builds on it", k: "CORE" }, { t: "Something that must be continually earned, not assumed", k: "EARN" }, { t: "Fragile — once genuinely broken, hard to fully restore", k: "FRAG" }, { t: "Something I extend freely until there's reason not to", k: "OPEN" }] },
      { q: "The most painful form of betrayal would be…", opts: [{ t: "Physical infidelity", k: "PHYS" }, { t: "Emotional infidelity — a deep connection kept secret", k: "EMOT" }, { t: "Being lied to about something significant", k: "HON" }, { t: "Being consistently chosen below something else", k: "PRI" }] },
      { q: "When I catch my partner in a small lie, I…", opts: [{ t: "Address it immediately — I need to understand why", k: "EARN" }, { t: "Note it but give benefit of the doubt", k: "OPEN" }, { t: "Feel disproportionate unease — it stirs something deeper", k: "FRAG" }, { t: "Take it seriously as a signal worth watching", k: "CORE" }] },
      { q: "Trust is rebuilt after betrayal by…", opts: [{ t: "Consistent transparent behavior over a long time", k: "EARN" }, { t: "Full accountability and no minimizing of what happened", k: "CORE" }, { t: "I'm not sure it can be — depends on the betrayal", k: "FRAG" }, { t: "Open communication and giving the relationship a real chance", k: "OPEN" }] },
      { q: "My loyalty in a relationship means…", opts: [{ t: "I never entertain romantic or emotional alternatives", k: "CORE" }, { t: "I advocate for my partner even when they're not in the room", k: "PRI" }, { t: "I'm transparent about things that could erode trust", k: "HON" }, { t: "I choose us consistently even when it would be easier not to", k: "EARN" }] },
      { q: "The thing that would most shake my trust is…", opts: [{ t: "Discovering deception about something that mattered to me", k: "HON" }, { t: "Finding out they confide deep intimacy in someone else", k: "EMOT" }, { t: "Realizing they consistently prioritized something over us", k: "PRI" }, { t: "Physical evidence of infidelity", k: "PHYS" }] },
    ],
    keys: {
      CORE: { n: "Trust as Foundation", e: "🏛️", d: "Trust isn't a feature — it's the structure everything else is built on." },
      EARN: { n: "Trust as Earned", e: "📈", d: "Trust is built deliberately, not assumed." },
      FRAG: { n: "Trust as Fragile", e: "🫧", d: "You've likely been hurt before and you carry that knowledge." },
      OPEN: { n: "Trust as Default", e: "🌿", d: "You come to relationships open-handed." },
      HON: { n: "Honesty First", e: "💎", d: "Transparency is the currency your relationship runs on." },
      EMOT: { n: "Emotional Fidelity", e: "🩺", d: "Deepest intimacy is emotional for you." },
      PRI: { n: "Being Chosen", e: "⭐", d: "Loyalty is demonstrated by being prioritized." },
      PHYS: { n: "Physical Fidelity", e: "🔒", d: "Physical exclusivity is a clear, non-negotiable boundary." }
    }
  },
  {
    id: "health",
    cat: "growth",
    title: "Relationship Health",
    emoji: "💚",
    color: GRN,
    desc: "An honest pulse check on where you actually are",
    time: "8 min",
    type: "scale",
    questions: [
      { q: "We rarely go to bed angry at each other.", k: "H" },
      { q: "I genuinely celebrate my partner's wins.", k: "H" },
      { q: "I can express disagreement without fear of the reaction.", k: "H" },
      { q: "We prioritize us even when life gets overwhelming.", k: "H" },
      { q: "There is more laughter than tension between us.", k: "H" },
      { q: "My partner makes me feel like they choose me every day.", k: "H" },
      { q: "We handle external stress as a team, not opponents.", k: "H" },
      { q: "I feel proud to be with my partner.", k: "H" },
      { q: "We have grown together rather than apart.", k: "H" },
      { q: "If I could do it all over again, I would choose us.", k: "H" },
    ]
  },
  {
    id: "future",
    cat: "growth",
    title: "Dreams & Alignment",
    emoji: "🌠",
    color: "#84b3e8",
    desc: "Where you're going, what you're building, whether your visions align",
    time: "9 min",
    type: "scale",
    questions: [
      { q: "I see us living in the same city for the next 5 years.", k: "H" },
      { q: "We are aligned on whether we want children.", k: "H" },
      { q: "We have compatible visions of financial security.", k: "H" },
      { q: "I can see us together in 10 years.", k: "H" },
      { q: "We are building something together — not just existing together.", k: "H" },
      { q: "We have honest conversations about our long-term future.", k: "H" },
      { q: "I feel like we're moving in the same direction.", k: "H" },
      { q: "We handle big life decisions well together.", k: "H" },
      { q: "I feel excited about what we're building.", k: "H" },
    ]
  },
  {
    id: "financial",
    cat: "growth",
    title: "Financial Compatibility",
    emoji: "💰",
    color: GOLD,
    desc: "Money conversations most couples avoid until they cause real damage",
    time: "7 min",
    type: "choice",
    questions: [
      { q: "My natural relationship with money is…", opts: [{ t: "Saver — security matters more than comfort", k: "SAV" }, { t: "Spender — life is now and I want to live it", k: "SPD" }, { t: "Investor — I think long-term and build deliberately", k: "INV" }, { t: "Inconsistent — I go through phases", k: "MIX" }] },
      { q: "In a shared financial life, couples should…", opts: [{ t: "Merge fully — one account, full transparency", k: "MERG" }, { t: "Keep separate accounts with shared expenses split", k: "SEP" }, { t: "Do both — joint for shared goals and personal accounts", k: "BOTH" }, { t: "Figure it out based on what works", k: "FLEX" }] },
      { q: "Debt, to me, is…", opts: [{ t: "Something to eliminate as fast as possible", k: "D1" }, { t: "Normal if managed carefully", k: "D2" }, { t: "Something to fully disclose before getting serious", k: "D3" }, { t: "Dependent entirely on what it's for", k: "D4" }] },
      { q: "My honest financial anxiety is…", opts: [{ t: "That I'm not saving or building enough", k: "BEH" }, { t: "That a financial emergency would break everything", k: "EMRG" }, { t: "That my partner and I aren't on the same page", k: "ALGN" }, { t: "I don't carry much financial anxiety — I feel okay", k: "NONE" }] },
      { q: "The financial conversation I most avoid is…", opts: [{ t: "My debt or financial mistakes", k: "DEBT" }, { t: "Long-term planning — retirement, savings goals", k: "LONG" }, { t: "Where the money actually goes", k: "SPND" }, { t: "What financial success means to each of us", k: "GOAL" }] },
    ]
  },
  {
    id: "this-or-that",
    cat: "fun",
    title: "This or That",
    emoji: "🎲",
    color: GOLD,
    desc: "Fast, fun, and surprisingly revealing — 25 rounds",
    time: "4 min",
    type: "this-or-that",
    questions: [
      { a: "Morning person", b: "Night owl" },
      { a: "Beach vacation", b: "Mountain getaway" },
      { a: "Cook at home", b: "Try new restaurants" },
      { a: "Big social gatherings", b: "Intimate dinners" },
      { a: "Action movie", b: "Romance film" },
      { a: "Text person", b: "Call person" },
      { a: "Spontaneous plans", b: "Carefully planned" },
      { a: "Dogs", b: "Cats" },
      { a: "City life", b: "Country / suburbs" },
      { a: "PDA", b: "Private affection" },
      { a: "Deep conversations", b: "Lighthearted banter" },
      { a: "Spender", b: "Saver" },
      { a: "Introvert", b: "Extrovert" },
      { a: "Stay home", b: "Always going out" },
      { a: "Work out solo", b: "Work out together" },
      { a: "Surprises", b: "Plans I know about" },
      { a: "Early to bed", b: "Late nights" },
      { a: "Minimalist home", b: "Cozy and collected" },
      { a: "Thrill seeker", b: "Comfort seeker" },
      { a: "Road trip", b: "Fly there" },
      { a: "Give the gift", b: "Make the gift" },
      { a: "Vacation 5-star", b: "Vacation off-grid" },
      { a: "Need background noise", b: "Prefer silence" },
      { a: "Work from home", b: "Office / out of house" },
    ]
  },
  {
    id: "would-you-rather",
    cat: "fun",
    title: "Would You Rather",
    emoji: "🤔",
    color: "#f4a261",
    desc: "Revealing choices that spark real conversations",
    time: "5 min",
    type: "this-or-that",
    questions: [
      { a: "Know when you'll die", b: "Know how you'll die" },
      { a: "Travel a year with no internet", b: "Stay home but win $500k" },
      { a: "Always say what you think", b: "Always know what others think of you" },
      { a: "One great love story", b: "Several deep meaningful connections" },
      { a: "Partner reads your mind", b: "You read theirs" },
      { a: "Give up social media forever", b: "Give up alcohol forever" },
      { a: "Work a job you hate that pays well", b: "Work a job you love that pays okay" },
      { a: "Small wedding everyone loves", b: "Big beautiful event" },
      { a: "Never fight again", b: "Always resolve fights completely" },
      { a: "Move every 2 years and explore", b: "Build deep roots in one place" },
      { a: "Always be the one who loves more", b: "Always be the one who loves less" },
      { a: "Partner forgets your anniversary", b: "Partner is late for everything" },
      { a: "Be 10 years older right now", b: "Be 10 years younger" },
      { a: "Perfect health for both of you", b: "Unlimited money for both of you" },
    ]
  },
  {
    id: "never-have-i",
    cat: "fun",
    title: "Never Have I Ever",
    emoji: "🙈",
    color: "#e87c7c",
    desc: "Low stakes. High revelations. Couple edition.",
    time: "8 min",
    type: "never-have-i",
    questions: [
      "...cried at a movie and pretended I didn't",
      "...rehearsed a conversation in my head for hours before having it",
      "...been genuinely jealous of another couple",
      "...stayed in a relationship longer than I should have",
      "...told someone I loved them before I was totally sure",
      "...forgiven someone who never actually apologized",
      "...thought about an ex while in a new relationship",
      "...kept a secret from a partner I still haven't told them",
      "...changed my opinion on something major to avoid a fight",
      "...felt lonely in a relationship I was still in",
      "...been the one who loved more",
      "...been the one who loved less",
      "...fantasized about completely disappearing and starting over",
      "...done something impulsive that changed my whole life",
      "...been heartbroken in a way I haven't fully healed from",
      "...felt like I was performing for someone I loved",
      "...told a lie to protect someone's feelings and don't regret it",
      "...fallen for someone I knew was wrong for me and done it anyway",
      "...been afraid to be truly known by a partner",
      "...felt more at home with a stranger than someone I was dating",
    ]
  },
  {
    id: "daily",
    cat: "daily",
    title: "Daily Check-In",
    emoji: "☀️",
    color: TEAL,
    desc: "How are you both doing today?",
    time: "2 min",
    type: "daily",
    questions: [
      { id: "dc1", q: "Rate how you're feeling today (1-10).", type: "slider" },
      { id: "dc2", q: "One word for your energy right now:", type: "text" },
      { id: "dc3", q: "Something on your mind you haven't said yet:", type: "text" },
      { id: "dc4", q: "What do you need from your partner today?", type: "choice", opts: ["Love & affection", "Space to breathe", "Help with something", "To laugh together", "Deep conversation", "Just your presence", "Nothing specific"] },
      { id: "dc5", q: "One thing you're grateful for about your partner today:", type: "text" },
      { id: "dc6", q: "How connected do you feel to each other right now? (1-10)", type: "slider" },
    ]
  },
  {
    id: "weekly",
    cat: "daily",
    title: "Weekly Pulse",
    emoji: "📊",
    color: A2,
    desc: "A deeper weekly check-in — do it together",
    time: "10 min",
    type: "daily",
    questions: [
      { id: "wk1", q: "The high point of your week:", type: "text" },
      { id: "wk2", q: "What drained you most this week:", type: "text" },
      { id: "wk3", q: "Something I wanted to tell you but didn't get to:", type: "text" },
      { id: "wk4", q: "Rate how well we communicated this week.", type: "slider" },
      { id: "wk5", q: "Something you did this week I really appreciated:", type: "text" },
      { id: "wk6", q: "One thing I'd like more of between us next week:", type: "text" },
      { id: "wk7", q: "How are you feeling about us right now? (1-10)", type: "slider" },
      { id: "wk8", q: "A moment this week when I felt closest to you:", type: "text" },
    ]
  },
  {
    id: "gratitude",
    cat: "daily",
    title: "Gratitude Exchange",
    emoji: "🌸",
    color: "#e8c4d8",
    desc: "Intentional appreciation — the thing that keeps relationships alive",
    time: "3 min",
    type: "open-ended",
    questions: [
      { id: "gr1", q: "Something small they do that I notice and appreciate:" },
      { id: "gr2", q: "A quality of theirs I've been taking for granted:" },
      { id: "gr3", q: "A moment in the last 7 days I thought I love this person:" },
      { id: "gr4", q: "Something about how they love me I want them to know I see:" },
      { id: "gr5", q: "One thing I'm proud of us for this week:" },
    ]
  },
];

function PBar({ v, color = A, h = 3, s = {} }: { v: number; color?: string; h?: number; s?: React.CSSProperties }) {
  return (
    <div style={{ width: "100%", height: h, background: "#1a1428", borderRadius: h, ...s }}>
      <div style={{ width: `${Math.min(100, v)}%`, height: "100%", background: color, borderRadius: h, transition: "width .6s" }} />
    </div>
  );
}

function Badge({ label, color = A }: { label: string; color?: string }) {
  return (
    <span style={{ padding: "3px 9px", border: `1px solid ${color}`, borderRadius: 10, fontSize: 10, color, letterSpacing: ".08em" }}>
      {label}
    </span>
  );
}

function Pill({ label, active, color = A, onClick }: { label: string; active?: boolean; color?: string; onClick?: () => void }) {
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

function QuizHub({ onSelectQuiz }: { onSelectQuiz: (quiz: any) => void }) {
  const [cat, setCat] = useState("all");
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

  return (
    <div style={{ padding: 16, paddingBottom: 80 }}>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, color: A, fontStyle: "italic", fontWeight: 600, marginBottom: 2 }}>
        Quiz Studio
      </h2>
      <p style={{ color: "#5a4f6a", fontSize: 13, marginBottom: 10 }}>
        {QZ.length} quizzes. The most honest thing you&apos;ll do together.
      </p>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#3a2f4a", marginBottom: 5 }}>
        <span>{done.length}/{QZ.length} completed</span>
        <span style={{ color: A }}>{Math.round((done.length / QZ.length) * 100)}%</span>
      </div>
      <PBar v={(done.length / QZ.length) * 100} s={{ marginBottom: 16 }} />
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
        <Pill label="All" active={cat === "all"} onClick={() => setCat("all")} />
        {QCATS.map((c) => (
          <Pill key={c.id} label={c.label} active={cat === c.id} color={c.color} onClick={() => setCat(c.id)} />
        ))}
      </div>
      <div style={{ display: "grid", gap: 10 }}>
        {list.map((q) => {
          const isDone = done.includes(q.id);
          return (
            <button
              key={q.id}
              onClick={() => onSelectQuiz(q)}
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
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3, flexWrap: "wrap" }}>
                  <span style={{ color: "#f0e8f0", fontSize: 15, fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}>
                    {q.title}
                  </span>
                  {isDone && <Badge label="Done" color={q.color} />}
                </div>
                <div style={{ color: "#4a3f5a", fontSize: 12, lineHeight: 1.4 }}>{q.desc}</div>
                <div style={{ fontSize: 10, color: "#3a2f4a", marginTop: 3 }}>⏱ {q.time} · {q.questions?.length || "open"} q</div>
              </div>
              <span style={{ color: "#2a2040", fontSize: 18, flexShrink: 0 }}>›</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function QuizEngine({ quiz, onBack }: { quiz: any; onBack: () => void }) {
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
        if (quiz.type === "this-or-that") {
          const tA = Object.values(na).filter((v) => v === "a").length;
          setResult({
            pairs: quiz.questions.map((qq: any, i: number) => ({ ...qq, picked: na[i] })),
            totA: tA,
            totB: quiz.questions.length - tA,
          });
        } else if (quiz.type === "scale") {
          const all = Object.values(na).map(Number);
          const avg = all.reduce((a, b) => a + b, 0) / all.length;
          setResult({ score: Math.round((avg / 5) * 100) });
        } else if (quiz.type === "never-have-i") {
          const counts = Object.values(na).filter((v) => v === "true").length;
          setResult({ count: counts, total: quiz.questions.length });
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

  return (
    <div style={{ minHeight: "100vh", background: DARK, display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderBottom: `1px solid ${BDR}`, background: SURF }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: "#7a6d8a", fontSize: 22 }}>←</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, color: "#f0e8f0", fontWeight: 500 }}>{quiz.title}</div>
          <div style={{ fontSize: 10, color: "#4a3f5a", marginTop: 1 }}>{step + 1} of {quiz.questions.length}</div>
        </div>
        <span style={{ fontSize: 11, color: quiz.color || A, fontWeight: 600 }}>{Math.round(prog)}%</span>
      </div>
      <PBar v={prog} color={quiz.color || A} />
      <div style={{ flex: 1, padding: "28px 20px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        {(quiz.type === "choice" || quiz.type === "never-have-i") && (
          <>
            <div key={step} className="fu" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 21, color: "#f0e8f0", lineHeight: 1.5, marginBottom: 32, fontWeight: 600 }}>
              {quiz.type === "never-have-i" ? `Never have I ever ${q}` : q.q}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {(quiz.type === "choice" ? q.opts : ["Never have done this", "Have done this"]).map((opt: any, i: number) => (
                <button
                  key={i}
                  onClick={() => answer(quiz.type === "never-have-i" ? (i === 1 ? "true" : "false") : opt.k)}
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
                  {quiz.type === "choice" ? opt.t : opt}
                </button>
              ))}
            </div>
          </>
        )}
        {quiz.type === "this-or-that" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {["a", "b"].map((s) => (
              <button
                key={s}
                onClick={() => answer(s)}
                className="fu"
                style={{
                  animationDelay: s === "b" ? "70ms" : "0",
                  padding: "20px 24px",
                  background: CARD,
                  border: `1px solid ${BDR}`,
                  borderRadius: 14,
                  color: "#f0e8f0",
                  fontSize: 16,
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 600,
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                {s === "a" ? q.a : q.b}
              </button>
            ))}
          </div>
        )}
        {quiz.type === "scale" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 21, color: "#f0e8f0", lineHeight: 1.5, marginBottom: 16, fontWeight: 600 }}>
              {q.q}
            </div>
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
                    background: answers[step] === String(n) ? quiz.color : CARD,
                    border: `1px solid ${answers[step] === String(n) ? quiz.color : BDR}`,
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
          </div>
        )}
      </div>
    </div>
  );
}

function QuizResult({ quiz, result, onBack }: { quiz: any; result: any; onBack: () => void }) {
  const CL = [A, A2, GOLD, TEAL, GRN, "#c47a65", "#84b3e8"];

  return (
    <div style={{ minHeight: "100vh", background: DARK, padding: 20, overflowY: "auto", paddingBottom: 80 }}>
      <button onClick={onBack} style={{ background: "none", border: "none", color: "#7a6d8a", fontSize: 22, marginBottom: 16 }}>
        ← Back to quizzes
      </button>

      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <span style={{ fontSize: 48 }}>{quiz.emoji}</span>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, color: "#f0e8f0", fontWeight: 600, marginTop: 8 }}>
          {quiz.title}
        </h2>
      </div>

      {result.profile && (
        <div style={{ background: CARD, border: `1px solid ${quiz.color}55`, borderRadius: 16, padding: 20, marginBottom: 16 }}>
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <span style={{ fontSize: 36 }}>{result.profile.e}</span>
            <h3 style={{ fontSize: 22, color: quiz.color, fontWeight: 600, marginTop: 8 }}>{result.profile.n}</h3>
          </div>
          <p style={{ color: "#c8c0d8", fontSize: 14, lineHeight: 1.6 }}>{result.profile.d}</p>
        </div>
      )}

      {result.score !== undefined && !result.profile && (
        <div style={{ background: CARD, border: `1px solid ${BDR}`, borderRadius: 16, padding: 20, textAlign: "center" }}>
          <div style={{ width: 120, height: 120, borderRadius: "50%", background: `conic-gradient(${quiz.color} ${result.score}%, #1a1428 0%)`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <div style={{ width: 100, height: 100, borderRadius: "50%", background: CARD, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 28, fontWeight: 700, color: quiz.color }}>{result.score}%</span>
            </div>
          </div>
          <p style={{ color: "#c8c0d8", fontSize: 14 }}>Your {quiz.title} Score</p>
        </div>
      )}

      {result.count !== undefined && (
        <div style={{ background: CARD, border: `1px solid ${BDR}`, borderRadius: 16, padding: 20, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🙈</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, color: quiz.color, fontWeight: 700 }}>{result.count}/{result.total}</div>
          <p style={{ color: "#c8c0d8", fontSize: 14, marginTop: 8 }}>Things you&apos;ve done</p>
        </div>
      )}

      {result.tally && result.tally.length > 0 && !result.profile && (
        <div style={{ background: CARD, border: `1px solid ${BDR}`, borderRadius: 16, padding: 20 }}>
          <h3 style={{ fontSize: 14, color: "#7a6d8a", marginBottom: 12, textTransform: "uppercase", letterSpacing: ".1em" }}>Breakdown</h3>
          {result.tally.slice(0, 5).map((item: any, i: number) => {
            const kd = quiz.keys?.[item.k];
            return kd ? (
              <div key={item.k} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 5 }}>
                  <span style={{ color: CL[i] }}>{kd.e} {kd.n}</span>
                  <span style={{ color: "#4a3f5a" }}>{item.pct}%</span>
                </div>
                <PBar v={item.pct} color={CL[i]} />
              </div>
            ) : null;
          })}
        </div>
      )}

      <button onClick={onBack} style={{ width: "100%", padding: "14px", background: `linear-gradient(135deg, ${quiz.color || A}, ${A})`, border: "none", borderRadius: 14, color: "#070510", fontWeight: 700, fontSize: 14, marginTop: 20 }}>
        Back to Quizzes
      </button>
    </div>
  );
}

export default function UsApp() {
  const [view, setView] = useState<"hub" | "quiz">("hub");
  const [activeQuiz, setActiveQuiz] = useState<any>(null);

  const handleSelectQuiz = (quiz: any) => {
    setActiveQuiz(quiz);
    setView("quiz");
  };

  if (view === "quiz" && activeQuiz) {
    return <QuizEngine quiz={activeQuiz} onBack={() => setView("hub")} />;
  }

  return (
    <div style={{ minHeight: "100vh", background: DARK }}>
      <div style={{ padding: "16px 16px 0" }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, color: A, fontStyle: "italic", fontWeight: 600, marginBottom: 8 }}>
          us.
        </h1>
        <p style={{ color: "#4a3f5a", fontSize: 14, marginBottom: 20 }}>
          A private sanctuary built for two.<br />
          17 quizzes. Shared tools. Everything to grow closer.
        </p>
      </div>
      <QuizHub onSelectQuiz={handleSelectQuiz} />
    </div>
  );
}