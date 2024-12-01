import { GarmentTypes } from "@/types/GarmentParser";
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

      const garmentClass = GarmentTypes[garmentType];
      assert(garmentClass !== undefined);
      return garmentClass;
    } catch (error) {
      console.error("Error generating garmentClassifierPrompt:", error);
      throw error;
    }
  }
}
