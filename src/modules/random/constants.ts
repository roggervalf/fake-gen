import {
  bannedVehicleVinLetters,
  numberStrings,
  uppercaseHexadecimalLetters,
  vehicleVinLetters
} from '../constants';

const lowercaseHexadecimalLetters = ['a', 'b', 'c', 'd', 'e', 'f'];

const lowercaseLetters = [
  ...lowercaseHexadecimalLetters,
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

const uppercaseLetters = [...bannedVehicleVinLetters, ...vehicleVinLetters];

const lowercaseAlphaNumeric = [...numberStrings, ...lowercaseLetters];

const lowercaseHexadecimal = [...numberStrings, ...lowercaseHexadecimalLetters];

const uppercaseAlphaNumeric = [...numberStrings, ...uppercaseLetters];

const uppercaseHexadecimal = [...numberStrings, ...uppercaseHexadecimalLetters];

const RFC4122_TEMPLATE = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';

export {
  lowercaseAlphaNumeric,
  lowercaseHexadecimal,
  lowercaseLetters,
  RFC4122_TEMPLATE,
  uppercaseAlphaNumeric,
  uppercaseHexadecimal,
  uppercaseLetters
};
