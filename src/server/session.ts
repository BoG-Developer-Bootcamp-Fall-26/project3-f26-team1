import { SignJWT, jwtVerify } from "jose";
import type { NextApiRequest } from "next";

const COOKIE_NAME = "animal_training_session";

function getSecret() {
    const secret = process.env.SESSION_SECRET;

    if (!secret || secret.length < 32) {
        throw new Error("SESSION_SECRET must be at least 32 characters.");
    }

    return new TextEncoder().encode(secret)
}

export async function createSessionToken(userId: string) {
    return new SignJWT({ userId }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("1d").sign(getSecret());
}

export async function getSessionUserId(
    req: NextApiRequest
): Promise<string | null> {
    const token = req.cookies[COOKIE_NAME];

    if (!token) return null;

    try {
        const { payload } = await jwtVerify(token, getSecret(), {
            algorithms: ["HS256"]
        });

        return typeof payload.userId === "string" ? payload.userId : null;
    } catch {
        return null;
    }
}

export { COOKIE_NAME };