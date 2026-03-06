import { InputHTMLAttributes, forwardRef, ReactNode } from "react";
import { clsx } from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-primary mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={id}
            className={clsx(
              "w-full px-3 py-2 text-sm border transition-colors",
              "bg-white text-primary placeholder:text-gray-400",
              "focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-black focus:border-transparent",
              "disabled:bg-secondary disabled:cursor-not-allowed",
              error
                ? "border-error focus:ring-error"
                : "border-border hover:border-border-dark",
              icon && "pl-10",
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="mt-1 text-xs text-error">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-primary mb-1.5"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          className={clsx(
            "w-full px-3 py-2 text-sm border transition-colors resize-none",
            "bg-white text-primary placeholder:text-gray-400",
            "focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-black focus:border-transparent",
            "disabled:bg-secondary disabled:cursor-not-allowed",
            error
              ? "border-error focus:ring-error"
              : "border-border hover:border-border-dark",
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-error">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Input, Textarea };
export type { InputProps, TextareaProps };
