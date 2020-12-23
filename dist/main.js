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

class Random {
    constructor(seed) {
        this.mersenne = new MersenneTwister(seed);
    }
    initSeed(seed) {
        this.mersenne.initSeed(seed);
    }
    number(options) {
        const defaultOptions = {
            min: 0,
            max: 99999,
            precision: 1
        };
        const finalOptions = typeof options === "number" ? Object.assign(Object.assign({}, defaultOptions), { max: options }) : Object.assign(Object.assign({}, defaultOptions), options);
        const { max, min, precision } = finalOptions;
        // Make the range inclusive of the max value
        const finalMax = max >= 0 ? max + precision : max;
        const randomNumber = Math.floor(this.rand(finalMax / precision, min / precision));
        // Workaround problem in Float point arithmetics for e.g. 6681493 / 0.01
        return randomNumber / (1 / precision);
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
 * returns a single random number based on a max number or range
 *
 * @method faker.random.number
 * @param {mixed} options {min, max, precision}
 */
/*  this.number = function (options) {

    if (typeof options === "number") {
      options = {
        max: options
      };
    }

    options = options || {};

    if (typeof options.min === "undefined") {
      options.min = 0;
    }

    if (typeof options.max === "undefined") {
      options.max = 99999;
    }
    if (typeof options.precision === "undefined") {
      options.precision = 1;
    }

    // Make the range inclusive of the max value
    var max = options.max;
    if (max >= 0) {
      max += options.precision;
    }

    var randomNumber = Math.floor(
      mersenne.rand(max / options.precision, options.min / options.precision));
    // Workaround problem in Float point arithmetics for e.g. 6681493 / 0.01
    randomNumber = randomNumber / (1 / options.precision);

    return randomNumber;

  }
*/
/**
 * returns a single random floating-point number based on a max number or range
 *
 * @method faker.random.float
 * @param {mixed} options
 */
/*  this.float = function (options) {
      if (typeof options === "number") {
        options = {
          precision: options
        };
      }
      options = options || {};
      var opts = {};
      for (var p in options) {
        opts[p] = options[p];
      }
      if (typeof opts.precision === 'undefined') {
        opts.precision = 0.01;
      }
      return faker.random.number(opts);
  }
*/
/**
 * takes an array and returns a random element of the array
 *
 * @method faker.random.arrayElement
 * @param {array} array
 */
/*
  this.arrayElement = function (array) {
      array = array || ["a", "b", "c"];
      var r = faker.random.number({ max: array.length - 1 });
      return array[r];
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
*/
/**
 * uuid
 *
 * @method faker.random.uuid
 */
/*  this.uuid = function () {
      var RFC4122_TEMPLATE = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
      var replacePlaceholders = function (placeholder) {
          var random = faker.random.number({ min: 0, max: 15 });
          var value = placeholder == 'x' ? random : (random &0x3 | 0x8);
          return value.toString(16);
      };
      return RFC4122_TEMPLATE.replace(/[xy]/g, replacePlaceholders);
  }
*/
/**
 * boolean
 *
 * @method faker.random.boolean
 */
/*  this.boolean = function () {
      return !!faker.random.number(1)
  }
*/
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
/**
* alpha. returns lower/upper alpha characters based count and upcase options
*
* @method faker.random.alpha
* @param {mixed} options // defaults to { count: 1, upcase: false }
*/
/*  this.alpha = function alpha(options) {
    if (typeof options === "undefined") {
      options = {
        count: 1
      }
    } else if (typeof options === "number") {
      options = {
        count: options,
      }
    } else if (typeof options.count === "undefined") {
      options.count = 1
    }

    if (typeof options.upcase === "undefined") {
      options.upcase = false;
    }

    var wholeString = "";
    for(var i = 0; i < options.count; i++) {
      wholeString += faker.random.arrayElement(["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]);
    }

    return options.upcase ? wholeString.toUpperCase() : wholeString;
  };
*/
/**
 * alphaNumeric
 *
 * @method faker.random.alphaNumeric
 * @param {number} count defaults to 1
 */
/*  this.alphaNumeric = function alphaNumeric(count) {
    if (typeof count === "undefined") {
      count = 1;
    }

    var wholeString = "";
    for(var i = 0; i < count; i++) {
      wholeString += faker.random.arrayElement(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]);
    }

    return wholeString;
  };
*/
/**
 * hexaDecimal
 *
 * @method faker.random.hexaDecimal
 * @param {number} count defaults to 1
 */
/*  this.hexaDecimal = function hexaDecimal(count) {
    if (typeof count === "undefined") {
      count = 1;
    }

    var wholeString = "";
    for(var i = 0; i < count; i++) {
      wholeString += faker.random.arrayElement(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "A", "B", "C", "D", "E", "F"]);
    }

    return "0x"+wholeString;
  };

  return this;
*/
//}
//module['exports'] = Random;

exports.Random = Random;
//# sourceMappingURL=main.js.map
