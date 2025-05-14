import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAudit } from '../context/AuditContext';
import { Button } from './ui/Button';
import { Card, CardContent, CardTitle } from './ui/Card';
import { Flag, BarChart2, ZapOff, Trophy, AlertCircle, Check } from 'lucide-react';

export const ResultsDisplay = () => {
  const { result, friendName, resetAudit } = useAudit();
  const [showConfetti, setShowConfetti] = useState(false);
  const [animateMeters, setAnimateMeters] = useState(false);
  
  useEffect(() => {
    // Trigger confetti if result is solid
    if (result?.grade === 'solid') {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
    
    // Animate meters after a short delay
    setTimeout(() => {
      setAnimateMeters(true);
    }, 500);
  }, [result]);
  
  if (!result) return null;
  
  const { grade, score, analysis, redFlags, energyDrain } = result;
  
  // Determine grade color and icon
  const gradeStyles = {
    solid: {
      color: 'text-green-400',
      bgGradient: 'from-green-600/20 to-green-400/20',
      borderColor: 'border-green-400/30',
      icon: <Check size={24} className="text-green-400" />,
      label: 'Solid Friend'
    },
    questionable: {
      color: 'text-yellow-400',
      bgGradient: 'from-yellow-600/20 to-yellow-400/20',
      borderColor: 'border-yellow-400/30',
      icon: <AlertCircle size={24} className="text-yellow-400" />,
      label: 'Questionable'
    },
    toxic: {
      color: 'text-red-400',
      bgGradient: 'from-red-600/20 to-red-400/20',
      borderColor: 'border-red-400/30',
      icon: <ZapOff size={24} className="text-red-400" />,
      label: 'Toxic Relationship'
    }
  };
  
  const gradeStyle = gradeStyles[grade];
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Confetti effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute inset-0 flex items-center justify-center">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full opacity-70"
                style={{
                  backgroundColor: ['#9C27B0', '#3F51B5', '#03A9F4', '#4CAF50'][i % 4],
                  width: `${Math.random() * 20 + 5}px`,
                  height: `${Math.random() * 20 + 5}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `fall ${Math.random() * 3 + 2}s linear forwards`,
                  animationDelay: `${Math.random() * 2}s`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
              />
            ))}
          </div>
        </div>
      )}
      
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        Your Friendship Audit Results
      </h1>
      
      {/* Main grade card */}
      <Card 
        variant="gradient" 
        className={`mb-8 border-2 bg-gradient-to-br ${gradeStyle.bgGradient} ${gradeStyle.borderColor}`}
      >
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-shrink-0 p-4 bg-black/30 rounded-full">
            {gradeStyle.icon}
          </div>
          
          <div className="flex-grow text-center md:text-left">
            <h2 className="text-xl font-semibold text-gray-300 mb-1">
              Your friendship with
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold mb-2">
              {friendName}
            </h3>
            
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <span className={`text-xl font-bold ${gradeStyle.color}`}>
                {gradeStyle.label}
              </span>
              <span className="text-gray-400 hidden md:inline">•</span>
              <span className={`font-bold ${score >= 70 ? 'text-green-400' : score >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                {score}/100 Score
              </span>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Analysis */}
      <Card className="mb-8">
        <CardTitle>Friendship Analysis</CardTitle>
        <CardContent>
          <p className="text-lg">{analysis}</p>
        </CardContent>
      </Card>
      
      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Red Flag Counter */}
        <Card>
          <CardTitle className="flex items-center gap-2">
            <Flag size={20} className="text-red-400" /> Red Flag Counter
          </CardTitle>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-red-400">{redFlags}</span>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Flag 
                    key={i}
                    size={24} 
                    className={i < redFlags ? 'text-red-400' : 'text-gray-700'} 
                  />
                ))}
              </div>
            </div>
            <p className="mt-3 text-sm text-gray-400">
              {redFlags > 3 ? 'Significant red flags detected in this relationship.' : 
               redFlags > 1 ? 'Some concerning patterns were detected.' : 
               'Few or no red flags detected.'}
            </p>
          </CardContent>
        </Card>
        
        {/* Energy Drain Index */}
        <Card>
          <CardTitle className="flex items-center gap-2">
            <BarChart2 size={20} className="text-cyan-400" /> Energy Drain Index
          </CardTitle>
          <CardContent>
            <div className="mb-2 flex justify-between items-center">
              <span className="text-sm text-gray-400">Low</span>
              <span className="text-sm text-gray-400">High</span>
            </div>
            <div className="w-full h-4 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-1000 ease-out ${
                  energyDrain > 70 ? 'bg-red-500' : 
                  energyDrain > 40 ? 'bg-yellow-500' : 
                  'bg-green-500'
                }`}
                style={{ width: animateMeters ? `${energyDrain}%` : '0%' }}
              />
            </div>
            <p className="mt-3 text-sm text-gray-400">
              {energyDrain > 70 ? 'This friendship is significantly draining your energy.' : 
               energyDrain > 40 ? 'This friendship requires moderate emotional effort.' : 
               'This friendship generally adds to your energy rather than depleting it.'}
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
        <Button variant="outline" onClick={resetAudit}>
          Start New Audit
        </Button>
        <Button as={Link} to="/tools/text-analyzer">
          Analyze Text Messages
        </Button>
      </div>
    </div>
  );
};