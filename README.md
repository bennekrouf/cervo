# Cervo

__Easy-to-use__ [node](http://nodejs.org) server. It is abstracting express plumbing and offers basic but sufficient authentication features based on token. It is intended to be used by IOT.
You can easily add custom endpoints, public or secured ones.

Code and examples uses ES6 syntaxes.



[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Build][travis-image]][travis-url]


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


## Core API

Endpoint | Description | Example
---- | --- | ---
[POST] `/public/authenticate` | create a user/connexion | signup?name=[user_name]&password=[password]
[GET] `/secured/` | root of secured endpoints |
[GET] `/secured/users` | list of users |
[POST] `/secured/signin` | signin requires *name* and *password* in the request header |

## Custom endpoints

You can define your own endpoints :

```javascript
let cervo = new Cervo({});
cervo.get('/books', function(){
  res.send(...); // Add the code that get the list of books
});
cervo.run();

```

By default custom endpoints are public and are hosted under /public.

### Secured endpoints

You can define secured endpoints only available for authentified clients :

```javascript
let cervo = new Cervo({});
cervo.pget('/books', function(){ // pget for private get
  res.send(...); // Add the code that get the list of books
});
cervo.run();
```


## Todo
- Embedded sqlite for storing users
- Encapsulate mongoose API to be able to add entities
- Auto-sugested token for marketing usages



[npm-image]: https://img.shields.io/npm/v/cervo.svg
[npm-url]: https://npmjs.org/package/cervo
[downloads-image]: https://img.shields.io/npm/dm/cervo.svg
[downloads-url]: https://npmjs.org/package/cervo
[travis-image]: https://img.shields.io/travis/bennekrouf/cervo/master.svg?label=build
[travis-url]: https://travis-ci.org/bennekrouf/cervo
[coveralls-image]: https://img.shields.io/coveralls/bennekrouf/cervo/master.svg
[coveralls-url]: https://coveralls.io/github/bennekrouf/cervo?branch=master
