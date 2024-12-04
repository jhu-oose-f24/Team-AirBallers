import {
  invalidInputError,
  promptGenerationError,
} from "@/responses/responses";
import GarmentTypes from "@/types/GarmentTypes";
import PromptGenerator from "@/types/PromptGenerator";
import { assert } from "console";

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

      assert(garmentType, "No applicable garment type");

      const garmentClass = GarmentTypes[garmentType];
      assert(
        garmentClass !== undefined,
        `${garmentType} not a valid garment type`,
      );

      return garmentClass;
    } catch (error) {
      console.error("Error classifying garment:", error);
      throw promptGenerationError(error);
    }
  }
}
