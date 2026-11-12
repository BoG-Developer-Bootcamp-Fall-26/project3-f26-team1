import { INPUT_CLASSES } from "@/components/ui/TextInput";

interface TextAreaProps {
  id: string;
  value: string;
  placeholder: string;
  onChange: (newValue: string) => void;
}

export default function TextArea({ id, value, placeholder, onChange }: TextAreaProps) {
  return (
    <textarea
      id={id}
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
      required
      className={`${INPUT_CLASSES} min-h-32 resize-y`}
    />
  );
}
