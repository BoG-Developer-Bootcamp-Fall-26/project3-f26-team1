import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SharedLayout from "@/components/layout/SharedLayout";
import TrainingLogForm, { type TrainingLogFormValues } from "@/components/training-logs/TrainingLogForm";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useRequireUserId } from "@/hooks/useRequireUserId";
import { addAnimalHours } from "@/lib/requests/animals";
import { fetchTrainingLogsForUser, updateTrainingLog } from "@/lib/requests/trainingLogs";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { routes } from "@/lib/routes";
import type { TrainingLogWithDetails } from "@/types/models";

export default function EditTrainingLogPage() {
  const router = useRouter();
  const userId = useRequireUserId();
  const logId = typeof router.query.id === "string" ? router.query.id : undefined;

  const [log, setLog] = useState<TrainingLogWithDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadErrorMessage, setLoadErrorMessage] = useState<string | null>(null);

  const [saveErrorMessage, setSaveErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!userId || !logId) {
      return;
    }

    async function loadLog(forUserId: string, forLogId: string) {
      setIsLoading(true);
      setLoadErrorMessage(null);
      try {
        const logs = await fetchTrainingLogsForUser(forUserId);
        const matchingLog = logs.find((candidate) => candidate._id === forLogId);
        if (matchingLog) {
          setLog(matchingLog);
        } else {
          setLoadErrorMessage("This training log could not be found.");
        }
      } catch (error) {
        setLoadErrorMessage(getErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    }

    loadLog(userId, logId);
  }, [userId, logId]);

  if (!userId) {
    return null;
  }

  const handleSubmit = async (values: TrainingLogFormValues) => {
    if (!log) {
      return;
    }

    setIsSubmitting(true);
    setSaveErrorMessage(null);

    try {
      await updateTrainingLog({
        _id: log._id,
        user: userId,
        animal: values.animalId,
        title: values.title,
        description: values.description,
        hours: values.hours,
      });

      if (values.animalId === log.animal._id) {
        await addAnimalHours(log.animal._id, values.hours - log.hours);
      } else {
        await addAnimalHours(log.animal._id, -log.hours);
        await addAnimalHours(values.animalId, values.hours);
      }

      router.push(routes.trainingLogs);
    } catch (error) {
      setSaveErrorMessage(getErrorMessage(error));
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push(routes.trainingLogs);
  };

  return (
    <SharedLayout pageTitle="Training logs">
      {isLoading && <p className="text-sm text-gray-500">Loading training log...</p>}

      {loadErrorMessage && (
        <div className="mx-auto w-full max-w-2xl">
          <ErrorMessage message={loadErrorMessage} />
        </div>
      )}

      {log && (
        <TrainingLogForm
          initialValues={{
            title: log.title,
            animalId: log.animal._id,
            hours: log.hours,
            description: log.description,
          }}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          errorMessage={saveErrorMessage}
          isSubmitting={isSubmitting}
        />
      )}
    </SharedLayout>
  );
}
