import EditableDescriptionGenerator from "@/types/EditableDescriptionGenerator";
import ImageGenerator from "@/types/ImageGenerator";
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

      /** @type {string} */
      const url = images?.[0]?.url;

      // TODO: different users
      const [user] = await prisma.user.findMany();

      // TODO: is it necessary to create separate objects for spec & image?
      const promptImage = await prisma.promptGarmentImage.create({
        data: { imageURL: url },
      });
      const promptSpec = await prisma.promptGarmentSpec.create({
        data: { description },
      });

      const newPrompt = await prisma.prompt.create({
        data: {
          userId: user.id,
          originalPrompt: userPrompt,
          generatedPrompt: description,
          imageURL: url,
          garmentSpecId: promptSpec.id,
          garmentImageId: promptImage.id,
        },
      });

      res.status(200).json({ url, id: newPrompt.id });
    } catch (err) {
      res.status(500).json(err);
    }
  })
  .build();
