import { vehicleVinAlphaNumerics, vehicleVinLetters } from '../constants';
import { Random } from '../random/Random';

export class Vehicle {
  private readonly random: Random;

  constructor(seed?: number | number[]) {
    this.random = new Random(seed);
  }

  initSeed(this: Vehicle, seed: number): void {
    this.random.initSeed(seed);
  }

  /**
   * Generates a vehicle identification number
   * @method vehicle.vin
   * @since 1.8.0
   * @returns {string} Returns a random vehicle identification number.
   * @example
   * ```javascript
   * vehicle.vin()
   * // => 'YV1MH682762184654',
   *
   * vehicle.vin()
   * // => '3C7WRMBJ2EG208836',
   * ```
   */
  vin(this: Vehicle): string {
    return (
      `${this.getStringValuesInArray(
        vehicleVinAlphaNumerics,
        10
      )}${this.getStringValuesInArray(vehicleVinLetters, 1)}` +
      `${this.getStringValuesInArray(
        vehicleVinAlphaNumerics,
        1
      )}${this.random.number({ min: 10000, max: 100000 })}`
    );
  }

  /**
   * Generates a vehicle registration mark
   * @method vehicle.vrm
   * @since 1.8.0
   * @returns {string} Returns a random vehicle registration mark.
   * @example
   * ```javascript
   * vehicle.vrm()
   * // => 'MF56UPA',
   *
   * vehicle.vrm()
   * // => 'GL19AAQ',
   * ```
   */
  vrm(this: Vehicle): string {
    return (
      `${this.random.alpha({ count: 2, uppercase: true })}${this.random.number({
        min: 0,
        max: 9
      })}` +
      `${this.random.number({ min: 0, max: 9 })}${this.random.alpha({
        count: 3,
        uppercase: true
      })}`
    );
  }

  private getStringValuesInArray(
    this: Vehicle,
    array: string[],
    count: number
  ): string {
    const stringArray = Array.from(Array(count).keys()).map(() =>
      this.random.arrayElement(array)
    );

    return stringArray.join('');
  }
}
