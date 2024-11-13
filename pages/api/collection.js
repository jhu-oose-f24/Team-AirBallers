import ApiHandler from "@/util/ApiHandler";
import prisma from "@/util/db";

export default ApiHandler()
  .GET(async (req, res) => {
    try {
      const prompts = await prisma.collection.findMany();
      res.status(200).json(prompts);
    } catch (err) {
      res.status(500).json(err);
    }
  })
  .build();
