# Cervo

[![Cervo Logo] (lib/img/rsz_30152300-m.jpg)]

__Easy-to-use__ [node](http://nodejs.org) server. It is abstracting express ___plumbing___ and offers basics but sufficient authentication features based on token. It is intended to be used by IOT.

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Build][travis-image]][travis-url]
[![Coverage Status](https://coveralls.io/repos/bennekrouf/cervo/badge.svg?branch=master&service=github)](https://coveralls.io/github/bennekrouf/cervo?branch=master)


## Installation

Requires [nodejs](https://nodejs.org/en/).

```javascript
npm install cervo
```

## How using it ?

```javascript
const Cervo = require('cervo');
let cervo = new Cervo();
cervo.run();
```

### Starting on a specific PORT
```javascript
let cervo = new Cervo({
  port: 3000
});
cervo.run();
```

### Using authentication
It is based on token. Credentials (users/passwords) are stored in a database.
The workflow is the following :

1. Call signin/signup endpoint with user and password
2. The endpoint returns a Token
3. Call secured endpoints by passing the token in the request header with the key ___x-access-token___


#### Store credentials in mongodb
```javascript
let cervo = new Cervo({
	database : 'mongodb://[user]:[password]@[mongo_provider]:[mongo_port]/[db_id]'

});
cervo.run();
```


## API

Endpoint | Description | Example
---- | --- | ---
[POST] `/signup` | create new user connexion | signup?name=[user_name]&password=[password]
[GET] `/api/` | root of secured endpoints |
[GET] `/api/users` | list of users |
[POST] `/api/authenticate` | signin requires *name* and *password* in the request header |




## Todo
- Unit test
- Embedded sqlite for storing users
- Encapsulate express router to be able to add routes
- Encapsulate mongoose API to be able to add entities
- Add secured and non secured APIs
- Token auto-suges



[npm-image]: https://img.shields.io/npm/v/cervo.svg
[npm-url]: https://npmjs.org/package/cervo
[downloads-image]: https://img.shields.io/npm/dm/cervo.svg
[downloads-url]: https://npmjs.org/package/cervo
[travis-image]: https://img.shields.io/travis/bennekrouf/cervo/master.svg?label=linux
[travis-url]: https://travis-ci.org/bennekrouf/cervo
[coveralls-image]: https://img.shields.io/coveralls/bennekrouf/cervo/master.svg
[coveralls-url]: https://coveralls.io/r/bennekrouf/cervo?branch=master
