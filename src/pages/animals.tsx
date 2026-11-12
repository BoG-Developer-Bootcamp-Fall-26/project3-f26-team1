
import { useState } from "react";
import AnimalCard from "@/components/AnimalCard";
import SharedLayout from "@/components/layout/SharedLayout";

interface Animal {
    _id: string;
    name: string;
    breed: string;
    owner: string;
    hoursTrained: number;
    profilePicture: string;
}

const sampleAnimals: Animal[] = [
    {
        _id: "1",
        name: "Lucy",
        breed: "Golden Retriever",
        owner: "456",
        hoursTrained: 100,
        profilePicture: "https://images.dog.ceo/breeds/retriever-golden/n02099601_100.jpg"
    },
    {
        _id: "2",
        name: "Lucy",
        breed: "Golden Retriever",
        owner: "456",
        hoursTrained: 100,
        profilePicture: "https://images.dog.ceo/breeds/retriever-golden/n02099601_100.jpg"
    },
    {
        _id: "3",
        name: "Lucy",
        breed: "Golden Retriever",
        owner: "456",
        hoursTrained: 100,
        profilePicture: "https://images.dog.ceo/breeds/retriever-golden/n02099601_100.jpg"
    },
    {
        _id: "4",
        name: "Lucy",
        breed: "Golden Retriever",
        owner: "456",
        hoursTrained: 100,
        profilePicture: "https://images.dog.ceo/breeds/retriever-golden/n02099601_100.jpg"
    },
    {
        _id: "5",
        name: "Lucy",
        breed: "Golden Retriever",
        owner: "456",
        hoursTrained: 100,
        profilePicture: "https://images.dog.ceo/breeds/retriever-golden/n02099601_100.jpg"
    },
    {
        _id: "6",
        name: "Lucy",
        breed: "Golden Retriever",
        owner: "456",
        hoursTrained: 100,
        profilePicture: "https://images.dog.ceo/breeds/retriever-golden/n02099601_100.jpg"
    }
];

export default function AnimalsDashboard() {
    const [search, setSearch] = useState("");

    const filteredAnimals = sampleAnimals.filter((animal) =>
        `${animal.name} ${animal.breed}`
            .toLowerCase()
            .includes(search.toLowerCase())
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
            <div>
                {filteredAnimals.length > 0 ? (
                    <div className="grid grid-cols-1 justify-items-center gap-x-7 gap-y-7 md:grid-cols-2 xl:grid-cols-3">
                        {filteredAnimals.map((animal) => (
                            <AnimalCard
                                key={animal._id}
                                animal={animal}
                                ownerName="Long Lam"
                            />
                        ))}
                    </div>
                ) : (
                    <p className="py-12 text-center text-gray-500">
                        No animals found.
                    </p>
                )}
            </div>
        </SharedLayout>
    );
}
