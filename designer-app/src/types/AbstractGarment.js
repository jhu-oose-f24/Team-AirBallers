import AbstractSpecType from "@/types/AbstractSpecType";
import SpecTypes from "@/types/SpecTypes";
import { GarmentType } from "@prisma/client";

/** @abstract */
export default class AbstractGarment {
  type;

  name;
  specs;
  prompts;
  images;

  /**
   * @param {GarmentType} type
   * @param {string} name
   * @param {SpecSchema} schema
   * @param {GarmentPrompt[]} prompts
   * @param {GarmentImage[]} images
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
    let parsed = spec;

    if (typeof spec === "string") {
      parsed = JSON.parse(spec);
    }

    /** @type {typeof AbstractSpecType} */
    const SpecType = SpecTypes[parsed?.["type"]];
    return SpecType?.from(parsed);
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

  /** @param {Partial<Garment>} obj */
  static from(obj) {
    const { type, name, specs, prompts, images } = obj;

    return new this(type, name, JSON.parse(specs), prompts, images);
  }

  /** @param {{ [k: string]: any }} specValues */
  parseValues(specValues) {
    this.specs = this.specs.map(({ name, spec }) => {
      spec.setValue(specValues[name]);
      return { name, spec };
    });
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

  specMap() {
    return this.specs.reduce((prev, spec) => {
      prev[spec.name] = spec.spec;
      return prev;
    }, {});
  }

  getReadableSpecs() {
    const specs = this.specs.map(({ name, spec }) => {
      return ` - ${name}: ${spec.readable()}`;
    });

    return [`${this.type} specifications:`, ...specs].join("\n");
  }
}
