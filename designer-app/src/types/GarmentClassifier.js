import { classificationError, invalidInputError } from "@/responses/responses";
import GarmentTypes from "@/types/GarmentTypes";
import PromptGenerator from "@/types/PromptGenerator";

/** @hideconstructor */
export default class GarmentClassifier {
  /**
   * @param {string} userPrompt
   * @returns {Promise<ValueOf<GarmentTypes>>}
   * @throws {ApiErrorResponse}
   */
  static async classify(userPrompt) {
    try {
      if (typeof userPrompt !== "string" || !userPrompt.trim()) {
        throw invalidInputError("User prompt must be a non-empty string");
      }

      const garmentType = await PromptGenerator.generateFrom(
        PromptGenerator.ASSETS.CLASSIFY(),
        userPrompt,
      );

      /** @type {ValueOf<GarmentTypes>} */
      const garmentClass = GarmentTypes[garmentType];
      if (!garmentClass?.SCHEMA) {
        throw new Error("Garment type unknown");
      }

      return garmentClass;
    } catch (error) {
      console.error("Error classifying garment:", error);
      throw classificationError(error);
    }
  }
}
