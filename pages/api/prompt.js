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
      let [user] = await prisma.user.findMany();

      if (!user) {
        user = await prisma.user.create({
          data: {
            name: "Fabio Fernandez",
            email: "fabiofartist@gmail.com",
            emailVerified: new Date(),
            image: "http://some.url.com/pfp",
            collections: {
              create: [{ name: "Drafts", editable: false }],
            },
          },
        });
      }

      const [collection] = await prisma.collection.findMany({
        where: { userId: user.id },
      });

      const garment = await prisma.garment.create({
        data: {
          collectionId: collection.id,
          name: "Custom Red Shirt",
          type: "Shirt",
          specs: JSON.stringify({ sleeveLength: "Hehe" }),
          prompts: [{ text: userPrompt }],
          images: [{ url }],
        },
      });

      res.status(200).json({ url, id: garment.id });
    } catch (err) {
      res.status(500).json(err);
      console.error("Error creating prompt:", err);
    }
  })
  .build();
