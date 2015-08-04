const http = require('http');
const crypto = require('crypto');

const public_key_der = new Buffer(process.argv[2], 'hex');

function Encrypt(plain, public_key) {
  var key = {key: public_key, padding: require('constants').RSA_PKCS1_PADDING};
  var cryptedtext = crypto.publicEncrypt(key, plain);
  return cryptedtext;
}

var plain = new Buffer('This is my secret');
var public_key = fromDERtoPEM(public_key_der, 'public_key');
var crypted = Encrypt(plain, public_key);
console.log(crypted.toString('base64'));

function fromDERtoPEM(data, type) {
  var begin;
  var end;
  switch(type) {
    case 'public_key':
    begin = '-----BEGIN PUBLIC KEY-----\n';
    end = '-----END PUBLIC KEY-----\n';
    break;
    case 'certificate':
    begin = '-----BEGIN CERTIFICATE-----\n';
    end = '-----END CERTIFICATE-----\n';
    break;
  }
  var encode = data.toString('base64');
  var ret = '';
  for(var i = 0; i < encode.length; i += 64) {
    var a = encode.slice(i, i + 64);
    ret += (a + '\n');
  }
  return begin + ret  + end;
};
