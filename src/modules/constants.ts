const bannedVehicleVinLetters = ['O', 'I', 'Q'];

const numberStrings = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const uppercaseHexadecimalLetters = ['A', 'B', 'C', 'D', 'E', 'F'];

const vehicleVinLetters = [
  ...uppercaseHexadecimalLetters,
  'G',
  'H',
  'J',
  'K',
  'L',
  'M',
  'N',
  'P',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

const vehicleVinAlphaNumerics = [...vehicleVinLetters, ...numberStrings];

export {
  bannedVehicleVinLetters,
  numberStrings,
  uppercaseHexadecimalLetters,
  vehicleVinAlphaNumerics,
  vehicleVinLetters
};
