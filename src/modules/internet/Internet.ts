import { Random } from '../random/Random';
import { avatarUris, protocols } from './constants';

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
  avatar(): string {
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
  ip(): string {
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
  protocol(): string {
    return this.random.arrayElement(protocols);
  }
}
