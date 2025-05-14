import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { MessageCircle, BarChart2, Book, Flag, Users, Microscope as Microphone, UploadCloud, VolumeX } from 'lucide-react';

export const Tools = () => {
  const tools = [
    {
      id: 'text-analyzer',
      name: 'Toxic Text Analyzer',
      description: 'Paste in a message to analyze emotional tone and detect manipulation',
      icon: <MessageCircle size={24} className="text-cyan-400" />,
      isAvailable: true,
      path: '/tools/text-analyzer'
    },
    {
      id: 'compare',
      name: 'Compare Friends',
      description: 'Side-by-side comparison of two friendships',
      icon: <BarChart2 size={24} className="text-purple-400" />,
      isAvailable: true,
      path: '/tools/compare'
    },
    {
      id: 'journal',
      name: 'Friendventory Journal',
      description: 'Track friendship patterns and energy over time',
      icon: <Book size={24} className="text-pink-400" />,
      isAvailable: false,
      path: '/tools/journal'
    },
    {
      id: 'timeline',
      name: 'Red Flag Timeline',
      description: 'Plot key moments and generate a Trust Decay Chart',
      icon: <Flag size={24} className="text-red-400" />,
      isAvailable: false,
      path: '/tools/timeline'
    },
    {
      id: 'group',
      name: 'Friend Group Dynamics',
      description: 'Map energy flow in your social circle',
      icon: <Users size={24} className="text-green-400" />,
      isAvailable: false,
      path: '/tools/group'
    },
    {
      id: 'voice',
      name: 'Voice Message Analyzer',
      description: 'Upload audio to detect tone and manipulation',
      icon: <Microphone size={24} className="text-yellow-400" />,
      isAvailable: false,
      path: '/tools/voice'
    },
    {
      id: 'importer',
      name: 'Drama History Importer',
      description: 'Import chat logs to find behavioral patterns',
      icon: <UploadCloud size={24} className="text-blue-400" />,
      isAvailable: false,
      path: '/tools/importer'
    },
    {
      id: 'ghost',
      name: 'Ghost Mode',
      description: 'Get tailored exit strategies for toxic friendships',
      icon: <VolumeX size={24} className="text-gray-400" />,
      isAvailable: false,
      path: '/tools/ghost'
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 bg-gradient-to-b from-black via-purple-950/10 to-black">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Friendship Analysis Tools</h1>
          <p className="text-gray-300">
            Our suite of specialized tools to help you analyze different aspects of your friendships.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Card 
              key={tool.id}
              className={`transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/20 ${
                !tool.isAvailable ? 'opacity-60' : ''
              }`}
            >
              <div className="p-6">
                <div className="w-12 h-12 rounded-lg bg-black/30 flex items-center justify-center mb-4">
                  {tool.icon}
                </div>
                
                <h3 className="text-xl font-bold mb-2">{tool.name}</h3>
                <p className="text-gray-400 mb-6">
                  {tool.description}
                </p>
                
                {tool.isAvailable ? (
                  <Button as={Link} to={tool.path} variant="outline" fullWidth>
                    Use Tool
                  </Button>
                ) : (
                  <Button disabled variant="outline" fullWidth>
                    Coming Soon
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};