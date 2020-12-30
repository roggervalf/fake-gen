'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/*
  https://github.com/banksean wrapped Makoto Matsumoto and Takuji Nishimura's code in a namespace
  so it's better encapsulated. Now you can have multiple random number generators
  and they won't stomp all over each other's state.
  If you want to use this as a substitute for Math.random(), use the random()
  method like so:
  var m = new MersenneTwister();
  var randomNumber = m.random();
  You can also call the other genrand_{foo}() methods on the instance.
  If you want to use a specific seed in order to get a repeatable random
  sequence, pass an integer into the constructor:
  var m = new MersenneTwister(123);
  and that will always produce the same random sequence.
  Sean McCullough (banksean@gmail.com)
*/
/*
   A C-program for MT19937, with initialization improved 2002/1/26.
   Coded by Takuji Nishimura and Makoto Matsumoto.
   Before using, initialize the state by using init_seed(seed)
   or init_by_array(init_key, key_length).
   Copyright (C) 1997 - 2002, Makoto Matsumoto and Takuji Nishimura,
   All rights reserved.
   Redistribution and use in source and binary forms, with or without
   modification, are permitted provided that the following conditions
   are met:
     1. Redistributions of source code must retain the above copyright
        notice, this list of conditions and the following disclaimer.
     2. Redistributions in binary form must reproduce the above copyright
        notice, this list of conditions and the following disclaimer in the
        documentation and/or other materials provided with the distribution.
     3. The names of its contributors may not be used to endorse or promote
        products derived from this software without specific prior written
        permission.
   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
   "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
   LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
   A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
   CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
   EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
   PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
   PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
   LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
   NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
   SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
   Any feedback is very welcome.
   http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/emt.html
   email: m-mat @ math.sci.hiroshima-u.ac.jp (remove space)
*/
class MersenneTwister {
    constructor(seed) {
        /* Period parameters */
        this.N = 624;
        this.M = 397;
        this.MATRIX_A = 0x9908b0df; /* constant vector a */
        this.UPPER_MASK = 0x80000000; /* most significant w-r bits */
        this.LOWER_MASK = 0x7fffffff; /* least significant r bits */
        this.mt = new Array(this.N); /* the array for the state vector */
        this.mti = this.N + 1; /* mti==N+1 means mt[N] is not initialized */
        if (Array.isArray(seed)) {
            if (seed.length > 0)
                this.initByArray(seed, seed.length);
        }
        else {
            if (seed === undefined) {
                this.initSeed(new Date().getTime());
            }
            else {
                this.initSeed(seed);
            }
        }
    }
    /* initializes mt[N] with a seed */
    /* origin name init_genrand */
    initSeed(seed) {
        this.mt[0] = seed >>> 0;
        for (this.mti = 1; this.mti < this.N; this.mti++) {
            const s = this.mt[this.mti - 1] ^ (this.mt[this.mti - 1] >>> 30);
            this.mt[this.mti] =
                ((((s & 0xffff0000) >>> 16) * 1812433253) << 16) +
                    (s & 0x0000ffff) * 1812433253 +
                    this.mti;
            /* See Knuth TAOCP Vol2. 3rd Ed. P.106 for multiplier. */
            /* In the previous versions, MSBs of the seed affect   */
            /* only MSBs of the array mt[].                        */
            /* 2002/01/09 modified by Makoto Matsumoto             */
            this.mt[this.mti] >>>= 0;
            /* for >32 bit machines */
        }
    }
    /* initialize by an array with array-length */
    /* init_key is the array for initializing keys */
    /* key_length is its length */
    /* slight change for C++, 2004/2/26 */
    initByArray(initKey, keyLength) {
        this.initSeed(19650218);
        let i = 1;
        let j = 0;
        let k = this.N > keyLength ? this.N : keyLength;
        for (; k; k--) {
            const s = this.mt[i - 1] ^ (this.mt[i - 1] >>> 30);
            this.mt[i] =
                (this.mt[i] ^
                    (((((s & 0xffff0000) >>> 16) * 1664525) << 16) +
                        (s & 0x0000ffff) * 1664525)) +
                    initKey[j] +
                    j; /* non linear */
            this.mt[i] >>>= 0; /* for WORDSIZE > 32 machines */
            i++;
            j++;
            if (i >= this.N) {
                this.mt[0] = this.mt[this.N - 1];
                i = 1;
            }
            if (j >= keyLength)
                j = 0;
        }
        for (k = this.N - 1; k; k--) {
            const s = this.mt[i - 1] ^ (this.mt[i - 1] >>> 30);
            this.mt[i] =
                (this.mt[i] ^
                    (((((s & 0xffff0000) >>> 16) * 1566083941) << 16) +
                        (s & 0x0000ffff) * 1566083941)) -
                    i; /* non linear */
            this.mt[i] >>>= 0; /* for WORDSIZE > 32 machines */
            i++;
            if (i >= this.N) {
                this.mt[0] = this.mt[this.N - 1];
                i = 1;
            }
        }
        this.mt[0] = 0x80000000; /* MSB is 1; assuring non-zero initial array */
    }
    /* generates a random number on [0,0xffffffff]-interval */
    /* origin name genrand_int32 */
    randomInt32() {
        let y;
        const mag01 = [0x0, this.MATRIX_A];
        /* mag01[x] = x * MATRIX_A  for x=0,1 */
        if (this.mti >= this.N) {
            /* generate N words at one time */
            let kk;
            if (this.mti === this.N + 1)
                /* if init_seed() has not been called, */
                this.initSeed(5489); /* a default initial seed is used */
            for (kk = 0; kk < this.N - this.M; kk++) {
                y =
                    (this.mt[kk] & this.UPPER_MASK) | (this.mt[kk + 1] & this.LOWER_MASK);
                this.mt[kk] = this.mt[kk + this.M] ^ (y >>> 1) ^ mag01[y & 0x1];
            }
            for (; kk < this.N - 1; kk++) {
                y =
                    (this.mt[kk] & this.UPPER_MASK) | (this.mt[kk + 1] & this.LOWER_MASK);
                this.mt[kk] =
                    this.mt[kk + (this.M - this.N)] ^ (y >>> 1) ^ mag01[y & 0x1];
            }
            y =
                (this.mt[this.N - 1] & this.UPPER_MASK) |
                    (this.mt[0] & this.LOWER_MASK);
            this.mt[this.N - 1] = this.mt[this.M - 1] ^ (y >>> 1) ^ mag01[y & 0x1];
            this.mti = 0;
        }
        y = this.mt[this.mti++];
        /* Tempering */
        y ^= y >>> 11;
        y ^= (y << 7) & 0x9d2c5680;
        y ^= (y << 15) & 0xefc60000;
        y ^= y >>> 18;
        return y >>> 0;
    }
    /* generates a random number on [0,0x7fffffff]-interval */
    /* origin name genrand_int31 */
    randomInt31() {
        return this.randomInt32() >>> 1;
    }
    /* generates a random number on [0,1]-real-interval */
    /* origin name genrand_real1 */
    randomReal1() {
        return this.randomInt32() * (1.0 / 4294967295.0);
        /* divided by 2^32-1 */
    }
    /* generates a random number on [0,1)-real-interval */
    /* origin name genrand_real2 */
    randomReal2() {
        return this.randomInt32() * (1.0 / 4294967296.0);
        /* divided by 2^32 */
    }
    /* generates a random number on (0,1)-real-interval */
    /* origin name genrand_real3 */
    randomReal3() {
        return (this.randomInt32() + 0.5) * (1.0 / 4294967296.0);
        /* divided by 2^32 */
    }
    /* generates a random number on [0,1) with 53-bit resolution*/
    /* origin name genrand_res53 */
    randomRes53() {
        const a = this.randomInt32() >>> 5;
        const b = this.randomInt32() >>> 6;
        return (a * 67108864.0 + b) * (1.0 / 9007199254740992.0);
    }
}
/* These real versions are due to Isaku Wada, 2002/01/09 added */

