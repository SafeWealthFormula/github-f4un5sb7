import { ButtonHTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: ReactNode;
}

export function Button({ variant = 'primary', children, className, disabled, ...props }: ButtonProps) {
  return (
    <button
      className={twMerge(
        clsx(
          'px-6 py-3 text-sm font-medium rounded-lg transition-all duration-300 flex items-center justify-center',
          {
            'bg-primary text-white shadow-md hover:bg-primary-hover hover:shadow-lg focus:ring-2 focus:ring-offset-2 focus:ring-primary-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5': variant === 'primary',
            'text-neutral-600 hover:text-neutral-800 hover:bg-neutral-50': variant === 'secondary',
          },
          className
        )
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}