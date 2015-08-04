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
  process.nextTick(callback);
});

exercise = comparestdout(exercise);

module.exports = exercise;
