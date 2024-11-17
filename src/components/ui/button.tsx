/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { Link } from "react-router-dom";

const buttonVariants = cva(
  `
  inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50
  `,  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        success: "bg-green-500 text-white shadow-sm hover:bg-green-500/90",
        outline:
        "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        "action-primary":
          "bg-green-500/20 text-green-500 hover:bg-green-500 hover:text-white transition-all",
        "action-danger":
          "bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all",
        "action-info":
          "bg-cyan-500/20 text-cyan-500 hover:bg-cyan-500 hover:text-white transition-all",
        "action-warning":
          "bg-primary/20 text-primary hover:bg-primary hover:text-white transition-all",
      },
      size: {
        default: `
          h-10 px-4 py-2
        `,
        sm: `
          h-9 rounded-md px-3
        `,
        lg: `
          h-11 rounded-md px-8
        `,
        icon: `
          h-10 w-10
        `,
        "icon-sm": "h-8 w-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean | any;
  href?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  as?: any;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      as,
      href,
      leftIcon,
      rightIcon,
      loading,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : as || "button";
    const LeftIcon = () => leftIcon;
    const RightIcon = () => rightIcon;
    if (href) {
      return (
        <Link to={href}>
          <Comp
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            {...props}
            disabled={loading || props.disabled}
          >
            {leftIcon && !loading && <LeftIcon />}
            {loading && <Loader className="mr-2 size-4 animate-spin" />}
            {props.children}
            {rightIcon && <RightIcon />}
          </Comp>
        </Link>
      );
    }
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        disabled={loading || props.disabled}
      >
        {leftIcon && !loading && <LeftIcon />}
        {loading && <Loader className="mr-2 size-4 animate-spin" />}
        {props.children}
        {rightIcon && <RightIcon />}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
