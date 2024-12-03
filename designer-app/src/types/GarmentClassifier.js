import GarmentTypes from "@/types/GarmentTypes";
import PromptGenerator from "@/types/PromptGenerator";
import { assert } from "console";

/** @hideconstructor */
export default class GarmentClassifier {
  /**
   * @param {string} userPrompt
   * @returns {Promise<ValueOf<GarmentTypes>>}
   */
  static async classify(userPrompt) {
    try {
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
      throw error;
    }
  }
}
