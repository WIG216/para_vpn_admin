import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;

  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leftIcon, rightIcon, ...props }, ref) => {
    const LeftIcon = () => leftIcon;
    const RightIcon = () => rightIcon;
    return (
      <div className={cn('space-y-1', className)}>
        {props.label && <label className="text-sm font-medium">{props.label}</label>}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-2 top-1/2 text-sm transform -translate-y-1/2">
              <LeftIcon />
            </div>
          )}
          <input
            type={type}
            placeholder={props.placeholder || props.label}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              { "pl-8": leftIcon },
              { "pr-8": rightIcon },
              { "border-red-500": props.error }
            )}
            ref={ref}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <RightIcon />
            </div>
          )}
        </div>

        {props.error && (
          <div>
            <p className="text-red-500 text-sm">{props.error}</p>
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
