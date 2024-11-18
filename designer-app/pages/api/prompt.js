import EditableDescriptionGenerator from "@/types/EditableDescriptionGenerator";
import Shirt from "@/types/garments/Shirt";
import ImageGenerator from "@/types/ImageGenerator";
import SpecificationGenerator from "@/types/SpecificationGenerator";
import ApiHandler from "@/util/ApiHandler";
import prisma from "@/util/db";

export default ApiHandler()
  .POST(async (req, res) => {
    /** @type {string} */ // TODO: use class
    const userPrompt = req.body?.prompt;
    const editor = new EditableDescriptionGenerator(); // TODO: refactor

    try {
      const description = await editor.generateInitialDescription(userPrompt);
      const { images } = await ImageGenerator.createFrom(description);

      const specs = await SpecificationGenerator.createFrom(
        userPrompt,
        Shirt.SCHEMA,
      );

      /** @type {string} */
      const url = images?.[0]?.url;

      // TODO: different users
      let [user] = await prisma.user.findMany();

      // TODO: different collections
      let [collection] = await prisma.collection.findMany({
        where: { userId: user.id },
      });

      const garment = await prisma.garment.create({
        data: {
          collectionId: collection.id,
          name: "Custom Red Shirt",
          type: "Shirt",
          specs,
          prompts: [{ text: userPrompt }],
          images: [{ url }],
        },
      });

      res.status(200).json({ garment });
    } catch (err) {
      res.status(500).json(err);
      console.error("Error creating prompt:", err);
    }
  })
  .build();
