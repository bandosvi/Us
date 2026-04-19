export interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    scores: {
      secure: number;
      anxious: number;
      dismissive: number;
      fearful: number;
    };
  }[];
}

export interface AttachmentStyle {
  name: string;
  description: string;
  traits: string[];
  strengths: string[];
  challenges: string[];
  tips: string[];
}

export const attachmentStyles: Record<string, AttachmentStyle> = {
  secure: {
    name: "Secure",
    description: "You feel comfortable with intimacy and independence. You trust others and believe you're worthy of love.",
    traits: [
      "Comfortable with closeness and emotional intimacy",
      "Trust others and believe you're worthy of love",
      "Can depend on others and allow others to depend on you",
      "Communicate needs and feelings openly",
      "Handle conflict constructively"
    ],
    strengths: [
      "Strong, healthy relationships",
      "Good emotional regulation",
      "High self-esteem",
      "Effective communication skills",
      "Resilience in relationships"
    ],
    challenges: [
      "May take relationships for granted",
      "Sometimes avoid necessary confrontation"
    ],
    tips: [
      "Continue nurturing your relationships",
      "Share your feelings regularly",
      "Maintain healthy boundaries",
      "Keep working on self-awareness"
    ]
  },
  anxious: {
    name: "Anxious-Preoccupied",
    description: "You crave closeness but often worry about abandonment. You may cling to relationships and fear rejection.",
    traits: [
      "Intense desire for closeness and reassurance",
      "Fear of abandonment and rejection",
      "May become overly dependent on partners",
      "Often worry about relationship status",
      "Sensitive to partner's mood changes"
    ],
    strengths: [
      "Deep emotional connection and empathy",
      "Strong commitment to relationships",
      "Attentive to partner's needs",
      "Passionate and loving"
    ],
    challenges: [
      "Anxiety about relationships",
      "Fear of rejection",
      "May come across as needy",
      "Difficulty trusting security"
    ],
    tips: [
      "Practice self-soothing techniques",
      "Build self-confidence outside relationships",
      "Communicate needs calmly",
      "Work on trusting your partner",
      "Consider professional counseling if anxiety is overwhelming"
    ]
  },
  dismissive: {
    name: "Dismissive-Avoidant",
    description: "You value independence and may avoid emotional closeness. You might dismiss the importance of relationships.",
    traits: [
      "Strong preference for independence",
      "Avoid emotional intimacy and vulnerability",
      "May dismiss importance of close relationships",
      "Self-reliant and independent",
      "Comfortable being alone"
    ],
    strengths: [
      "High self-reliance",
      "Strong sense of independence",
      "Good at problem-solving alone",
      "Clear personal boundaries"
    ],
    challenges: [
      "Difficulty opening up emotionally",
      "May avoid deep relationships",
      "Struggle with vulnerability",
      "Partners may feel rejected"
    ],
    tips: [
      "Practice small acts of vulnerability",
      "Learn to recognize and express emotions",
      "Consider the benefits of close relationships",
      "Start with low-stakes emotional sharing",
      "Consider therapy to explore attachment patterns"
    ]
  },
  fearful: {
    name: "Fearful-Avoidant",
    description: "You want intimacy but fear getting hurt. You may alternate between seeking closeness and pushing others away.",
    traits: [
      "Desire for close relationships but fear rejection",
      "May alternate between clinginess and withdrawal",
      "Difficulty trusting others completely",
      "Fear of vulnerability and getting hurt",
      "Mixed feelings about intimacy"
    ],
    strengths: [
      "Deep capacity for love and connection",
      "Self-awareness of emotional needs",
      "Can be very empathetic",
      "Creative and imaginative"
    ],
    challenges: [
      "Internal conflict about relationships",
      "May push away potential partners",
      "Difficulty maintaining consistent closeness",
      "Fear of abandonment and engulfment"
    ],
    tips: [
      "Work on building trust gradually",
      "Practice self-compassion",
      "Learn healthy communication patterns",
      "Consider therapy to understand attachment patterns",
      "Focus on personal growth and healing"
    ]
  }
};

