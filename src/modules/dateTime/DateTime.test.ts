import { DateTime } from './DateTime';

describe('DateTime', () => {
  describe('when creating a DateTime instance', () => {
    it("doesn't throw an error", () => {
      expect(() => new DateTime()).not.toThrow();
    });

    it('returns a Internet instance', () => {
      expect(new DateTime()).toBeInstanceOf(DateTime);
    });
  });

  describe('past', () => {
    it('returns deterministic results when seeded with integer', () => {
      const dateTime = new DateTime();
      dateTime.initSeed(10);

      expect(
        dateTime.past({ dateReference: '2021-01-18T00:08:35.963Z' }).getTime()
      ).toBe(1586604147932);
    });

    it('returns a date at least 1 year into the past by default', () => {
      const dateTime = new DateTime();
      const date = dateTime.past();
      const now = new Date();
      const past = new Date(now.getTime());
      past.setTime(now.getTime() - 365 * 24 * 3600 * 1000);

      expect(date.getTime()).toBeLessThan(now.getTime());
      expect(date.getTime()).toBeGreaterThan(past.getTime());
    });

    it('returns a date at least N years into the past', () => {
      const dateTime = new DateTime();
      const date = dateTime.past(75);
      const now = new Date();
      const past = new Date(now.getTime());
      past.setTime(now.getTime() - 75 * 365 * 24 * 3600 * 1000);

      expect(date.getTime()).toBeLessThan(now.getTime());
      expect(date.getTime()).toBeGreaterThan(past.getTime());
    });

    it('returns a date N years before the date given', () => {
      const dateTime = new DateTime();
      const dateReference = new Date(2120, 11, 9, 10, 0, 0, 0);
      const past = new Date();
      past.setTime(dateReference.getTime() - 75 * 365 * 24 * 3600 * 1000);
      const date = dateTime.past({ years: 75, dateReference });

      expect(date.getTime()).toBeLessThan(dateReference.getTime());
      expect(date.getTime()).toBeGreaterThan(past.getTime());
    });

    it('returns a date N days from the recent past', () => {
      const dateTime = new DateTime();
      const now = new Date();
      const date = dateTime.past({ days: 30, years: 0 });

      expect(date.getTime()).toBeLessThan(now.getTime());
    });

    it('returns a date N days from the recent past, starting from date given', () => {
      const dateTime = new DateTime();
      const dateReference = new Date(2120, 11, 9, 10, 0, 0, 0);
      const past = new Date();
      past.setTime(dateReference.getTime() - 30 * 24 * 3600 * 1000);
      const date = dateTime.past({ days: 30, years: 0, dateReference });

      expect(date.getTime()).toBeLessThan(dateReference.getTime());
      expect(date.getTime()).toBeGreaterThan(past.getTime());
    });
  });

  describe('future()', () => {
    it('returns deterministic results when seeded with integer', () => {
      const dateTime = new DateTime();
      dateTime.initSeed(10);

      expect(
        dateTime.future({ dateReference: '2021-01-18T00:08:35.963Z' }).getTime()
      ).toBe(1635252883994);
    });

    it('returns a date at least 1 year into the future by default', () => {
      const dateTime = new DateTime();
      const date = dateTime.future();
      const now = new Date();
      const future = new Date(now.getTime());
      future.setTime(now.getTime() + 365 * 24 * 3600 * 1000);

      expect(date.getTime()).toBeGreaterThan(now.getTime());
      expect(date.getTime()).toBeLessThan(future.getTime());
    });

    it('returns a date at least N years into the future', () => {
      const dateTime = new DateTime();
      const date = dateTime.future(75);
      const now = new Date();
      const future = new Date(now.getTime());
      future.setTime(now.getTime() + 75 * 365 * 24 * 3600 * 1000);

      expect(date.getTime()).toBeGreaterThan(now.getTime());
      expect(date.getTime()).toBeLessThan(future.getTime());
    });

    it('returns a date N years after the date given', () => {
      const dateTime = new DateTime();
      const dateReference = new Date(1880, 11, 9, 10, 0, 0, 0);
      const future = new Date();
      future.setTime(dateReference.getTime() + 75 * 365 * 24 * 3600 * 1000);
      const date = dateTime.future({ years: 75, dateReference });

      expect(date.getTime()).toBeGreaterThan(dateReference.getTime());
      expect(date.getTime()).toBeLessThan(future.getTime());
    });

    it('returns a date N days into the future', () => {
      const dateTime = new DateTime();
      const now = new Date();
      const date = dateTime.future({ days: 30, years: 0 });

      expect(date.getTime()).toBeGreaterThan(now.getTime());
    });

    it('returns a date N days from the recent future, starting from date given', () => {
      const dateTime = new DateTime();
      const dateReference = new Date(1880, 11, 9, 10, 0, 0, 0);
      const future = new Date();
      future.setTime(dateReference.getTime() + 30 * 24 * 3600 * 1000);
      const date = dateTime.future({ days: 30, years: 0, dateReference });

      expect(date.getTime()).toBeGreaterThan(dateReference.getTime());
      expect(date.getTime()).toBeLessThan(future.getTime());
    });
  });
});
