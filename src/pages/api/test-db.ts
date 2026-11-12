import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const client = await clientPromise;
        const db = client.db("animalTraining");

        await db.command({ ping: 1 });

        res.status(200).json({
            message: "MongoDB connected successfully!",
        });
    } catch (error) {
        console.error("MongoDB connectio error:", error);

        res.status(500).json({
            error: "Failed to connect to MongoDB",
        })
    }
}