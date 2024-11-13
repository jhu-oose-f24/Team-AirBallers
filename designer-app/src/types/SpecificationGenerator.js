import PromptGenerator from "@/types/PromptGenerator";
import { format as pretty } from "prettier";

function formatSchema(schema = {}) {
  return pretty(JSON.stringify(schema), { parser: "json" });
}

/** @hideconstructor */
export default class SpecificationGenerator {
  /**
   * @param {string} description // TODO: use class
   * @param {BlankSpecSchema} schema
   */
  static async createFrom(description, schema) {
    try {
      const schemaStr = await formatSchema(schema);

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
