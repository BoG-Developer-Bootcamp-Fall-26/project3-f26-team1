import type { ReactNode } from "react";

interface ButtonProps {
  type: "button" | "submit";
  variant: "primary" | "secondary";
  disabled: boolean;
  onClick?: () => void;
  children: ReactNode;
}

const BASE_CLASSES =
  "rounded px-8 py-2 text-base font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60";
const PRIMARY_CLASSES = "bg-brand-red text-white hover:bg-red-700";
const SECONDARY_CLASSES = "border border-brand-red bg-white text-brand-red hover:bg-red-50";

export default function Button({ type, variant, disabled, onClick, children }: ButtonProps) {
  const variantClasses = variant === "primary" ? PRIMARY_CLASSES : SECONDARY_CLASSES;

  return (
    <button type={type} disabled={disabled} onClick={onClick} className={`${BASE_CLASSES} ${variantClasses}`}>
      {children}
    </button>
  );
}
