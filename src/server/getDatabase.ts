import { MongoClient, type Db } from "mongodb";

export const USERS_COLLECTION = "users";
export const ANIMALS_COLLECTION = "animals";
export const TRAINING_LOGS_COLLECTION = "trainingLogs";

let client: MongoClient | null = null;

export function getDatabase(): Db {
  if (client === null) {
    const databaseUrl = process.env.MONGODB_URI;
    if (!databaseUrl) {
      throw new Error("MONGODB_URI is missing from the .env file.");
    }
    client = new MongoClient(databaseUrl);
  }

  return client.db("animalTraining");
}
