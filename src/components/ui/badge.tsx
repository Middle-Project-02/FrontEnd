import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center px-12 py-2 rounded-full font-semibold transition-colors',
  {
    variants: {
      variant: {
        default: '',
        outline: '',
      },
      color: {
        default: '',
        primary: '',
      },
      size: {
        lg: 'text-[1.8rem]',
        md: 'text-[1.6rem]',
        sm: 'text-[1.4rem]',
      },
    },
    defaultVariants: {
      variant: 'default',
      color: 'default',
      size: 'md',
    },
    compoundVariants: [
      {
        variant: 'default',
        color: 'default',
        className: 'bg-black text-white border-transparent',
      },
      {
        variant: 'default',
        color: 'primary',
        className: 'bg-primary text-white border-transparent',
      },
      {
        variant: 'outline',
        color: 'default',
        className: 'border-2 border-black text-black',
      },
      {
        variant: 'outline',
        color: 'primary',
        className: 'border-2 border-primary text-primary',
      },
    ],
  },
);

export interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, color, size, ...rest }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant, color, size }), className)} {...rest} />;
}

export { Badge, badgeVariants };
