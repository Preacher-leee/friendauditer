import React, { useState } from 'react';
import { Card, CardTitle, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { BarChart2, Flag, ZapOff, ArrowRight } from 'lucide-react';

interface FriendData {
  name: string;
  score: number;
  redFlags: number;
  energyDrain: number;
  grade: 'solid' | 'questionable' | 'toxic';
}

export const FriendComparison = () => {
  const [friendA, setFriendA] = useState<FriendData>({
    name: '',
    score: 0,
    redFlags: 0,
    energyDrain: 0,
    grade: 'solid'
  });
  
  const [friendB, setFriendB] = useState<FriendData>({
    name: '',
    score: 0,
    redFlags: 0,
    energyDrain: 0,
    grade: 'solid'
  });
  
  const [isComparing, setIsComparing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  
  const handleCompare = () => {
    if (!friendA.name || !friendB.name) return;
    
    setIsComparing(true);
    
    // Simulate API call
    setTimeout(() => {
      // Generate random results for demo purposes
      setFriendA({
        ...friendA,
        score: Math.floor(Math.random() * 100),
        redFlags: Math.floor(Math.random() * 5),
        energyDrain: Math.floor(Math.random() * 100),
        grade: Math.random() > 0.7 ? 'solid' : Math.random() > 0.4 ? 'questionable' : 'toxic'
      });
      
      setFriendB({
        ...friendB,
        score: Math.floor(Math.random() * 100),
        redFlags: Math.floor(Math.random() * 5),
        energyDrain: Math.floor(Math.random() * 100),
        grade: Math.random() > 0.7 ? 'solid' : Math.random() > 0.4 ? 'questionable' : 'toxic'
      });
      
      setIsComparing(false);
      setShowResults(true);
    }, 1500);
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'solid': return 'text-green-400';
      case 'questionable': return 'text-yellow-400';
      case 'toxic': return 'text-red-400';
      default: return '';
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Compare Friends</h2>
      <p className="text-gray-300 mb-8 text-center">
        Enter the names of two friends you want to compare.
      </p>
      
      <Card variant="glass" className="mb-8">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="friendA" className="block mb-2 text-sm font-medium text-gray-300">
                Friend #1
              </label>
              <input
                type="text"
                id="friendA"
                className="w-full p-3 bg-black/30 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                placeholder="e.g. Alex"
                value={friendA.name}
                onChange={(e) => setFriendA({ ...friendA, name: e.target.value })}
              />
            </div>
            
            <div>
              <label htmlFor="friendB" className="block mb-2 text-sm font-medium text-gray-300">
                Friend #2
              </label>
              <input
                type="text"
                id="friendB"
                className="w-full p-3 bg-black/30 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                placeholder="e.g. Jordan"
                value={friendB.name}
                onChange={(e) => setFriendB({ ...friendB, name: e.target.value })}
              />
            </div>
          </div>
          
          <div className="mt-6 flex justify-center">
            <Button 
              onClick={handleCompare} 
              disabled={!friendA.name || !friendB.name || isComparing}
              isLoading={isComparing}
              className="px-8"
            >
              {isComparing ? 'Comparing...' : 'Compare Friends'}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {showResults && (
        <div className="animate-in fade-in duration-500">
          <h3 className="text-2xl font-bold mb-6 text-center">Comparison Results</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Friend A */}
            <Card className="bg-gradient-to-b from-purple-900/40 to-purple-800/20">
              <CardTitle className="flex justify-between items-center">
                <span>{friendA.name}</span>
                <span className={getGradeColor(friendA.grade)}>
                  {friendA.grade.charAt(0).toUpperCase() + friendA.grade.slice(1)}
                </span>
              </CardTitle>
              <CardContent>
                <div className="mb-4">
                  <p className="text-sm text-gray-400 mb-1">Overall Score</p>
                  <div className="w-full h-3 bg-gray-800 rounded-full">
                    <div 
                      className={`h-full rounded-full ${
                        friendA.score > 70 ? 'bg-green-500' : 
                        friendA.score > 50 ? 'bg-yellow-500' : 
                        'bg-red-500'
                      }`}
                      style={{ width: `${friendA.score}%` }}
                    />
                  </div>
                  <p className="text-right text-sm mt-1">{friendA.score}/100</p>
                </div>
                
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">Red Flags</span>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Flag 
                        key={i}
                        size={16} 
                        className={i < friendA.redFlags ? 'text-red-400' : 'text-gray-700'} 
                      />
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Energy Drain</span>
                  <div className="flex items-center gap-1">
                    <ZapOff size={16} className="text-yellow-400" />
                    <span>{friendA.energyDrain}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Comparison */}
            <Card className="flex flex-col justify-center items-center py-8">
              <div className="h-full flex items-center">
                <div className="flex flex-col items-center gap-4">
                  <BarChart2 size={32} className="text-purple-400" />
                  
                  <div className="flex items-center">
                    <div 
                      className={`h-1 w-12 ${friendA.score > friendB.score ? 'bg-green-500' : 'bg-gray-600'}`}
                    />
                    <ArrowRight size={20} className="mx-1 text-gray-400" />
                    <div 
                      className={`h-1 w-12 ${friendB.score > friendA.score ? 'bg-green-500' : 'bg-gray-600'}`}
                    />
                  </div>
                  
                  <p className="text-center text-sm">
                    {friendA.score > friendB.score 
                      ? `${friendA.name} scores ${friendA.score - friendB.score}% higher` 
                      : friendB.score > friendA.score 
                        ? `${friendB.name} scores ${friendB.score - friendA.score}% higher`
                        : 'Both friends score equally'}
                  </p>
                </div>
              </div>
            </Card>
            
            {/* Friend B */}
            <Card className="bg-gradient-to-b from-cyan-900/40 to-cyan-800/20">
              <CardTitle className="flex justify-between items-center">
                <span>{friendB.name}</span>
                <span className={getGradeColor(friendB.grade)}>
                  {friendB.grade.charAt(0).toUpperCase() + friendB.grade.slice(1)}
                </span>
              </CardTitle>
              <CardContent>
                <div className="mb-4">
                  <p className="text-sm text-gray-400 mb-1">Overall Score</p>
                  <div className="w-full h-3 bg-gray-800 rounded-full">
                    <div 
                      className={`h-full rounded-full ${
                        friendB.score > 70 ? 'bg-green-500' : 
                        friendB.score > 50 ? 'bg-yellow-500' : 
                        'bg-red-500'
                      }`}
                      style={{ width: `${friendB.score}%` }}
                    />
                  </div>
                  <p className="text-right text-sm mt-1">{friendB.score}/100</p>
                </div>
                
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">Red Flags</span>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Flag 
                        key={i}
                        size={16} 
                        className={i < friendB.redFlags ? 'text-red-400' : 'text-gray-700'} 
                      />
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Energy Drain</span>
                  <div className="flex items-center gap-1">
                    <ZapOff size={16} className="text-yellow-400" />
                    <span>{friendB.energyDrain}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card variant="glass" className="mt-6">
            <CardContent className="py-4">
              <p className="text-center">
                {friendA.score > friendB.score + 20
                  ? `${friendA.name} appears to be a significantly better friend than ${friendB.name}. They score higher in supportiveness and have fewer red flags.`
                  : friendB.score > friendA.score + 20
                    ? `${friendB.name} appears to be a significantly better friend than ${friendA.name}. They score higher in supportiveness and have fewer red flags.`
                    : `${friendA.name} and ${friendB.name} seem relatively similar in their friendship quality, with only small differences in their scores.`
                }
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};