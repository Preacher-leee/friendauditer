import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from './ui/Card';
import { AlertTriangle, Heart, Activity, Lock } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-black/60 backdrop-blur-sm py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between gap-8">
          <div className="w-full md:w-1/3">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Activity className="text-gradient bg-gradient-to-r from-cyan-400 to-purple-500" size={24} />
              <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-cyan-200">
                TheFriendAudit
              </span>
            </Link>
            <p className="text-gray-400 mb-4 text-sm">
              Helping you identify whether your friendships are a vibe or a parasite since 2025.
            </p>
            <Card variant="glass" className="p-4 my-4 max-w-md">
              <p className="text-pink-300 font-bold flex items-center gap-2">
                <AlertTriangle size={16} />
                This site won't fix your friendships—but it <em>will</em> expose the BS.
              </p>
            </Card>
          </div>

          <div className="w-full md:w-auto grid grid-cols-2 sm:grid-cols-3 gap-x-12 gap-y-8">
            <div>
              <h3 className="font-bold text-white mb-4">Navigate</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-400 hover:text-purple-300 text-sm">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/audit" className="text-gray-400 hover:text-purple-300 text-sm">
                    Start Audit
                  </Link>
                </li>
                <li>
                  <Link to="/tools" className="text-gray-400 hover:text-purple-300 text-sm">
                    Tools
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-400 hover:text-purple-300 text-sm">
                    About
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-white mb-4">Tools</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/tools/message-analyzer" className="text-gray-400 hover:text-purple-300 text-sm">
                    Text Analyzer
                  </Link>
                </li>
                <li>
                  <Link to="/tools/compare" className="text-gray-400 hover:text-purple-300 text-sm">
                    Compare Friends
                  </Link>
                </li>
                <li>
                  <Link to="/tools/journal" className="text-gray-400 hover:text-purple-300 text-sm">
                    Friendventory
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-white mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/resources" className="text-gray-400 hover:text-purple-300 text-sm">
                    Therapy Resources
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-gray-400 hover:text-purple-300 text-sm flex items-center gap-1">
                    <Lock size={14} /> Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} TheFriendAudit. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2 sm:mt-0 flex items-center gap-1">
            Made with <Heart size={14} className="text-pink-500" /> for better friendships
          </p>
        </div>
      </div>
    </footer>
  );
};