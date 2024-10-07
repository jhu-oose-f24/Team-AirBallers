import dotenv from "dotenv";
import PromptGenerator from "./PromptGenerator.js";

dotenv.config();

async function GenerateGarmentSpecs(userMessage) {
  const apiKey = process.env.OPENAI_API_KEY;
  const promptGenerator = new PromptGenerator(apiKey);

  const systemMessage = `You are an expert fashion designer tasked with listing out the specs of a garment given a brief description of the piece. For a garment, each spec is different depending on the piece being designed (i.e. a shirt will have different specs from a pair of pants). While generating the specs, make sure to follow the below formatting (keep in mind the below example is for a t-shirt)

                            <example1>
                            - Color: [insert hexadecimal value]
                            - Fit: [insert fit type]
                            - Graphic Print [if garment has graphic, do not add this is the garment does not]
                            - Fabric: [insert fabric details, if blend add in percentage of each fabric]
                            - Neckline: [insert neckline type]
                            - Length: [insert length]
                            - Sleeves: [insert sleeves length]
                            </example1>

                            When generating the specs, keep in mind this would be for a size U.S. Medium. Additionally, for any types of measurements, ensure that you gnerate using centimeters (cm) and include units when generating these values.`;

  try {
    const description = await promptGenerator.generatePrompt(
      systemMessage,
      userMessage,
    );
    return description;
  } catch (error) {
    console.error("Error generating garment specs:", error);
    throw error;
  }
}

export default GenerateGarmentSpecs;
