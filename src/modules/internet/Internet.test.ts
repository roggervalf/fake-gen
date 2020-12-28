import { Internet } from './Internet';
import { avatarUris, protocols } from './definitions';

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

    it('should return deterministic results when seeded with integer', () => {
      const internet = new Internet(1);
      internet.initSeed(10);

      expect(internet.avatar()).toBe(
        'https://randomuser.me/api/portraits/women/54.jpg'
      );
    });
  });

  describe('protocol', () => {
    it('returns a random protocol', () => {
      const internet = new Internet();
      const protocol = internet.protocol();

      expect(protocols).toEqual(expect.arrayContaining([protocol]));
    });

    it('should return deterministic results when seeded with integer', () => {
      const internet = new Internet(1);
      internet.initSeed(10);

      expect(internet.avatar()).toBe(
        'https://randomuser.me/api/portraits/women/54.jpg'
      );
    });
  });
});
