import React, { createContext, useContext, useState, ReactNode } from 'react';
import { FriendshipResult, Question } from '../types';
import { generateResult } from '../utils/generateResult';

interface AuditContextType {
  currentQuestion: number;
  answers: Record<number, number>;
  friendName: string;
  result: FriendshipResult | null;
  setFriendName: (name: string) => void;
  goToNextQuestion: () => void;
  goToPreviousQuestion: () => void;
  setAnswer: (questionId: number, answerIndex: number) => void;
  calculateResults: () => void;
  resetAudit: () => void;
}

const AuditContext = createContext<AuditContextType | undefined>(undefined);

export const AuditProvider = ({ children, questions }: { children: ReactNode, questions: Question[] }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [friendName, setFriendName] = useState('');
  const [result, setResult] = useState<FriendshipResult | null>(null);

  const goToNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const setAnswer = (questionId: number, answerIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }));
  };

  const calculateResults = () => {
    const result = generateResult(questions, answers, friendName);
    setResult(result);
  };

  const resetAudit = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setFriendName('');
    setResult(null);
  };

  return (
    <AuditContext.Provider
      value={{
        currentQuestion,
        answers,
        friendName,
        result,
        setFriendName,
        goToNextQuestion,
        goToPreviousQuestion,
        setAnswer,
        calculateResults,
        resetAudit,
      }}
    >
      {children}
    </AuditContext.Provider>
  );
};

export const useAudit = () => {
  const context = useContext(AuditContext);
  if (context === undefined) {
    throw new Error('useAudit must be used within an AuditProvider');
  }
  return context;
};