import AbstractGarment from "@/types/AbstractGarment";
import ColorSpec from "@/types/ColorSpec";
import EnumSpec from "@/types/EnumSpec";
import StringSpec from "@/types/StringSpec";
import { GarmentType } from "@prisma/client";

export default class Shirt extends AbstractGarment {
  static SPEC_NAMES = /** @type {const} */ ([
    "Sleeve Length",
    "Fit",
    "Neck Style",
    "Color",
    "Neck Color",
    "Sleeve Color",
    "Color",
    "Fabric",
    "Pattern",
    "Graphic",
  ]);

  /** @type {BlankSpecSchema} */
  static SCHEMA = [
    {
      name: "Sleeve Length",
      spec: EnumSpec.defineSchema([
        "short-sleeve",
        "long-sleeve",
        "sleeveless",
      ]),
    },
    {
      name: "Fit",
      spec: EnumSpec.defineSchema(["regular", "slim", "relaxed"]),
    },
    {
      name: "Neck Style",
      spec: EnumSpec.defineSchema([
        "round-neck",
        "v-neck",
        "polo",
        "crew-neck",
      ]),
    },
    { name: "Color", spec: ColorSpec.defineSchema("white") },
    { name: "Neck Color", spec: ColorSpec.defineSchema("gray") },
    { name: "Sleeve Color", spec: ColorSpec.defineSchema("gray") },
    {
      name: "Fabric",
      spec: EnumSpec.defineSchema([
        "cotton",
        "polyester",
        "blend",
        "wool",
        "linen",
        "silk",
      ]),
    },
    {
      name: "Pattern",
      spec: EnumSpec.defineSchema([
        "solid",
        "striped",
        "checkered",
        "graphic",
        "printed",
        "plain",
      ]),
    },
    { name: "Graphic", spec: StringSpec.defineSchema() },
  ];

  constructor(
    type = GarmentType.Shirt,
    name = "Untitled Shirt",
    schema = Shirt.SCHEMA,
    prompts = [],
    images = [],
  ) {
    super(type, name, schema, prompts, images);
  }

  /** @returns {SpecMap<typeof Shirt>} */
  specMap(specs = this.specs) {
    // @ts-ignore
    return super.specMap(specs);
  }
}
