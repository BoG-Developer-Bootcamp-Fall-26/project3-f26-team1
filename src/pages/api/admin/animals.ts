
import type { NextApiRequest, NextApiResponse } from "next";
import { ANIMALS_COLLECTION, getDatabase } from "@/server/getDatabase";
import { requireAdmin } from "@/server/requireAdmin";

export default async function handleAdminAnimalsRequest(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method !== "GET") {
    response.setHeader("Allow", ["GET"]);
    response.status(405).json({ message: "Method not allowed." });
    return;
  }

  try {
    if (!(await requireAdmin(request))) {
      return response.status(403).json({
        message: "Admin access required."
      });
    }
    const animals = await getDatabase()
      .collection(ANIMALS_COLLECTION)
      .find({})
      .toArray();

    response.status(200).json(animals);
    }catch (error) {
    console.error(error);
    response.status(500).json({
        message: "Could not retrieve animals.",
        error: error instanceof Error ? error.message : String(error),
    });
}
}

