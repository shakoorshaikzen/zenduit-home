import { cx } from "@/lib/cx";
import { Eyebrow } from "@/components/ui/eyebrow";

export function SectionHeading({
  eyebrow,
  title,
  lede,
  tone = "light",
  align = "start",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: string;
  tone?: "light" | "dark";
  align?: "start" | "center";
  className?: string;
}) {
  return (
    <div
      className={cx(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <h2
        className={cx(
          "text-balance font-display text-display font-semibold",
          eyebrow && "mt-4",
          tone === "dark" ? "text-dfg" : "text-fg",
        )}
      >
        {title}
      </h2>
      {lede && (
        <p
          className={cx(
            "mt-4 max-w-xl text-pretty text-[1.0625rem] leading-relaxed",
            align === "center" && "mx-auto",
            tone === "dark" ? "text-dmuted" : "text-muted",
          )}
        >
          {lede}
        </p>
      )}
    </div>
  );
}
