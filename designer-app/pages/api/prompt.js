import DesctiptionGenerator from "@/app/types/DescriptionGenerator";
import ImageGenerator from "@/app/types/ImageGenerator";
import ApiHandler from "@/app/util/ApiHandler";

export default ApiHandler()
  .POST(async (req, res) => {
    /** @type {string} */ // TODO: use class
    const userPrompt = req.body?.prompt;

    try {
      const description = await DesctiptionGenerator.createFrom(userPrompt);
      const { images } = await ImageGenerator.createFrom(description);

      res.status(200).json(images[0]);
    } catch (err) {
      res.status(500).json(err);
    }
  })
  .build();
