import { useEffect, useState } from "react";
import AnimalCard from "@/components/AnimalCard";
import SharedLayout from "@/components/layout/SharedLayout";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useRequireUserId } from "@/hooks/useRequireUserId";
import { fetchAnimalsForUser } from "@/lib/requests/animals";
import { getErrorMessage } from "@/lib/getErrorMessage";
import type { Animal } from "@/types/models";

export default function AnimalsDashboard() {
    const userId = useRequireUserId();

    const [animals, setAnimals] = useState<Animal[]>([]);
    const [ownerName, setOwnerName] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (!userId) {
            return;
        }

        async function loadAnimals(forUserId: string) {
            setIsLoading(true);
            setErrorMessage(null);
            try {
                const fetchedAnimals = await fetchAnimalsForUser(forUserId);
                setAnimals(fetchedAnimals);
                setOwnerName(sessionStorage.getItem("userName") ?? "");
            } catch (error) {
                setErrorMessage(getErrorMessage(error));
            } finally {
                setIsLoading(false);
            }
        }

        loadAnimals(userId);
    }, [userId]);

    if (!userId) {
        return null;
    }

    const filteredAnimals = animals.filter((animal) =>
        animal.name.toLowerCase().includes(search.trim().toLowerCase())
    );

    return (
        <SharedLayout
            pageTitle="Animals"
            headerAction={
                <a
                    href="/animals/new"
                    className="text-[13px] font-semibold text-[#817775] hover:text-red-600"
                >
                    ⊞ Create new
                </a>
            }
            onSearchChange={setSearch}
        >
            {isLoading && <p className="text-sm text-gray-500">Loading animals...</p>}

            {errorMessage && <ErrorMessage message={errorMessage} />}

            {!isLoading && !errorMessage && filteredAnimals.length === 0 && (
                <p className="py-12 text-center text-gray-500">
                    No animals found.
                </p>
            )}

            <div className="grid grid-cols-1 justify-items-center gap-x-7 gap-y-7 md:grid-cols-2 xl:grid-cols-3">
                {filteredAnimals.map((animal) => (
                    <AnimalCard
                        key={animal._id}
                        animal={animal}
                        ownerName={ownerName}
                    />
                ))}
            </div>
        </SharedLayout>
    );
}
