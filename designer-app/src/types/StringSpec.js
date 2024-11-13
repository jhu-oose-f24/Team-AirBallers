export default class StringSpec {
    /** @type {string} */
    value = null;
  
    /** @type {number} */
    minLength = 0;
  
    /** @type {number} */
    maxLength = Number.MAX_SAFE_INTEGER;
  
    /**
     * @param {Object} options
     * @param {number} [options.minLength=0]
     * @param {number} [options.maxLength=Number.MAX_SAFE_INTEGER]
     * @param {string} [options.value=undefined]
     */
    constructor(options = {}) {
      const { minLength = 0, maxLength = Number.MAX_SAFE_INTEGER, value } = options;
      
      this.minLength = minLength;
      this.maxLength = maxLength;
  
      if (typeof value === 'string' && 
          value.length >= minLength && 
          value.length <= maxLength) {
        this.value = value;
      }
    }
  
    /**
     * @param {Object} [options]
     * @param {number} [options.minLength]
     * @param {number} [options.maxLength]
     */
    static defineSchema(options = {}) {
      return new this(options).getSchema();
    }
  
    getSchema() {
      return {
        class: StringSpec.name,
        value: "string",
        minLength: this.minLength,
        maxLength: this.maxLength
      };
    }
  }