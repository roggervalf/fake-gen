import { MersenneTwister } from '../../utils/mersenneTwister';
import {
  lowercaseAlphaNumeric,
  lowercaseHexadecimal,
  lowercaseLetters,
  RFC4122_TEMPLATE,
  uppercaseAlphaNumeric,
  uppercaseHexadecimal,
  uppercaseLetters
} from './constants';

interface NumberOptionsInterface {
  min?: number;
  max?: number;
  precision?: number;
}

interface AlphaOptionsInterface {
  count?: number;
  uppercase?: boolean;
}

type HexadecimalOptionsType = AlphaOptionsInterface & { prefix?: boolean };

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

export class Random {
  private readonly mersenne: MersenneTwister;

  constructor(seed?: number | number[]) {
    this.mersenne = new MersenneTwister(seed);
  }

  initSeed(this: Random, seed: number): void {
    this.mersenne.initSeed(seed);
  }

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
  alpha(options: number | AlphaOptionsInterface = {}): string {
    const defaultOptions = {
      count: 1,
      uppercase: false
    };

    const finalOptions =
      typeof options === 'number'
        ? { ...defaultOptions, count: options }
        : { ...defaultOptions, ...options };
    const { count, uppercase } = finalOptions;
    const lettersArray = uppercase ? uppercaseLetters : lowercaseLetters;

    const letters = Array.from(Array(count).keys()).map(() =>
      this.arrayElement(lettersArray)
    );

    return letters.join('');
  }

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
  alphaNumeric(
    this: Random,
    options: number | AlphaOptionsInterface = {}
  ): string {
    const defaultOptions = {
      count: 1,
      uppercase: false
    };

    const finalOptions =
      typeof options === 'number'
        ? { ...defaultOptions, count: options }
        : { ...defaultOptions, ...options };
    const { count, uppercase } = finalOptions;
    const alphaNumericArray = uppercase
      ? uppercaseAlphaNumeric
      : lowercaseAlphaNumeric;

    const alphaNumerics = Array.from(Array(count).keys()).map(() =>
      this.arrayElement(alphaNumericArray)
    );

    return alphaNumerics.join('');
  }

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
  arrayElement<T>(this: Random, array?: Array<T>): T | string {
    const finalArray = array || ['a', 'b', 'c'];
    const index = this.number({ max: finalArray.length - 1 });

    return finalArray[index];
  }

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
  boolean(this: Random): boolean {
    return Boolean(this.number(1));
  }

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
  float(this: Random, options: number | NumberOptionsInterface = {}): number {
    const defaultOptions = {
      precision: 0.01
    };

    const finalOptions =
      typeof options === 'number'
        ? { ...defaultOptions, precision: options }
        : { ...defaultOptions, ...options };

    return this.number(finalOptions);
  }

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
  hexadecimal(
    this: Random,
    options: number | HexadecimalOptionsType = {}
  ): string {
    const defaultOptions = {
      count: 1,
      uppercase: false,
      prefix: true
    };

    const finalOptions =
      typeof options === 'number'
        ? { ...defaultOptions, count: options }
        : { ...defaultOptions, ...options };
    const { count, uppercase, prefix } = finalOptions;
    const hexadecimalArray = uppercase
      ? uppercaseHexadecimal
      : lowercaseHexadecimal;

    const hexadecimals = Array.from(Array(count).keys()).map(() =>
      this.arrayElement(hexadecimalArray)
    );

    return prefix
      ? `${uppercase ? '0X' : '0x'}${hexadecimals.join('')}`
      : hexadecimals.join('');
  }

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
  number(this: Random, options: number | NumberOptionsInterface = {}): number {
    const defaultOptions = {
      min: 0,
      max: 99999,
      precision: 1
    };

    const finalOptions =
      typeof options === 'number'
        ? { ...defaultOptions, max: options }
        : { ...defaultOptions, ...options };
    const { max, min, precision } = finalOptions;
    // Make the range inclusive of the max value
    const finalMax = max >= 0 ? max + precision : max;

    const randomNumber = Math.floor(
      this.rand(finalMax / precision, min / precision)
    );
    // Workaround problem in Float point arithmetics for e.g. 6681493 / 0.01
    return randomNumber / (1 / precision);
  }

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
  uuid(this: Random): string {
    return RFC4122_TEMPLATE.replace(
      /[xy]/g,
      this.replacePlaceholders.bind(this)
    );
  }

