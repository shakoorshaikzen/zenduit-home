import { cx } from "@/lib/cx";

/**
 * Mono, uppercase, tracked label — the telemetry voice of the type system.
 * Neutral by design (Linear grammar): color is reserved for interactive
 * elements and telemetry status, never for labels.
 */
export function Eyebrow({
  tone = "light",
  className,
  children,
}: {
  tone?: "light" | "dark";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p
      className={cx(
        "font-mono text-xs font-medium uppercase tracking-[0.08em]",
        tone === "dark" ? "text-dfaint" : "text-faint",
        className,
      )}
    >
      {children}
    </p>
  );
}
