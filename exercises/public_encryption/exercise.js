const Exercise = require('workshopper-exercise');
const filecheck = require('workshopper-exercise/filecheck');
const execute = require('workshopper-exercise/execute');
const comparestdout = require('workshopper-exercise/comparestdout');
const fs = require('fs');
const crypto = require('crypto');
const through2 = require('through2');

var exercise = new Exercise();
exercise = filecheck(exercise);
exercise = execute(exercise);

var public_key = fs.readFileSync(__dirname + '/rsa_public.pem');
var private_key = fs.readFileSync(__dirname + '/rsa_private.pem');


exercise.addSetup(function (mode, callback) {
  var public_key_der_hex = fromPEMtoDER(public_key).toString('hex');
  this.submissionArgs = [public_key_der_hex];
  this.solutionArgs = [public_key_der_hex];
  process.nextTick(callback);
});

exercise.addProcessor(function (mode, callback) {
  var subStdout_org = this.submissionStdout;
  this.submissionStdout = through2(function (chunk, enc, callback) {
    var plain = Decode(chunk);
    this.push(plain);
    callback();
  });
  subStdout_org.pipe(this.submissionStdout);
  if (mode == 'verify') {
    var solStdout_org = this.solutionStdout;
    this.solutionStdout = through2(function (chunk, enc, callback) {
      var plain = Decode(chunk);
      this.push(plain);
      callback();
    });
    solStdout_org.pipe(this.solutionStdout);
  }

  process.nextTick(function () {
    callback(null, true);
  });

});


function Decode(data) {
  var out = data.toString('ascii');
  var buf = new Buffer(out, 'base64');
  var key = {key: private_key, padding: require('constants').RSA_PKCS1_PADDING};
  var plain = crypto.privateDecrypt(key, buf);
  return plain;
}

exercise = comparestdout(exercise);

module.exports = exercise;

function fromPEMtoDER(data) {
  var text = data.toString().split(/(\r\n|\r|\n)+/g);
  text = text.filter(function(line) {
    return line.trim().length !== 0;
  });
  text = text.slice(1, -1).join('');
  return new Buffer(text.replace(/[^\w\d\+\/=]+/g, ''), 'base64');
};
