import ApiHandler from "@/util/ApiHandler";
import prisma from "@/util/db";
import { authMiddleware } from "@/util/middleware";

export default ApiHandler(authMiddleware)
  .POST(async (req, res) => {
    /** @ts-ignore @type {string} */
    const userId = req.headers.userId;

    const { name, editable = true } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Collection name is required." });
    }

    try {
      const user = await prisma.user.findFirst({ where: { id: userId } });

      const newCollection = await prisma.collection.create({
        data: {
          name,
          editable,
          userId: user.id,
        },
      });

      return res.status(201).json(newCollection);
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Failed to create collection", details: err });
    }
  })
  .build();
