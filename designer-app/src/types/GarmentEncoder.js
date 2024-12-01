import base64url from "base64url";

/** @type {BufferEncoding} */
const RAW_ENCODING = "hex";

export default class GarmentEncoder {
  /** @param {Garment} garment */
  static encode(garment) {
    if (!garment?.id) return null;

    return base64url.encode(garment.id, RAW_ENCODING);
  }

  /** @param {string} garmentURL */
  static decode(garmentURL) {
    if (!garmentURL) return null;

    return base64url.decode(garmentURL, RAW_ENCODING);
  }
}
