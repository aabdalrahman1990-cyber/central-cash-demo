import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost";
  asChild?: boolean;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", asChild = false, ...props }, ref) => {
    const Component = asChild ? ("span" as const) : "button";

    return (
      <Component
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:pointer-events-none disabled:opacity-50",
          variant === "default" && "bg-primary text-white hover:opacity-90",
          variant === "outline" && "border bg-card text-foreground hover:bg-muted",
          variant === "ghost" && "bg-transparent text-foreground hover:bg-muted",
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
