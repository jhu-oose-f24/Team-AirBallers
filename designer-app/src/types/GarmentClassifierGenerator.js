import {
  invalidInputError,
  promptGenerationError,
} from "@/responses/responses";
import PromptGenerator from "@/types/PromptGenerator";

/** @hideconstructor */
export default class GarmentClassificationGenerator {
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
        PromptGenerator.ASSETS.CLASSIFIER(),
        userPrompt,
      );
    } catch (error) {
      console.error("Error generating garmentClassifierPrompt:", error);
      throw promptGenerationError(error);
    }
  }
}
