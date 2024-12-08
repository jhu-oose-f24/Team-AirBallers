import GarmentClassifier from "@/types/GarmentClassifier";
import SpecificationGenerator from "@/types/SpecificationGenerator";
import ApiHandler from "@/util/ApiHandler";
import prisma from "@/util/db";
import { authMiddleware } from "@/util/middleware";

export default ApiHandler(authMiddleware)
  .POST(async (req, res) => {
    /** @ts-ignore @type {string} */
    const userId = req.headers.userId;

    /** @type {string} */ // TODO: use class
    const userPrompt = req.body?.prompt;

    try {
      const Garment = await GarmentClassifier.classify(userPrompt);

      const specValues = await SpecificationGenerator.createFrom(
        userPrompt,
        Garment.SCHEMA,
      );

      const generatedGarment = new Garment();
      generatedGarment.parseValues(JSON.parse(specValues));
      generatedGarment.addPrompt(userPrompt);

      let user = await prisma.user.findFirst({ where: { id: userId } });

      let collection = await prisma.collection.findFirst({
        where: {
          AND: [{ userId: user.id }, { name: "Drafts" }, { editable: false }],
        },
      });

      if (!collection) {
        collection = await prisma.collection.create({
          data: {
            userId: user.id,
            name: "Drafts",
            editable: false,
          },
        });
      }

      const garment = await prisma.garment.create({
        data: {
          collectionId: collection.id,
          ...generatedGarment.serialize(),
        },
      });

      await prisma.collection.update({
        where: { id: collection.id },
        data: {
          garments: {
            connect: { id: garment.id },
          },
        },
      });

      res.status(200).json(garment);
    } catch (err) {
      res.status(500).json(err);
      console.error("Error creating prompt:", err);
    }
  })
  .build();
