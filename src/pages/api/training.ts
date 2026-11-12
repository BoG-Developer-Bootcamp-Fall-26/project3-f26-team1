import type { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import { ANIMALS_COLLECTION, getDatabase, TRAINING_LOGS_COLLECTION } from "@/server/getDatabase";
import { isDatabaseId, isFilledString, isZeroOrMore } from "@/server/validateInput";

export default async function handleTrainingRequest(request: NextApiRequest, response: NextApiResponse) {
  if (request.method === "POST") {
    await createTrainingLog(request, response);
    return;
  }

  if (request.method === "PATCH") {
    await updateTrainingLog(request, response);
    return;
  }

  response.status(405).json({ message: "Method not allowed." });
}

async function createTrainingLog(request: NextApiRequest, response: NextApiResponse) {
  const body = request.body || {};

  const inputProblem = findInputProblem(body);
  if (inputProblem) {
    response.status(400).json({ message: inputProblem });
    return;
  }

  const date = new Date(body.date);
  if (Number.isNaN(date.getTime())) {
    response.status(400).json({ message: "date must be a valid date." });
    return;
  }

  try {
    const animalProblem = await findAnimalProblem(body.animal, body.user);
    if (animalProblem) {
      response.status(400).json({ message: animalProblem });
      return;
    }

    const newLog = {
      user: new ObjectId(body.user),
      animal: new ObjectId(body.animal),
      title: body.title.trim(),
      date: date,
      description: body.description.trim(),
      hours: body.hours,
    };
    const result = await getDatabase().collection(TRAINING_LOGS_COLLECTION).insertOne(newLog);

    response.status(200).json({ ...newLog, _id: result.insertedId });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Could not create the training log." });
  }
}

async function updateTrainingLog(request: NextApiRequest, response: NextApiResponse) {
  const body = request.body || {};

  if (!isDatabaseId(body._id)) {
    response.status(400).json({ message: "_id must be a valid training log id." });
    return;
  }

  const inputProblem = findInputProblem(body);
  if (inputProblem) {
    response.status(400).json({ message: inputProblem });
    return;
  }

  try {
    const logs = getDatabase().collection(TRAINING_LOGS_COLLECTION);
    const logId = new ObjectId(body._id);

    const existingLog = await logs.findOne({ _id: logId });
    if (!existingLog) {
      response.status(400).json({ message: "The training log does not exist." });
      return;
    }

    if (existingLog.user.toString() !== body.user) {
      response.status(400).json({ message: "This training log does not belong to this user." });
      return;
    }

    const animalProblem = await findAnimalProblem(body.animal, body.user);
    if (animalProblem) {
      response.status(400).json({ message: animalProblem });
      return;
    }

    const changes = {
      animal: new ObjectId(body.animal),
      title: body.title.trim(),
      description: body.description.trim(),
      hours: body.hours,
    };
    const updatedLog = await logs.findOneAndUpdate({ _id: logId }, { $set: changes }, { returnDocument: "after" });

    response.status(200).json(updatedLog);
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Could not save the training log." });
  }
}

function findInputProblem(body: Record<string, unknown>): string | null {
  if (!isFilledString(body.title) || !isFilledString(body.description)) {
    return "title and description are required.";
  }

  if (!isZeroOrMore(body.hours)) {
    return "hours must be a number that is 0 or more.";
  }

  if (!isDatabaseId(body.user) || !isDatabaseId(body.animal)) {
    return "user and animal must be valid ids.";
  }

  return null;
}

async function findAnimalProblem(animalId: string, userId: string): Promise<string | null> {
  const animals = getDatabase().collection(ANIMALS_COLLECTION);

  const animal = await animals.findOne({ _id: new ObjectId(animalId) });
  if (!animal) {
    return "The animal does not exist.";
  }

  if (animal.owner.toString() !== userId) {
    return "This animal does not belong to this user.";
  }

  return null;
}
