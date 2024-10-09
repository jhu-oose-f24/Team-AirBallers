import PromptGenerator from "@/app/types/PromptGenerator";

/** @hideconstructor */
export default class SpecificationGenerator {
  /**
   * @param {string} description // TODO: use class
   * @returns {Promise<string>} // TODO: use class
   */
  static async createFrom(description) {
    try {
      return await PromptGenerator.generateFrom(
        PromptGenerator.PROMPT_ASSET.SPEC,
        description,
      );
    } catch (error) {
      console.error("Error generating GarmentSpecs:", error);
      throw error;
    }
  }
}
