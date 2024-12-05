import ApiHandler from "@/util/ApiHandler";
import prisma from "@/util/db";
import { authMiddleware } from "@/util/middleware";

const validateGarmentOwner = async (userId, garmentId) => {
  const garment = await prisma.garment.findFirst({
    where: { id: garmentId },
  });

  const collection = await prisma.collection.findFirst({
    where: {
      AND: [{ id: garment.collectionId }, { userId }],
    },
  });

  if (collection) return garment;
};

export default ApiHandler(authMiddleware)
  .GET(async (req, res) => {
    /** @ts-ignore @type {string} */
    const userId = req.headers.userId;

    /** @ts-ignore @type {string} */
    const { garmentId } = req.query;

    try {
      const garment = await validateGarmentOwner(userId, garmentId);

      if (!garment) {
        return res.status(403).json({ message: "Content Not Accessible" });
      }

      console.log(garment);

      res.status(200).json(garment);
    } catch (err) {
      res.status(500).json(err);
      console.error("Error getting garment:", err);
    }
  })
  .PUT(async (req, res) => {
    /** @ts-ignore @type {string} */
    const userId = req.headers.userId;

    /** @ts-ignore @type {string} */
    const { garmentId } = req.query;
    /** @type {ReturnType<GarmentInstance["serialize"]>} */
    const garment = req.body.garment;

    try {
      const verified = await validateGarmentOwner(userId, garmentId);
      if (!verified) {
        return res.status(403).json({ message: "Content Not Accessible" });
      }

      await prisma.garment.update({
        where: { id: garmentId },
        data: { ...garment },
      });

      res.status(200).json({ message: "Garment updated" });
    } catch (err) {
      res.status(500).json(err);
      console.error("Error updating garment:", err);
    }
  })
  .build();
