import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export function Card({ children, className = '', onClick, hover = false }: CardProps) {
  const baseStyles = 'bg-white rounded-2xl p-6 transition-all duration-200';
  const hoverStyles = hover ? 'hover:shadow-[var(--shadow-lg)] hover:-translate-y-1 cursor-pointer' : '';

  return (
    <div
      className={`${baseStyles} ${hoverStyles} ${className}`}
      style={{ boxShadow: 'var(--shadow-md)' }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
