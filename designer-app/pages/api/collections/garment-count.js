import ApiHandler from "@/util/ApiHandler";
import prisma from "@/util/db";
import { authMiddleware } from "@/util/middleware";

export default ApiHandler(authMiddleware)
  .GET(async (req, res) => {
    /** @ts-ignore @type {string} */
    const userId = req.headers.userId;

    try {
      let rawCollections = await prisma.collection.findMany({
        where: { userId },
        include: {
          _count: {
            select: { garments: true },
          },
        },
      });

      const collections = rawCollections.map(({ _count, ...collection }) => ({
        ...collection,
        numGarments: _count?.garments || 0,
      }));

      return res.status(200).json(collections);
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Failed to fetch collections", details: err });
    }
  })
  .build();
