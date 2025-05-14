import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LoadingScreen } from '../components/LoadingScreen';
import { Button } from '../components/ui/Button';
import { Flag, MessageCircle, BarChart2 } from 'lucide-react';

export const Home = () => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (loading) {
    return <LoadingScreen onComplete={() => setLoading(false)} />;
  }
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-b from-black via-purple-950/20 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-cyan-300 to-purple-400">
            Audit Your Friendship
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-300">
            Let's find out if they're a vibe or a parasite.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" as={Link} to="/audit">
              Start the Audit
            </Button>
            <Button variant="outline" size="lg" as={Link} to="/tools">
              Explore Tools
            </Button>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <div className="animate-bounce">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="text-purple-400"
            >
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-300">
              Tools to Audit Your Circle
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/10 p-8 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
              <div className="w-16 h-16 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6">
                <Flag className="text-purple-400" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Friendship Audit Quiz</h3>
              <p className="text-gray-400 mb-6">
                Answer 20 questions about your friendship and get a detailed analysis of its health and potential toxicity.
              </p>
              <Button variant="outline" as={Link} to="/audit" fullWidth>
                Start Quiz
              </Button>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-cyan-900/40 to-cyan-800/10 p-8 rounded-2xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
              <div className="w-16 h-16 bg-cyan-500/20 rounded-xl flex items-center justify-center mb-6">
                <MessageCircle className="text-cyan-400" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Toxic Text Analyzer</h3>
              <p className="text-gray-400 mb-6">
                Paste in messages from your friend and our AI will break down the emotional tone and flag manipulative language.
              </p>
              <Button variant="outline" as={Link} to="/tools/text-analyzer" fullWidth>
                Analyze Texts
              </Button>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-pink-900/40 to-pink-800/10 p-8 rounded-2xl border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300">
              <div className="w-16 h-16 bg-pink-500/20 rounded-xl flex items-center justify-center mb-6">
                <BarChart2 className="text-pink-400" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Compare Friends</h3>
              <p className="text-gray-400 mb-6">
                Put two friends head-to-head and see who's really showing up for you and who's draining your energy.
              </p>
              <Button variant="outline" as={Link} to="/tools/compare" fullWidth>
                Compare Now
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call-to-Action */}
      <section className="py-20 px-4 bg-gradient-to-b from-black via-purple-950/10 to-black">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to audit your friendships?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            It's time to find out who's worth keeping around and who might be dragging you down.
          </p>
          <Button size="lg" as={Link} to="/audit">
            Start Your First Audit
          </Button>
        </div>
      </section>
    </div>
  );
};