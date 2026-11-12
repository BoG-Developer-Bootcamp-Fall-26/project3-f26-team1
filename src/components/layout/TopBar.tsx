import Image from "next/image";
import Link from "next/link";
import SearchBar from "@/components/layout/SearchBar";
import { routes } from "@/lib/routes";
import appLogo from "../../../public/images/appLogo.png";

interface TopBarProps {
  onSearchChange?: (newValue: string) => void;
}

export default function TopBar({ onSearchChange }: TopBarProps) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-16 border-b border-gray-300 bg-white px-6">
      <Link href={routes.trainingLogs} className="flex items-center gap-2">
        <Image src={appLogo} alt="" width={42} height={25} priority />
        <span className="text-2xl font-bold tracking-tight text-gray-900">Progress</span>
      </Link>

      {onSearchChange && <SearchBar onChange={onSearchChange} />}
    </header>
  );
}
