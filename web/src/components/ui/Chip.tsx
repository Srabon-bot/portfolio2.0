/*
 * Chip — a small rounded tag used to display tech stack items.
 *
 * Supports optional `highlight` prop for core stack items (MERN).
 */

import { TechIcon } from "./TechIcon";

interface ChipProps {
  label: string;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
  highlight?: boolean;
  className?: string;
}

export function Chip({
  label,
  size = "md",
  showIcon = true,
  highlight = false,
  className = "",
}: ChipProps) {
  const isCountBadge = label.startsWith("+");

  const sizeClasses = {
    sm: "px-2.5 py-0.5 text-xs gap-1",
    md: "px-3 py-1 text-xs gap-1.5",
    lg: "px-3.5 py-1.5 text-sm gap-2",
  }[size];

  const iconSize = {
    sm: 12,
    md: 14,
    lg: 16,
  }[size];

  const textColor = highlight ? "text-text" : "text-muted";
  const borderColor = highlight
    ? "color-mix(in srgb, var(--color-accent) 50%, transparent)"
    : "var(--color-border)";

  return (
    <span
      className={`inline-flex items-center font-mono font-medium rounded-full ${textColor} transition-all duration-200 hover:border-accent/40 hover:text-text ${sizeClasses} ${className}`}
      style={{
        background: "var(--color-surface-2)",
        border: `1px solid ${borderColor}`,
      }}
    >
      {showIcon && !isCountBadge && <TechIcon name={label} size={iconSize} />}
      <span>{label}</span>
    </span>
  );
}
