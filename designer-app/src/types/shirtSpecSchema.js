import EnumSpec from "@/types/EnumSpec";
import MeasurementSpec from "@/types/MeasurementSpec";

const ShirtSchema = {
  sleeveLength: MeasurementSpec.defineSchema(MeasurementSpec.UNIT.CM, [0, 50]),
  fit: EnumSpec.defineSchema(["regular", "slim", "relaxed"]),
};

export default ShirtSchema;
