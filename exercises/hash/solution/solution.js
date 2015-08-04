var crypto = require('crypto');

var text = 'This is a text file.';

var shasum = crypto.createHash('sha256');
shasum.update(text);
console.log(shasum.digest().toString('hex'));
