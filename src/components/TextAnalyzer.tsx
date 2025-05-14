import React, { useState } from 'react';
import { Card, CardTitle, CardContent, CardFooter } from './ui/Card';
import { Button } from './ui/Button';
import { Flag, CheckCircle2, MessageCircle } from 'lucide-react';

export const TextAnalyzer = () => {
  const [message, setMessage] = useState('');
  const [analysis, setAnalysis] = useState<any | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeText = () => {
    if (!message.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock analysis result
      const mockAnalysis = {
        toxicity: Math.random() * 0.7, // 0-0.7 scale
        manipulation: Math.random() * 0.8,
        support: Math.random() * 0.9,
        overall: Math.random() > 0.5 ? 'positive' : Math.random() > 0.3 ? 'neutral' : 'negative',
        highlights: [
          {
            text: message.split(' ').slice(0, 3).join(' '),
            type: 'red-flag',
          },
          {
            text: message.split(' ').slice(5, 8).join(' '),
            type: 'green-flag',
          }
        ]
      };
      
      setAnalysis(mockAnalysis);
      setIsAnalyzing(false);
    }, 1500);
  };
  
  const getHighlightedText = () => {
    if (!analysis || !message) return message;
    
    let result = message;
    
    // Simple mock highlighting
    analysis.highlights.forEach((highlight: any) => {
      const { text, type } = highlight;
      const highlightClass = 
        type === 'red-flag' ? 'bg-red-500/30 text-red-300' : 
        type === 'green-flag' ? 'bg-green-500/30 text-green-300' : 
        'bg-gray-500/30 text-gray-300';
      
      result = result.replace(
        text, 
        `<span class="${highlightClass} px-1 rounded">${text}</span>`
      );
    });
    
    return result;
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Toxic Text Analyzer</h2>
      <p className="text-gray-300 mb-8 text-center">
        Paste a message from your friend to analyze its emotional tone and detect potential red flags.
      </p>
      
      <Card variant="glass" className="mb-8">
        <CardContent className="pt-6">
          <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-300">
            Friend's message
          </label>
          <textarea
            id="message"
            rows={5}
            className="w-full p-4 bg-black/30 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors resize-none"
            placeholder="Paste the message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button 
            onClick={analyzeText} 
            disabled={!message.trim() || isAnalyzing}
            isLoading={isAnalyzing}
          >
            <MessageCircle size={18} className="mr-2" />
            {isAnalyzing ? 'Analyzing...' : 'Analyze Message'}
          </Button>
        </CardFooter>
      </Card>
      
      {analysis && (
        <Card variant="gradient" className="w-full">
          <CardTitle>Analysis Results</CardTitle>
          <CardContent>
            <div className="mb-6 p-4 bg-black/30 rounded-lg">
              <p className="text-lg" dangerouslySetInnerHTML={{ __html: getHighlightedText() }} />
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span>Overall Tone:</span>
                <span className={`
                  px-2 py-1 rounded text-sm font-bold
                  ${analysis.overall === 'positive' ? 'bg-green-500/20 text-green-400' : 
                    analysis.overall === 'neutral' ? 'bg-blue-500/20 text-blue-400' : 
                    'bg-red-500/20 text-red-400'}
                `}>
                  {analysis.overall.charAt(0).toUpperCase() + analysis.overall.slice(1)}
                </span>
              </h3>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Toxicity</p>
                  <div className="w-full h-2 bg-gray-800 rounded-full">
                    <div 
                      className="h-full bg-red-500 rounded-full"
                      style={{ width: `${analysis.toxicity * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Manipulation</p>
                  <div className="w-full h-2 bg-gray-800 rounded-full">
                    <div 
                      className="h-full bg-yellow-500 rounded-full"
                      style={{ width: `${analysis.manipulation * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Support</p>
                  <div className="w-full h-2 bg-gray-800 rounded-full">
                    <div 
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${analysis.support * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Highlighted Patterns</h3>
              <ul className="space-y-2">
                {analysis.highlights.map((highlight: any, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    {highlight.type === 'red-flag' ? (
                      <Flag size={18} className="text-red-400 mt-1" />
                    ) : (
                      <CheckCircle2 size={18} className="text-green-400 mt-1" />
                    )}
                    <div>
                      <span className="font-bold">
                        {highlight.type === 'red-flag' ? 'Red Flag' : 'Healthy Communication'}:
                      </span>
                      <span className="ml-2">"{highlight.text}"</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};