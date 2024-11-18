import AbstractGarment from "@/types/AbstractGarment";
import Pants from "@/types/garments/Pants";
import Shirt from "@/types/garments/Shirt";
import { GarmentType } from "@prisma/client";

/** @type {{ [G in GarmentType]: typeof AbstractGarment }} */
export const GarmentTypes = {
  Shirt,
  Pants,
  // add more here
};

export default class GarmentParser {
  /** @param {Garment} obj */
  static parse(obj) {
    const { type } = obj;

    return GarmentTypes[type]?.from(obj);
  }
}
