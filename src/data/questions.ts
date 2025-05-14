import { Question } from '../types';

export const auditQuestions: Question[] = [
  {
    id: 1,
    text: "How often does this friend reach out first?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    weight: 1
  },
  {
    id: 2,
    text: "When you share good news, how do they typically respond?",
    options: [
      "They change the subject",
      "They acknowledge it briefly",
      "They're happy but quickly talk about themselves",
      "They seem genuinely happy for you",
      "They celebrate with you enthusiastically"
    ],
    weight: 1.5
  },
  {
    id: 3,
    text: "Do they remember important details about your life?",
    options: [
      "Never", 
      "Rarely", 
      "Only the big things", 
      "Most things", 
      "They remember everything"
    ],
    weight: 1
  },
  {
    id: 4,
    text: "How do you feel after spending time with them?",
    options: [
      "Drained and anxious",
      "Slightly tired",
      "Neutral",
      "Generally good",
      "Energized and uplifted"
    ],
    weight: 2
  },
  {
    id: 5,
    text: "How often do they make the conversation about themselves?",
    options: [
      "Almost always",
      "Frequently",
      "Sometimes",
      "Occasionally",
      "Rarely"
    ],
    weight: 1.5
  },
  {
    id: 6,
    text: "Do they respect your boundaries?",
    options: [
      "Never", 
      "Rarely", 
      "Sometimes", 
      "Usually", 
      "Always"
    ],
    weight: 2
  },
  {
    id: 7,
    text: "Do they apologize when they've hurt you?",
    options: [
      "Never",
      "They make excuses",
      "They say sorry but don't change",
      "They usually apologize sincerely",
      "They always take responsibility and change behavior"
    ],
    weight: 1.5
  },
  {
    id: 8,
    text: "Do you feel like you can be yourself around them?",
    options: [
      "Never",
      "Rarely",
      "Sometimes",
      "Most of the time",
      "Always"
    ],
    weight: 1.5
  }
];