const Exercise = require('workshopper-exercise');
const filecheck = require('workshopper-exercise/filecheck');
const execute = require('workshopper-exercise/execute');
const comparestdout = require('workshopper-exercise/comparestdout');
const through2 = require('through2');
const crypto = require('crypto');
const fs = require('fs');
var private_key = fs.readFileSync(__dirname + '/rsa_private.key');

var ecdh = crypto.createECDH('prime256v1');
var my_public_key = ecdh.generateKeys('hex');

var rand = Math.random();
var tamper = false;
var sign = crypto.createSign('RSA-SHA256');
sign.update(my_public_key);
var digital_signature = sign.sign(private_key, 'hex');

if (rand > 0.5) {
  tamper = true;
  var a = my_public_key.slice(0, 2);
  var b = my_public_key.slice(2);
  my_public_key = b + a;
}

var exercise = new Exercise();
exercise = filecheck(exercise);
exercise = execute(exercise);

exercise.addSetup(function (mode, callback) {
  this.submissionArgs = [my_public_key, digital_signature];
  this.solutionArgs = [my_public_key, digital_signature];
  process.nextTick(callback);
});

exercise = comparestdout(exercise);

module.exports = exercise;
