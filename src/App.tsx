import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Audit } from './pages/Audit';
import { Tools } from './pages/Tools';
import { TextAnalyzer } from './pages/TextAnalyzer';
import { Compare } from './pages/Compare';
import { RedFlagTimeline } from './pages/RedFlagTimeline';
import { GhostMode } from './pages/GhostMode';
import { DramaHistoryImporter } from './pages/DramaHistoryImporter';
import { VoiceAnalyzer } from './pages/VoiceAnalyzer';

function App() {
  useEffect(() => {
    // Update document title
    document.title = 'TheFriendAudit | Vibe or Parasite?';
    
    // Add custom styles to the document
    const style = document.createElement('style');
    style.textContent = `
      body {
        background-color: black;
        color: white;
        font-family: 'Inter', 'Segoe UI', sans-serif;
      }
      
      .text-gradient {
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      
      @keyframes fall {
        0% {
          transform: translateY(-100vh) rotate(0deg);
        }
        100% {
          transform: translateY(100vh) rotate(360deg);
        }
      }
      
      @keyframes pulse-glow {
        0%, 100% {
          box-shadow: 0 0 15px 0 rgba(139, 92, 246, 0.4);
        }
        50% {
          box-shadow: 0 0 30px 5px rgba(139, 92, 246, 0.7);
        }
      }
      
      .animate-in {
        animation: fadeIn 0.5s ease-out forwards;
      }
      
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);
    
    // Clean up
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-black text-white relative">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/audit" element={<Audit />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/tools/text-analyzer" element={<TextAnalyzer />} />
          <Route path="/tools/compare" element={<Compare />} />
          <Route path="/tools/timeline" element={<RedFlagTimeline />} />
          <Route path="/tools/ghost" element={<GhostMode />} />
          <Route path="/tools/importer" element={<DramaHistoryImporter />} />
          <Route path="/tools/voice" element={<VoiceAnalyzer />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;