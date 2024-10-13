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
   * @param {number} value
   * @param {[number, number]} range
   * @param {Unit} unit
   */
  constructor(value, range, unit) {
    const [min, max] = range;
    const clampedValue = Math.min(Math.max(value, min), max);
    this.range = range;
    this.value = clampedValue;
    this.unit = unit;
  }

  static getSchema() {
    const number = typeof 0;
    const unitEnum = Object.values(UNIT).join(" | ");

    return {
      class: MeasurementSpec.name,
      value: number,
      range: [number, number],
      unit: unitEnum,
    };
  }
}
