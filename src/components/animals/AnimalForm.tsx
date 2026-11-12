import { useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import ErrorMessage from "@/components/ui/ErrorMessage";
import FormField from "@/components/ui/FormField";
import TextInput from "@/components/ui/TextInput";

export interface AnimalFormValues {
  name: string;
  breed: string;
  hoursTrained: number;
  profilePicture: string;
}

interface AnimalFormProps {
  onSubmit: (values: AnimalFormValues) => void;
  onCancel: () => void;
  errorMessage: string | null;
  isSubmitting: boolean;
}

export default function AnimalForm({ onSubmit, onCancel, errorMessage, isSubmitting }: AnimalFormProps) {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [hoursTrainedText, setHoursTrainedText] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit({
      name: name.trim(),
      breed: breed.trim(),
      hoursTrained: Number(hoursTrainedText),
      profilePicture: profilePicture.trim(),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-2xl flex-col gap-5">
      <FormField label="Animal Name" htmlFor="name">
        <TextInput id="name" type="text" value={name} placeholder="Name" onChange={setName} />
      </FormField>

      <FormField label="Breed" htmlFor="breed">
        <TextInput id="breed" type="text" value={breed} placeholder="Breed" onChange={setBreed} />
      </FormField>

      <FormField label="Total hours trained" htmlFor="hoursTrained">
        <TextInput
          id="hoursTrained"
          type="number"
          value={hoursTrainedText}
          placeholder="0"
          onChange={setHoursTrainedText}
          min={0}
          step={0.5}
        />
      </FormField>

      <FormField label="Profile picture URL" htmlFor="profilePicture">
        <TextInput
          id="profilePicture"
          type="text"
          value={profilePicture}
          placeholder="Paste an image URL"
          onChange={setProfilePicture}
        />
      </FormField>

      {errorMessage && <ErrorMessage message={errorMessage} />}

      <div className="flex gap-4 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
}
