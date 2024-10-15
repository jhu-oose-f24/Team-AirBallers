import PromptGenerator from "@/app/types/PromptGenerator";
import * as fal from "@fal-ai/serverless-client";

/** @hideconstructor */
export default class ImageGenerator {
  /** @param {string} description // TODO: use class */
  static async createFrom(description, model = "fal-ai/flux/schnell") {
    const prePrompt = PromptGenerator.ASSETS.IMAGE();

    try {
      const result = await fal.subscribe(model, {
        input: {
          prompt: `${prePrompt}\n${description}`,
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
      console.error("Error generating GarmentImage:", error);
      throw error;
    }
  }
}
