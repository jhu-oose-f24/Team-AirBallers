import ShirtSchema from "@/types/classification_schemas/ShirtSchema";
import PantsSchema from "@/types/classification_schemas/PantsSchema";
import GarmentClassificationGenerator from "@/types/GarmentClassifierGenerator";

export default class GarmentSchemaSelector {
    /**
     * Selects the appropriate schema based on the garment classification
     * @param {string} classification - The garment classification (either "Shirt" or "Pants")
     * @returns {Object} - The corresponding schema
     * @throws {Error} - If the classification is invalid
     */
    static getSchemaForGarment(classification) {
      const normalizedClassification = classification.toLowerCase().trim();
      
      switch (normalizedClassification) {
        case "Shirt":
          return ShirtSchema;
        case "Pants":
          return PantsSchema;
        default:
          throw new Error(`Invalid garment classification: ${classification}. Expected "Shirt" or "Pants".`);
      }
    }
  
    /**
     * Processes the user input and returns the appropriate schema
     * @param {string} userInput - The user's garment description
     * @returns {Promise<Object>} - The selected schema
     */
    static async selectSchema(userInput) {
      try {
        const classification = await GarmentClassificationGenerator.createFrom(userInput);
        return this.getSchemaForGarment(classification);
      } catch (error) {
        console.error("Error selecting garment schema:", error);
        throw error;
      }
    }
  }