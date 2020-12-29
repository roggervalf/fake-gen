declare class Internet {
    private readonly random;
    constructor(seed?: number | number[]);
    initSeed(this: Internet, seed: number): void;
    /**
     * Generates a random avatar image uri
     * @method internet.avatar
     * @since 1.3.0
     * @returns {string} Returns a random image uri.
     * @example
     * ```javascript
     * internet.avatar()
     * // => 'https://randomuser.me/api/portraits/women/87.jpg',
     *
     * internet.avatar()
     * // => 'https://randomuser.me/api/portraits/women/15.jpg',
     * ```
     */
    avatar(): string;
    /**
     * Generates a random ip
     * @method internet.ip
     * @since 1.4.0
     * @returns {string} Returns a random ip.
     * @example
     * ```javascript
     * internet.ip()
     * // => '255.255.255.255',
     *
     * internet.ip()
     * // => '0.0.0.0',
     * ```
     */
    ip(): string;
    /**
     * Returns a random protocol
     * @method internet.protocol
     * @since 1.4.0
     * @returns {string} Returns a random protocol [http, https].
     * @example
     * ```javascript
     * internet.protocol()
     * // => 'https',
     *
     * internet.protocol()
     * // => 'http',
     * ```
     */
    protocol(): string;
}

interface NumberOptionsInterface {
    min?: number;
    max?: number;
    precision?: number;
}
interface AlphaOptionsInterface {
    count?: number;
    uppercase?: boolean;
}
/**
 * Object with options
 *
 * @typedef {Object} NumberOptions
 * @property {number} min Minimum value of range
 * @property {number} max Maximum value of range
 * @property {number} precision Precision of accuracy
 */
/**
 * Object with options
 *
 * @typedef {Object} AlphaOptions
 * @property {number} count Quantity of values
 * @property {boolean}  uppercase flag to use uppercase letters
 */
declare class Random {
    private readonly mersenne;
    constructor(seed?: number | number[]);
    initSeed(this: Random, seed: number): void;
    /**
     * Returns lower or upper alpha characters based count and uppercase options
     *
     * @method random.alpha
     * @since 1.5.0
     * @param {number|AlphaOptions} options
     * @returns {string} Returns the generated string with alpha characters.
     * @example
     * ```javascript
     * random.alpha()
     * // => 'b'
     *
     * random.alpha({count:2,uppercase:true})
     * // => 'CD'
     * ```
     */
    alpha(options?: number | AlphaOptionsInterface): string;
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

export { Internet, Random };
