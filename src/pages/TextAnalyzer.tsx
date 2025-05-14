import React from 'react';
import { TextAnalyzer as TextAnalyzerComponent } from '../components/TextAnalyzer';

export const TextAnalyzer = () => {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 bg-gradient-to-b from-black via-purple-950/10 to-black">
      <div className="container mx-auto">
        <TextAnalyzerComponent />
      </div>
    </div>
  );
};