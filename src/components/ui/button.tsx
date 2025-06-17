import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  `inline-flex items-center justify-center whitespace-nowrap rounded-6 font-semibold transition-colors 
  disabled:pointer-events-none disabled:bg-bgSecondary disabled:text-textSecondary disabled:border-0`,
  {
    variants: {
      variant: {
        default: 'bg-primary text-white px-16 py-8 hover:bg-primaryHover',
        destructive: 'bg-error text-white px-16 py-8 hover:bg-errorHover',
        secondary: 'bg-bgSecondary text-textSecondary px-16 py-8 hover:bg-bgSecondaryHover',
        outline: 'bg-white border-2 px-16 py-8 hover:bg-bgSecondary',
        ghost: 'bg-white hover:bg-bgSecondary text-black disabled:bg-white',
      },
      size: {
        lg: 'h-44 text-[1.8rem]',
        md: 'h-40 text-[1.6rem]',
        sm: 'h-36 text-[1.4rem]',
      },
      outlineColor: {
        default: 'text-black border-black',
        secondary: 'text-black border-borderSecondary',
        primary: 'text-primary border-primary',
      },
    },
    compoundVariants: [
      { variant: 'outline', outlineColor: 'default', className: 'text-black border-black' },
      {
        variant: 'outline',
        outlineColor: 'secondary',
        className: 'text-black border-textSecondary',
      },
      { variant: 'outline', outlineColor: 'primary', className: 'text-primary border-primary' },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, outlineColor, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, outlineColor, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
