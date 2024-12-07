import {
  apiError,
  imageGenerationError,
  invalidInputError,
} from "@/responses/responses";
import PromptGenerator from "@/types/PromptGenerator";
import * as fal from "@fal-ai/serverless-client";

/** @hideconstructor */
export default class ImageGenerator {
  /**
   * @param {string} description
   * @param {string} model
   * @throws {ApiErrorResponse}
   */
  static async createFrom(description, model = "fal-ai/flux-pro/v1.1-ultra") {
    if (
      !description ||
      typeof description !== "string" ||
      description.trim() === ""
    ) {
      throw invalidInputError("Description must be a non-empty string");
    }

    const prePrompt = PromptGenerator.ASSETS.IMAGE();
    const fullPrompt = `${prePrompt}\n${description}`;

    try {
      const result = await fal.subscribe(model, {
        input: {
          prompt: fullPrompt,
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
      if (error.message.includes("Invalid prompt")) {
        throw imageGenerationError(error);
      }
      throw apiError(error);
    }
  }
}
