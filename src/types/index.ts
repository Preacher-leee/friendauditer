export interface Question {
  id: number;
  text: string;
  options: string[];
  weight: number;
}

export interface FriendshipResult {
  grade: 'solid' | 'questionable' | 'toxic';
  score: number;
  analysis: string;
  redFlags: number;
  energyDrain: number;
}

export interface Message {
  id: string;
  text: string;
  analysis: {
    toxicity: number;
    manipulation: number;
    support: number;
    overall: 'positive' | 'neutral' | 'negative';
    highlights: {
      text: string;
      type: 'red-flag' | 'green-flag' | 'neutral';
    }[];
  };
}

export interface Friend {
  id: string;
  name: string;
  result?: FriendshipResult;
}