import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type SidebarProps = {
    userName?: string;
    isAdmin?: boolean
};

export default function Sidebar({
    userName = "User",
    isAdmin = false,
}: SidebarProps) {
    const router = useRouter();
    const [currentName, setCurrentName] = useState(userName);
    const [admin, setAdmin] = useState(isAdmin);

    useEffect(() => {
        setCurrentName(
            sessionStorage.getItem("userName") || userName
        );

        const storedAdmin = sessionStorage.getItem("isAdmin");
        setAdmin(
            storedAdmin === null ? isAdmin : storedAdmin === "true"
        );
    }, [userName, isAdmin]);

    async function handleLogout() {
        try {
            const response = await fetch("/api/logout", {
                method: "POST"
            })

            if (!response.ok) {
                throw new Error("Logout failed.")
            }
            sessionStorage.removeItem("userId");
            sessionStorage.removeItem("userName");
            sessionStorage.removeItem("isAdmin");
            await router.push("/");
        } catch (error) {
            console.error("Logout error:", error);
            alert("Could not log out. Please try again.")
        }
    }

    const links = [
        { name: "Training Logs", href: "/training" },
        { name: "Animals", href: "/animals" },
    ];

    const adminLinks = [
        { name: "All Users", href: "/admin/users" },
        { name: "All Animals", href: "/admin/animals" },
        { name: "All Training Logs", href: "/admin/training" },
    ];

    return (
        <aside className="flex h-full min-h-0 w-64 shrink-0 flex-col overflow-y-auto bg-slate-900 p-5 text-white">
            <h2 className="mb-10 text-2xl font-bold">
                Animal Training
            </h2>

            <nav className="flex flex-col gap-2">
                {links.map((link) => (
                    <Link key={link.href} href={link.href} className={`rounded-lg px-4 py-3 transition ${
                        router.pathname === link.href ? "bg-blue-600" : "hover:bg-slate-700"
                    }`}
                    >
                        {link.name}
                    </Link>
                ))}

                {admin && (
                    <>
                        <p className="mt-6 px-4 text-xs font-semibold uppercase text-slate-400">
                            Admin
                        </p>

                        {adminLinks.map((link) => (
                            <Link key={link.href} href={link.href} className={`rounded-lg px-4 py-3 transition ${
                        router.pathname === link.href ? "bg-blue-600" : "hover:bg-slate-700"
                    }`}>
                        {link.name}
                    </Link>
                        ))}
                    </>
                )}
            </nav>

            <div className="mt-auto border-t border-slate-700 pt-5">
                <p className="font-semibold">{currentName}</p>
                <p className="mb-4 text-sm text-slate-400">
                    {admin ? "Admin" : "User"}
                </p>

                <button onClick={handleLogout} className="w-full rounded-lg bg-slate-700 px-4 py-3 text-left hover:bg-slate-600">
                    Log Out
                </button>
            </div>
        </aside>
    )
}