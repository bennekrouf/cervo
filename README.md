# cervo

__Easy-to-use__ node js server. It is abstracting express ___plumber___. It offers basic but sufficient authentication features based on token.


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
It based on token. Credentials (users/passwords) are stored in a database. The workflow is the following :
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
--- | --- | ---
[POST] `/signup` | create new user connexion | signup?name=[user_name]&password=[password]
[GET] `/api/` | root of secured endpoints |
[GET] `/api/users` | list of users |
[POST] `/api/authenticate` | signin requires *name* and *password* in the request header |




## Todo
- Unit test
- Embeded sqlite for storing users
- Encapsulate express router to be able to add routes
- Encapsulate mongoose API to be able to add entities
- Add secured and non secured APIs
- Redis plugin
