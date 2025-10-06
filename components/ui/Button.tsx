import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'font-bold rounded-xl transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center justify-center';

  const variantStyles = {
    primary: 'text-white hover:opacity-90 active:scale-98 shadow-sm hover:shadow-md',
    secondary: 'bg-[var(--text-secondary)] text-white hover:opacity-90 active:scale-98',
    outline: 'border-2 bg-white hover:bg-opacity-5 active:scale-98',
  };

  const sizeStyles = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const primaryStyle = variant === 'primary' ? { backgroundColor: 'var(--primary)' } : {};
  const outlineStyle = variant === 'outline' ? {
    borderColor: 'var(--primary)',
    color: 'var(--primary)'
  } : {};

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      style={{ ...primaryStyle, ...outlineStyle }}
      {...props}
    >
      {children}
    </button>
  );
}
