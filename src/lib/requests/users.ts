import { readJsonOrThrow } from "@/lib/requests/readJsonOrThrow";
import type { User } from "@/types/models";

const ADMIN_USERS_ENDPOINT = "/api/admin/users";
const VERIFY_ENDPOINT = "/api/user/verify";

export async function logInUser(email: string, password: string): Promise<void> {
  const response = await fetch(VERIFY_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Invalid email or password.");
  }

  const data = await response.json();
  sessionStorage.setItem("userId", data.user.id);
  sessionStorage.setItem("userName", data.user.fullName);
  sessionStorage.setItem("isAdmin", String(data.user.admin));
}

export async function fetchAllUsers(): Promise<User[]> {
  const response = await fetch(ADMIN_USERS_ENDPOINT);
  return readJsonOrThrow(response, "Could not load users.");
}
