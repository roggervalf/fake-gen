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

**Example:**

```js
const { Random } = require('fake-gen');

const random = new Random();

console.log(random.number(100));
// expects a random number from 0 to 100

random.initSeed(100);
console.log(random.number(100));
// expects a 54
```

## Article

[How to build a Deno module](https://medium.com/@rogger.valverde/how-to-build-a-deno-module-dc383eee8edb)

## Contributing

Fork the repo, make some changes, submit a pull-request! Here is the [contributing](contributing.md) doc that has some details.

## License

MIT © [roggervalf](https://github.com/roggervalf)
