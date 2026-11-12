import { readJsonOrThrow } from "@/lib/requests/readJsonOrThrow";
import type { User } from "@/types/models";

const ADMIN_USERS_ENDPOINT = "/api/admin/users";

export async function fetchAllUsers(): Promise<User[]> {
  const response = await fetch(ADMIN_USERS_ENDPOINT);
  return readJsonOrThrow(response, "Could not load users.");
}
