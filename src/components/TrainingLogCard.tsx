
interface TrainingLog {
    _id: string;
    user: string;
    animal: string;
    title: string;
    date: Date | string;
    description: string;
    hours: number;
}

interface TrainingLogCardProps {
    trainingLog: TrainingLog;
    userName: string;
    animalName: string;
    animalBreed: string;
    onEdit?: () => void;
}

export default function TrainingLogCard({
    trainingLog,
    userName,
    animalName,
    animalBreed,
    onEdit
}: TrainingLogCardProps) {

    const date = new Date(trainingLog.date);

    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();

    return (
        <div className="flex w-full min-h-[168px] overflow-hidden rounded-[20px] bg-white shadow-md">

            <div className="flex w-[144px] shrink-0 flex-col items-center justify-center bg-[#303575] text-white">

                <p className="text-[56px] font-semibold leading-none">
                    {day}
                </p>

                <p className="mt-[12px] text-[28px] leading-none">
                    {month} - {year}
                </p>

            </div>

            <div className="flex flex-1 items-center justify-between gap-4 px-[21px] py-3">

                <div className="flex min-w-0 flex-1 flex-col justify-center">

                    <div className="flex flex-wrap items-center gap-[9px]">

                        <h2 className="text-[30px] font-bold leading-tight text-[#310909]">
                            {trainingLog.title}
                        </h2>

                        <span className="text-[18px] text-gray-400">
                            •
                        </span>

                        <p className="text-[20px] text-gray-400">
                            {trainingLog.hours} hours
                        </p>

                    </div>

                    <p className="mt-[12px] text-[20px] font-semibold leading-tight text-[#a3a3a3]">
                        {animalName} - {animalBreed} - {userName}
                    </p>

                    <p className="mt-[27px] text-[20px] leading-tight text-black">
                        {trainingLog.description}
                    </p>

                </div>

                {onEdit && (
                    <button
                        onClick={onEdit}
                        aria-label="Edit training log"
                        className="flex h-[84px] w-[84px] shrink-0 items-center justify-center rounded-full bg-[#db1010] text-white transition-colors hover:bg-red-700"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-[43px] w-[43px]"
                        >
                            <path d="M16.862 3.487a2.25 2.25 0 0 1 3.182 3.182l-1.06 1.06-3.182-3.182 1.06-1.06ZM14.742 5.607 3.75 16.6V20.25H7.4L18.393 9.257l-3.65-3.65Z" />
                        </svg>
                    </button>
                )}

            </div>
        </div>
    );
}
