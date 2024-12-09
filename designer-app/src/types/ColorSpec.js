import AbstractSpecType from "@/types/AbstractSpecType";
import chroma from "chroma-js";

/**
 * @extends {AbstractSpecType<VType>}
 * @typedef {CSSColor} VType
 */
export default class ColorSpec extends AbstractSpecType {
  /**
   * @param {VType} value
   * @param {CSSColor} defaultColor
   * @override
   */
  constructor(value = undefined, defaultColor = "#000") {
    super("ColorSpec", "string", defaultColor);

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
   * @param {CSSColor} defaultColor
   * @override
   */
  static defineSchema(defaultColor = "#000") {
    return new this(undefined, defaultColor).getSchema();
  }

  /**
   * @param {VType} value
   * @override
   */
  validate(value = this.default) {
    return chroma.valid(value) ? chroma(value).hex("rgb") : this.default;
  }

  /** @override */
  getSchema() {
    return {
      ...super.getSchema(),
    };
  }
}
