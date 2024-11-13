import EnumSpec from "@/types/EnumSpec";
import AbstractSpecType from "@/types/GarmentSpecType";
import MeasurementSpec from "@/types/MeasurementSpec";

/** @abstract */
export default class AbstractGarment {
  /** @type {BlankSpecSchema} */
  static SCHEMA = [];

  static SPEC_TYPES = {
    MeasurementSpec,
    EnumSpec,
    // add more here
  };

  /** @type {string} */
  name;

  // TODO: use from prisma schema
  /** @typedef {"Shirt" | "Pants"} GarmentType */

  /** @type {GarmentType} */
  type;

  /** @type {DefinedSpecSchema} */
  specs;

  /**
   * @param {GarmentType} type
   * @param {string} name
   * @param {SpecSchema} schema
   */
  constructor(type, name, schema = AbstractGarment.SCHEMA) {
    this.type = type;
    this.name = name;
    this.specs = AbstractGarment.parseSpecs(schema);
  }

  /** @param {NamedSpec["spec"]} spec */
  static parseSpec(spec) {
    /** @type {typeof AbstractSpecType} */
    const SpecType = AbstractGarment.SPEC_TYPES[spec?.["class"]];
    return SpecType?.from(spec);
  }

  /** @param {SpecSchema} schema */
  static parseSpecs(schema) {
    return schema.map(({ name, spec }) => ({
      name,
      spec: AbstractGarment.parseSpec(spec),
    }));
  }

  static from({ type, name, specs = "" }) {
    /** @type {SpecSchema} */
    const schema = JSON.parse(specs);

    return new this(type, name, schema);
  }

  /** @param {SpecSchema} schema */
  setSpecs(schema) {
    this.specs = AbstractGarment.parseSpecs(schema);
  }

  /** @param {string} name */
  rename(name) {
    this.name = name;
  }

  serialize() {
    const { type, name, specs } = this;

    const serializedSpecs = specs.map(({ name, spec }) => ({
      name,
      spec: spec.serialize(),
    }));

    return {
      type,
      name,
      specs: JSON.stringify(serializedSpecs),
    };
  }

  getReadableSpecs() {
    const readable = this.specs.map(({ name, spec }) => {
      return `${name}: ${spec.readable()}`;
    });

    return readable.join("\n");
  }
}
