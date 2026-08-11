import Link from "next/link";
import { cx } from "@/lib/cx";

type Variant = "primary" | "ghostDark" | "ghostLight";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent-deep text-dfg shadow-[inset_0_1px_0_rgb(255_255_255/0.14)] hover:scale-[1.02] hover:bg-accent-deeper active:translate-y-px active:scale-100",
  ghostDark:
    "border border-hairline-d bg-white/[0.03] text-dfg shadow-[inset_0_1px_0_rgb(255_255_255/0.05)] hover:border-dfg/25 hover:bg-white/[0.07] active:translate-y-px",
  ghostLight:
    "border border-hairline-l bg-transparent text-fg hover:border-fg/25 hover:bg-ink-900/[0.04] active:translate-y-px",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-12 px-6 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  className,
  children,
  ...rest
}: {
  variant?: Variant;
  size?: Size;
  href?: string;
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const classes = cx(
    "inline-flex cursor-pointer select-none items-center justify-center gap-2 rounded-sm font-medium tracking-[-0.006em] transition-[background-color,border-color,transform,box-shadow] duration-150",
    variants[variant],
    sizes[size],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
