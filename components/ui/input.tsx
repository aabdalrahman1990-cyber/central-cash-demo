import { cn } from "@/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export function Input({ className, label, ...props }: InputProps) {
  return (
    <label className="grid gap-2 text-sm font-medium text-slate-600 dark:text-slate-200">
      {label ? <span>{label}</span> : null}
      <input
        className={cn(
          "h-11 rounded-2xl border bg-card px-4 text-sm text-foreground outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/15",
          className
        )}
        {...props}
      />
    </label>
  );
}
