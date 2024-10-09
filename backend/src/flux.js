import * as fal from "@fal-ai/serverless-client";
import dotenv from "dotenv";

dotenv.config();
const preprompt = ` Let the image be just the t-shirt, 
                    on a constrast background (depending on the t shirt color). 
                    Make sure the t-shirt is fully visiable as to be put on a designer website.`

async function generateImage(prompt) {
  try {
    const result = await fal.subscribe("fal-ai/flux/schnell", {
      input: {
        prompt: preprompt + " " + prompt,
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          update.logs.map((log) => log.message).forEach(console.log);
        }
      },
    });

    return {
      images: result.images.map((img) => ({
        url: img.url,
        content_type: img.content_type,
      })),
      timings: result.timings,
      seed: result.seed,
      has_nsfw_concepts: result.has_nsfw_concepts,
      prompt: result.prompt,
    };
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
}

// Example usage:
// const prompt = "A beautiful sunset over the ocean";
// generateImage(prompt)
//   .then(result => console.log(result))
//   .catch(error => console.error(error));

export default generateImage;
