import {
  classificationError,
  invalidInputError,
  schemaError,
} from "@/responses/responses";
import GarmentClassificationGenerator from "@/types/GarmentClassifierGenerator";
import Pants from "@/types/garments/Pants";
import Shirt from "@/types/garments/Shirt";

export default class GarmentSchemaSelector {
  /**
   * Processes the user input and returns the appropriate schema
   *
   * @param {string} userInput - The user's garment description
   * @throws {ApiErrorResponse}
   */
  static async selectSchema(userInput) {
    if (
      !userInput ||
      typeof userInput !== "string" ||
      userInput.trim() === ""
    ) {
      throw invalidInputError("User input must be a non-empty string");
    }

    try {
      const classification =
        await GarmentClassificationGenerator.createFrom(userInput);
      return this.getSchemaForGarment(classification);
    } catch (error) {
      console.error("Error selecting garment schema:", error);
      throw classificationError(error);
    }
  }

  /**
   * Selects the appropriate schema based on the garment classification
   *
   * @param {string} type - The garment type
   * @returns {SpecSchema} - The corresponding schema
   * @throws {ApiErrorResponse}
   */
  static getSchemaForGarment(type) {
    if (!type || typeof type !== "string") {
      throw invalidInputError("Garment type must be a non-empty string");
    }

    const normalizedClassification = type.toLowerCase().trim();

    // TODO: simplify with garment type map
    switch (normalizedClassification) {
      case "shirt":
        return Shirt.SCHEMA;
      case "pants":
        return Pants.SCHEMA;
      default:
        throw schemaError(type);
    }
  }
}
