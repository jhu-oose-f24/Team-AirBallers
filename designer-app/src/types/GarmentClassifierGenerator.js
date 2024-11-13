import PromptGenerator from "@/types/PromptGenerator";

/** @hideconstructor */
export default class GarmentClassificationGenerator {
  /**
   * @param {string} userPrompt // TODO: use class
   * @returns {Promise<string>} // TODO: use class
   */
  static async createFrom(userPrompt) {
    try {
      return await PromptGenerator.generateFrom(
        PromptGenerator.ASSETS.CLASSIFIER(),
        userPrompt,
      );
    } catch (error) {
      console.error("Error generating garmentClassifierPrompt:", error);
      throw error;
    }
  }
}
