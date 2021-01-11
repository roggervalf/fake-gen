import { Vehicle } from './Vehicle';

describe('Vehicle', () => {
  describe('when creating a Vehicle instance', () => {
    it("doesn't throw an error", () => {
      expect(() => new Vehicle()).not.toThrow();
    });

    it('returns a Vehicle instance', () => {
      expect(new Vehicle()).toBeInstanceOf(Vehicle);
    });
  });

  describe('vin', () => {
    it('returns a random vehicle identification number', () => {
      const vehicle = new Vehicle();
      const vehicleVin = vehicle.vin();

      expect(vehicleVin).toMatch(
        /^([A-HJ-NPR-Z0-9]{10}[A-HJ-NPR-Z0-9]{1}[A-HJ-NPR-Z0-9]{1}\d{5})$/
      );
    });

    it('returns deterministic results when seeded with integer', () => {
      const vehicle = new Vehicle(2);
      vehicle.initSeed(10);

      expect(vehicle.vin()).toBe('2KATXR14TWFA27825');
    });
  });

  describe('vin', () => {
    it('returns a random vehicle identification number', () => {
      const vehicle = new Vehicle();
      const vehicleVin = vehicle.vrm();

      expect(vehicleVin).toMatch(/^([A-Z]{2}\d{2}[A-Z]{3})$/);
    });
  });
});
