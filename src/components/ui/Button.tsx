import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  className,
  children,
  ...props
}: ButtonProps) => {
  const baseStyles = 'font-bold rounded-xl transition-all duration-300 relative overflow-hidden';
  
  const variantStyles = {
    primary: 'bg-gradient-to-r from-purple-500 to-cyan-400 text-white hover:shadow-lg hover:shadow-purple-300/30 active:scale-[0.98]',
    secondary: 'bg-gradient-to-r from-pink-400 to-pink-600 text-white hover:shadow-lg hover:shadow-pink-300/30 active:scale-[0.98]',
    outline: 'bg-transparent border-2 border-purple-400 text-purple-400 hover:bg-purple-400/10 active:scale-[0.98]',
    ghost: 'bg-transparent text-purple-400 hover:bg-purple-400/10 active:scale-[0.98]'
  };
  
  const sizeStyles = {
    sm: 'text-sm py-2 px-3',
    md: 'text-base py-2.5 px-5',
    lg: 'text-lg py-3 px-6'
  };
  
  const widthStyles = fullWidth ? 'w-full' : '';
  
  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        widthStyles,
        isLoading ? 'opacity-70 cursor-not-allowed' : '',
        className
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {isLoading && (
          <span className="animate-spin h-4 w-4 border-2 border-t-transparent border-white rounded-full" />
        )}
        {children}
      </span>
      <span className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-cyan-300/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
    </button>
  );
};