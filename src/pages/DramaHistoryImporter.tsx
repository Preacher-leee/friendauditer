import React, { useState } from 'react';
import { Card, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { UploadCloud, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';

interface AnalysisResult {
  patterns: {
    type: string;
    frequency: number;
    examples: string[];
  }[];
  timeline: {
    date: string;
    event: string;
    type: string;
  }[];
  summary: {
    totalMessages: number;
    ghostingIncidents: number;
    emotionalManipulation: number;
    healthyInteractions: number;
  };
}

export const DramaHistoryImporter = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const analyzeFile = () => {
    if (!file) return;
    
    setLoading(true);
    
    // Simulate API analysis
    setTimeout(() => {
      setAnalysis({
        patterns: [
          {
            type: 'Ghosting',
            frequency: 3,
            examples: [
              'No response for 2 weeks after emotional conversation',
              'Ignored important event invitation',
              'Sudden disappearance during conflict'
            ]
          },
          {
            type: 'Guilt Tripping',
            frequency: 5,
            examples: [
              'You never have time for me anymore',
              'I guess I\'m just not important enough',
              'Everyone else abandons me too'
            ]
          }
        ],
        timeline: [
          {
            date: '2024-01-15',
            event: 'Extended period of no communication',
            type: 'ghosting'
          },
          {
            date: '2024-02-01',
            event: 'Emotional manipulation attempt',
            type: 'manipulation'
          }
        ],
        summary: {
          totalMessages: 1247,
          ghostingIncidents: 3,
          emotionalManipulation: 12,
          healthyInteractions: 45
        }
      });
      
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 bg-gradient-to-b from-black via-purple-950/10 to-black">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Drama History Importer</h1>
        <p className="text-gray-300 mb-8">
          Upload your chat history to analyze patterns and identify toxic behaviors.
        </p>

        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="border-2 border-dashed border-gray-700 rounded-xl p-8 text-center">
              <UploadCloud size={48} className="mx-auto mb-4 text-purple-400" />
              <h3 className="text-xl font-bold mb-2">Upload Chat History</h3>
              <p className="text-gray-400 mb-4">
                Supported formats: .txt, .json, .csv
              </p>
              <input
                type="file"
                accept=".txt,.json,.csv"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <Button
                as="label"
                htmlFor="file-upload"
                variant="outline"
                className="cursor-pointer"
              >
                Choose File
              </Button>
              {file && (
                <div className="mt-4">
                  <p className="text-sm text-gray-300">Selected: {file.name}</p>
                  <Button
                    onClick={analyzeFile}
                    isLoading={loading}
                    className="mt-2"
                  >
                    Analyze History
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {analysis && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardTitle>Behavioral Patterns</CardTitle>
                <CardContent>
                  {analysis.patterns.map((pattern, index) => (
                    <div
                      key={index}
                      className="mb-4 p-4 bg-black/30 rounded-lg border border-purple-500/20"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold">{pattern.type}</h4>
                        <span className="text-sm text-gray-400">
                          {pattern.frequency} instances
                        </span>
                      </div>
                      <ul className="space-y-2">
                        {pattern.examples.map((example, i) => (
                          <li key={i} className="text-sm text-gray-300">
                            • {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardTitle>Summary Statistics</CardTitle>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                      <span>Total Messages</span>
                      <span className="font-bold">{analysis.summary.totalMessages}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-red-900/20 rounded-lg">
                      <span>Ghosting Incidents</span>
                      <span className="font-bold text-red-400">
                        {analysis.summary.ghostingIncidents}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-900/20 rounded-lg">
                      <span>Manipulation Attempts</span>
                      <span className="font-bold text-yellow-400">
                        {analysis.summary.emotionalManipulation}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-900/20 rounded-lg">
                      <span>Healthy Interactions</span>
                      <span className="font-bold text-green-400">
                        {analysis.summary.healthyInteractions}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card variant="glass">
              <CardTitle>Timeline Analysis</CardTitle>
              <CardContent>
                <div className="space-y-4">
                  {analysis.timeline.map((event, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 bg-black/30 rounded-lg"
                    >
                      <div className="flex-shrink-0">
                        {event.type === 'ghosting' ? (
                          <XCircle size={20} className="text-red-400" />
                        ) : event.type === 'manipulation' ? (
                          <AlertTriangle size={20} className="text-yellow-400" />
                        ) : (
                          <CheckCircle2 size={20} className="text-green-400" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">{event.date}</p>
                        <p className="text-white">{event.event}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};