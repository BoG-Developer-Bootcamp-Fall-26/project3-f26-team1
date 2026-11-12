
import { useState } from "react";
import { useRouter } from "next/router";
import SharedLayout from "@/components/layout/SharedLayout";
import TrainingLogCard from "@/components/TrainingLogCard";
import { routes } from "@/lib/routes";

interface TrainingLog {
    _id: string;
    user: string;
    animal: string;
    title: string;
    date: Date | string;
    description: string;
    hours: number;
}

const sampleTrainingLogs: TrainingLog[] = [
    {
        _id: "1",
        user: "456",
        animal: "123",
        title: "Complete sit lessons",
        date: "2023-10-20",
        description: "Lucy finishes the sit lessons very well today. Should give her a treat",
        hours: 20
    },
    {
        _id: "2",
        user: "456",
        animal: "123",
        title: "Complete sit lessons",
        date: "2023-10-20",
        description: "Lucy finishes the sit lessons very well today. Should give her a treat",
        hours: 20
    },
    {
        _id: "3",
        user: "456",
        animal: "123",
        title: "Complete sit lessons",
        date: "2023-10-20",
        description: "Lucy finishes the sit lessons very well today. Should give her a treat",
        hours: 20
    },
    {
        _id: "4",
        user: "456",
        animal: "123",
        title: "Complete sit lessons",
        date: "2023-10-20",
        description: "Lucy finishes the sit lessons very well today. Should give her a treat",
        hours: 20
    }
];

export default function TrainingDashboard() {
    const router = useRouter();
    const [search, setSearch] = useState("");

    const filteredLogs = sampleTrainingLogs.filter((log) =>
        `${log.title} ${log.description}`
            .toLowerCase()
            .includes(search.toLowerCase())
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
            <div>
                {filteredLogs.length > 0 ? (
                    <div className="mx-auto flex max-w-[650px] flex-col gap-[17px]">
                        {filteredLogs.map((log) => (
                            <TrainingLogCard
                                key={log._id}
                                trainingLog={log}
                                userName="Long Lam"
                                animalName="Lucy"
                                animalBreed="Golden Retriever"
                                onEdit={() => {
                                    router.push(routes.editTrainingLog(log._id));
                                }}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="py-12 text-center text-gray-500">
                        No training logs found.
                    </p>
                )}
            </div>
        </SharedLayout>
    );
}
