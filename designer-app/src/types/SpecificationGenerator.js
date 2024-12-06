import { invalidInputError, specificationError } from "@/responses/responses";
import PromptGenerator from "@/types/PromptGenerator";
import { format as pretty } from "prettier";

function formatSchema(schema = {}) {
  try {
    return pretty(JSON.stringify(schema), { parser: "json" });
  } catch (error) {
    throw invalidInputError("Invalid schema format", {
      originalError: error.message,
    });
  }
}

/** @hideconstructor */
export default class SpecificationGenerator {
  /**
   * @param {string} description // TODO: use class
   * @param {BlankSpecSchema} schema
   * @throws {ApiErrorResponse}
   */
  static async createFrom(description, schema) {
    if (typeof description !== "string" || !description.trim()) {
      throw invalidInputError("Description must be a non-empty string");
    }

    if (!schema || typeof schema !== "object") {
      throw invalidInputError("Schema must be a valid object");
    }

    try {
      const schemaStr = await formatSchema(schema);

      return await PromptGenerator.generateFrom(
        PromptGenerator.ASSETS.SPEC(schemaStr),
        description,
      );
    } catch (error) {
      console.error("Error generating GarmentSpecs:", error);

      // If it's already an ApiErrorResponse, rethrow it
      if (error.code && error.status === "error") {
        throw error;
      }

      throw specificationError(error);
    }
  }
}
