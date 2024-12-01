import GarmentClassifier from "@/types/GarmentClassifier";
import SpecificationGenerator from "@/types/SpecificationGenerator";
import ApiHandler from "@/util/ApiHandler";
import prisma from "@/util/db";

export default ApiHandler()
  .POST(async (req, res) => {
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

      // TODO: different users
      let [user] = await prisma.user.findMany();

      // TODO: different collections
      let [collection] = await prisma.collection.findMany({
        where: { userId: user.id },
      });

      const garment = await prisma.garment.create({
        data: {
          collectionId: collection.id,
          ...generatedGarment.serialize(),
        },
      });

      res.status(200).json({ garment });
    } catch (err) {
      res.status(500).json(err);
      console.error("Error creating prompt:", err);
    }
  })
  .build();
