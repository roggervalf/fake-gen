import { Internet } from './Internet';
import { avatarUris, protocols } from './constants';

describe('Internet', () => {
  describe('when creating a Internet instance', () => {
    it("doesn't throw an error", () => {
      expect(() => new Internet()).not.toThrow();
    });

    it('returns a Internet instance', () => {
      expect(new Internet()).toBeInstanceOf(Internet);
    });
  });

  describe('avatar', () => {
    it('returns a random avatar uri', () => {
      const internet = new Internet();
      const avatarUri = internet.avatar();

      expect(avatarUris).toEqual(expect.arrayContaining([avatarUri]));
    });

    it('returns deterministic results when seeded with integer', () => {
      const internet = new Internet(1);
      internet.initSeed(10);

      expect(internet.avatar()).toBe(
        'https://randomuser.me/api/portraits/women/54.jpg'
      );
    });
  });

  describe('ip', () => {
    it('returns a random IP', () => {
      const internet = new Internet();
      const ip = internet.ip();
      const parts = ip.split('.');

      expect(parts.length).toBe(4);
      expect(Number(parts[0])).toBeLessThanOrEqual(255);
      expect(Number(parts[1])).toBeLessThanOrEqual(255);
      expect(Number(parts[2])).toBeLessThanOrEqual(255);
      expect(Number(parts[3])).toBeLessThanOrEqual(255);
    });
  });

  describe('ipv6', () => {
    it('returns a random IPv6', () => {
      const internet = new Internet();
      const ipv6 = internet.ipv6();
      const parts = ipv6.split(':');

      expect(parts.length).toBe(8);
      expect(parseInt(parts[0], 16)).toBeLessThanOrEqual(65535);
      expect(parseInt(parts[1], 16)).toBeLessThanOrEqual(65535);
      expect(parseInt(parts[2], 16)).toBeLessThanOrEqual(65535);
      expect(parseInt(parts[3], 16)).toBeLessThanOrEqual(65535);
      expect(parseInt(parts[4], 16)).toBeLessThanOrEqual(65535);
      expect(parseInt(parts[5], 16)).toBeLessThanOrEqual(65535);
      expect(parseInt(parts[6], 16)).toBeLessThanOrEqual(65535);
      expect(parseInt(parts[7], 16)).toBeLessThanOrEqual(65535);
    });
  });

  describe('protocol', () => {
    it('returns a random protocol', () => {
      const internet = new Internet();
      const protocol = internet.protocol();

      expect(protocols).toEqual(expect.arrayContaining([protocol]));
    });
  });
});
