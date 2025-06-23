import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaHandle {
  resetHeight: () => void;
}

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  inputSize?: 'md' | 'lg';
  variant?: 'default' | 'underline';
}

const Textarea = React.forwardRef<TextareaHandle, TextareaProps>(
  ({ className, inputSize = 'md', variant = 'default', ...props }, ref) => {
    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

    React.useImperativeHandle(ref, () => ({
      resetHeight: () => {
        if (textareaRef.current) {
          textareaRef.current.style.height = '40px';
        }
      },
    }));

    const handleAutoGrow = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const el = textareaRef.current;
      if (el) {
        el.style.height = '40px';
        el.style.height = `${Math.min(el.scrollHeight, 80)}px`;
      }
      props.onChange?.(e);
    };

    const baseStyle =
      'bg-white text-black placeholder:text-textSecondary focus:outline-none focus:border-primary disabled:opacity-50 overflow-y-auto resize-none no-scrollbar';

    const sizeStyle =
      inputSize === 'lg'
        ? 'text-body-sm leading-[40px] px-16 py-0'
        : 'text-body-sm leading-[40px] px-12 py-0';

    const heightStyle = 'min-h-[40px] max-h-[80px]';

    const variantStyle =
      variant === 'underline'
        ? 'border-b border-borderSecondary focus:border-b-2 rounded-none'
        : 'border border-borderSecondary focus:border-2 rounded-12';

    return (
      <textarea
        ref={textareaRef}
        className={cn(baseStyle, sizeStyle, heightStyle, variantStyle, className)}
        {...props}
        onChange={handleAutoGrow}
        style={{ height: '40px' }}
      />
    );
  },
);

Textarea.displayName = 'Textarea';

export { Textarea };
