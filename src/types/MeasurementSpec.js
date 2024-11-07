import GarmentSpecType from "@/types/GarmentSpecType";

const UNIT = Object.freeze({
  MM: "mm",
  CM: "cm",
  INCH: "in",
  // define more if needed
});

/**
 * @extends {GarmentSpecType<VType>}
 * @typedef {number} VType
 *
 * @typedef {UNIT[keyof UNIT]} Unit
 *
 * @typedef {[number, number]} Range
 */
export default class MeasurementSpec extends GarmentSpecType {
  static UNIT = UNIT;

  /** @type {Range} */
  range = [null, null];

  /** @type {Unit} */
  unit = UNIT.CM;

  /**
   * @param {Unit} unit
   * @param {[number, number]} range
   * @param {VType} value
   * @override
   */
  constructor(unit, range, value = 0) {
    const [min, max] = range;
    const clampedValue = Math.min(Math.max(value, min), max);

    super(typeof clampedValue, 0, clampedValue);
    this.unit = unit;
    this.range = range;
  }

  /**
   * @param {VType} value
   * @override
   */
  validate(value) {
    const [min, max] = this.range;
    const clampedValue = Math.min(Math.max(value, min), max);

    return clampedValue;
  }

  /** @override */
  readable() {
    return `${this.value}${this.unit}`;
  }

  /**
   * @param {Unit} unit
   * @param {[number, number]} range
   * @override
   */
  static defineSchema(unit, range) {
    return new this(unit, range).getSchema();
  }

  /** @override */
  getSchema() {
    return {
      ...super.getSchema(),
      range: [...this.range],
      unit: this.unit,
    };
  }
}
