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

      // Start the generation process asynchronously
      generateVisualization(garmentId);

      // Return immediately with 202 Accepted
      return res.status(202).json({ 
        status: "processing",
        message: "Visualization generation started",
        garmentId 
      });
    } catch (err) {
      res.status(500).json(err);
      console.error("Error initiating visualization:", err);
    }
  })
  .build();

async function generateVisualization(garmentId) {
  try {
    const garment = await prisma.garment.findFirst({
      where: { id: garmentId },
    });

    const readableSpecs = GarmentTypes[garment?.type]
      ?.from(garment)
      ?.getReadableSpecs();

    const generated = await ImageGenerator.createFrom(readableSpecs);
    const newImage = generated?.images?.[0]?.url;

    if (newImage) {
      await prisma.garment.update({
        where: { id: garmentId },
        data: {
          images: {
            push: {
              url: newImage,
              createdAt: new Date().toISOString()
            }
          }
        }
      });
    }
  } catch (error) {
    console.error("Error in generation process:", error);
  }
}

  