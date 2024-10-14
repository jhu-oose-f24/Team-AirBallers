const UNIT = Object.freeze({
  MM: "mm",
  CM: "cm",
  INCH: "in",
  // TODO: define more if needed
});

/**
 * @typedef {UNIT[keyof UNIT]} Unit
 *
 * @typedef {[number, number]} Range
 */
export default class MeasurementSpec {
  static UNIT = UNIT;

  /** @type {number} */
  value = 0;

  /** @type {Range} */
  range = [null, null];

  /** @type {Unit} */
  unit = UNIT.CM;

  /**
   * @param {Unit} unit
   * @param {[number, number]} range
   * @param {number} value
   */
  constructor(unit, range, value = undefined) {
    const [min, max] = range;
    const clampedValue = Math.min(Math.max(value, min), max);

    this.unit = unit;
    this.range = range;
    this.value = clampedValue;
  }

  /**
   * @param {Unit} unit
   * @param {[number, number]} range
   */
  static defineSchema(unit, range) {
    return new this(unit, range).getSchema();
  }

  getSchema() {
    return {
      class: MeasurementSpec.name,
      value: "number",
      range: [...this.range],
      unit: this.unit,
    };
  }
}
