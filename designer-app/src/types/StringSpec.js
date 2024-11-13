import AbstractSpecType from "@/types/AbstractSpecType";

/**
 * @extends {AbstractSpecType<VType>}
 * @typedef {string} VType
 */
export default class StringSpec extends AbstractSpecType {
  /** @type {number} */
  minLength;

  /** @type {number} */
  maxLength;

  /**
   * @param {StringSpecOptions} options
   * @param {string} value
   */
  constructor(options = {}, value = undefined) {
    const { minLength = 0, maxLength = Number.MAX_SAFE_INTEGER } = options;

    super("string", "");

    this.minLength = minLength;
    this.maxLength = maxLength;
    this.setValue(value);
  }

  /**
   * @returns {typeof this.prototype}
   * @override
   */
  static from(obj) {
    return super.from(obj);
  }

  /**
   * @param {StringSpecOptions} options
   * @override
   */
  static defineSchema(options = {}) {
    return new this(options).getSchema();
  }

  /**
   * @param {VType} value
   * @override
   */
  validate(value = this.default) {
    const overMinLength = value?.length >= this.minLength;
    const underMaxLength = value?.length <= this.maxLength;
  
    return (overMinLength && underMaxLength) ? `${value}` : this.default;
  }

  /** @override */
  getSchema() {
    return {
      ...super.getSchema(),
      minLength: this.minLength,
      maxLength: this.maxLength,
    };
  }
}
