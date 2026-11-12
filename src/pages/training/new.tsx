import { useState } from "react";
import { useRouter } from "next/router";
import SharedLayout from "@/components/layout/SharedLayout";
import TrainingLogForm, { type TrainingLogFormValues } from "@/components/training-logs/TrainingLogForm";
import { useRequireUserId } from "@/hooks/useRequireUserId";
import { createTrainingLog } from "@/lib/requests/trainingLogs";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { addAnimalHours } from "@/lib/requests/animals";
import { routes } from "@/lib/routes";

export default function NewTrainingLogPage() {
  const router = useRouter();
  const userId = useRequireUserId();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!userId) {
    return null;
  }

  const handleSubmit = async (values: TrainingLogFormValues) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await createTrainingLog({
        user: userId,
        animal: values.animalId,
        title: values.title,
        description: values.description,
        hours: values.hours,
        date: new Date().toISOString(),
      });
      await addAnimalHours(values.animalId, values.hours);
      router.push(routes.trainingLogs);
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push(routes.trainingLogs);
  };

  return (
    <SharedLayout pageTitle="Training logs">
      <TrainingLogForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        errorMessage={errorMessage}
        isSubmitting={isSubmitting}
      />
    </SharedLayout>
  );
}
