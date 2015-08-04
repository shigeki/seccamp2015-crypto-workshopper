var crypto = require('crypto');
var other_public_key = process.argv[2];

var ecdh = crypto.createECDH('prime256v1');
var my_public_key = ecdh.generateKeys('hex');
var shared_key = ecdh.computeSecret(other_public_key, 'hex', 'hex');
var json = {
  public_key: my_public_key,
  shared_key: shared_key
};
console.log(JSON.stringify(json));
