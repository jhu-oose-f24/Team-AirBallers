export default class EnumSpec {
  /** @type {string} */
  value = null;

  /** @type {string[]} */
  enumValues = [];

  /**
   * @param {string} value
   * @param {string[]} enumValues
   */
  constructor(enumValues, value = undefined) {
    this.enumValues = enumValues;
    if (enumValues.includes(value)) {
      this.value = value;
    }
  }

  /** @param {string[]} enumValues */
  static defineSchema(enumValues) {
    return new this(enumValues).getSchema();
  }

  getSchema() {
    return {
      class: EnumSpec.name,
      value: "string",
      enumValues: [...this.enumValues],
    };
  }
}
