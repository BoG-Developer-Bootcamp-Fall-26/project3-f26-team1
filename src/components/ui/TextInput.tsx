interface TextInputProps {
  id: string;
  type: "text" | "number";
  value: string;
  placeholder: string;
  onChange: (newValue: string) => void;
  min?: number;
  step?: number;
}

export const INPUT_CLASSES =
  "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 " +
  "focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red";

export default function TextInput({ id, type, value, placeholder, onChange, min, step }: TextInputProps) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
      min={min}
      step={step}
      required
      className={INPUT_CLASSES}
    />
  );
}
