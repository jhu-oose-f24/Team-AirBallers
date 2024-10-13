export default class EnumSpec {
  /** @type {string} */
  value = null;

  /** @type {string[]} */
  enumValues = [];

  /**
   * @param {string} value
   * @param {string[]} enumValues
   */
  constructor(value, enumValues) {
    this.enumValues = enumValues;
    if (enumValues.includes(value)) {
      this.value = value;
    }
  }

  static getSchema() {
    return {
      class: EnumSpec.name,
      value: "string",
      enumValues: "string[]",
    };
  }
}
