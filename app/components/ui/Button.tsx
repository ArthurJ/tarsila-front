import React from 'react'
import { cn } from '../../lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

export default function Button({
  className,
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    'font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none font-work-sans'
  
  const variants = {
    primary:
      'bg-tarsila-olive-light text-white hover:bg-tarsila-olive-light-600 focus-visible:ring-tarsila-olive-dark',
    secondary:
      'bg-tarsila-sienna text-white hover:bg-tarsila-burnt-orange focus-visible:ring-tarsila-sienna',
    outline:
      'border border-tarsila-olive-light-600 bg-transparent text-tarsila-olive-light-600 hover:bg-tarsila-olive-dark-50 focus-visible:ring-tarsila-olive-dark',
    ghost:
      'bg-transparent text-tarsila-olive-dark hover:bg-tarsila-olive-light/10 focus-visible:ring-tarsila-olive-dark',
    danger: 
      'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',
  }
  
  const sizes = {
    sm: 'h-8 px-3 text-xs rounded-md',
    md: 'h-10 px-4 py-2 text-sm rounded-md',
    lg: 'h-12 px-6 py-3 text-base rounded-lg',
  }
  
  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        isLoading && 'opacity-70 cursor-not-allowed',
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>Carregando...</span>
        </div>
      ) : (
        children
      )}
    </button>
  )
}