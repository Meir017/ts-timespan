# ts-timespan

[![CircleCI](https://circleci.com/gh/Meir017/ts-timespan/tree/master.svg?style=svg)](https://circleci.com/gh/Meir017/ts-timespan/tree/master)
[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]

TimeSpan library inspired by C#'s TimeSpan

## install

```bash
npm install ts-timespan
```

## usage
```js
const { TimeSpan } = require('ts-timespan');

const time1 = new TimeSpan(5643132 /* ticks */);
const time2 = new TimeSpan([8,30,1] /* [hours, minutes, seconds] */);
const time3 = new TimeSpan([12,8,30,1] /* [days, hours, minutes, seconds] */);
const time4 = new TimeSpan([12,8,30,1, 250] /* [days, hours, minutes, seconds, milliseconds] */);

const time5 = TimeSpan.fromDays(4);
const time6 = TimeSpan.fromHours(4);
const time7 = TimeSpan.fromMinutes(4);
const time8 = TimeSpan.fromSeconds(4);
const time9 = TimeSpan.fromMilliseconds(4);

console.info(time1.ticks); // 5643132
console.info(time3.days); // 12
console.info(time2.hours); // 8
console.info(time4.minutes); // 30
console.info(time4.seconds); // 1
console.info(time4.milliseconds); // 250

console.info(time4.toString()); // 12:08:30:01.250
```

[npm-image]: https://img.shields.io/npm/v/ts-timespan.svg
[npm-url]: https://npmjs.org/package/ts-timespan
[downloads-image]: https://img.shields.io/npm/dm/ts-timespan.svg
[downloads-url]: https://npmjs.org/package/ts-timespan