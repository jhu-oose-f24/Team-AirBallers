import PromptGenerator from "@/types/PromptGenerator";
import ShirtSchema from "@/types/classification_schemas/ShirtSchema";
import { format } from "prettier";

async function formatSchema(schema = {}) {
  return await format(JSON.stringify(schema), { parser: "json" });
}

/** @hideconstructor */
export default class SpecificationGenerator {
  /**
   * @param {string} description // TODO: use class
   * @returns {Promise<string>} // TODO: use class
   */
  static async createFrom(description) {
    try {
      const schemaStr = await formatSchema(ShirtSchema); // TODO: accept other schemas

      return await PromptGenerator.generateFrom(
        PromptGenerator.ASSETS.SPEC(schemaStr),
        description,
      );
    } catch (error) {
      console.error("Error generating GarmentSpecs:", error);
      throw error;
    }
  }
}
