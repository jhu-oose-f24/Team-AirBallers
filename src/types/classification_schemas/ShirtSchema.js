import EnumSpec from "@/types/EnumSpec";
import StringSpec from "@/types/StringSpec";

const ShirtSchema = {
  fit: EnumSpec.defineSchema(["regular", "slim", "relaxed"]),
  sleeveLength: EnumSpec.defineSchema(["short-sleeve", "long-sleeve", "sleeveless"]),
  neckStyle: EnumSpec.defineSchema(["round-neck", "v-neck", "polo", "crew-neck",]),
  color: StringSpec.defineSchema(),
  fabric: EnumSpec.defineSchema(["cotton", "polyester", "blend", "wool", "linen", "silk"]),
  pattern: EnumSpec.defineSchema(["solid", "striped", "checkered", "graphic", "printed", "plain"]),
  graphic: StringSpec.defineSchema(),
};

export default ShirtSchema;
