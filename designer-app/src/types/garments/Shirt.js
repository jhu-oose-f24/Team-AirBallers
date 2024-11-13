import EnumSpec from "@/types/EnumSpec";
import AbstractGarment from "@/types/AbstractGarment";
import MeasurementSpec from "@/types/MeasurementSpec";

export default class Shirt extends AbstractGarment {
  static SCHEMA = [
    {
      name: "Sleeve Length",
      spec: MeasurementSpec.defineSchema(MeasurementSpec.UNIT.CM, [0, 50]),
    },
    {
      name: "Fit",
      spec: EnumSpec.defineSchema(["regular", "slim", "relaxed"]),
    },
  ];

  constructor() {
    super("Shirt", "Untitled Shirt", Shirt.SCHEMA);
  }
}
