import { Random } from './Random';

describe('Random', () => {
  describe('when creating a Random instance', () => {
    it("doesn't throw an error", () => {
      expect(() => new Random()).not.toThrow();
    });

    it('returns a Random instance', () => {
      expect(new Random()).toBeInstanceOf(Random);
    });
  });

  describe('alpha', () => {
    it('returns single lowercase letter when no options are provided', () => {
      const random = new Random();
      const letter = random.alpha();

      expect(letter.length).toBe(1);
      expect(letter).toMatch(/[a-z]/);
    });

    it('returns single uppercase letter when uppercase option is true', () => {
      const random = new Random();
      const letter = random.alpha({ uppercase: true });

      expect(letter.length).toBe(1);
      expect(letter).toMatch(/[A-Z]/);
    });

    describe('when count options is provided', () => {
      describe('when count is passed as number', () => {
        it('generates many random letters', () => {
          const random = new Random();
          const letters = random.alpha(5);

          expect(letters.length).toBe(5);
          expect(letters).toMatch(/[a-z]{5}/);
        });
      });

      describe('when count is passed as part of options object', () => {
        it('generates many random letters', () => {
          const random = new Random();
          const letters = random.alpha({ count: 5 });

          expect(letters.length).toBe(5);
          expect(letters).toMatch(/[a-z]{5}/);
        });
      });
    });
  });

  describe('alphaNumeric', () => {
    it('returns single lowercase alpha numeric character when no options are provided', () => {
      const random = new Random();
      const alphaNumeric = random.alphaNumeric();

      expect(alphaNumeric.length).toBe(1);
      expect(alphaNumeric).toMatch(/([a-z0-9])/);
    });

    it('returns single uppercase alpha numeric character when uppercase option is true', () => {
      const random = new Random();
      const alphaNumeric = random.alphaNumeric({ uppercase: true });

      expect(alphaNumeric.length).toBe(1);
      expect(alphaNumeric).toMatch(/[A-Z0-9]/);
    });

    describe('when count options is provided', () => {
      describe('when count is passed as number', () => {
        it('generates many random letters', () => {
          const random = new Random();
          const alphaNumerics = random.alphaNumeric(5);

          expect(alphaNumerics.length).toBe(5);
          expect(alphaNumerics).toMatch(/[a-z0-9]{5}/);
        });
      });

      describe('when count is passed as part of options object', () => {
        it('generates many random letters', () => {
          const random = new Random();
          const alphaNumerics = random.alphaNumeric({ count: 5 });

          expect(alphaNumerics.length).toBe(5);
          expect(alphaNumerics).toMatch(/[a-z0-9]{5}/);
        });
      });
    });
  });

  describe('arrayElement', () => {
    it('returns a random element in the default array', () => {
      const random = new Random();
      const defaultArray = ['a', 'b', 'c'];

      expect(defaultArray).toEqual(
        expect.arrayContaining([random.arrayElement()])
      );
    });

    it('returns a random element in the array', () => {
      const random = new Random();
      const testArray = ['hello', 'to', 'you', 'my', 'friend'];

      expect(testArray).toEqual(
        expect.arrayContaining([random.arrayElement(testArray)])
      );
    });

    it('returns a random element in the array when there is only 1', () => {
      const random = new Random();
      const testArray = ['hello'];

      expect(testArray).toEqual(
        expect.arrayContaining([random.arrayElement(testArray)])
      );
    });
  });

  describe('boolean', () => {
    it('should generate a boolean value', () => {
      const random = new Random();
      const bool = random.boolean();

      expect(typeof bool === 'boolean');
    });
  });

  describe('float', () => {
    it('returns a random float with a default precision value (0.01)', () => {
      const random = new Random();
      const number = random.float();

      expect(number).toBe(Number(number.toFixed(2)));
    });

    it('returns a random float given a precision value', () => {
      const random = new Random();
      const number = random.float(0.001);

      expect(number).toBe(Number(number.toFixed(3)));
    });

    it('returns a random number given a maximum value as Object', () => {
      const random = new Random();
      const options = { max: 10 };

      expect(random.float(options)).toBeLessThanOrEqual(options.max);
    });

    it('returns a random number given a maximum value of 0', () => {
      const random = new Random();
      const options = { max: 0 };

      expect(random.float(options)).toBe(0);
    });

    it('returns a random number given a negative number minimum and maximum value of 0', () => {
      const random = new Random();
      const options = { min: -100, max: 0 };

      expect(random.float(options)).toBeLessThanOrEqual(options.max);
    });

    it('returns a random number between a range', () => {
      const random = new Random();
      const options = { min: 22, max: 33 };

      for (let i = 0; i < 5; i++) {
        const randomNumber = random.float(options);

        expect(randomNumber).toBeGreaterThanOrEqual(options.min);
        expect(randomNumber).toBeLessThanOrEqual(options.max);
      }
    });

    it('provides numbers with a given precision', () => {
      const random = new Random();
      const options = { min: 0, max: 1.5, precision: 0.5 };
      const results = Array.from(Array(50).keys()).map(() =>
        random.float(options)
      );

      expect(results).toEqual(expect.arrayContaining([0.5]));
      expect(results).toEqual(expect.arrayContaining([1.0]));
      expect(results).toEqual(expect.arrayContaining([0.0]));
      expect(results).toEqual(expect.arrayContaining([1.5]));
    });

    it('provides numbers with a with exact precision', () => {
      const random = new Random();
      const options = { min: 0.5, max: 0.99, precision: 0.01 };

      for (let i = 0; i < 100; i++) {
        const number = random.float(options);

        expect(number).toBe(Number(number.toFixed(2)));
      }
    });

    it('should not modify the input object', () => {
      const random = new Random();
      const min = 1;
      const max = 2;
      const precision = 0.2;
      const opts = {
        min,
        max,
        precision
      };
      random.float(opts);

      expect(opts.min).toBe(min);
      expect(opts.max).toBe(max);
      expect(opts.precision).toBe(precision);
    });
  });

  describe('hexadecimal', () => {
    it('returns single lowercase hexadecimal expression when no options are provided', () => {
      const random = new Random();
      const hexadecimal = random.hexadecimal();

      expect(hexadecimal.length).toBe(3);
      expect(hexadecimal).toMatch(/0x[0-9a-f]/);
    });

    it('returns single uppercase hexadecimal expression when uppercase option is true', () => {
      const random = new Random();
      const hexadecimal = random.hexadecimal({ uppercase: true });

      expect(hexadecimal.length).toBe(3);
      expect(hexadecimal).toMatch(/0X[0-9A-F]/);
    });

    it('returns single uppercase hexadecimal letter when prefix option is false', () => {
      const random = new Random();
      const hexadecimal = random.hexadecimal({ prefix: false });

      expect(hexadecimal.length).toBe(1);
      expect(hexadecimal).toMatch(/[0-9a-f]/);
    });

    describe('when count options is provided', () => {
      describe('when count is passed as number', () => {
        it('generates many random letters', () => {
          const random = new Random();
          const hexadecimal = random.hexadecimal(4);

          expect(hexadecimal.length).toBe(6);
          expect(hexadecimal).toMatch(/0x[0-9a-f]{4}/);
        });
      });

      describe('when count is passed as part of options object', () => {
        it('generates many random letters', () => {
          const random = new Random();
          const hexadecimal = random.hexadecimal({ count: 4 });

          expect(hexadecimal.length).toBe(6);
          expect(hexadecimal).toMatch(/0x[0-9a-f]{4}/);
        });
      });
    });
  });

  describe('number', () => {
    it('returns a random number with default values', () => {
      const random = new Random();
      const number = random.number();

      expect(number).toBeLessThanOrEqual(99999);
      expect(number).toBeGreaterThanOrEqual(0);
    });

    it('returns a random number given a maximum value as Number', () => {
      const random = new Random();
      const max = 10;

      expect(random.number(max)).toBeLessThanOrEqual(max);
    });

    it('returns a random number given a maximum value as Object', () => {
      const random = new Random();
      const options = { max: 10 };

      expect(random.number(options)).toBeLessThanOrEqual(options.max);
    });

    it('returns a random number given a maximum value of 0', () => {
      const random = new Random();
      const options = { max: 0 };

      expect(random.number(options)).toBe(0);
    });

    it('returns a random number given a negative number minimum and maximum value of 0', () => {
      const random = new Random();
      const options = { min: -100, max: 0 };

      expect(random.number(options)).toBeLessThanOrEqual(options.max);
    });

    it('returns a random number given a negative number minimum and negative maximum value', () => {
      const random = new Random();
      const options = { min: -100, max: -10 };

      expect(random.number(options)).toBeLessThanOrEqual(options.max);
    });

    it('returns a random number between a range', () => {
      const random = new Random();
      const options = { min: 22, max: 33 };

      for (let i = 0; i < 100; i++) {
        const randomNumber = random.number(options);

        expect(randomNumber).toBeGreaterThanOrEqual(options.min);
        expect(randomNumber).toBeLessThanOrEqual(options.max);
      }
    });

    it('provides numbers with a given precision', () => {
      const random = new Random();
      const options = { min: 0, max: 1.5, precision: 0.5 };
      const results = Array.from(Array(50).keys()).map(() =>
        random.number(options)
      );

      expect(results).toEqual(expect.arrayContaining([0.5]));
      expect(results).toEqual(expect.arrayContaining([1.0]));
      expect(results).toEqual(expect.arrayContaining([0.0]));
      expect(results).toEqual(expect.arrayContaining([1.5]));
    });

    it('provides numbers with a with exact precision', () => {
      const random = new Random();
      const options = { min: 0.5, max: 0.99, precision: 0.01 };

      for (let i = 0; i < 100; i++) {
        const number = random.number(options);

        expect(number).toBe(Number(number.toFixed(2)));
      }
    });

    it('should not modify the input object', () => {
      const random = new Random();
      const min = 1;
      const max = 2;
      const precision = 0.5;
      const opts = {
        min,
        max,
        precision
      };
      random.number(opts);

      expect(opts.min).toBe(min);
      expect(opts.max).toBe(max);
      expect(opts.precision).toBe(precision);
    });

    it('should return deterministic results when seeded with integer', () => {
      const random = new Random();
      random.initSeed(100);

      expect(random.number(100)).toBe(54);
    });
  });

  describe('uuid', () => {
    it('should generate a valid UUID', () => {
      const random = new Random();
      const uuid = random.uuid();
      const RFC4122 = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

      expect(RFC4122.test(uuid)).toEqual(true);
    });
  });
});
