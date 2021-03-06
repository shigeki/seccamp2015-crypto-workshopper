var crypto = require('crypto');
var other_public_key = process.argv[2];
var digital_signature = process.argv[3];

var public_key_str = "-----BEGIN PUBLIC KEY-----\n" +
    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxdMF0D3TDXRsAjxlAFbv\n" +
    "hb/fE4P95JEDOCjf4REd8+XcIzMcyJT79QcjGoVg6LlUFMKfxbRDTIw/BQHT5sIW\n" +
    "0ez1r5gaE59zf3l78rajTXvgR2QL8eMTIbEyIgSpmVIVsRMqKxL93xf/JsnMU7sQ\n" +
    "gKdXZN2BQQ8XnzMKWs5fzA7GzAPfGiSsng0cy7ThJNBizMdkMTDek6UxWD60noIH\n" +
    "VW2tD7g1bf42DXTLH6cMw/tPwvGVIXRJoFH3FiyBwSIBv1XQVpkdS9smCFaIUOly\n" +
    "xAjt6mI7ixMXDfnxb7ACR4+XpsbqqvxBFD18XTRuT3im6ubX1zZCJPh/BI75bb5h\n" +
    "OwIDAQAB\n" +
    "-----END PUBLIC KEY-----";

var public_key = new Buffer(public_key_str);

var verifier = crypto.createVerify('RSA-SHA256');
verifier.update(other_public_key);
var tamper = verifier.verify(public_key, digital_signature, 'hex');
console.log(tamper);
