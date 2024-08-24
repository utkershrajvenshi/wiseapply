import React, { forwardRef, ButtonHTMLAttributes } from 'react';
import cn from 'classnames';

type ButtonVariant = 'upload' | 'linkedin' | 'proceed' | 'secondary' | 'delete';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant;
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, children, className, disabled, ...props }, ref) => {
    const baseClasses = 'flex-1 py-2 px-4 rounded-md transition-all duration-200 ease-in-out';
    const enabledClasses = 'hover:-translate-y-1 hover:shadow-lg hover:z-10 active:translate-y-0 active:scale-95';

    const variantClasses = {
      upload: 'bg-[#D9D9D9] bg-opacity-25 border-2 border-black',
      linkedin: 'bg-sky-500 text-white font-semibold shadow-[inset_2px_2px_4px_rgba(125,174,246,0.8),inset_-2px_-2px_4px_rgba(53,110,194,0.7)]',
      proceed: '', // To be defined later
      secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
      delete: 'bg-red-500 text-white hover:bg-red-600',
    };

    const disabledClasses = 'opacity-50 cursor-not-allowed';

    const buttonClasses = cn(
      baseClasses,
      variantClasses[variant],
      !disabled && enabledClasses,
      disabled && disabledClasses,
      className
    );

    return (
      <button ref={ref} className={buttonClasses} disabled={disabled} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;