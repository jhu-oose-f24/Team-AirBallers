import AbstractGarment from "@/types/AbstractGarment";
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
    { name: "Color", spec: StringSpec.defineSchema() },
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

  constructor() {
    super(GarmentType.Pants, "Untitled Pants", Pants.SCHEMA);
  }

  /** @returns {SpecMap<typeof Pants>} */
  specMap() {
    // @ts-ignore
    return super.specMap();
  }
}
