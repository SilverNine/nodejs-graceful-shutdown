# nodejs-graceful-shutdown

Gracefully shuts down [node.js][nodejs-url] http server.

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Git Issues][issues-img]][issues-url]
[![Closed Issues][closed-issues-img]][closed-issues-url]
[![MIT license][license-img]][license-url]

- simple to use
- configurable to your needs
- add your own cleanup function
- the project referred to "https://github.com/sebhildebrandt/http-graceful-shutdown" and tried to improve it further.

## Quick Start

### Installation

```bash
$ npm install nodejs-graceful-shutdown
```

### Basic Usage

```js
var gracefulShutdown = require('nodejs-graceful-shutdown');
...
// app: can be http, https, express, koa
server = app.listen(...);
...

// this enables the graceful shutdown
gracefulShutdown(server);
```

### Advanced Options

You can pass an options-object to specify your specific options for the graceful shutdown

The following example uses all possible options (using more or less the default settings):

```js
const gracefulShutdown = require('nodejs-graceful-shutdown');
...
// app: can be http, https, express, koa
server = app.listen(...);
...

// your personal cleanup function
// - must return a promise
// - the input parameter is optional (only needed if you want to
//   access the signal type inside this function)
// - this function here in this example takes one second to complete
function cleanup(signal) {
  return new Promise((resolve) => {
	console.log('... called signal: ', signal);
  	console.log('... in cleanup')
  	setTimeout(function() {
  		console.log('... cleanup finished');
  		resolve();
  	}, 1000)
  });
}

// this enables the graceful shutdown with advanced options
gracefulShutdown(server,
	{
		signals: 'SIGINT SIGTERM',
		timeout: 30000,
		development: false,
		onShutdown: cleanup,
		finally: function() {
			console.log('Server gracefulls shutted down.....')
		}
	}
);
```

### Trigger shutdown manually

You can now trigger gracefulShutdown programatically (e.g. for tests) like so:

```js
let shutdown
beforeAll(() => {
  shutdown = gracefulShutdown(...)
})

afterAll(async () => {
  await shutdown()
})
```

### Major (breaking) Changes - Version 2

- **renamed** option: `callback`: now to `finally`: place your (not time consuming) function, that will be handled at the end of the shutdown (not in dev-mode)
- **new** option: `onShutdown`: place your function, that will handle your additional cleanup things. Needs to return a promise

### Option Reference

| option      | default          | Comments                                                                                                                                                                                                                                                                                                 |
| ----------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| signals     | 'SIGINT SIGTERM' | define the signals, that should be handled (separated by SPACE)                                                                                                                                                                                                                                          |
| timeout     | 30000            | timeout till forced shutdown (in milli seconds)                                                                                                                                                                                                                                                          |
| development | false            | if set to true, no graceful shutdown is proceeded to speed up dev-process                                                                                                                                                                                                                                |
| onShutdown  | -                | place your (not time consuming) callback function, that will<br>handle your additional cleanup things. Needs to return a promise.<br><br>If you add an input parameter to your cleanup function (optional),<br>the signal type that caused the shutdown is passed to your<br>cleanup function - example. |
| finally     | -                | here you can place a small (not time consuming) function, that will<br>be handled at the end of the shutdown (not in dev-mode)                                                                                                                                                                           |

### Debug

If you want to get debug notes ([debug][debug-url] is a dependency of this module), just set the DEBUG environment variable to enable
debugging:

```
export DEBUG=nodejs-graceful-shutdown
```

OR on Windows:

```
set DEBUG=nodejs-graceful-shutdown
```

## Version history

| Version | Date       | Comment         |
| ------- | ---------- | --------------- |
| 1.0.0   | 2015-09-14 | initial release |

[npm-image]: https://img.shields.io/npm/v/nodejs-graceful-shutdown.svg?style=flat-square
[npm-url]: https://npmjs.org/package/nodejs-graceful-shutdown
[downloads-image]: https://img.shields.io/npm/dm/nodejs-graceful-shutdown.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/nodejs-graceful-shutdown
[license-url]: https://github.com/silvernine/nodejs-graceful-shutdown/blob/master/LICENSE
[license-img]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[npmjs-license]: https://img.shields.io/npm/l/nodejs-graceful-shutdown.svg?style=flat-square
[nodejs-url]: https://nodejs.org/en/
[express-url]: https://github.com/strongloop/expressjs.com
[koa-url]: https://github.com/koajs/koa
[http-url]: https://nodejs.org/api/http.html
[debug-url]: https://github.com/visionmedia/debug
[issues-img]: https://img.shields.io/github/issues/silvernine/nodejs-graceful-shutdown.svg?style=flat-square
[issues-url]: https://github.com/silvernine/nodejs-graceful-shutdown/issues
[closed-issues-img]: https://img.shields.io/github/issues-closed-raw/silvernine/nodejs-graceful-shutdown.svg?style=flat-square
[closed-issues-url]: https://github.com/silvernine/nodejs-graceful-shutdown/issues?q=is%3Aissue+is%3Aclosed
