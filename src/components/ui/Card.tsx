import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps {
  variant?: 'default' | 'gradient' | 'glass';
  className?: string;
  children: React.ReactNode;
}

export const Card = ({
  variant = 'default',
  className,
  children,
}: CardProps) => {
  const baseStyles = 'rounded-2xl p-6 backdrop-blur-sm';
  
  const variantStyles = {
    default: 'bg-white/10 border border-white/20',
    gradient: 'bg-gradient-to-br from-purple-900/60 to-cyan-900/60 border border-white/10',
    glass: 'bg-white/5 border border-white/10 backdrop-blur-md'
  };
  
  return (
    <div className={cn(baseStyles, variantStyles[variant], className)}>
      {children}
    </div>
  );
};

export const CardTitle = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return (
    <h3 className={cn('text-xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-cyan-200', className)}>
      {children}
    </h3>
  );
};

export const CardContent = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return <div className={cn('', className)}>{children}</div>;
};

export const CardFooter = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return <div className={cn('mt-4 pt-4 border-t border-white/10', className)}>{children}</div>;
};