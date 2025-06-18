import * as React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.ComponentProps<'input'> {
  inputSize?: 'md' | 'lg';
  variant?: 'default' | 'underline';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, inputSize = 'md', variant = 'default', ...props }, ref) => {
    const baseStyle =
      'flex w-full bg-white px-12 py-8 text-black border-gray-300 ' +
      'placeholder:text-textSecondary focus:border-primary focus:outline-none disabled:opacity-50';

    const sizeStyle = inputSize === 'lg' ? 'h-44 text-[1.8rem]' : 'h-40 text-[1.6rem]';

    const variantStyle =
      variant === 'underline'
        ? 'border-b focus:border-b-2 rounded-none'
        : 'border focus:border-2 rounded-6';

    return (
      <input
        type={type}
        className={cn(baseStyle, sizeStyle, variantStyle, className)}
        ref={ref}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';

export { Input };
