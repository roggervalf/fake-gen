interface DateTimeOptionsInterface {
    days?: number;
    years?: number;
    dateReference?: Date | string;
}
/**
 * Object with options
 *
 * @typedef {Object} DateTimeOptions
 * @property {number} days Number that represents days
 * @property {number} years Number that represents years
 * @property {Date} dateReference Value to take as reference
 */
declare class DateTime {
    private readonly random;
    constructor(seed?: number | number[]);
    initSeed(this: DateTime, seed: number): void;
    /**
     * Returns a Date instance from the past
     *
     * @method date.past
     * @since 1.9.0
     * @param {number|DateTimeOptions} options
     * @returns {Date} Returns a Date instance from the past.
     * @example
     * ```javascript
     * dateTime.past()
     * // => '2020-03-21T01:57:41.025Z'
     *
     * dateTime.past({days: 1, years:2, dateReference:new Date('2021-01-20')})
     * // => '2020-06-15T02:25:40.025Z'
     * ```
     */
    past(options?: number | DateTimeOptionsInterface): Date;
    /**
     * Returns a Date instance from the past
     *
     * @method date.future
     * @since 1.9.0
     * @param {number|DateTimeOptions} options
     * @returns {Date} Returns a Date instance from the future.
     * @example
     * ```javascript
     * dateTime.future()
     * // => '2021-05-22T06:30:16.025Z'
     *
     * dateTime.future({days: 1, years:2, dateReference:new Date('2021-01-20')})
     * // => '2021-08-04T08:10:33.025Z'
     * ```
     */
    future(options?: number | DateTimeOptionsInterface): Date;
}

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
     * Generates a random IP address
     * @method internet.ip
     * @since 1.4.0
     * @returns {string} Returns a random IP address.
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
     * Generates a random IPv6 address
     * @method internet.ipv6
     * @since 1.10.0
     * @returns {string} Returns a random IPv6 address.
     * @example
     * ```javascript
     * internet.ipv6()
     * // => '2001:0db8:6276:b1a7:5213:22f1:25df:c8a0',
     *
     * internet.ipv6()
     * // => '9cda:87cd:9617:370e:8d56:d698:19c8:c195',
     * ```
     */
    ipv6(): string;
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
declare type HexadecimalOptionsType = AlphaOptionsInterface & {
    prefix?: boolean;
};
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
 * @property {number} count Quantity of values, default to 1
 * @property {boolean} uppercase flag to use uppercase letters
 */
/**
 * Object with options
 *
 * @typedef {Object} HexadecimalOptions
 * @property {number} count Quantity of values. default to 1
 * @property {boolean} uppercase flag to use uppercase letters
 * @property {boolean} prefix flag to add 0x prefix
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
     * Returns lower or upper alpha numeric characters based count and uppercase options
     *
     * @method random.alphaNumeric
     * @since 1.6.0
     * @param {number|AlphaOptions} options
     * @returns {string} Returns the generated string with alpha numeric characters.
     * @example
     * ```javascript
     * random.alphaNumeric()
     * // => '5'
     *
     * random.alphaNumeric({count:2,uppercase:true})
     * // => '1A'
     * ```
     */
    alphaNumeric(this: Random, options?: number | AlphaOptionsInterface): string;
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
    arrayElement<T>(this: Random, array?: Array<T>): T | string;
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
    float(this: Random, options?: number | NumberOptionsInterface): number;
    /**
     *
     * Returns lower or upper hexadecimal number string based on count, uppercase and prefix options
     *
     * @method random.hexadecimal
     * @since 1.6.0
     * @param {number|HexadecimalOptions} options
     * @returns {string} Returns the generated string with hexadecimal characters.
     * @example
     * ```javascript
     * random.hexadecimal()
     * // => '0xf'
     *
     * random.hexadecimal({count:2, uppercase:true, prefix: false})
     * // => '1A'
     * ```
     */
    hexadecimal(this: Random, options?: number | HexadecimalOptionsType): string;
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
    number(this: Random, options?: number | NumberOptionsInterface): number;
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
 * @method faker.random.locale
 */

interface executeOptionsInterface<T, V> {
    scope: string;
    method: (...args: unknown[]) => T;
    args?: unknown[];
    model?: V;
}
interface uniqueOptionsInterface {
    maxRetries?: number;
    maxTime?: number;
}
declare class Unique<T, V> {
    private foundItems;
    private maxRetries;
    private maxTime;
    private startTime;
    private currentIterations;
    constructor(options?: uniqueOptionsInterface);
    execute(this: Unique<T, V>, { scope, method, args, model }: executeOptionsInterface<T, V>): T;
    clear(this: Unique<T, V>, scope?: string): void;
    private errorMessage;
    private isValuePresent;
    private getUniqueValue;
}

export { DateTime, Internet, Random, Unique };
