import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md';
};

const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-black text-white hover:bg-gray-800',
  secondary: 'bg-white text-black border border-gray-300 hover:bg-gray-50',
  ghost: 'bg-transparent text-black hover:bg-gray-100',
};

const sizes: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-3 py-2 text-sm rounded-xl',
  md: 'px-4 py-2.5 text-sm rounded-xl',
};

const Button: React.FC<ButtonProps> = ({ variant = 'primary', size = 'md', className = '', ...props }) => {
  return (
    <button
      className={`${variants[variant]} ${sizes[size]} font-medium transition-colors duration-200 ${className}`}
      {...props}
    />
  );
};

export default Button;


