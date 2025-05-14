import React, { useState } from 'react';
import { AuditProvider } from '../context/AuditContext';
import { AuditQuiz } from '../components/AuditQuiz';
import { ResultsDisplay } from '../components/ResultsDisplay';
import { auditQuestions } from '../data/questions';

export const Audit = () => {
  const [showResults, setShowResults] = useState(false);
  
  const handleQuizComplete = () => {
    setShowResults(true);
  };
  
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 bg-gradient-to-b from-black via-purple-950/10 to-black">
      <div className="container mx-auto">
        <AuditProvider questions={auditQuestions}>
          {!showResults ? (
            <AuditQuiz 
              questions={auditQuestions} 
              onComplete={handleQuizComplete} 
            />
          ) : (
            <ResultsDisplay />
          )}
        </AuditProvider>
      </div>
    </div>
  );
};