import type { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/layout/TopBar";

interface SharedLayoutProps {
  pageTitle: string;
  headerAction?: ReactNode;
  onSearchChange?: (newValue: string) => void;
  children: ReactNode;
}

export default function SharedLayout({ pageTitle, headerAction, onSearchChange, children }: SharedLayoutProps) {
  return (
    <div className="flex h-screen flex-col bg-white">
      <TopBar onSearchChange={onSearchChange} />

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex flex-1 flex-col overflow-y-auto">
          <div className="flex h-14 shrink-0 items-center justify-between border-b border-gray-300 px-8">
            <h1 className="text-lg text-gray-600">{pageTitle}</h1>
            {headerAction}
          </div>

          <div className="flex-1 px-8 py-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
