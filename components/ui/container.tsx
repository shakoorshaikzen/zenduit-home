import { cx } from "@/lib/cx";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cx("mx-auto w-full max-w-[80rem] px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}
