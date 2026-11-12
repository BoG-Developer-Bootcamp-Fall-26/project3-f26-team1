import { readJsonOrThrow } from "@/lib/requests/readJsonOrThrow";
import type { Animal } from "@/types/models";

const ANIMAL_ENDPOINT = "/api/animal";

export interface NewAnimalInput {
  name: string;
  breed: string;
  owner: string;
  hoursTrained: number;
  profilePicture: string;
}

export async function createAnimal(input: NewAnimalInput): Promise<Animal> {
  const response = await fetch(ANIMAL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return readJsonOrThrow(response, "Could not create the animal.");
}

export async function addAnimalHours(animalId: string, hoursToAdd: number): Promise<Animal> {
  const response = await fetch(ANIMAL_ENDPOINT, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ _id: animalId, hoursToAdd: hoursToAdd }),
  });
  return readJsonOrThrow(response, "Could not update the animal's hours.");
}
