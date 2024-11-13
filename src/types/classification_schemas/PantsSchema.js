import EnumSpec from "@/types/EnumSpec";
import StringSpec from "@/types/StringSpec";

const PantsSchema = {
  style: EnumSpec.defineSchema(["jeans", "chinos", "cargo", "sweatpants", "trousers", "shorts"]),
  rise: EnumSpec.defineSchema(["low-rise", "mid-rise", "high-rise"]),
  fabric: EnumSpec.defineSchema(["cotton", "denim", "polyester", "wool", "linen", "nylon"]),
  pattern: EnumSpec.defineSchema(["solid", "striped", "checkered", "camo", "printed", "plain"]),
  closure_type: EnumSpec.defineSchema(["zipper", "button", "drawstring", "elastic"]),
  color: StringSpec.defineSchema(),
  graphic: StringSpec.defineSchema(),
};

export default PantsSchema;
