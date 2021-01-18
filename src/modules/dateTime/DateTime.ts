import { Random } from '../random/Random';

interface DateTimeOptionsInterface {
  years?: number;
  dateReference?: Date | string;
}

/**
 * Object with options
 *
 * @typedef {Object} DateTimeOptions
 * @property {number} years Number that represents years
 * @property {Date} dateReference Value to take as reference
 */

export class DateTime {
  private readonly random: Random;

  constructor(seed?: number | number[]) {
    this.random = new Random(seed);
  }

  initSeed(this: DateTime, seed: number): void {
    this.random.initSeed(seed);
  }

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
   * dateTime.past({years:2,dateReference:new Date('2021-01-20')})
   * // => '2020-06-15T02:25:40.025Z'
   * ```
   */
  past(options: number | DateTimeOptionsInterface = {}): Date {
    const defaultOptions = {
      years: 1,
      dateReference: new Date()
    };

    const finalOptions =
      typeof options === 'number'
        ? { ...defaultOptions, years: options }
        : { ...defaultOptions, ...options };
    const { years, dateReference } = finalOptions;

    const date = new Date(
      dateReference instanceof Date ? dateReference.getTime() : dateReference
    );
    const range = {
      min: 1000,
      max: years * 365 * 24 * 3600 * 1000
    };

    const past = date.getTime();
    // some time from now to N years ago, in milliseconds
    date.setTime(past - this.random.number(range));

    return date;
  }

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
   * dateTime.future({years:2,dateReference:new Date('2021-01-20')})
   * // => '2021-08-04T08:10:33.025Z'
   * ```
   */
  future(options: number | DateTimeOptionsInterface = {}): Date {
    const defaultOptions = {
      years: 1,
      dateReference: new Date()
    };

    const finalOptions =
      typeof options === 'number'
        ? { ...defaultOptions, years: options }
        : { ...defaultOptions, ...options };
    const { years, dateReference } = finalOptions;

    const date = new Date(
      dateReference instanceof Date ? dateReference.getTime() : dateReference
    );
    const range = {
      min: 1000,
      max: years * 365 * 24 * 3600 * 1000
    };

    const past = date.getTime();
    // some time from now to N years ago, in milliseconds
    date.setTime(past + this.random.number(range));

    return date;
  }
}
