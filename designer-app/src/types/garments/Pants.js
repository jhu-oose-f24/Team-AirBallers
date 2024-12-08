import AbstractGarment from "@/types/AbstractGarment";
import ColorSpec from "@/types/ColorSpec";
import EnumSpec from "@/types/EnumSpec";
import StringSpec from "@/types/StringSpec";
import { GarmentType } from "@prisma/client";

export default class Pants extends AbstractGarment {
  static SPEC_NAMES = /** @type {const} */ ([
    "Style",
    "Rise",
    "Closure Type",
    "Color",
    "Fabric",
    "Pattern",
    "Graphic",
  ]);

  /** @type {BlankSpecSchema} */
  static SCHEMA = [
    {
      name: "Style",
      spec: EnumSpec.defineSchema([
        "jeans",
        "chinos",
        "cargo",
        "sweatpants",
        "trousers",
        "shorts",
      ]),
    },
    {
      name: "Rise",
      spec: EnumSpec.defineSchema(["low-rise", "mid-rise", "high-rise"]),
    },
    {
      name: "Closure Type",
      spec: EnumSpec.defineSchema([
        "zipper",
        "button",
        "drawstring",
        "elastic",
      ]),
    },
    { name: "Color", spec: ColorSpec.defineSchema("#aaa") },
    {
      name: "Fabric",
      spec: EnumSpec.defineSchema([
        "cotton",
        "denim",
        "polyester",
        "wool",
        "linen",
        "nylon",
      ]),
    },
    {
      name: "Pattern",
      spec: EnumSpec.defineSchema([
        "solid",
        "striped",
        "checkered",
        "camo",
        "printed",
        "plain",
      ]),
    },
    { name: "Graphic", spec: StringSpec.defineSchema() },
  ];

  constructor(
    type = GarmentType.Pants,
    name = "Untitled Pants",
    schema = Pants.SCHEMA,
    prompts = [],
    images = [],
  ) {
    super(type, name, schema, prompts, images);
  }

  /** @returns {SpecMap<typeof Pants>} */
  specMap(specs = this.specs) {
    // @ts-ignore
    return super.specMap(specs);
  }
}
