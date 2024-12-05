import ApiHandler from "@/util/ApiHandler";
import prisma from "@/util/db";
import { authMiddleware } from "@/util/middleware";

export default ApiHandler(authMiddleware)
  .GET(async (req, res) => {
    /** @ts-ignore @type {string} */
    const userId = req.headers.userId;

    /** @ts-ignore @type {string} */
    const { garmentId } = req.query;

    try {
      const garment = await prisma.garment.findFirst({
        where: { id: garmentId },
      });

      const collection = await prisma.collection.findFirst({
        where: {
          AND: [{ id: garment.collectionId }, { userId }],
        },
      });

      if (!collection) {
        return res.status(403).json({ message: "Content Not Accessible" });
      }

      res.status(200).json(garment);
    } catch (err) {
      res.status(500).json(err);
      console.error("Error getting garment:", err);
    }
  })
  .build();
