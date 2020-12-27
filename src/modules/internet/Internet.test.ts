import { Internet } from './Internet';
import { avatarUris } from './definitions';

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
});
