/**
 * Standard error response format for the API
 *
 * @typedef {Object} ApiErrorResponse
 * @property {string} status - Error status (always 'error')
 * @property {string} message - Human-readable error message
 * @property {string} code - Error code for client handling
 * @property {Object} [details] - Additional error details
 */

/** Error codes for different types of failures */
export const ERROR_CODES = {
  INVALID_INPUT: "INVALID_INPUT",
  PROMPT_GENERATION_FAILED: "PROMPT_GENERATION_FAILED",
  CLASSIFICATION_FAILED: "CLASSIFICATION_FAILED",
  SCHEMA_ERROR: "SCHEMA_ERROR",
  IMAGE_GENERATION_FAILED: "IMAGE_GENERATION_FAILED",
  SPECIFICATION_FAILED: "SPECIFICATION_FAILED",
  API_ERROR: "API_ERROR",
  UNKNOWN_ERROR: "UNKNOWN_ERROR",
};

/**
 * Creates a standardized error response object
 *
 * @param {string} message - Error message
 * @param {string} code - Error code from ERROR_CODES
 * @param {Object} [details] - Additional error details
 * @returns {ApiErrorResponse}
 */
const createErrorResponse = (message, code, details = null) => ({
  status: "error",
  message,
  code,
  ...(details && { details }),
});

/**
 * Handles invalid input errors
 *
 * @param {string} message - Specific validation error message
 * @param {Object} [details] - Validation details
 */
export const invalidInputError = (message, details = null) =>
  createErrorResponse(
    message || "Invalid input provided",
    ERROR_CODES.INVALID_INPUT,
    details,
  );

/**
 * Handles prompt generation errors
 *
 * @param {Error} error - Original error object
 */
export const promptGenerationError = (error) =>
  createErrorResponse(
    "Failed to generate prompt",
    ERROR_CODES.PROMPT_GENERATION_FAILED,
    { originalError: error.message },
  );

/**
 * Handles garment classification errors
 *
 * @param {Error} error - Original error object
 */
export const classificationError = (error) =>
  createErrorResponse(
    "Failed to classify garment",
    ERROR_CODES.CLASSIFICATION_FAILED,
    { originalError: error.message },
  );

/**
 * Handles schema-related errors
 *
 * @param {string} type - Invalid garment type
 */
export const schemaError = (type) =>
  createErrorResponse(
    `Invalid garment type: ${type}`,
    ERROR_CODES.SCHEMA_ERROR,
    { invalidType: type },
  );

/**
 * Handles image generation errors
 *
 * @param {Error} error - Original error object
 */
export const imageGenerationError = (error) => {
  if (error.message.includes("Invalid prompt")) {
    return createErrorResponse(
      "Invalid prompt for image generation",
      ERROR_CODES.IMAGE_GENERATION_FAILED,
      { originalError: error.message },
    );
  }
  return createErrorResponse(
    "Failed to generate image",
    ERROR_CODES.IMAGE_GENERATION_FAILED,
    { originalError: error.message },
  );
};

/**
 * Handles specification generation errors
 *
 * @param {Error} error - Original error object
 */
export const specificationError = (error) =>
  createErrorResponse(
    "Failed to generate specifications",
    ERROR_CODES.SPECIFICATION_FAILED,
    { originalError: error.message },
  );

/**
 * Handles general API errors
 *
 * @param {Error} error - Original error object
 */
export const apiError = (error) =>
  createErrorResponse("An API error occurred", ERROR_CODES.API_ERROR, {
    originalError: error.message,
  });

/**
 * Handles unknown/unexpected errors
 *
 * @param {Error} error - Original error object
 */
export const unknownError = (error) =>
  createErrorResponse(
    "An unexpected error occurred",
    ERROR_CODES.UNKNOWN_ERROR,
    { originalError: error.message },
  );
