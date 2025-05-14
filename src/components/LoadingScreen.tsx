import React, { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  
  const emojis = ['🧠', '💅', '🚩', '🔪', '💭', '👀', '🫠', '⚠️'];
  const [currentEmoji, setCurrentEmoji] = useState(emojis[0]);
  
  useEffect(() => {
    const emojiInterval = setInterval(() => {
      setCurrentEmoji(prev => {
        const currentIndex = emojis.indexOf(prev);
        return emojis[(currentIndex + 1) % emojis.length];
      });
    }, 400);
    
    const loadingInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(loadingInterval);
          setTimeout(() => {
            setLoading(false);
            onComplete?.();
          }, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
    
    return () => {
      clearInterval(emojiInterval);
      clearInterval(loadingInterval);
    };
  }, [onComplete]);
  
  if (!loading) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="relative mb-4">
          <Activity size={60} className="text-gray-700" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Activity 
              size={60} 
              className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-300" 
            />
          </div>
          
          <div className="text-5xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse">
            {currentEmoji}
          </div>
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center max-w-md px-4">
          Let's find out if they're a 
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-300 mx-2">
            vibe
          </span> 
          or a 
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-red-500 mx-2">
            parasite
          </span>
        </h1>
        
        <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <p className="mt-4 text-gray-400 text-sm">Loading your friendship audit...</p>
      </div>
    </div>
  );
};