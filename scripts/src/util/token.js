// api/users/util/token.js

'use strict';

const jwt    = require('jsonwebtoken');
const secret = require('../../config/jwt.js');



function createToken(userId) {
  let scopes;
  // Sign the JWT
  return jwt.sign({ _id: userId }, secret, { algorithm: 'HS256', expiresIn: "5h" } );
}

module.exports = {
  createToken : createToken
};