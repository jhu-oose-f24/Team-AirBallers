import AbstractGarment from "@/types/AbstractGarment";
import EnumSpec from "@/types/EnumSpec";
import StringSpec from "@/types/StringSpec";
import { GarmentType } from "@prisma/client";

export default class Shirt extends AbstractGarment {
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
    { name: "Color", spec: StringSpec.defineSchema() },
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

  constructor() {
    super(GarmentType.Shirt, "Untitled Shirt", Shirt.SCHEMA);
  }
}
