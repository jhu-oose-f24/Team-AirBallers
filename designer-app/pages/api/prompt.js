import EditableDescriptionGenerator from "@/types/EditableDescriptionGenerator";
import ImageGenerator from "@/types/ImageGenerator";
import ApiHandler from "@/util/ApiHandler";
import prisma from "@/util/db";
import { ObjectId } from "mongodb";

const DEFAULT_COLLECTION_ID = new ObjectId("64a7f5f5f5f5f5f5f5f5f5f5"); // Example default ID

export default ApiHandler()
  .POST(async (req, res) => {
    const userPrompt = req.body?.prompt;
    const collectionId = req.body?.collectionId || DEFAULT_COLLECTION_ID.toString(); // Use generated ID
    const editor = new EditableDescriptionGenerator();

    try {
      const description = await editor.generateInitialDescription(userPrompt);
      const { images } = await ImageGenerator.createFrom(description);
      const url = images?.[0]?.url;

      const [user] = await prisma.user.findMany();

      // Upsert the default collection only if it doesn't exist
      const defaultCollection = await prisma.garmentCollection.upsert({
        where: { id: collectionId },
        create: { id: collectionId, userId: user.id },
        update: {},
      });

      // Create image and spec entries
      const promptImage = await prisma.promptGarmentImage.create({
        data: { imageURL: url },
      });
      const promptSpec = await prisma.promptGarmentSpec.create({
        data: { description },
      });

      // Save the prompt to the specified collection
      const newPrompt = await prisma.prompt.create({
        data: {
          userId: user.id,
          originalPrompt: userPrompt,
          generatedPrompt: description,
          imageURL: url,
          garmentSpecId: promptSpec.id,
          garmentImageId: promptImage.id,
          garmentCollectionId: collectionId,
        },
      });

      res.status(200).json({ url, id: newPrompt.id });
    } catch (err) {
      res.status(500).json({ error: "Error creating prompt" });
      console.error("Error creating prompt:", err);
    }
  })
  .build();
