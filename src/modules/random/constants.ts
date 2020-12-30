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

const uppercaseHexadecimalLetters = ['A', 'B', 'C', 'D', 'E', 'F'];

const uppercaseLetters = [
  ...uppercaseHexadecimalLetters,
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
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

const numberStrings = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

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