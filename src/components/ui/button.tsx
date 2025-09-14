import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg hover:scale-[1.02]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md hover:shadow-lg hover:scale-[1.02]",
        outline: "border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-sm hover:shadow-md hover:scale-[1.02]",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-md hover:shadow-lg hover:scale-[1.02]",
        ghost: "hover:bg-accent hover:text-accent-foreground hover:scale-[1.05] rounded-xl",
        link: "text-primary underline-offset-4 hover:underline hover:scale-[1.02]",
        hero: "bg-gradient-primary text-white border-0 shadow-xl hover:shadow-2xl hover:scale-[1.08] glow-primary font-bold rounded-2xl transform-gpu",
        "hero-outline": "border-2 border-white/30 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:border-white/50 shadow-xl hover:shadow-2xl hover:scale-[1.05] rounded-2xl",
        gradient: "bg-gradient-secondary text-white border-0 shadow-lg hover:shadow-2xl hover:scale-[1.05] glow-secondary rounded-xl transform-gpu",
        premium: "bg-gradient-hero text-white border-0 shadow-2xl hover:shadow-3xl hover:scale-[1.08] glow-accent font-bold rounded-2xl transform-gpu animate-gradient-shift",
      },
      size: {
        default: "h-11 px-6 py-2 text-sm",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-12 rounded-xl px-8 text-base font-semibold",
        xl: "h-16 rounded-2xl px-12 text-lg font-bold",
        hero: "h-16 rounded-2xl px-12 text-lg font-bold",
        icon: "h-11 w-11 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
