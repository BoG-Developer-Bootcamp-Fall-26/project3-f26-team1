import type { NextApiRequest, NextApiResponse } from "next";
import { COOKIE_NAME } from "@/server/session";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).json({
            message: "Method not allowed."
        });
    }

    res.setHeader(
        "Set-Cookie",
        [
            `${COOKIE_NAME}=`,
            "HttpOnly",
            "Path=/",
            "SameSite=Lax",
            "Max-Age=0",
            ...(process.env.NODE_ENV === "production" ? ["Secure"] : []),
        ].join("; ")
    )

    return res.status(200).json({
        message: "Logged out successfully."
    })
}