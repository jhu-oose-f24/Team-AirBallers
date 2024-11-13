import GarmentClassificationGenerator from "@/types/GarmentClassifierGenerator";
import Pants from "@/types/garments/Pants";
import Shirt from "@/types/garments/Shirt";

export default class GarmentSchemaSelector {
  /**
   * Processes the user input and returns the appropriate schema
   *
   * @param {string} userInput - The user's garment description
   */
  static async selectSchema(userInput) {
    try {
      const classification =
        await GarmentClassificationGenerator.createFrom(userInput);
      return this.getSchemaForGarment(classification);
    } catch (error) {
      console.error("Error selecting garment schema:", error);
      throw error;
    }
  }

  /**
   * Selects the appropriate schema based on the garment classification
   *
   * @param {string} type - The garment type
   * @returns {SpecSchema} - The corresponding schema
   * @throws {Error} - If the classification is invalid
   */
  static getSchemaForGarment(type) {
    const normalizedClassification = type.toLowerCase().trim();

    // TODO: simplify with garment type map
    switch (normalizedClassification) {
      case "shirt":
        return Shirt.SCHEMA;
      case "pants":
        return Pants.SCHEMA;
      default:
        throw new Error(
          `Invalid garment type: ${type}`,
        );
    }
  }
}
