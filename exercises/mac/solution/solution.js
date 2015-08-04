var crypto = require('crypto');
var key = 'MACsecret';
var text = 'This is a text file.';
var hmac = crypto.createHmac('sha256', key);
hmac.update(text);
console.log(hmac.digest().toString('hex'));
