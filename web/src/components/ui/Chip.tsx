/*
 * Chip — a small rounded tag used to display tech stack items.
 *
 * PRD §5.4: "Chip: small rounded tag in surface-2."
 */

import { TechIcon } from "./TechIcon";

interface ChipProps {
  label: string;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
  className?: string;
}

export function Chip({
  label,
  size = "md",
  showIcon = true,
  className = "",
}: ChipProps) {
  const isCountBadge = label.startsWith("+");

  const sizeClasses = {
    sm: "px-2.5 py-0.5 text-[11px] gap-1",
    md: "px-3 py-1 text-xs gap-1.5",
    lg: "px-3.5 py-1.5 text-sm gap-2",
  }[size];

  const iconSize = {
    sm: 12,
    md: 14,
    lg: 16,
  }[size];

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full text-muted transition-all duration-200 hover:border-accent/40 hover:text-text ${sizeClasses} ${className}`}
      style={{
        background: "var(--color-surface-2)",
        border: "1px solid var(--color-border)",
      }}
    >
      {showIcon && !isCountBadge && <TechIcon name={label} size={iconSize} />}
      <span>{label}</span>
    </span>
  );
}
