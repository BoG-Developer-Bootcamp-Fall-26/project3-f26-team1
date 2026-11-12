import {useEffect, useState} from "react";
import Sidebar from "@/components/Sidebar";
import SharedLayout from "@/components/layout/SharedLayout";

type TrainingLog = {
    _id: string;
    title: string;
    date: string;
    description: string;
    hours: number;
    user: string | { _id: string; fullName?: string };
    animal: string | {
        _id: string;
        name?: string;
        breed?: string;
    };
};

export default function AllTrainingLogs() {
    const [logs, setLogs] = useState<TrainingLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchLogs() {
            try {
                const response = await fetch("/api/admin/training");

                if (!response.ok) {
                    throw new Error("Unable to load training logs.");
                }

                const data = await response.json();
                setLogs(Array.isArray(data) ? data : data.logs ?? []);
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "An error occurred."
                );
            } finally {
                setLoading(false);
            }
        }

        fetchLogs();
    }, []);

    const sortedLogs = [...logs].sort(
        (a, b) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const [search, setSearch] = useState("");

    const filteredLogs = sortedLogs.filter((log) => log.title.toLowerCase().includes(search.toLowerCase()))


    return (
        <SharedLayout pageTitle="All training" onSearchChange={setSearch}>
            <p className="mb-8 text-gray-500">
                View all animal training records.
            </p>

            {loading && <p>Loading training logs...</p>}

            {error && (
                <p role="alert" className="text-red-600">
                    {error}
                </p>
            )}

            {!loading && !error && filteredLogs.length === 0 && (
                <p>No training logs found.</p>
            )}

            <div className="grid gap-5">
                {filteredLogs.map((log) => {
                    const userName =
                        typeof log.user === "string"
                            ? log.user
                            : log.user?.fullName ?? "Unknown user";
                    const animalName =
                        typeof log.animal === "string"
                            ? log.animal
                            : log.animal?.name ?? "Unknown animal";
                    const breed =
                        typeof log.animal === "string"
                            ? "Unknown"
                            : log.animal?.breed ?? "Unknown";

                    return (
                        <div
                            key={log._id}
                            className="rounded-xl bg-white p-6 shadow-sm"
                        >
                            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                                <h2 className="text-xl font-bold text-gray-900">
                                    {log.title}
                                </h2>

                                <span className="text-sm text-gray-500">
                                            {new Date(log.date).toLocaleDateString()}
                                        </span>
                            </div>

                            <div className="mb-4 grid gap-2 text-sm text-gray-600 sm:grid-cols-2">
                                <p>
                                    <strong>User:</strong> {userName}
                                </p>
                                <p>
                                    <strong>Animal:</strong> {animalName}
                                </p>
                                <p>
                                    <strong>Breed:</strong> {breed}
                                </p>
                                <p>
                                    <strong>Hours:</strong> {log.hours}
                                </p>
                            </div>

                            <p className="text-gray-700">{log.description}</p>
                        </div>
                    );
                })}
            </div>

        </SharedLayout>
    );
}