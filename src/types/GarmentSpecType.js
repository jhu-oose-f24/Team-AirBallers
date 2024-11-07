/**
 * @abstract
 * @template V
 */
export default class GarmentSpecType {
  value;
  default;
  valueType;

  /**
   * @param {string} valueType
   * @param {V} defaultValue
   * @param {V} value
   */
  constructor(valueType, defaultValue, value = undefined) {
    this.value = value;
    this.valueType = valueType || typeof value;
    this.default = defaultValue;
  }

  /** @param {V} value */
  validate(value) {
    return value;
  }

  /** @param {V} value */
  setValue(value) {
    this.value = this.validate(value);
  }

  readable() {
    return `${this.value}`;
  }

  /** @returns {typeof this.prototype} */
  static from(obj = {}) {
    const parsed = Object.setPrototypeOf(obj, this.prototype);

    if (parsed.value === undefined) {
      parsed.setValue(parsed.default);
    }
    return parsed;
  }

  serialize() {
    return JSON.stringify({
      ...this.getSchema(),
      value: this.value,
    });
  }

  /** @param {...any} params */
  static defineSchema(...params) {
    return new this("undefined", undefined, ...params).getSchema();
  }

  getSchema() {
    return {
      class: this.constructor.name,
      valueType: this.valueType,
      default: this.default,
    };
  }
}
