import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../utils/cn';
import { Button } from './ui/Button';
import { Activity, MenuIcon, X } from 'lucide-react';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-black/80 backdrop-blur-md py-3 shadow-lg shadow-purple-900/10'
          : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative w-10 h-10 flex items-center justify-center">
            <Activity size={28} className="text-gradient bg-gradient-to-r from-cyan-400 to-purple-500" />
          </div>
          <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-cyan-200">
            TheFriendAudit
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/audit">Start Audit</NavLink>
          <NavLink to="/tools">Tools</NavLink>
          <NavLink to="/about">About</NavLink>
          <Button size="sm" as={Link} to="/audit">
            Run a New Audit
          </Button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="p-2 md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 md:hidden pt-20 px-6 flex flex-col">
          <nav className="flex flex-col gap-4 items-center">
            <MobileNavLink to="/audit" onClick={() => setIsMobileMenuOpen(false)}>
              Start Audit
            </MobileNavLink>
            <MobileNavLink to="/tools" onClick={() => setIsMobileMenuOpen(false)}>
              Tools
            </MobileNavLink>
            <MobileNavLink to="/about" onClick={() => setIsMobileMenuOpen(false)}>
              About
            </MobileNavLink>
            <div className="pt-4">
              <Button 
                size="md" 
                fullWidth 
                as={Link} 
                to="/audit" 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Run a New Audit
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={cn(
        'text-sm font-medium transition-colors hover:text-purple-300',
        isActive ? 'text-purple-300' : 'text-gray-300'
      )}
    >
      {children}
    </Link>
  );
};

const MobileNavLink = ({ 
  to, 
  onClick, 
  children 
}: { 
  to: string; 
  onClick?: () => void;
  children: React.ReactNode 
}) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      onClick={onClick}
      className={cn(
        'text-2xl font-bold transition-colors py-3 w-full text-center',
        isActive ? 'text-purple-300' : 'text-gray-300'
      )}
    >
      {children}
    </Link>
  );
};