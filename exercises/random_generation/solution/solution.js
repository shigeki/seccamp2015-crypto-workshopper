const http = require('http');
const crypto = require('crypto');
const size = parseInt(process.argv[2]);
var rand = crypto.randomBytes(size);
console.log(rand.toString('hex'));