export const questions: Question[] = [
  {
    id: 1,
    text: "When my partner is upset, I usually:",
    options: [
      {
        text: "Try to comfort them and talk through what's bothering them",
        scores: { secure: 3, anxious: 1, dismissive: 0, fearful: 1 }
      },
      {
        text: "Get worried that they might be upset with me",
        scores: { secure: 0, anxious: 3, dismissive: 0, fearful: 1 }
      },
      {
        text: "Give them space to work it out on their own",
        scores: { secure: 1, anxious: 0, dismissive: 3, fearful: 2 }
      },
      {
        text: "Feel conflicted - I want to help but I'm afraid of getting too involved",
        scores: { secure: 0, anxious: 1, dismissive: 1, fearful: 3 }
      }
    ]
  },
  {
    id: 2,
    text: "In relationships, I tend to:",
    options: [
      {
        text: "Feel comfortable being close to my partner and also being independent",
        scores: { secure: 3, anxious: 0, dismissive: 1, fearful: 0 }
      },
      {
        text: "Worry that my partner doesn't really love me or won't stay with me",
        scores: { secure: 0, anxious: 3, dismissive: 0, fearful: 2 }
      },
      {
        text: "Prefer to keep some emotional distance and not get too dependent",
        scores: { secure: 1, anxious: 0, dismissive: 3, fearful: 1 }
      },
      {
        text: "Want closeness but fear getting hurt or being let down",
        scores: { secure: 0, anxious: 1, dismissive: 1, fearful: 3 }
      }
    ]
  },
  {
    id: 3,
    text: "When I have a disagreement with my partner:",
    options: [
      {
        text: "I try to resolve it by talking openly about our feelings",
        scores: { secure: 3, anxious: 1, dismissive: 0, fearful: 1 }
      },
      {
        text: "I get very upset and worried that the relationship might end",
        scores: { secure: 0, anxious: 3, dismissive: 0, fearful: 1 }
      },
      {
        text: "I tend to withdraw and avoid discussing emotional issues",
        scores: { secure: 0, anxious: 0, dismissive: 3, fearful: 2 }
      },
      {
        text: "I want to resolve it but I'm afraid of making things worse",
        scores: { secure: 1, anxious: 1, dismissive: 1, fearful: 3 }
      }
    ]
  },
  {
    id: 4,
    text: "My approach to asking for support from my partner is:",
    options: [
      {
        text: "I ask when I need help and trust they'll be there for me",
        scores: { secure: 3, anxious: 1, dismissive: 0, fearful: 1 }
      },
      {
        text: "I often hesitate to ask because I'm worried they'll reject me",
        scores: { secure: 0, anxious: 3, dismissive: 0, fearful: 2 }
      },
      {
        text: "I prefer to handle things myself rather than depend on others",
        scores: { secure: 0, anxious: 0, dismissive: 3, fearful: 1 }
      },
      {
        text: "I want their support but I'm afraid of being a burden",
        scores: { secure: 1, anxious: 2, dismissive: 0, fearful: 3 }
      }
    ]
  },
  {
    id: 5,
    text: "When my partner wants more closeness than I'm comfortable with:",
    options: [
      {
        text: "I can adjust and find a balance that works for both of us",
        scores: { secure: 3, anxious: 1, dismissive: 0, fearful: 1 }
      },
      {
        text: "I get anxious that they'll leave if I don't give them what they want",
        scores: { secure: 0, anxious: 3, dismissive: 0, fearful: 1 }
      },
      {
        text: "I maintain my boundaries and keep some distance",
        scores: { secure: 1, anxious: 0, dismissive: 3, fearful: 2 }
      },
      {
        text: "I feel torn between wanting closeness and fearing I'll get hurt",
        scores: { secure: 0, anxious: 1, dismissive: 1, fearful: 3 }
      }
    ]
  },
  {
    id: 6,
    text: "In my relationships, I typically:",
    options: [
      {
        text: "Feel secure and trust that my partner cares about me",
        scores: { secure: 3, anxious: 0, dismissive: 0, fearful: 1 }
      },
      {
        text: "Worry about whether my partner truly loves me",
        scores: { secure: 0, anxious: 3, dismissive: 0, fearful: 2 }
      },
      {
        text: "Keep my partner at arm's length emotionally",
        scores: { secure: 0, anxious: 0, dismissive: 3, fearful: 1 }
      },
      {
        text: "Want to be close but have trouble fully trusting",
        scores: { secure: 1, anxious: 1, dismissive: 0, fearful: 3 }
      }
    ]
  },
  {
    id: 7,
    text: "When I'm feeling vulnerable, I:",
    options: [
      {
        text: "Feel comfortable sharing my feelings with my partner",
        scores: { secure: 3, anxious: 1, dismissive: 0, fearful: 1 }
      },
      {
        text: "Get very anxious and seek reassurance from my partner",
        scores: { secure: 0, anxious: 3, dismissive: 0, fearful: 2 }
      },
      {
        text: "Prefer to deal with it alone and not burden my partner",
        scores: { secure: 0, anxious: 0, dismissive: 3, fearful: 1 }
      },
      {
        text: "Want to open up but fear rejection or judgment",
        scores: { secure: 1, anxious: 1, dismissive: 1, fearful: 3 }
      }
    ]
  },
  {
    id: 8,
    text: "My attitude toward relationships is:",
    options: [
      {
        text: "I enjoy close relationships and find them fulfilling",
        scores: { secure: 3, anxious: 1, dismissive: 0, fearful: 1 }
      },
      {
        text: "I crave closeness but often fear losing it",
        scores: { secure: 0, anxious: 3, dismissive: 0, fearful: 2 }
      },
      {
        text: "I value my independence more than close relationships",
        scores: { secure: 0, anxious: 0, dismissive: 3, fearful: 1 }
      },
      {
        text: "I want meaningful connections but relationships scare me",
        scores: { secure: 1, anxious: 1, dismissive: 1, fearful: 3 }
      }
    ]
  },
  {
    id: 9,
    text: "When my partner is unavailable or distant:",
    options: [
      {
        text: "I trust they'll return and focus on my own activities",
        scores: { secure: 3, anxious: 0, dismissive: 1, fearful: 0 }
      },
      {
        text: "I get very anxious and worry something is wrong",
        scores: { secure: 0, anxious: 3, dismissive: 0, fearful: 1 }
      },
      {
        text: "I don't mind and use the time for myself",
        scores: { secure: 1, anxious: 0, dismissive: 3, fearful: 0 }
      },
      {
        text: "I feel hurt and rejected, but also relieved to have space",
        scores: { secure: 0, anxious: 1, dismissive: 1, fearful: 3 }
      }
    ]
  },
  {
    id: 10,
    text: "My biggest fear in relationships is:",
    options: [
      {
        text: "Losing the connection or having the relationship end",
        scores: { secure: 1, anxious: 3, dismissive: 0, fearful: 2 }
      },
      {
        text: "Getting too close and losing my independence",
        scores: { secure: 0, anxious: 0, dismissive: 3, fearful: 1 }
      },
      {
        text: "Being hurt or betrayed by someone I trust",
        scores: { secure: 0, anxious: 1, dismissive: 1, fearful: 3 }
      },
      {
        text: "I don't have major fears - relationships feel safe",
        scores: { secure: 3, anxious: 0, dismissive: 0, fearful: 0 }
      }
    ]
  }
];