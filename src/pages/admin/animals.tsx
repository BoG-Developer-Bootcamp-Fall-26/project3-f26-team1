import { useEffect, useState } from "react";
import AnimalCard from "@/components/AnimalCard";
import SharedLayout from "@/components/layout/SharedLayout";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useRequireUserId } from "@/hooks/useRequireUserId";
import { fetchAllAnimals } from "@/lib/requests/animals";
import { fetchAllUsers } from "@/lib/requests/users";
import { getErrorMessage } from "@/lib/getErrorMessage";
import type { Animal, User } from "@/types/models";

export default function AllAnimalsDashboard() {
    const userId = useRequireUserId();

    const [animals, setAnimals] = useState<Animal[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (!userId) {
            return;
        }

        async function loadAnimals() {
            setIsLoading(true);
            setErrorMessage(null);
            try {
                const fetchedAnimals = await fetchAllAnimals();
                const fetchedUsers = await fetchAllUsers();
                setAnimals(fetchedAnimals);
                setUsers(fetchedUsers);
            } catch (error) {
                setErrorMessage(getErrorMessage(error));
            } finally {
                setIsLoading(false);
            }
        }

        loadAnimals();
    }, [userId]);

    if (!userId) {
        return null;
    }

    function findOwnerName(animal: Animal): string {
        const owner = users.find((user) => user._id === animal.owner);
        if (owner) {
            return owner.fullName;
        }
        return "Unknown owner";
    }

    const filteredAnimals = animals.filter((animal) =>
        animal.name.toLowerCase().includes(search.trim().toLowerCase())
    );

    return (
        <SharedLayout pageTitle="All animals" onSearchChange={setSearch}>
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
                        ownerName={findOwnerName(animal)}
                    />
                ))}
            </div>
        </SharedLayout>
    );
}
