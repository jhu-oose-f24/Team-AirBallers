import GarmentTypes from "@/types/GarmentTypes";
import ImageGenerator from "@/types/ImageGenerator";
import ApiHandler from "@/util/ApiHandler";
import prisma from "@/util/db";
import { validateGarmentOwner } from "@/util/garmentAPI";
import { authMiddleware } from "@/util/middleware";

export default ApiHandler(authMiddleware)
  .PATCH(async (req, res) => {
    /** @ts-ignore @type {string} */
    const userId = req.headers.userId;
    /** @ts-ignore @type {string} */
    const { garmentId } = req.query;

    try {
      const verified = await validateGarmentOwner(userId, garmentId);
      if (!verified) {
        return res.status(403).json({ message: "Content Not Accessible" });
      }

      const garment = await prisma.garment.findFirst({
        where: { id: garmentId },
      });

      if (!garment?.visualizing) {
        generateVisualization(garment);

        await prisma.garment.update({
          where: { id: garmentId },
          data: {
            visualizing: true,
          },
        });
      }

      return res.status(202).json({
        status: "processing",
        message: "Visualization started",
        garmentId,
      });
    } catch (err) {
      res.status(500).json(err);
      console.error("Error visualizing:", err);
    }
  })
  .GET(async (req, res) => {
    /** @ts-ignore @type {string} */
    const userId = req.headers.userId;
    /** @ts-ignore @type {string} */
    const { garmentId } = req.query;

    try {
      const verified = await validateGarmentOwner(userId, garmentId);
      if (!verified) {
        return res.status(403).json({ message: "Content Not Accessible" });
      }

      const garment = await prisma.garment.findFirst({
        where: { id: garmentId },
      });

      if (garment?.visualizing) {
        return res.status(202).json({
          status: "processing",
          message: "Visualization generation started",
          garmentId,
        });
      }

      res.status(200).json(garment);
    } catch (err) {
      res.status(500).json(err);
      console.error("Error visualizing:", err);
    }
  })
  .build();

/** @param {Garment} garment */
async function generateVisualization(garment) {
  try {
    const readableSpecs = GarmentTypes[garment?.type]
      ?.from(garment)
      ?.getReadableSpecs();

    const generated = await ImageGenerator.createFrom(readableSpecs);
    const newImage = generated?.images?.[0]?.url;

    if (newImage) {
      await prisma.garment.update({
        where: { id: garment.id },
        data: {
          visualizing: false,
          images: [...(garment.images || []), { url: newImage }],
        },
      });
    }
  } catch (error) {
    console.error("Error in generation process:", error);
  }
}
