import { ObjectId } from "mongodb";
import { getDatabase, USERS_COLLECTION } from "./getDatabase";
import { getSessionUserId } from "./session";
import { NextApiRequest } from "next";

export async function requireAdmin(
    req: NextApiRequest
): Promise<boolean> {
    const userId = await getSessionUserId(req);

    if (!userId || !ObjectId.isValid(userId)) {
        return false;
    }

    const db = getDatabase();

    const user = await db.collection(USERS_COLLECTION).findOne({
        _id: new ObjectId(userId)

    })
    return user?.admin === true;
}