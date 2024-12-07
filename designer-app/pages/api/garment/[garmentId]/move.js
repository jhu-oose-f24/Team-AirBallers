import ApiHandler from "@/util/ApiHandler";
import prisma from "@/util/db";
import { validateGarmentOwner } from "@/util/garmentAPI";
import { authMiddleware } from "@/util/middleware";

export default ApiHandler(authMiddleware)
  .PUT(async (req, res) => {
    /** @ts-ignore @type {string} */
    const userId = req.headers.userId;

    /** @ts-ignore @type {string} */
    const { garmentId } = req.query;

    /** @type {string} */
    const oldCollectionId = req.body.oldCollectionId;
    /** @type {string} */
    const newCollectionId = req.body.newCollectionId;

    try {
      const verified = await validateGarmentOwner(userId, garmentId);
      if (!verified) {
        return res.status(403).json({ message: "Content Not Accessible" });
      }

      const numMatchingGarments = await prisma.garment.count({
        where: {
          AND: [{ id: garmentId }, { collectionId: oldCollectionId }],
        },
      });

      if (numMatchingGarments < 1) {
        return res.status(403).json({ message: "Content Not Accessible" });
      }

      const oldCollection = await prisma.collection.findFirst({
        where: { id: oldCollectionId },
      });
      const newCollection = await prisma.collection.findFirst({
        where: { id: newCollectionId },
      });

      if (!oldCollection || !newCollection) {
        return res.status(403).json({ message: "Content Not Accessible" });
      }

      const garment = await prisma.garment.update({
        where: { id: garmentId },
        data: { collectionId: newCollectionId },
      });

      res.status(200).json(garment);
    } catch (err) {
      res.status(500).json(err);
      console.error("Error updating garment:", err);
    }
  })
  .build();
