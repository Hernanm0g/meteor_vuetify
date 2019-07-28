var charsets = require('password-sheriff').charsets;

var upperCase = charsets.upperCase;
var lowerCase = charsets.lowerCase;
var numbers = charsets.numbers;
var specialCharacters = charsets.specialCharacters;

var policies = {
  none: {
    length: { minLength: 1 }
  },
  low: {
    length: { minLength: 6 }
  },
  fair: {
    length: { minLength: 8 },
    contains: {
      expressions: [lowerCase, upperCase, numbers]
    }
  },
  good: {
    length: { minLength: 8 },
    containsAtLeast: {
      atLeast: 3,
      expressions: [lowerCase, upperCase, numbers, specialCharacters]
    }
  },
  excellent: {
    length: { minLength: 10 },
    containsAtLeast: {
      atLeast: 3,
      expressions: [lowerCase, upperCase, numbers, specialCharacters]
    },
    identicalChars: { max: 2 }
  }
};

module.exports = policies;
