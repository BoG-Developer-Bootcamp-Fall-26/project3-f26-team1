import type { NextApiRequest, NextApiResponse } from "next";
import argon2 from "argon2";
import clientPromise from "@/lib/mongodb";
import {
    COOKIE_NAME,
    createSessionToken,
} from "@/server/session"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { email, password } = req.body ?? {};

        if (typeof email !== "string" || typeof password !== "string" || !email.trim() || !password) {
            return res.status(400).json({
                error: "Email and password are required",
            })
        }

        const client = await clientPromise;
        const db = client.db("animalTraining");

        const user = await db.collection("users").findOne({
            email: email.trim().toLowerCase()
        })

        console.log("User found:", !!user);
        console.log("Has password hash:", typeof user?.password === "string");

        if (!user || typeof user.password !== "string") {
            return res.status(401).json({
                error: "Invalid email or password"
            })
        }

        const validPassword = await argon2.verify(
            user.password,
            password
        )
        console.log("Password valid:", validPassword);

        if (!validPassword) {
            return res.status(401).json({
                error: "Invali email or password",
            })
        }

        const token = await createSessionToken(
            user._id.toString()
        );

        const cookie = [`${COOKIE_NAME}=${encodeURIComponent(token)}`, "HttpOnly", "Path=/", "SameSite=Lax", "Max-Age=86400", ...(process.env.NODE_ENV === "production" ? ["Secure"] : []),].join("; ")

        res.setHeader("Set-Cookie", cookie);

        return res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id.toString(),
                fullName: user.fullName,
                email: user.email,
                admin: user.admin === true
            }
        })
    } catch (error) {
        console.error("Login verification error:", error);

        return res.status(500).json({
            error: "Internal server error"
        })
    }
}