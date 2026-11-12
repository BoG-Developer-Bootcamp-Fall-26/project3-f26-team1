
import { useState } from "react";
import AnimalCard from "@/components/AnimalCard";
import SharedLayout from "@/components/layout/SharedLayout";

interface Animal {
    _id: string;
    name: string;
    breed: string;
    owner: string;
    ownerName: string;
    hoursTrained: number;
    profilePicture: string;
}

const sampleAnimals: Animal[] = [
    {
        _id: "1",
        name: "Lucy",
        breed: "Golden Retriever",
        owner: "456",
        ownerName: "Long Lam",
        hoursTrained: 100,
        profilePicture: "https://images.dog.ceo/breeds/retriever-golden/n02099601_100.jpg"
    },
    {
        _id: "2",
        name: "Max",
        breed: "Labrador Retriever",
        owner: "457",
        ownerName: "Jane Smith",
        hoursTrained: 75,
        profilePicture: "https://images.dog.ceo/breeds/labrador/n02099712_100.jpg"
    },
    {
        _id: "3",
        name: "Bella",
        breed: "German Shepherd",
        owner: "458",
        ownerName: "John Davis",
        hoursTrained: 45,
        profilePicture: "https://images.dog.ceo/breeds/germanshepherd/n02106662_100.jpg"
    },
    {
        _id: "4",
        name: "Charlie",
        breed: "Golden Retriever",
        owner: "459",
        ownerName: "Sarah Johnson",
        hoursTrained: 60,
        profilePicture: "https://images.dog.ceo/breeds/retriever-golden/n02099601_100.jpg"
    },
    {
        _id: "5",
        name: "Daisy",
        breed: "Beagle",
        owner: "460",
        ownerName: "Michael Brown",
        hoursTrained: 30,
        profilePicture: "https://images.dog.ceo/breeds/beagle/n02088364_100.jpg"
    },
    {
        _id: "6",
        name: "Rocky",
        breed: "Pug",
        owner: "461",
        ownerName: "Emily Wilson",
        hoursTrained: 90,
        profilePicture: "https://images.dog.ceo/breeds/pug/n02110958_100.jpg"
    }
];

export default function AllAnimalsDashboard() {
    const [search, setSearch] = useState("");

    const filteredAnimals = sampleAnimals.filter((animal) =>
        `${animal.name} ${animal.breed} ${animal.ownerName}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <SharedLayout pageTitle="All animals" onSearchChange={setSearch}>
            <div>
                {filteredAnimals.length > 0 ? (
                    <div className="grid grid-cols-1 justify-items-center gap-x-7 gap-y-7 md:grid-cols-2 xl:grid-cols-3">
                        {filteredAnimals.map((animal) => (
                            <AnimalCard
                                key={animal._id}
                                animal={animal}
                                ownerName={animal.ownerName}
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