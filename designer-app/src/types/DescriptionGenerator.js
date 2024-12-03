import {
  invalidInputError,
  promptGenerationError,
} from "@/responses/responses";
import PromptGenerator from "@/types/PromptGenerator";

/** @hideconstructor */
export default class DescriptionGenerator {
  /**
   * @param {string} userPrompt // TODO: use class
   * @returns {Promise<string>} // TODO: use class
   * @throws {ApiErrorResponse}
   */
  static async createFrom(userPrompt) {
    if (
      !userPrompt ||
      typeof userPrompt !== "string" ||
      userPrompt.trim() === ""
    ) {
      throw invalidInputError("User prompt must be a non-empty string");
    }

    try {
      return await PromptGenerator.generateFrom(
        PromptGenerator.ASSETS.CREATIVE(),
        userPrompt,
      );
    } catch (error) {
      console.error("Error generating CreativePrompt:", error);
      throw promptGenerationError(error);
    }
  }
}
