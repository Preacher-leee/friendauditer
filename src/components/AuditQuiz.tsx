import React, { useState } from 'react';
import { useAudit } from '../context/AuditContext';
import { Question } from '../types';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

interface AuditQuizProps {
  questions: Question[];
  onComplete: () => void;
}

export const AuditQuiz = ({ questions, onComplete }: AuditQuizProps) => {
  const { 
    currentQuestion, 
    answers, 
    friendName, 
    setFriendName,
    goToNextQuestion, 
    goToPreviousQuestion, 
    setAnswer,
    calculateResults
  } = useAudit();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const question = questions[currentQuestion];
  const isFirstQuestion = currentQuestion === 0;
  const isLastQuestion = currentQuestion === questions.length - 1;
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  
  // Handle friendly name input if it's the first question
  if (isFirstQuestion) {
    return (
      <Card variant="gradient" className="w-full max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-6">Let's start your friendship audit</h2>
        <p className="mb-8 text-gray-300">
          First, tell us which friend you want to audit today.
          We'll keep this just between us.
        </p>
        
        <div className="mb-6">
          <label htmlFor="friendName" className="block mb-2 text-sm font-medium text-gray-300">
            Friend's name
          </label>
          <input
            type="text"
            id="friendName"
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
            placeholder="e.g. Alex, Sarah, Michael..."
            value={friendName}
            onChange={(e) => setFriendName(e.target.value)}
            required
          />
        </div>
        
        <div className="flex justify-end">
          <Button 
            onClick={goToNextQuestion} 
            disabled={!friendName.trim()}
          >
            Next <ChevronRight size={18} />
          </Button>
        </div>
      </Card>
    );
  }
  
  // Handle form submission on last question
  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate processing time
    setTimeout(() => {
      calculateResults();
      onComplete();
    }, 1500);
  };
  
  return (
    <Card variant="gradient" className="w-full max-w-lg mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Auditing {friendName}</h2>
        <span className="text-sm text-gray-300">
          Question {currentQuestion} of {questions.length - 1}
        </span>
      </div>
      
      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-800 rounded-full mb-6">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-6">{question.text}</h3>
        
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`w-full text-left p-4 rounded-lg transition-all ${
                answers[question.id] === index
                  ? 'bg-gradient-to-r from-purple-600/70 to-cyan-600/70 border border-purple-400'
                  : 'bg-gray-800/50 border border-gray-700 hover:bg-gray-800'
              }`}
              onClick={() => setAnswer(question.id, index)}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {answers[question.id] === index && (
                  <CheckCircle2 size={20} className="text-cyan-300" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={goToPreviousQuestion}
        >
          <ChevronLeft size={18} /> Back
        </Button>
        
        {isLastQuestion ? (
          <Button 
            onClick={handleSubmit} 
            isLoading={isSubmitting}
            disabled={isSubmitting || answers[question.id] === undefined}
          >
            {isSubmitting ? 'Analyzing' : 'See Results'}
          </Button>
        ) : (
          <Button 
            onClick={goToNextQuestion}
            disabled={answers[question.id] === undefined}
          >
            Next <ChevronRight size={18} />
          </Button>
        )}
      </div>
    </Card>
  );
};