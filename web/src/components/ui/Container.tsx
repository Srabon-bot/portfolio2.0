import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Container({ children, className = "", id }: ContainerProps) {
  return (
    <div
      id={id}
      className={`max-w-[1100px] w-full mx-auto px-4 md:px-8 ${className}`}
    >
      {children}
    </div>
  );
}
