# fake-gen

[![NPM](https://img.shields.io/npm/v/fake-gen.svg)](https://www.npmjs.com/package/fake-gen) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier) [![Build Status](https://travis-ci.com/roggervalf/fake-gen.svg?branch=master)](https://travis-ci.com/roggervalf/fake-gen) [![NPM downloads](https://img.shields.io/npm/dm/fake-gen)](https://www.npmjs.com/package/fake-gen) [![Coverage Status](https://coveralls.io/repos/github/roggervalf/fake-gen/badge.svg?branch=master)](https://coveralls.io/github/roggervalf/fake-gen?branch=master) [![deno doc](https://doc.deno.land/badge.svg)](https://deno.land/x/fake_gen) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## About

Faker data generator, progressive refactor from [faker](https://www.npmjs.com/package/faker)

## Install

```bash
npm install --save fake-gen
```

Or

```bash
yarn add fake-gen
```

## Deno import

```ts
// @deno-types="https://raw.githubusercontent.com/roggervalf/fake_gen/master/dist/main.d.ts"
import {
  DateTime,
  Internet,
  Random,
  Unique,
  Vehicle
} from 'https://raw.githubusercontent.com/roggervalf/fake_gen/master/dist/main.es.js';
```

or

```ts
// @deno-types="https://deno.land/x/fake_gen@master/dist/main.d.ts"
import {
  DateTime,
  Internet,
  Random,
  Unique,
  Vehicle
} from 'https://deno.land/x/fake_gen@master/dist/main.es.js';
```

## Node import

```js
import { DateTime, Internet, Random, Unique, Vehicle } from 'fake-gen';
```

**Example:**

```js
const { DateTime, Internet, Random, Unique, Vehicle } = require('fake-gen');

const dateTime = new DateTime();

console.log(dateTime.past());
// expects a random date instance between 1 year in the past and now

console.log(dateTime.future());
// expects a random date instance between 1 year in the future and now

const random = new Random();

console.log(random.alpha());
// expects a random character from 'a' to 'z'

console.log(random.alphaNumeric());
// expects a random character from 'a' to 'z' or '0' to '9'

console.log(random.arrayElement([1, 2, 3]));
// expects a random element from the provided array, i.e: 2

console.log(random.boolean());
// expects a random boolean, i.e: false

console.log(random.float());
// expects a random float number, i.e: 43173.42

console.log(random.hexadecimal());
// expects a random hexadecimal expression, i.e: 0xF

console.log(random.number(100));
// expects a random number from 0 to 100

console.log(random.uuid());
// expects a random uuid, i.e: 49e71c40-9b21-4371-9699-2def33f62e66

random.initSeed(100);
console.log(random.number(100));
// expects a 54

const internet = new Internet();

console.log(internet.avatar());
// expects a random avatar uri, i.e: https://randomuser.me/api/portraits/women/54.jpg

console.log(internet.ip());
// expects a random ip, i.e: 200.105.198.100

console.log(internet.protocol());
// expects a random ip, i.e: https

const vehicle = new Vehicle();

console.log(vehicle.vin());
// expects a random vehicle identification number, i.e: YV1MH682762184654

console.log(vehicle.vrm());
// expects a random vehicle registration mark, i.e: GL19AAQ

const unique = new Unique();

console.log(
  unique.execute({
    scope: 'scope',
    method: random.arrayElement,
    args: [[1, 2, 3]],
    model: random
  })
);
// expects a random unique value from arrayElement function, scoped by 'scope' string, i.e: 1
```

## Methods

- dateTime
  - future
  - past
- internet
  - avatar
  - ip
  - protocol
- random
  - alpha
  - alphaNumeric
  - arrayElement
  - boolean
  - float
  - hexadecimal
  - number
  - uuid
- unique
  - clear
  - execute
- vehicle
  - vin
  - vrm

## Article

[How to build a Deno module](https://medium.com/@rogger.valverde/how-to-build-a-deno-module-dc383eee8edb)

## Contributing

Fork the repo, make some changes, submit a pull-request! Here is the [contributing](contributing.md) doc that has some details.

## License

MIT © [roggervalf](https://github.com/roggervalf)
