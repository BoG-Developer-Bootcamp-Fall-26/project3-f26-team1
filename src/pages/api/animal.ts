import type { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import { ANIMALS_COLLECTION, getDatabase, USERS_COLLECTION } from "@/server/getDatabase";
import { isDatabaseId, isFilledString, isNumber, isZeroOrMore } from "@/server/validateInput";

export default async function handleAnimalRequest(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === "POST") {
    await createAnimal(request, response);
    return;
  }

  if (request.method === "PATCH") {
    await addAnimalHours(request, response);
    return;
  }

  response.status(405).json({ message: "Method not allowed." });
}

async function addAnimalHours(request: NextApiRequest, response: NextApiResponse) {
  const body = request.body || {};

  if (!isDatabaseId(body._id)) {
    response.status(400).json({ message: "_id must be a valid animal id." });
    return;
  }

  if (!isNumber(body.hoursToAdd)) {
    response.status(400).json({ message: "hoursToAdd must be a number." });
    return;
  }

  try {
    const animals = getDatabase().collection(ANIMALS_COLLECTION);

    const updatedAnimal = await animals.findOneAndUpdate(
      { _id: new ObjectId(body._id) },
      { $inc: { hoursTrained: body.hoursToAdd } },
      { returnDocument: "after" },
    );
    if (!updatedAnimal) {
      response.status(400).json({ message: "The animal does not exist." });
      return;
    }

    response.status(200).json(updatedAnimal);
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Could not update the animal." });
  }
}

async function createAnimal(request: NextApiRequest, response: NextApiResponse) {
  const body = request.body || {};

  if (!isFilledString(body.name) || !isFilledString(body.breed) || !isFilledString(body.profilePicture)) {
    response.status(400).json({ message: "name, breed and profilePicture are required." });
    return;
  }

  if (!isZeroOrMore(body.hoursTrained)) {
    response.status(400).json({ message: "hoursTrained must be a number that is 0 or more." });
    return;
  }

  if (!isDatabaseId(body.owner)) {
    response.status(400).json({ message: "owner must be a valid user id." });
    return;
  }

  try {
    const database = getDatabase();
    const ownerId = new ObjectId(body.owner);

    const owner = await database.collection(USERS_COLLECTION).findOne({ _id: ownerId });
    if (!owner) {
      response.status(400).json({ message: "The owner does not exist." });
      return;
    }

    const newAnimal = {
      name: body.name.trim(),
      breed: body.breed.trim(),
      owner: ownerId,
      hoursTrained: body.hoursTrained,
      profilePicture: body.profilePicture.trim(),
    };
    const result = await database.collection(ANIMALS_COLLECTION).insertOne(newAnimal);

    response.status(200).json({ ...newAnimal, _id: result.insertedId });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Could not create the animal." });
  }
}
