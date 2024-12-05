import base64url from "base64url";

/** @type {BufferEncoding} */
const RAW_ENCODING = "hex";

export default class ItemToURL {
  /** @param {string} itemId */
  static encode(itemId) {
    if (!itemId) return null;

    return base64url.encode(itemId, RAW_ENCODING);
  }

  /** @param {string} itemIdURL */
  static decode(itemIdURL) {
    if (!itemIdURL) return null;

    return base64url.decode(itemIdURL, RAW_ENCODING);
  }
}
