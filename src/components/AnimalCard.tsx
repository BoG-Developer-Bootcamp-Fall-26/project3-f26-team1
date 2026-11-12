
interface Animal {
    _id: string;
    name: string;
    breed: string;
    owner: string;
    hoursTrained: number;
    profilePicture: string;
}

interface AnimalCardProps {
    animal: Animal;
    ownerName: string;
}

export default function AnimalCard({
    animal,
    ownerName
}: AnimalCardProps) {

    return (
        <div className="w-[414px] max-w-full overflow-hidden rounded-[20px] bg-white shadow-md">

            <div className="h-[269px] w-full bg-gray-200">

                <img
                    src={animal.profilePicture}
                    alt={animal.name}
                    className="h-full w-full object-cover"
                    onError={(event) => {
                        event.currentTarget.style.display = "none";
                    }}
                />

            </div>

            <div className="flex min-h-[117px] items-center gap-[16px] px-[23px] py-5">

                <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-[#db1010] text-[36px] font-semibold leading-none text-white">

                    {ownerName.charAt(0).toUpperCase()}

                </div>

                <div className="min-w-0">

                    <h2 className="whitespace-nowrap text-[27px] font-bold leading-tight text-black">
                        {animal.name} - {animal.breed}
                    </h2>

                    <p className="mt-[10px] whitespace-nowrap text-[20px] leading-tight text-[#a3a3a3]">
                        {ownerName} <span className="mx-1">•</span> Trained: {animal.hoursTrained} hours
                    </p>

                </div>

            </div>

        </div>
    );
}
