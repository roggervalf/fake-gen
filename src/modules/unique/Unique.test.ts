import { Unique } from './Unique';
import { Random } from '../random/Random';

describe('Unique', () => {
  describe('when using execute method', () => {
    it('returns unique values', async () => {
      const unique = new Unique<number | string, Random>();
      const random = new Random();
      const testArray = [1, 2, 3];

      expect(testArray).toEqual(
        expect.arrayContaining([
          unique.execute('scope1', random.arrayElement, [testArray], random),
          unique.execute('scope1', random.arrayElement, [testArray], random),
          unique.execute('scope1', random.arrayElement, [testArray], random)
        ])
      );
    });
  });
});
