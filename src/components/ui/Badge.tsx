import { HTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";

type BadgeVariant = "default" | "success" | "warning" | "error" | "info" | "outline";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={clsx(
          "inline-flex items-center px-2 py-0.5 text-xs font-medium",
          {
            "bg-secondary text-primary": variant === "default",
            "bg-green-50 text-success border border-green-200": variant === "success",
            "bg-yellow-50 text-warning border border-yellow-200": variant === "warning",
            "bg-red-50 text-error border border-red-200": variant === "error",
            "bg-blue-50 text-info border border-blue-200": variant === "info",
            "bg-transparent border border-border text-primary": variant === "outline",
          },
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";

export { Badge };
export type { BadgeProps, BadgeVariant };
