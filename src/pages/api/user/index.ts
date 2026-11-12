import type { NextApiRequest, NextApiResponse } from "next";
import argon2 from "argon2";
import clientPromise from "@/lib/mongodb";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { fullName, email, password } = req.body ?? {};

        if (typeof fullName !== "string" || typeof email !== "string" || typeof password !== "string" || !fullName.trim() || !email.trim() || password.length < 8) {
            return res.status(400).json({
                error: "Valid name, email and password (8+ characters) are required",
            })
        }

        const client = await clientPromise;
        const db = client.db("animalTraining");

        const users = db.collection("users");

        const normalizedEmail = email.trim().toLowerCase();

        const existingUser = await users.findOne({
            email: normalizedEmail,
        });

        if (existingUser) {
            return res.status(409).json({
                error: "An account with this email already exists"
            })
        }

        const hashedPassword = await argon2.hash(password);

        const result = await users.insertOne({
            fullName: fullName.trim(),
            email: normalizedEmail,
            password: hashedPassword,
            admin: false
        })

        return res.status(200).json({
            message: "Account created successfully",
            userId: result.insertedId.toString()
        })
    } catch (error) {
        console.error("Singup error:", error);

        return res.status(500).json({
            error: "Failed to create account"
        })
    }
}