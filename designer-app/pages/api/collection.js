import { getServerSession } from "next-auth";
import { default as authOptions } from "../api/auth/[...nextauth]";
import prisma from "@/util/db";

export default async function handler(req, res) {
  // @ts-ignore
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const userId = session.user.id;

  if (req.method === "GET") {
    try {
      const collections = await prisma.collection.findMany({
        where: {
          userId: userId,
        },
        include: {
          garments: true, // Include garments if needed
        },
      });
      return res.status(200).json(collections);
    } catch (err) {
      return res.status(500).json({ error: "Failed to fetch collections", details: err });
    }
  }

  // Handle other HTTP methods
  res.setHeader("Allow", ["GET"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}