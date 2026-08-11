import { cx } from "@/lib/cx";

export function Card({
  lift = false,
  className,
  children,
}: {
  /** Adds the single ambient shadow tier + hover lift. */
  lift?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cx(
        "rounded-md border border-hairline-l bg-card",
        lift &&
          "shadow-ambient transition-[box-shadow,border-color,background-color] duration-200 hover:border-fg/20 hover:bg-paper-raised",
        className,
      )}
    >
      {children}
    </div>
  );
}
