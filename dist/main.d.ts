interface NumberOptionsInterface {
    min?: number;
    max?: number;
    precision?: number;
}
/**
 * Object returned by decomposeString function
 *
 * @typedef {Object} NumberOptions
 * @property {number} min Minimum value of range
 * @property {number} max Maximum value of range
 * @property {number} precision Precision of accuracy
 */
declare class Random {
    private readonly mersenne;
    constructor(seed?: number | number[]);
    initSeed(this: Random, seed: number): void;
    /**
     * Takes an array and returns a random element of the array
     *
     * @method random.arrayElement
     * @since 1.2.0
     * @param {Array} array
     * @returns {*} Returns a random array element.
     * @example
     * ```javascript
     * random.arrayElement([1,2,3])
     * // => 2
     *
     * random.arrayElement()
     * // => 'a'
     * ```
     */
    arrayElement<T>(array?: Array<T>): T | string;
    /**
     * Returns a single random number based on a max number or range
     *
     * @method random.number
     * @since 1.0.0
     * @param {number|NumberOptions} options
     * @returns {number} Returns the generated number.
     * @example
     * ```javascript
     * random.number(100)
     * // => 10
     *
     * random.number({min:10, max:20, precision:1})
     * // => 15
     * ```
     */
    number(options?: number | NumberOptionsInterface): number;
    /**
   * Returns a single random floating-point number based on a max number or range
   *
   * @method random.float
   * @param {number|NumberOptions} options
   * @since 1.2.0
   * @returns {number} Returns the generated float.
   * @example
   * ```javascript
   * random.float(100)
   * // => 10
   *
   * random.float({min:10, max:20, precision:1})
   * // => 15
   * ```
   */
    float(options?: number | NumberOptionsInterface): number;
    /**
     * Generate a random boolean
     *
     * @method random.boolean
     * @since 1.2.0
     * @returns {boolean} Returns the generated boolean.
     * @example
     * ```javascript
     * random.boolean()
     * // => true
     *
     * random.boolean()
     * // => false
     * ```
     */
    boolean(this: Random): boolean;
    /**
     * Generate a uuid.
     *
     * @method random.uuid
     * @since 1.1.0
     * @returns {string} Returns the generated uuid.
     * @example
     * ```javascript
     * random.uuid()
     * // => 49e71c40-9b21-4371-9699-2def33f62e66
     *
     * random.uuid()
     * // => da94f128-4247-48e3-bc73-d0cae46b5093
     * ```
     */
    uuid(this: Random): string;
    private replacePlaceholders;
    private rand;
}/**
 *
 * @namespace faker.random
 */
/**
 * takes an array and returns a subset with random elements of the array
 *
 * @method faker.random.arrayElements
 * @param {array} array
 * @param {number} count number of elements to pick
 */
/**
 * takes an object and returns the randomly key or value
 *
 * @method faker.random.objectElement
 * @param {object} object
 * @param {mixed} field
 */
/**
 * randomWords
 *
 * @method faker.random.words
 * @param {number} count defaults to a random value between 1 and 3
 */
/**
 * locale
 *
 * @method faker.random.image
 */
/**
 * locale
 *
 * @method faker.random.locale
 */
/**
 * alpha. returns lower/upper alpha characters based count and upcase options
 *
 * @method faker.random.alpha
 * @param {mixed} options // defaults to { count: 1, upcase: false }
 */
/**
 * alphaNumeric
 *
 * @method faker.random.alphaNumeric
 * @param {number} count defaults to 1
 */
/**
 * hexaDecimal
 *
 * @method faker.random.hexaDecimal
 * @param {number} count defaults to 1
 */

export { Random };
