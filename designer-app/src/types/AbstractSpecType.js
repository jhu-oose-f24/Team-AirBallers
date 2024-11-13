/**
 * @abstract
 * @template V
 */
export default class AbstractSpecType {
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

  /** @param {object | string} spec */
  static from(spec) {
    if (spec instanceof this) return spec;

    let parsed;
    if (typeof spec === "string") {
      parsed = JSON.parse(spec);
    }
    parsed = Object.setPrototypeOf(parsed, this.prototype);

    if (parsed.value === undefined) {
      parsed.setValue(parsed.default);
    }
    return parsed;
  }

  /** @param {...any} params */
  static defineSchema(...params) {
    return new this("undefined", undefined, ...params).getSchema();
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

  getSchema() {
    return {
      class: this.constructor.name,
      valueType: this.valueType,
      default: this.default,
      value: undefined,
    };
  }

  serialize() {
    return JSON.stringify({
      ...this.getSchema(),
      value: this.value,
    });
  }
}
