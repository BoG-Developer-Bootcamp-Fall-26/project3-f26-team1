import type { User } from "@/types/models";

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  const initial = user.fullName.charAt(0).toUpperCase();
  const roleLabel = user.admin ? "Admin" : "User";

  return (
    <article className="flex items-center gap-3 rounded-lg bg-white px-4 py-3 shadow-md">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-red text-lg font-bold text-white">
        {initial}
      </div>

      <div className="min-w-0">
        <p className="truncate text-sm font-bold text-gray-900">{user.fullName}</p>
        <p className="truncate text-xs text-gray-500">
          {roleLabel} • {user.email}
        </p>
      </div>
    </article>
  );
}
