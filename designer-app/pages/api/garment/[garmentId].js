import ApiHandler from "@/util/ApiHandler";
import prisma from "@/util/db";
import { validateGarmentOwner } from "@/util/garmentAPI";
import { authMiddleware } from "@/util/middleware";

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
  .DELETE(async (req, res) => {
    /** @ts-ignore @type {string} */
    const userId = req.headers.userId;

    /** @ts-ignore @type {string} */
    const { garmentId } = req.query;

    try {
      const verified = await validateGarmentOwner(userId, garmentId);
      if (!verified) {
        return res.status(403).json({ message: "Content Not Accessible" });
      }

      await prisma.garment.delete({
        where: { id: garmentId },
      });

      res.status(200).json({ message: "Garment removed" });
    } catch (err) {
      res.status(500).json(err);
      console.error("Error removing garment:", err);
    }
  })
  .build();
