import React, { useState } from 'react';
import { Card, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Mic, AudioWaveformIcon as WaveformIcon, AlertTriangle, Volume2 } from 'lucide-react';

interface Analysis {
  transcript: string;
  sentiment: {
    score: number;
    label: 'positive' | 'neutral' | 'negative';
  };
  emotions: {
    anger: number;
    sadness: number;
    anxiety: number;
    manipulation: number;
  };
  redFlags: {
    text: string;
    type: string;
    confidence: number;
  }[];
}

export const VoiceAnalyzer = () => {
  const [recording, setRecording] = useState(false);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAudioFile(e.target.files[0]);
    }
  };

  const startRecording = () => {
    setRecording(true);
    // Implement actual recording logic here
  };

  const stopRecording = () => {
    setRecording(false);
    // Implement stop recording logic here
  };

  const analyzeAudio = () => {
    if (!audioFile) return;
    
    setAnalyzing(true);
    
    // Simulate API analysis
    setTimeout(() => {
      setAnalysis({
        transcript: "Hey, I know you're probably busy but I really need to talk to you about something important. You've been kind of distant lately and it's really hurting me. I thought we were closer than this.",
        sentiment: {
          score: 0.3,
          label: 'negative'
        },
        emotions: {
          anger: 0.2,
          sadness: 0.6,
          anxiety: 0.4,
          manipulation: 0.7
        },
        redFlags: [
          {
            text: "I thought we were closer than this",
            type: "guilt-trip",
            confidence: 0.85
          },
          {
            text: "You've been kind of distant lately",
            type: "accusation",
            confidence: 0.75
          }
        ]
      });
      
      setAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 bg-gradient-to-b from-black via-purple-950/10 to-black">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Voice Message Analyzer</h1>
        <p className="text-gray-300 mb-8">
          Upload or record a voice message to analyze tone, emotion, and potential manipulation.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardTitle>Record Audio</CardTitle>
            <CardContent>
              <div className="flex flex-col items-center justify-center p-8">
                <button
                  className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
                    recording
                      ? 'bg-red-500 animate-pulse'
                      : 'bg-purple-500 hover:bg-purple-600'
                  }`}
                  onClick={recording ? stopRecording : startRecording}
                >
                  <Mic size={32} className="text-white" />
                </button>
                <p className="mt-4 text-gray-400">
                  {recording ? 'Recording... Click to stop' : 'Click to start recording'}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardTitle>Upload Audio</CardTitle>
            <CardContent>
              <div className="border-2 border-dashed border-gray-700 rounded-xl p-8 text-center">
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="audio-upload"
                />
                <label
                  htmlFor="audio-upload"
                  className="cursor-pointer block"
                >
                  <Volume2 size={32} className="mx-auto mb-4 text-purple-400" />
                  <p className="text-gray-400 mb-4">
                    Upload audio file (MP3, WAV, M4A)
                  </p>
                  <Button variant="outline">Choose File</Button>
                </label>
                {audioFile && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-300">Selected: {audioFile.name}</p>
                    <Button
                      onClick={analyzeAudio}
                      isLoading={analyzing}
                      className="mt-2"
                    >
                      Analyze Audio
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {analysis && (
          <div className="space-y-6">
            <Card>
              <CardTitle>Transcript</CardTitle>
              <CardContent>
                <p className="text-gray-300 italic">"{analysis.transcript}"</p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardTitle>Emotional Analysis</CardTitle>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(analysis.emotions).map(([emotion, value]) => (
                      <div key={emotion}>
                        <div className="flex justify-between mb-1">
                          <span className="capitalize">{emotion}</span>
                          <span>{Math.round(value * 100)}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-800 rounded-full">
                          <div
                            className={`h-full rounded-full ${
                              emotion === 'manipulation'
                                ? 'bg-red-500'
                                : emotion === 'anger'
                                ? 'bg-orange-500'
                                : emotion === 'sadness'
                                ? 'bg-blue-500'
                                : 'bg-yellow-500'
                            }`}
                            style={{ width: `${value * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle size={20} className="text-red-400" />
                  Red Flags Detected
                </CardTitle>
                <CardContent>
                  <div className="space-y-4">
                    {analysis.redFlags.map((flag, index) => (
                      <div
                        key={index}
                        className="p-4 bg-red-900/20 rounded-lg border border-red-500/20"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-bold capitalize">{flag.type}</span>
                          <span className="text-sm text-red-400">
                            {Math.round(flag.confidence * 100)}% confidence
                          </span>
                        </div>
                        <p className="text-sm text-gray-300">"{flag.text}"</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card variant="glass">
              <CardTitle>Overall Sentiment</CardTitle>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold mb-2">
                      {analysis.sentiment.label.charAt(0).toUpperCase() +
                        analysis.sentiment.label.slice(1)}
                    </p>
                    <p className="text-gray-400">
                      This message shows signs of emotional manipulation and guilt-tripping.
                    </p>
                  </div>
                  <WaveformIcon
                    size={48}
                    className={
                      analysis.sentiment.label === 'positive'
                        ? 'text-green-400'
                        : analysis.sentiment.label === 'neutral'
                        ? 'text-yellow-400'
                        : 'text-red-400'
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};