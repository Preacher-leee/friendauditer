import React, { useState } from 'react';
import { Card, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Ghost, MessageSquare, Zap, Shield } from 'lucide-react';

interface Strategy {
  type: 'slow-fade' | 'hard-cutoff';
  title: string;
  description: string;
  steps: string[];
  messages: string[];
}

export const GhostMode = () => {
  const [selectedType, setSelectedType] = useState<'slow-fade' | 'hard-cutoff'>('slow-fade');
  
  const strategies: Record<'slow-fade' | 'hard-cutoff', Strategy> = {
    'slow-fade': {
      type: 'slow-fade',
      title: 'The Slow Fade',
      description: 'Gradually reduce contact to minimize drama and emotional impact.',
      steps: [
        'Take longer to respond to messages',
        'Be "busy" more often',
        'Keep conversations surface level',
        'Decline most invitations',
        'Stop initiating contact'
      ],
      messages: [
        "Hey, I've got a lot going on right now and need some space.",
        "Sorry, I can't make it. Maybe another time!",
        "Thanks for thinking of me, but I'm taking some time for myself."
      ]
    },
    'hard-cutoff': {
      type: 'hard-cutoff',
      title: 'The Clean Break',
      description: 'Direct communication followed by complete separation.',
      steps: [
        'Send a clear, final message',
        'Block on all platforms',
        'Remove from social media',
        'Inform mutual friends (if needed)',
        'Prepare for potential backlash'
      ],
      messages: [
        "I've given this a lot of thought, and I don't think this friendship is healthy for either of us.",
        "I need to step away from this relationship. Please respect my decision.",
        "I wish you the best, but I need to create some boundaries."
      ]
    }
  };

  const selectedStrategy = strategies[selectedType];

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 bg-gradient-to-b from-black via-purple-950/10 to-black">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Ghost Mode</h1>
          <p className="text-gray-300">
            Strategic exit plans for toxic friendships. Choose your approach.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <button
            className={`p-6 rounded-xl border-2 transition-all ${
              selectedType === 'slow-fade'
                ? 'border-purple-500 bg-purple-900/20'
                : 'border-gray-700 bg-black/30 hover:border-purple-500/50'
            }`}
            onClick={() => setSelectedType('slow-fade')}
          >
            <div className="flex items-center gap-3 mb-3">
              <Ghost size={24} className="text-purple-400" />
              <h3 className="text-xl font-bold">The Slow Fade</h3>
            </div>
            <p className="text-gray-400 text-left">
              Gradually distance yourself to avoid confrontation.
            </p>
          </button>

          <button
            className={`p-6 rounded-xl border-2 transition-all ${
              selectedType === 'hard-cutoff'
                ? 'border-red-500 bg-red-900/20'
                : 'border-gray-700 bg-black/30 hover:border-red-500/50'
            }`}
            onClick={() => setSelectedType('hard-cutoff')}
          >
            <div className="flex items-center gap-3 mb-3">
              <Zap size={24} className="text-red-400" />
              <h3 className="text-xl font-bold">The Clean Break</h3>
            </div>
            <p className="text-gray-400 text-left">
              Direct communication followed by complete separation.
            </p>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardTitle className="flex items-center gap-2">
              <Shield size={20} className="text-purple-400" />
              Action Steps
            </CardTitle>
            <CardContent>
              <ol className="space-y-4">
                {selectedStrategy.steps.map((step, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-900/50 border border-purple-500/30 flex items-center justify-center text-sm">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare size={20} className="text-purple-400" />
              Suggested Messages
            </CardTitle>
            <CardContent>
              <div className="space-y-4">
                {selectedStrategy.messages.map((message, index) => (
                  <div
                    key={index}
                    className="p-4 bg-black/30 rounded-lg border border-purple-500/20"
                  >
                    <p className="text-gray-300">{message}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2"
                      onClick={() => navigator.clipboard.writeText(message)}
                    >
                      Copy
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card variant="glass" className="mt-8">
          <CardContent>
            <div className="flex items-start gap-4 p-4">
              <div className="p-3 bg-yellow-500/20 rounded-lg">
                <Shield size={24} className="text-yellow-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Safety First</h3>
                <p className="text-gray-300">
                  If you feel unsafe or threatened, don't hesitate to seek help. Consider:
                </p>
                <ul className="list-disc list-inside text-gray-400 mt-2 space-y-1">
                  <li>Documenting concerning behavior</li>
                  <li>Informing trusted friends or family</li>
                  <li>Consulting with a mental health professional</li>
                  <li>Contacting authorities if necessary</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};