  private replacePlaceholders(this: Random, placeholder: string): string {
    const random = Math.floor(this.mersenne.randomReal2() * 16);

    const value = placeholder === 'x' ? random : (random & 0x3) | 0x8;
    return value.toString(16);
  }

  private rand(this: Random, max: number, min: number): number {
    return Math.floor(this.mersenne.randomReal2() * (max - min) + min);
  }
}

/**
 *
 * @namespace faker.random
 */
/*
function Random (faker, seed) {
  // Use a user provided seed if it exists
  if (seed) {
    if (Array.isArray(seed) && seed.length) {
      mersenne.seed_array(seed);
    }
    else {
      mersenne.seed(seed);
    }
  }
*/
/**
 * takes an array and returns a subset with random elements of the array
 *
 * @method faker.random.arrayElements
 * @param {array} array
 * @param {number} count number of elements to pick
 */
/*
  this.arrayElements = function (array, count) {
      array = array || ["a", "b", "c"];

      if (typeof count !== 'number') {
        count = faker.random.number({ min: 1, max: array.length });
      } else if (count > array.length) {
        count = array.length;
      } else if (count < 0) {
        count = 0;
      }

      var arrayCopy = array.slice();
      var countToRemove = arrayCopy.length - count;
      for (var i = 0; i < countToRemove; i++) {
        var indexToRemove = faker.random.number({ max: arrayCopy.length - 1 });
        arrayCopy.splice(indexToRemove, 1);
      }

      return arrayCopy;
  }
*/
/**
 * takes an object and returns the randomly key or value
 *
 * @method faker.random.objectElement
 * @param {object} object
 * @param {mixed} field
 */
/*  this.objectElement = function (object, field) {
      object = object || { "foo": "bar", "too": "car" };
      var array = Object.keys(object);
      var key = faker.random.arrayElement(array);

      return field === "key" ? key : object[key];
  }
// TODO: have ability to return specific type of word? As in: noun, adjective, verb, etc
/**
 * word
 *
 * @method faker.random.word
 * @param {string} type
 */
/*  this.word = function randomWord (type) {

    var wordMethods = [
    'commerce.department',
    'commerce.productName',
    'commerce.productAdjective',
    'commerce.productMaterial',
    'commerce.product',
    'commerce.color',

    'company.catchPhraseAdjective',
    'company.catchPhraseDescriptor',
    'company.catchPhraseNoun',
    'company.bsAdjective',
    'company.bsBuzz',
    'company.bsNoun',
    'address.streetSuffix',
    'address.county',
    'address.country',
    'address.state',

    'finance.accountName',
    'finance.transactionType',
    'finance.currencyName',

    'hacker.noun',
    'hacker.verb',
    'hacker.adjective',
    'hacker.ingverb',
    'hacker.abbreviation',

    'name.jobDescriptor',
    'name.jobArea',
    'name.jobType'];

    // randomly pick from the many faker methods that can generate words
    var randomWordMethod = faker.random.arrayElement(wordMethods);
    var result = faker.fake('{{' + randomWordMethod + '}}');
    return faker.random.arrayElement(result.split(' '));
  }
*/
/**
 * randomWords
 *
 * @method faker.random.words
 * @param {number} count defaults to a random value between 1 and 3
 */
/*  this.words = function randomWords (count) {
    var words = [];
    if (typeof count === "undefined") {
      count = faker.random.number({min:1, max: 3});
    }
    for (var i = 0; i<count; i++) {
      words.push(faker.random.word());
    }
    return words.join(' ');
  }
*/
/**
 * locale
 *
 * @method faker.random.locale
 */
/*  this.locale = function randomLocale () {
    return faker.random.arrayElement(Object.keys(faker.locales));
  };
*/
//}

//module['exports'] = Random;
