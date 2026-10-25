/*
 * Chip — a small rounded tag used to display tech stack items.
 *
 * PRD §5.4: "Chip: small rounded tag in surface-2."
 */

interface ChipProps {
  label: string;
}

export function Chip({ label }: ChipProps) {
  return (
    <span
      className="inline-block px-3 py-1 text-xs font-medium rounded-full text-muted"
      style={{
        background: "var(--color-surface-2, #1C1330)",
        border: "1px solid var(--color-border, #2A1F45)",
      }}
    >
      {label}
    </span>
  );
}
