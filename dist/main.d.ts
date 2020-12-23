interface NumberOptionsInterface {
    min?: number;
    max?: number;
    precision?: number;
}
declare class Random {
    private readonly mersenne;
    constructor(seed?: number | number[]);
    initSeed(this: Random, seed: number): void;
    number(options: number | NumberOptionsInterface): number;
    private rand;
}/**
 *
 * @namespace faker.random
 */
/**
 * returns a single random number based on a max number or range
 *
 * @method faker.random.number
 * @param {mixed} options {min, max, precision}
 */
/**
 * returns a single random floating-point number based on a max number or range
 *
 * @method faker.random.float
 * @param {mixed} options
 */
/**
 * takes an array and returns a random element of the array
 *
 * @method faker.random.arrayElement
 * @param {array} array
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
 * uuid
 *
 * @method faker.random.uuid
 */
/**
 * boolean
 *
 * @method faker.random.boolean
 */
/**
 * word
 *
 * @method faker.random.word
 * @param {string} type
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
