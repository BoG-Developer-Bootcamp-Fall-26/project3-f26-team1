import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SharedLayout from "@/components/layout/SharedLayout";
import TrainingLogCard from "@/components/TrainingLogCard";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useRequireUserId } from "@/hooks/useRequireUserId";
import { fetchTrainingLogsForUser } from "@/lib/requests/trainingLogs";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { routes } from "@/lib/routes";
import type { TrainingLogWithDetails } from "@/types/models";

export default function TrainingDashboard() {
    const router = useRouter();
    const userId = useRequireUserId();

    const [logs, setLogs] = useState<TrainingLogWithDetails[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (!userId) {
            return;
        }

        async function loadLogs(forUserId: string) {
            setIsLoading(true);
            setErrorMessage(null);
            try {
                const fetchedLogs = await fetchTrainingLogsForUser(forUserId);
                setLogs(fetchedLogs);
            } catch (error) {
                setErrorMessage(getErrorMessage(error));
            } finally {
                setIsLoading(false);
            }
        }

        loadLogs(userId);
    }, [userId]);

    if (!userId) {
        return null;
    }

    const filteredLogs = logs.filter((log) =>
        log.title.toLowerCase().includes(search.trim().toLowerCase())
    );

    return (
        <SharedLayout
            pageTitle="Training logs"
            headerAction={
                <a
                    href="/training/new"
                    className="text-[13px] font-semibold text-[#817775] hover:text-red-600"
                >
                    ⊞ Create new
                </a>
            }
            onSearchChange={setSearch}
        >
            {isLoading && <p className="text-sm text-gray-500">Loading training logs...</p>}

            {errorMessage && <ErrorMessage message={errorMessage} />}

            {!isLoading && !errorMessage && filteredLogs.length === 0 && (
                <p className="py-12 text-center text-gray-500">
                    No training logs found.
                </p>
            )}

            <div className="mx-auto flex max-w-[650px] flex-col gap-[17px]">
                {filteredLogs.map((log) => (
                    <TrainingLogCard
                        key={log._id}
                        trainingLog={{
                            _id: log._id,
                            user: log.user._id,
                            animal: log.animal._id,
                            title: log.title,
                            date: log.date,
                            description: log.description,
                            hours: log.hours,
                        }}
                        userName={log.user.fullName}
                        animalName={log.animal.name}
                        animalBreed={log.animal.breed}
                        onEdit={() => {
                            router.push(routes.editTrainingLog(log._id));
                        }}
                    />
                ))}
            </div>
        </SharedLayout>
    );
}
