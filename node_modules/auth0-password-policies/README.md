# auth0-password-policies

Password policies presets used by Auth0. Extracted from [password-sheriff](https://github.com/auth0/password-sheriff).


## Policies

### none
* minimum characters: 1

### low
* minimum characters: 6

### fair
* minimum characters: 8
* contains at least one character in each group: lowerCase, upperCase and numbers

### good
* minimum characters: 8
* contains at least one character in three different groups out of: lowerCase, upperCase, numbers, specialCharacters

### excellent
* minimum characters: 10 
* contains at least one character in three different groups out of: lowerCase, upperCase, numbers, specialCharacters
* may not contain any character repeated more than twice
