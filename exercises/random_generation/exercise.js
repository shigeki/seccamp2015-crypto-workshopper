const Exercise = require('workshopper-exercise');
const filecheck = require('workshopper-exercise/filecheck');
const execute = require('workshopper-exercise/execute');
const comparestdout = require('workshopper-exercise/comparestdout');
const crypto = require('crypto');
const http = require('http');
const through2 = require('through2');
var exercise = new Exercise();
exercise = filecheck(exercise);
exercise = execute(exercise);

exercise.addSetup(function (mode, callback) {
  var size = Math.floor(Math.random()*128);
  this.submissionArgs = [size];
  this.solutionArgs = [size];
  process.nextTick(callback);

});

exercise.addProcessor(function (mode, callback) {
  this.submissionStdout.pipe(process.stdout);


  this.submissionStdout = through2();
  if (mode == 'verify') {
    this.solutionStdout = through2();
  }

  var self = this;
  process.nextTick(function () {
    self.submissionStdout.end();
    if (mode == 'verify') {
      self.solutionStdout.end();
    }
    callback(null, true);
  });

});

exercise = comparestdout(exercise);

module.exports = exercise;
