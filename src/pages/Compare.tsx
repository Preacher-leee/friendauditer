import React from 'react';
import { FriendComparison } from '../components/FriendComparison';

export const Compare = () => {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 bg-gradient-to-b from-black via-purple-950/10 to-black">
      <div className="container mx-auto">
        <FriendComparison />
      </div>
    </div>
  );
};