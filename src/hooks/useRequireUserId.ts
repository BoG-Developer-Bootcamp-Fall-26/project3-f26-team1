import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { routes } from "@/lib/routes";

const USER_ID_KEY = "userId";

export function useRequireUserId(): string | null {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const savedUserId = window.sessionStorage.getItem(USER_ID_KEY);
    if (savedUserId === null) {
      router.replace(routes.login);
    } else {
      setUserId(savedUserId);
    }
  }, [router]);

  return userId;
}
