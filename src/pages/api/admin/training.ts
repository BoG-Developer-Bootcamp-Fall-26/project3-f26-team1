import type { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import type { TrainingLogWithDetails } from "@/types/models";
import {
    getDatabase,
    TRAINING_LOGS_COLLECTION,
    ANIMALS_COLLECTION,
    USERS_COLLECTION,
} from "@/server/getDatabase";
import { getSessionUserId } from "@/server/session";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        return res.status(405).json({
            message: "Method not allowed."
        })
    }

    const userId = await getSessionUserId(req);

    if (!userId || !ObjectId.isValid(userId)) {
        return res.status(401).json({
            message: "Please log in."
        })
    }

    try {
        const db = getDatabase();

        const user = await db.collection(USERS_COLLECTION).findOne({
            _id: new ObjectId(userId)
        })

        if (!user || user.admin !== true) {
            return res.status(403).json({
                message: "Admin access required."
            })
        }

        const logs = await getAllTrainingLogs();

        return res.status(200).json(logs);
    } catch (error) {
        console.error("Admin training logs error:", error);

        return res.status(500).json({
            message: "Could not load training logs."
        })
    }
}

export async function getAllTrainingLogs():
    Promise<TrainingLogWithDetails[]> {
        const db = getDatabase();

        const logs = await db.collection(TRAINING_LOGS_COLLECTION).find({}).sort({ date: -1 }).toArray();

        const results: TrainingLogWithDetails[] = [];

        for (const log of logs) {
            const userId = new ObjectId(log.user.toString());
            const animalId = new ObjectId(log.animal.toString());

            const user = await db.collection(USERS_COLLECTION).findOne({ _id: userId });
            const animal = await db.collection(ANIMALS_COLLECTION).findOne({ _id: animalId });
            results.push({
                _id: log._id.toString(),
                title: log.title,
                date: new Date(log.date).toISOString(),
                description: log.description,
                hours: log.hours,
                user: {
                    _id: userId.toString(),
                    fullName: user?.fullName ?? "Unknown user",
                },
                animal: {
                    _id: animalId.toString(),
                    name: animal?.name ?? "Unknown animal",
                    breed: animal?.breed ?? "Unknown"
                },
            })
        }

        return results;
    }