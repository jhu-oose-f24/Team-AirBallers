/**
 * @abstract
 * @template V
 */
export default class AbstractSpecType {
  /** @type {keyof SpecTypes} */
  type;

  value;
  default;
  valueType;

  /**
   * @param {string} valueType
   * @param {V} defaultValue
   * @param {any[]} otherParams
   */
  constructor(valueType, defaultValue, ...otherParams) {
    // @ts-ignore
    this.type = this.constructor.name;
    this.valueType = valueType;
    this.default = defaultValue;
  }

  /** @param {object | string} spec */
  static from(spec) {
    if (spec instanceof this) return spec;

    let parsed = spec;
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

  /** @param {V | any} value */
  setValue(value) {
    this.value = this.validate(value);
  }

  readable() {
    return `${this.value}`;
  }

  getSchema() {
    return {
      type: this.type,
      valueType: this.valueType,
      default: this.default,
    };
  }

  serialize() {
    return JSON.stringify({
      ...this.getSchema(),
      value: this.value,
    });
  }
}
