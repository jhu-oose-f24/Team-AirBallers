import AbstractSpecType from "@/types/AbstractSpecType";

/**
 * @extends {AbstractSpecType<VType>}
 * @typedef {string} VType
 */
export default class EnumSpec extends AbstractSpecType {
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

  /** @returns {typeof this.prototype} */
  static from(obj) {
    return super.from(obj);
  }

  /**
   * @param {VType[]} possibleValues
   * @override
   */
  static defineSchema(possibleValues) {
    return new this(possibleValues).getSchema();
  }

  /**
   * @param {VType} value
   * @override
   */
  validate(value) {
    return this.possibleValues.includes(value) ? value : this.default;
  }

  /** @override */
  getSchema() {
    return {
      ...super.getSchema(),
      possibleValues: [...this.possibleValues],
    };
  }
}
