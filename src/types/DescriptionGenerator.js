import PromptGenerator from "@/types/PromptGenerator";

/** @hideconstructor */
export default class DesctiptionGenerator {
  /**
   * @param {string} userPrompt // TODO: use class
   * @returns {Promise<string>} // TODO: use class
   */
  static async createFrom(userPrompt) {
    try {
      return await PromptGenerator.generateFrom(
        PromptGenerator.ASSETS.CREATIVE(),
        userPrompt,
      );
    } catch (error) {
      console.error("Error generating CreativePrompt:", error);
      throw error;
    }
  }
}
