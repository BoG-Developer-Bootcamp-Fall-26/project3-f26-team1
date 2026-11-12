import { useState } from "react";
import { useRouter } from "next/router";
import AnimalForm, { type AnimalFormValues } from "@/components/animals/AnimalForm";
import SharedLayout from "@/components/layout/SharedLayout";
import { useRequireUserId } from "@/hooks/useRequireUserId";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { createAnimal } from "@/lib/requests/animals";
import { routes } from "@/lib/routes";

export default function NewAnimalPage() {
  const router = useRouter();
  const userId = useRequireUserId();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!userId) {
    return null;
  }

  const handleSubmit = async (values: AnimalFormValues) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await createAnimal({
        name: values.name,
        breed: values.breed,
        owner: userId,
        hoursTrained: values.hoursTrained,
        profilePicture: values.profilePicture,
      });
      router.push(routes.animals);
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push(routes.animals);
  };

  return (
    <SharedLayout pageTitle="Animals">
      <AnimalForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        errorMessage={errorMessage}
        isSubmitting={isSubmitting}
      />
    </SharedLayout>
  );
}
