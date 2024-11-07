import GarmentSpecType from "@/types/GarmentSpecType";

/**
 * @extends {GarmentSpecType<VType>}
 * @typedef {string} VType
 */
export default class EnumSpec extends GarmentSpecType {
  /** @type {VType[]} */
  possibleValues = [];

  /**
   * @param {string[]} possibleValues
   * @param {VType} value
   * @override
   */
  constructor(possibleValues, value = undefined) {
    const initial = possibleValues.includes(value) && value;

    super("string", possibleValues[0], initial || possibleValues[0]);
    this.possibleValues = possibleValues;
  }

  /**
   * @param {VType} value
   * @override
   */
  validate(value) {
    return this.possibleValues.includes(value) ? value : this.default;
  }

  /**
   * @param {VType[]} possibleValues
   * @override
   */
  static defineSchema(possibleValues) {
    return new this(possibleValues).getSchema();
  }

  /** @override */
  getSchema() {
    return {
      ...super.getSchema(),
      possibleValues: [...this.possibleValues],
    };
  }
}
