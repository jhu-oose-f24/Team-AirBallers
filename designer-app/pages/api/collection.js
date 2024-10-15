import ApiHandler from "@/app/util/ApiHandler";
import prisma from "@/app/util/db";

export default ApiHandler()
  .GET(async (req, res) => {
    try {
      const prompts = await prisma.prompt.findMany();
      res.status(200).json(prompts);
    } catch (err) {
      res.status(500).json(err);
    }
  })
  .build();
