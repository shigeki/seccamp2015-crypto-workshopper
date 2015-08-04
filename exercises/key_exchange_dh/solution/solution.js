var crypto = require('crypto');
var other_public_key = process.argv[2];

var dh = crypto.getDiffieHellman('modp2');
var my_public_key = dh.generateKeys('hex');
var shared_key = dh.computeSecret(other_public_key, 'hex', 'hex');
var json = {
  public_key: my_public_key,
  shared_key: shared_key
};
console.log(JSON.stringify(json));
