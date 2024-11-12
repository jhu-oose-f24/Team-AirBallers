import EnumSpec from "@/types/EnumSpec";
import MeasurementSpec from "@/types/MeasurementSpec";

/** @type {SpecSchema} */
const ShirtSchema = [
  {
    name: "Sleeve Length",
    spec: MeasurementSpec.defineSchema(MeasurementSpec.UNIT.CM, [0, 50]),
  },
  {
    name: "Fit",
    spec: EnumSpec.defineSchema(["regular", "slim", "relaxed"]),
  },
];

export default ShirtSchema;
