import { Random } from '../random/Random';
import { avatarUris } from './definitions';

export class Internet {
  private readonly random: Random;

  constructor(seed?: number | number[]) {
    this.random = new Random(seed);
  }

  initSeed(this: Internet, seed: number): void {
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
}
