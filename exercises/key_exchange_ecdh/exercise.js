const Exercise = require('workshopper-exercise');
const filecheck = require('workshopper-exercise/filecheck');
const execute = require('workshopper-exercise/execute');
const comparestdout = require('workshopper-exercise/comparestdout');
const through2 = require('through2');
const crypto = require('crypto');

var ecdh = crypto.createECDH('prime256v1');
var my_public_key = ecdh.generateKeys('hex');
var exercise = new Exercise();
exercise = filecheck(exercise);
exercise = execute(exercise);

exercise.addSetup(function (mode, callback) {
  this.submissionArgs = [my_public_key];
  this.solutionArgs = [my_public_key];
  process.nextTick(callback);
});

exercise.addProcessor(function (mode, callback) {
  if (mode == 'verify') {
    this.solutionStdout = through2();
    var subStdout_org = this.submissionStdout;
    var self = this;
    this.submissionStdout = through2(function (chunk, enc, callback) {
      var json = JSON.parse(chunk.toString('ascii'));
      var shared_key = ecdh.computeSecret(json.public_key, 'hex', 'hex');
      this.push(json.shared_key);
      self.solutionStdout.end(shared_key);
      callback();
    });
    subStdout_org.pipe(this.submissionStdout);

  }

  process.nextTick(function () {
    callback(null, true);
  });

});


exercise = comparestdout(exercise);

module.exports = exercise;
