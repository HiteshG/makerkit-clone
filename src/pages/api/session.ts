import type { NextApiRequest, NextApiResponse } from "next";
import admin from "@/lib/firebaseAdmin";
import { setCookie, deleteCookie } from "cookies-next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const auth = admin.auth();

  if (req.method === "POST") {
    const idToken = req.body.idToken.toString();
    const expiresIn = 60 * 60 * 24 * 5 * 1000;

    try {
      const decodedIdToken = await auth.verifyIdToken(idToken);

      if (new Date().getTime() - decodedIdToken.auth_time < 5 * 60 * 1000) {
        res.status(404).json({ error: "Recent sign in required!" });
      }

      const sessionCookie = await auth.createSessionCookie(idToken, {
        expiresIn,
      });

      setCookie("sessionId", sessionCookie, {
        req,
        res,
        maxAge: expiresIn,
        httpOnly: true,
        secure: true,
      });

      res.status(200).json({ message: "Session cookie created" });
    } catch (error) {
      res.status(500).json({ error: "Error creating session cookie" });
    }
  }
  if (req.method === "DELETE") {
    try {
      deleteCookie("sessionId", { req, res });
      res.status(200).json({ message: "Session cookie deleted" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting session cookie" });
    }
  }
}
