import ApiHandler from "@/util/ApiHandler";
import prisma from "@/util/db";
import { authMiddleware } from "@/util/middleware";

export default ApiHandler(authMiddleware)
  .GET(async (req, res) => {
    /** @ts-ignore @type {string} */
    const userId = req.headers.userId;

    /** @ts-ignore @type {string} */
    const collectionId = req.query.collectionId;

    try {
      const collection = await prisma.collection.findFirst({
        where: {
          userId,
          id: collectionId,
        },
        include: {
          garments: true, // Include garments if needed
        },
      });
      return res.status(200).json(collection);
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Failed to fetch collections", details: err });
    }
  })
  .PUT(async (req, res) => {
    const { name, editable } = req.body;

    /** @ts-ignore @type {string} */
    const collectionId = req.query.collectionId;

    if (!collectionId) {
      return res.status(400).json({ error: "Collection ID is required." });
    }

    try {
      const updatedCollection = await prisma.collection.update({
        where: { id: collectionId },
        data: {
          ...(name && { name }),
          ...(editable !== undefined && { editable }),
        },
      });
      res.status(200).json(updatedCollection);
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Failed to update collection", details: err });
    }
  })
  .DELETE(async (req, res) => {
    /** @ts-ignore @type {string} */
    const collectionId = req.query.collectionId;

    if (!collectionId) {
      return res.status(400).json({ error: "Collection ID is required." });
    }

    try {
      await prisma.collection.delete({ where: { id: collectionId } });
      res.status(204).end();
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Failed to delete collection", details: err });
    }
  })
  .build();
