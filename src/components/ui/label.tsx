import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const labelVariants = cva('text-black leading-none peer-disabled:opacity-70', {
  variants: {
    size: {
      lg: 'text-[1.8rem]',
      md: 'text-[1.6rem]',
      sm: 'text-[1.4rem]',
    },
  },

  defaultVariants: {
    size: 'md',
  },
});

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>
>(({ className, size, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(labelVariants({ size }), className)} {...props} />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
