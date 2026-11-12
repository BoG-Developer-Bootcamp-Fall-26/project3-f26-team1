import type { ReactNode } from "react";

interface FormFieldProps {
  label: string;
  htmlFor: string;
  children: ReactNode;
}

export default function FormField({ label, htmlFor, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={htmlFor} className="text-sm font-medium text-gray-900">
        {label}
      </label>
      {children}
    </div>
  );
}
