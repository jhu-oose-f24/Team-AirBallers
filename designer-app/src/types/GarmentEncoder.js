import base64url from "base64url";

/** @type {BufferEncoding} */
const RAW_ENCODING = "hex";

/** @param {string} itemId */
function validId(itemId) {
  return /^[0-9a-fA-F]{24}$/g.test(itemId);
}

export default class ItemToURL {
  /** @param {string} itemId */
  static encode(itemId) {
    if (!itemId) return null;
    if (!validId(itemId)) return null;

    return base64url.encode(itemId, RAW_ENCODING);
  }

  /** @param {string} itemIdURL */
  static decode(itemIdURL) {
    if (!itemIdURL) return null;

    const itemId = base64url.decode(itemIdURL, RAW_ENCODING);
    if (!validId(itemId)) return null;

    return base64url.decode(itemIdURL, RAW_ENCODING);
  }
}