const lowercaseHexadecimalLetters = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f'
];
const lowercaseLetters = [
    ...lowercaseHexadecimalLetters,
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z'
];
const uppercaseHexadecimalLetters = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F'
];
const uppercaseLetters = [
    ...uppercaseHexadecimalLetters,
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z'
];
const numberStrings = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const lowercaseAlphaNumeric = [...numberStrings, ...lowercaseLetters];
const lowercaseHexadecimal = [...numberStrings, ...lowercaseHexadecimalLetters];
const uppercaseAlphaNumeric = [...numberStrings, ...uppercaseLetters];
const uppercaseHexadecimal = [...numberStrings, ...uppercaseHexadecimalLetters];
const RFC4122_TEMPLATE = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';

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
class Random {
    constructor(seed) {
        this.mersenne = new MersenneTwister(seed);
    }
    initSeed(seed) {
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
    alpha(options = {}) {
        const defaultOptions = {
            count: 1,
            uppercase: false
        };
        const finalOptions = typeof options === 'number'
            ? Object.assign(Object.assign({}, defaultOptions), { count: options }) : Object.assign(Object.assign({}, defaultOptions), options);
        const { count, uppercase } = finalOptions;
        const lettersArray = uppercase ? uppercaseLetters : lowercaseLetters;
        const letters = Array.from(Array(count).keys()).map(() => this.arrayElement(lettersArray));
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
    alphaNumeric(options = {}) {
        const defaultOptions = {
            count: 1,
            uppercase: false
        };
        const finalOptions = typeof options === 'number'
            ? Object.assign(Object.assign({}, defaultOptions), { count: options }) : Object.assign(Object.assign({}, defaultOptions), options);
        const { count, uppercase } = finalOptions;
        const alphaNumericArray = uppercase
            ? uppercaseAlphaNumeric
            : lowercaseAlphaNumeric;
        const alphaNumerics = Array.from(Array(count).keys()).map(() => this.arrayElement(alphaNumericArray));
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
    arrayElement(array) {
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
    boolean() {
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
    float(options = {}) {
        const defaultOptions = {
            precision: 0.01
        };
        const finalOptions = typeof options === 'number'
            ? Object.assign(Object.assign({}, defaultOptions), { precision: options }) : Object.assign(Object.assign({}, defaultOptions), options);
        return this.number(finalOptions);
    }
    /**
     *
     * Returns lower or upper hexadecimal number string based on count, uppercase and prefix options
     *
     * @method random.hexadecimal
     * @since 1.7.0
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
    hexadecimal(options = {}) {
        const defaultOptions = {
            count: 1,
            uppercase: false,
            prefix: true
        };
        const finalOptions = typeof options === 'number'
            ? Object.assign(Object.assign({}, defaultOptions), { count: options }) : Object.assign(Object.assign({}, defaultOptions), options);
        const { count, uppercase, prefix } = finalOptions;
        const hexadecimalArray = uppercase
            ? uppercaseHexadecimal
            : lowercaseHexadecimal;
        const hexadecimals = Array.from(Array(count).keys()).map(() => this.arrayElement(hexadecimalArray));
        return prefix ? `${uppercase ? '0X' : '0x'}${hexadecimals.join('')}` : hexadecimals.join('');
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
    number(options = {}) {
        const defaultOptions = {
            min: 0,
            max: 99999,
            precision: 1
        };
        const finalOptions = typeof options === 'number'
            ? Object.assign(Object.assign({}, defaultOptions), { max: options }) : Object.assign(Object.assign({}, defaultOptions), options);
        const { max, min, precision } = finalOptions;
        // Make the range inclusive of the max value
        const finalMax = max >= 0 ? max + precision : max;
        const randomNumber = Math.floor(this.rand(finalMax / precision, min / precision));
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
    uuid() {
        return RFC4122_TEMPLATE.replace(/[xy]/g, this.replacePlaceholders.bind(this));
    }
    replacePlaceholders(placeholder) {
        const random = Math.floor(this.mersenne.randomReal2() * 16);
        const value = placeholder === 'x' ? random : (random & 0x3) | 0x8;
        return value.toString(16);
    }
    rand(max, min) {
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
 * @method faker.random.image
 */
/*  this.image = function randomImage () {
    return faker.image.image();
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

const avatarUris = [
    'https://randomuser.me/api/portraits/men/0.jpg',
    'https://randomuser.me/api/portraits/men/1.jpg',
    'https://randomuser.me/api/portraits/men/2.jpg',
    'https://randomuser.me/api/portraits/men/3.jpg',
    'https://randomuser.me/api/portraits/men/4.jpg',
    'https://randomuser.me/api/portraits/men/5.jpg',
    'https://randomuser.me/api/portraits/men/6.jpg',
    'https://randomuser.me/api/portraits/men/7.jpg',
    'https://randomuser.me/api/portraits/men/8.jpg',
    'https://randomuser.me/api/portraits/men/9.jpg',
    'https://randomuser.me/api/portraits/men/10.jpg',
    'https://randomuser.me/api/portraits/men/11.jpg',
    'https://randomuser.me/api/portraits/men/12.jpg',
    'https://randomuser.me/api/portraits/men/13.jpg',
    'https://randomuser.me/api/portraits/men/14.jpg',
    'https://randomuser.me/api/portraits/men/15.jpg',
    'https://randomuser.me/api/portraits/men/16.jpg',
    'https://randomuser.me/api/portraits/men/17.jpg',
    'https://randomuser.me/api/portraits/men/18.jpg',
    'https://randomuser.me/api/portraits/men/19.jpg',
    'https://randomuser.me/api/portraits/men/20.jpg',
    'https://randomuser.me/api/portraits/men/21.jpg',
    'https://randomuser.me/api/portraits/men/22.jpg',
    'https://randomuser.me/api/portraits/men/23.jpg',
    'https://randomuser.me/api/portraits/men/24.jpg',
    'https://randomuser.me/api/portraits/men/25.jpg',
    'https://randomuser.me/api/portraits/men/26.jpg',
    'https://randomuser.me/api/portraits/men/27.jpg',
    'https://randomuser.me/api/portraits/men/28.jpg',
    'https://randomuser.me/api/portraits/men/29.jpg',
    'https://randomuser.me/api/portraits/men/30.jpg',
    'https://randomuser.me/api/portraits/men/31.jpg',
    'https://randomuser.me/api/portraits/men/32.jpg',
    'https://randomuser.me/api/portraits/men/33.jpg',
    'https://randomuser.me/api/portraits/men/34.jpg',
    'https://randomuser.me/api/portraits/men/35.jpg',
    'https://randomuser.me/api/portraits/men/36.jpg',
    'https://randomuser.me/api/portraits/men/37.jpg',
    'https://randomuser.me/api/portraits/men/38.jpg',
    'https://randomuser.me/api/portraits/men/39.jpg',
    'https://randomuser.me/api/portraits/men/40.jpg',
    'https://randomuser.me/api/portraits/men/41.jpg',
    'https://randomuser.me/api/portraits/men/42.jpg',
    'https://randomuser.me/api/portraits/men/43.jpg',
    'https://randomuser.me/api/portraits/men/44.jpg',
    'https://randomuser.me/api/portraits/men/45.jpg',
    'https://randomuser.me/api/portraits/men/46.jpg',
    'https://randomuser.me/api/portraits/men/47.jpg',
    'https://randomuser.me/api/portraits/men/48.jpg',
    'https://randomuser.me/api/portraits/men/49.jpg',
    'https://randomuser.me/api/portraits/men/50.jpg',
    'https://randomuser.me/api/portraits/men/51.jpg',
    'https://randomuser.me/api/portraits/men/52.jpg',
    'https://randomuser.me/api/portraits/men/53.jpg',
    'https://randomuser.me/api/portraits/men/54.jpg',
    'https://randomuser.me/api/portraits/men/55.jpg',
    'https://randomuser.me/api/portraits/men/56.jpg',
    'https://randomuser.me/api/portraits/men/57.jpg',
    'https://randomuser.me/api/portraits/men/58.jpg',
    'https://randomuser.me/api/portraits/men/59.jpg',
    'https://randomuser.me/api/portraits/men/60.jpg',
    'https://randomuser.me/api/portraits/men/61.jpg',
    'https://randomuser.me/api/portraits/men/62.jpg',
    'https://randomuser.me/api/portraits/men/63.jpg',
    'https://randomuser.me/api/portraits/men/64.jpg',
    'https://randomuser.me/api/portraits/men/65.jpg',
    'https://randomuser.me/api/portraits/men/66.jpg',
    'https://randomuser.me/api/portraits/men/67.jpg',
    'https://randomuser.me/api/portraits/men/68.jpg',
    'https://randomuser.me/api/portraits/men/69.jpg',
    'https://randomuser.me/api/portraits/men/70.jpg',
    'https://randomuser.me/api/portraits/men/71.jpg',
    'https://randomuser.me/api/portraits/men/72.jpg',
    'https://randomuser.me/api/portraits/men/73.jpg',
    'https://randomuser.me/api/portraits/men/74.jpg',
    'https://randomuser.me/api/portraits/men/75.jpg',
    'https://randomuser.me/api/portraits/men/76.jpg',
    'https://randomuser.me/api/portraits/men/77.jpg',
    'https://randomuser.me/api/portraits/men/78.jpg',
    'https://randomuser.me/api/portraits/men/79.jpg',
    'https://randomuser.me/api/portraits/men/80.jpg',
    'https://randomuser.me/api/portraits/men/81.jpg',
    'https://randomuser.me/api/portraits/men/82.jpg',
    'https://randomuser.me/api/portraits/men/83.jpg',
    'https://randomuser.me/api/portraits/men/84.jpg',
    'https://randomuser.me/api/portraits/men/85.jpg',
    'https://randomuser.me/api/portraits/men/86.jpg',
    'https://randomuser.me/api/portraits/men/87.jpg',
    'https://randomuser.me/api/portraits/men/88.jpg',
    'https://randomuser.me/api/portraits/men/89.jpg',
    'https://randomuser.me/api/portraits/men/90.jpg',
    'https://randomuser.me/api/portraits/men/91.jpg',
    'https://randomuser.me/api/portraits/men/92.jpg',
    'https://randomuser.me/api/portraits/men/93.jpg',
    'https://randomuser.me/api/portraits/men/94.jpg',
    'https://randomuser.me/api/portraits/men/95.jpg',
    'https://randomuser.me/api/portraits/men/96.jpg',
    'https://randomuser.me/api/portraits/men/97.jpg',
    'https://randomuser.me/api/portraits/men/99.jpg',
    'https://randomuser.me/api/portraits/men/98.jpg',
    'https://randomuser.me/api/portraits/men/99.jpg',
    'https://randomuser.me/api/portraits/women/0.jpg',
    'https://randomuser.me/api/portraits/women/1.jpg',
    'https://randomuser.me/api/portraits/women/2.jpg',
    'https://randomuser.me/api/portraits/women/3.jpg',
    'https://randomuser.me/api/portraits/women/4.jpg',
    'https://randomuser.me/api/portraits/women/5.jpg',
    'https://randomuser.me/api/portraits/women/6.jpg',
    'https://randomuser.me/api/portraits/women/7.jpg',
    'https://randomuser.me/api/portraits/women/8.jpg',
    'https://randomuser.me/api/portraits/women/9.jpg',
    'https://randomuser.me/api/portraits/women/10.jpg',
    'https://randomuser.me/api/portraits/women/11.jpg',
    'https://randomuser.me/api/portraits/women/12.jpg',
    'https://randomuser.me/api/portraits/women/13.jpg',
    'https://randomuser.me/api/portraits/women/14.jpg',
    'https://randomuser.me/api/portraits/women/15.jpg',
    'https://randomuser.me/api/portraits/women/16.jpg',
    'https://randomuser.me/api/portraits/women/17.jpg',
    'https://randomuser.me/api/portraits/women/18.jpg',
    'https://randomuser.me/api/portraits/women/19.jpg',
    'https://randomuser.me/api/portraits/women/20.jpg',
    'https://randomuser.me/api/portraits/women/21.jpg',
    'https://randomuser.me/api/portraits/women/22.jpg',
    'https://randomuser.me/api/portraits/women/23.jpg',
    'https://randomuser.me/api/portraits/women/24.jpg',
    'https://randomuser.me/api/portraits/women/25.jpg',
    'https://randomuser.me/api/portraits/women/26.jpg',
    'https://randomuser.me/api/portraits/women/27.jpg',
    'https://randomuser.me/api/portraits/women/28.jpg',
    'https://randomuser.me/api/portraits/women/29.jpg',
    'https://randomuser.me/api/portraits/women/30.jpg',
    'https://randomuser.me/api/portraits/women/31.jpg',
    'https://randomuser.me/api/portraits/women/32.jpg',
    'https://randomuser.me/api/portraits/women/33.jpg',
    'https://randomuser.me/api/portraits/women/34.jpg',
    'https://randomuser.me/api/portraits/women/35.jpg',
    'https://randomuser.me/api/portraits/women/36.jpg',
    'https://randomuser.me/api/portraits/women/37.jpg',
    'https://randomuser.me/api/portraits/women/38.jpg',
    'https://randomuser.me/api/portraits/women/39.jpg',
    'https://randomuser.me/api/portraits/women/40.jpg',
    'https://randomuser.me/api/portraits/women/41.jpg',
    'https://randomuser.me/api/portraits/women/42.jpg',
    'https://randomuser.me/api/portraits/women/43.jpg',
    'https://randomuser.me/api/portraits/women/44.jpg',
    'https://randomuser.me/api/portraits/women/45.jpg',
    'https://randomuser.me/api/portraits/women/46.jpg',
    'https://randomuser.me/api/portraits/women/47.jpg',
    'https://randomuser.me/api/portraits/women/48.jpg',
    'https://randomuser.me/api/portraits/women/49.jpg',
    'https://randomuser.me/api/portraits/women/50.jpg',
    'https://randomuser.me/api/portraits/women/51.jpg',
    'https://randomuser.me/api/portraits/women/52.jpg',
    'https://randomuser.me/api/portraits/women/53.jpg',
    'https://randomuser.me/api/portraits/women/54.jpg',
    'https://randomuser.me/api/portraits/women/55.jpg',
    'https://randomuser.me/api/portraits/women/56.jpg',
    'https://randomuser.me/api/portraits/women/57.jpg',
    'https://randomuser.me/api/portraits/women/58.jpg',
    'https://randomuser.me/api/portraits/women/59.jpg',
    'https://randomuser.me/api/portraits/women/60.jpg',
    'https://randomuser.me/api/portraits/women/61.jpg',
    'https://randomuser.me/api/portraits/women/62.jpg',
    'https://randomuser.me/api/portraits/women/63.jpg',
    'https://randomuser.me/api/portraits/women/64.jpg',
    'https://randomuser.me/api/portraits/women/65.jpg',
    'https://randomuser.me/api/portraits/women/66.jpg',
    'https://randomuser.me/api/portraits/women/67.jpg',
    'https://randomuser.me/api/portraits/women/68.jpg',
    'https://randomuser.me/api/portraits/women/69.jpg',
    'https://randomuser.me/api/portraits/women/70.jpg',
    'https://randomuser.me/api/portraits/women/71.jpg',
    'https://randomuser.me/api/portraits/women/72.jpg',
    'https://randomuser.me/api/portraits/women/73.jpg',
    'https://randomuser.me/api/portraits/women/74.jpg',
    'https://randomuser.me/api/portraits/women/75.jpg',
    'https://randomuser.me/api/portraits/women/76.jpg',
    'https://randomuser.me/api/portraits/women/77.jpg',
    'https://randomuser.me/api/portraits/women/78.jpg',
    'https://randomuser.me/api/portraits/women/79.jpg',
    'https://randomuser.me/api/portraits/women/80.jpg',
    'https://randomuser.me/api/portraits/women/81.jpg',
    'https://randomuser.me/api/portraits/women/82.jpg',
    'https://randomuser.me/api/portraits/women/83.jpg',
    'https://randomuser.me/api/portraits/women/84.jpg',
    'https://randomuser.me/api/portraits/women/85.jpg',
    'https://randomuser.me/api/portraits/women/86.jpg',
    'https://randomuser.me/api/portraits/women/87.jpg',
    'https://randomuser.me/api/portraits/women/88.jpg',
    'https://randomuser.me/api/portraits/women/89.jpg',
    'https://randomuser.me/api/portraits/women/90.jpg',
    'https://randomuser.me/api/portraits/women/91.jpg',
    'https://randomuser.me/api/portraits/women/92.jpg',
    'https://randomuser.me/api/portraits/women/93.jpg',
    'https://randomuser.me/api/portraits/women/94.jpg',
    'https://randomuser.me/api/portraits/women/95.jpg',
    'https://randomuser.me/api/portraits/women/96.jpg',
    'https://randomuser.me/api/portraits/women/97.jpg',
    'https://randomuser.me/api/portraits/women/98.jpg',
    'https://randomuser.me/api/portraits/women/99.jpg'
];
const protocols = ['http', 'https'];

class Internet {
    constructor(seed) {
        this.random = new Random(seed);
    }
    initSeed(seed) {
        this.random.initSeed(seed);
    }
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
    avatar() {
        return this.random.arrayElement(avatarUris);
    }
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
    ip() {
        return [0, 0, 0, 0].map(() => this.random.number(255).toFixed(0)).join('.');
    }
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
    protocol() {
        return this.random.arrayElement(protocols);
    }
}

exports.Internet = Internet;
exports.Random = Random;
//# sourceMappingURL=main.js.map
