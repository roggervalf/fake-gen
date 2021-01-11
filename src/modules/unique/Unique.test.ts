import { Unique } from './Unique';
import { Internet } from '../internet/Internet';
import { Random } from '../random/Random';

describe('Unique', () => {
  describe('when creating a Unique instance', () => {
    it("doesn't throw an error", () => {
      expect(() => new Unique()).not.toThrow();
    });

    it('returns a Unique instance', () => {
      expect(new Unique()).toBeInstanceOf(Unique);
    });
  });

  describe('when using execute method', () => {
    it('returns unique values', () => {
      const unique = new Unique<number | string, Random>();
      const random = new Random();
      const testArray = [1, 2, 3];

      expect(testArray).toEqual(
        expect.arrayContaining([
          unique.execute({
            scope: 'scope-a',
            method: random.arrayElement,
            args: [testArray],
            model: random
          }),
          unique.execute({
            scope: 'scope-a',
            method: random.arrayElement,
            args: [testArray],
            model: random
          }),
          unique.execute({
            scope: 'scope-a',
            method: random.arrayElement,
            args: [testArray],
            model: random
          })
        ])
      );
    });

    describe('when scope same function with different strings', () => {
      it('returns unique values per scope', () => {
        const unique = new Unique<number | string, Random>();
        const random = new Random();
        const testArray = [1, 2, 3];

        expect(testArray).toEqual(
          expect.arrayContaining([
            unique.execute({
              scope: 'scope-b',
              method: random.arrayElement,
              args: [testArray],
              model: random
            }),
            unique.execute({
              scope: 'scope-b',
              method: random.arrayElement,
              args: [testArray],
              model: random
            }),
            unique.execute({
              scope: 'scope-b',
              method: random.arrayElement,
              args: [testArray],
              model: random
            })
          ])
        );
        expect(testArray).toEqual(
          expect.arrayContaining([
            unique.execute({
              scope: 'scope-c',
              method: random.arrayElement,
              args: [testArray],
              model: random
            }),
            unique.execute({
              scope: 'scope-c',
              method: random.arrayElement,
              args: [testArray],
              model: random
            }),
            unique.execute({
              scope: 'scope-c',
              method: random.arrayElement,
              args: [testArray],
              model: random
            })
          ])
        );
      });
    });

    describe('when get more values than expected', () => {
      it('throws an error', () => {
        const unique = new Unique<number | string, Internet>();
        const internet = new Internet();
        unique.execute({
          scope: 'scope-d',
          method: internet.protocol,
          model: internet
        });
        unique.execute({
          scope: 'scope-d',
          method: internet.protocol,
          model: internet
        });
        const expectedError = new Error(
          'Exceeded maxRetries: 20' +
            '\nMay not be able to generate any more unique values with current settings.' +
            '\nTry adjusting maxTime or maxRetries parameters.'
        );

        expect(() => {
          unique.execute({
            scope: 'scope-d',
            method: internet.protocol,
            model: internet
          });
        }).toThrow(expectedError);
      });
    });
  });

  describe('when using clear method', () => {
    it('clears the dictionary for that scope', () => {
      const unique = new Unique<number | string, Random>();
      const random = new Random();
      const testArray = [1, 2, 3];
      const firstResult = [
        unique.execute({
          scope: 'scope-e',
          method: random.arrayElement,
          args: [testArray],
          model: random
        }),
        unique.execute({
          scope: 'scope-e',
          method: random.arrayElement,
          args: [testArray],
          model: random
        }),
        unique.execute({
          scope: 'scope-e',
          method: random.arrayElement,
          args: [testArray],
          model: random
        })
      ];
      unique.clear('scope-e');
      const secondResult = [
        unique.execute({
          scope: 'scope-e',
          method: random.arrayElement,
          args: [testArray],
          model: random
        }),
        unique.execute({
          scope: 'scope-e',
          method: random.arrayElement,
          args: [testArray],
          model: random
        }),
        unique.execute({
          scope: 'scope-e',
          method: random.arrayElement,
          args: [testArray],
          model: random
        })
      ];

      expect(testArray).toEqual(expect.arrayContaining(firstResult));
      expect(testArray).toEqual(expect.arrayContaining(secondResult));
    });

    describe('when scope is not provided', () => {
      it('clears all the dictionaries', () => {
        const unique = new Unique<number | string, Random>();
        const random = new Random();
        const testArray = [1, 2, 3];
        const firstResult = [
          unique.execute({
            scope: 'scope-f',
            method: random.arrayElement,
            args: [testArray],
            model: random
          }),
          unique.execute({
            scope: 'scope-f',
            method: random.arrayElement,
            args: [testArray],
            model: random
          }),
          unique.execute({
            scope: 'scope-f',
            method: random.arrayElement,
            args: [testArray],
            model: random
          })
        ];
        const secondResult = [
          unique.execute({
            scope: 'scope-g',
            method: random.arrayElement,
            args: [testArray],
            model: random
          }),
          unique.execute({
            scope: 'scope-g',
            method: random.arrayElement,
            args: [testArray],
            model: random
          }),
          unique.execute({
            scope: 'scope-g',
            method: random.arrayElement,
            args: [testArray],
            model: random
          })
        ];
        unique.clear();
        const thirdResult = [
          unique.execute({
            scope: 'scope-f',
            method: random.arrayElement,
            args: [testArray],
            model: random
          }),
          unique.execute({
            scope: 'scope-f',
            method: random.arrayElement,
            args: [testArray],
            model: random
          }),
          unique.execute({
            scope: 'scope-f',
            method: random.arrayElement,
            args: [testArray],
            model: random
          })
        ];
        const fourthResult = [
          unique.execute({
            scope: 'scope-g',
            method: random.arrayElement,
            args: [testArray],
            model: random
          }),
          unique.execute({
            scope: 'scope-g',
            method: random.arrayElement,
            args: [testArray],
            model: random
          }),
          unique.execute({
            scope: 'scope-g',
            method: random.arrayElement,
            args: [testArray],
            model: random
          })
        ];

        expect(testArray).toEqual(expect.arrayContaining(firstResult));
        expect(testArray).toEqual(expect.arrayContaining(secondResult));
        expect(testArray).toEqual(expect.arrayContaining(thirdResult));
        expect(testArray).toEqual(expect.arrayContaining(fourthResult));
      });
    });

    describe('when scope does not exist', () => {
      it("doesn't throw an error", () => {
        const unique = new Unique();

        expect(() => unique.clear('scope-j')).not.toThrow();
      });
    });
  });

  describe('when exceeding maxTime', () => {
    it('throws an error', () => {
      function identity(): number {
        return 1;
      }
      const unique = new Unique<number, typeof identity>({
        maxRetries: 200,
        maxTime: 0
      });
      const expectedError = new Error(
        'Exceeded maxTime: 0' +
          '\nMay not be able to generate any more unique values with current settings.' +
          '\nTry adjusting maxTime or maxRetries parameters.'
      );

      expect(() => {
        unique.execute({ scope: 'scope-h', method: identity });
      }).toThrow(expectedError);
    });
  });

  describe('when exceeding maxRetries', () => {
    it('throws an error', () => {
      function identity(value: number): number {
        return value;
      }
      const unique = new Unique<number, typeof identity>({ maxRetries: 1 });
      const testArray = [1];
      const expectedError = new Error(
        'Exceeded maxRetries: 1' +
          '\nMay not be able to generate any more unique values with current settings.' +
          '\nTry adjusting maxTime or maxRetries parameters.'
      );
      unique.execute({
        scope: 'scope-i',
        method: identity,
        args: [testArray]
      });

      expect(() => {
        unique.execute({
          scope: 'scope-i',
          method: identity,
          args: [testArray]
        });
      }).toThrow(expectedError);
    });
  });
});
