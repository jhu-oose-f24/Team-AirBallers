import ApiHandler from "@/util/ApiHandler";
import prisma from "@/util/db";
import { authMiddleware } from "@/util/middleware";

export default ApiHandler(authMiddleware)
  .GET(async (req, res) => {
    /** @ts-ignore @type {string} */
    const userId = req.headers.userId;

    try {
      const collections = await prisma.collection.findMany({
        where: {
          userId,
        },
        include: {
          garments: true, // Include garments if needed
        },
      });
      return res.status(200).json(collections);
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Failed to fetch collections", details: err });
    }
  })
  .POST(async (req, res) => {
    const userId = req.headers.userId;
    const { name, editable } = req.body;

    if (!userId) {
      console.log()
      //return res.status(400).json({ error: "UserId is required" });
    }
    //console.log("UserId:", userId);

    if (!name) {
      return res.status(400).json({ error: "Collection name is required." });
    }

    try {
      const newCollection = await prisma.collection.create({
        data: {
          name,
          editable: editable ?? false,
          userId,
        },
      });
      return res.status(201).json(newCollection);
    } catch (err) {
      return res.status(500).json({ error: "Failed to create collection", details: err });
    }
  })
  .PATCH(async (req, res) => {
    const { id, name, editable } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Collection ID is required." });
    }

    try {
      const updatedCollection = await prisma.collection.update({
        where: { id },
        data: {
          ...(name && { name }),
          ...(editable !== undefined && { editable }),
        },
      });
      return res.status(200).json(updatedCollection);
    } catch (err) {
      return res.status(500).json({ error: "Failed to update collection", details: err });
    }
  })
  .DELETE(async (req, res) => {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Collection ID is required." });
    }

    try {
      await prisma.collection.delete({ where: { id } });
      return res.status(204).end();
    } catch (err) {
      return res.status(500).json({ error: "Failed to delete collection", details: err });
    }
  })
  .build();
