import AbstractSpecType from "@/types/AbstractSpecType";
import EnumSpec from "@/types/EnumSpec";
import MeasurementSpec from "@/types/MeasurementSpec";
import { GarmentType } from "@prisma/client";

/** @abstract */
export default class AbstractGarment {
  /** @type {BlankSpecSchema} */
  static SCHEMA = [];

  static SPEC_TYPES = {
    MeasurementSpec,
    EnumSpec,
    // add more here
  };

  name;
  type;
  specs;
  prompts;
  images;

  /**
   * @param {GarmentType} type
   * @param {string} name
   * @param {SpecSchema} schema
   * @param {import("@prisma/client").Garment["prompts"]} prompts
   * @param {import("@prisma/client").Garment["images"]} images
   */
  constructor(type, name, schema, prompts = [], images = []) {
    this.type = type;
    this.name = name;
    this.specs = AbstractGarment.parseSpecs(schema);
    this.prompts = prompts;
    this.images = images;
  }

  /** @param {NamedSpec["spec"]} spec */
  static parseSpec(spec) {
    /** @type {typeof AbstractSpecType} */
    const SpecType = AbstractGarment.SPEC_TYPES[spec?.["class"]];
    return SpecType?.from(spec);
  }

  /**
   * @param {SpecSchema} schema
   * @returns {DefinedSpecSchema}
   */
  static parseSpecs(schema) {
    return schema.map(({ name, spec }) => ({
      name,
      spec: AbstractGarment.parseSpec(spec),
    }));
  }

  static from(obj) {
    const { type, name, specs, prompts, images } = obj;

    /** @type {SpecSchema} */
    const schema = JSON.parse(specs);

    return new this(type, name, schema, prompts, images);
  }

  /** @param {SpecSchema} schema */
  setSpecs(schema) {
    this.specs = AbstractGarment.parseSpecs(schema);
  }

  addPrompt(text = "") {
    this.prompts.push({ text, createdAt: new Date() });
  }

  addImage(url = "") {
    this.images.push({ url, createdAt: new Date() });
  }

  /** @param {string} name */
  rename(name) {
    this.name = name;
  }

  serialize() {
    const { type, name, specs, prompts, images } = this;

    const serializedSpecs = specs.map(({ name, spec }) => ({
      name,
      spec: spec.serialize(),
    }));

    return {
      name,
      type,
      specs: JSON.stringify(serializedSpecs),
      prompts,
      images,
    };
  }

  getReadableSpecs() {
    const readable = this.specs.map(({ name, spec }) => {
      return `${name}: ${spec.readable()}`;
    });

    return readable.join("\n");
  }
}
