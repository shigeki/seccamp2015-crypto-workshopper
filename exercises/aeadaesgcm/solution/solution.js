const crypto = require('crypto');
var input_json = {
  associated_data: '546869732069732061757468656e746963617465642064617461',
  key: 'd73bbfad9f5117ed78c3b1df6ef0a787',
  iv: '24f9a3b6e0fba2186f32c214',
  cryptedtext: '7107fcbe659fc268aeb9cbb8942566b4a79c2cb9aab6d1051bbe9a67c314ba7158ac39ccd88d5cd1c736b947f789ae7f9d4a',
  tag: '384294ea82fcee9c59b599d8371f7c3a'
};

var key = new Buffer(input_json.key, "hex");
var tag = new Buffer(input_json.tag, "hex");
var iv = new Buffer(input_json.iv, "hex");
var cryptedtext = new Buffer(input_json.cryptedtext, "hex");
var associated_data = new Buffer(input_json.associated_data, "hex");
var decipher = crypto.createDecipheriv('aes-128-gcm', key, iv);
decipher.setAAD(associated_data);
decipher.setAuthTag(tag);
var b1 = decipher.update(cryptedtext);
var b2 = decipher.final();
var plain = Buffer.concat([b1, b2]);
console.log(plain.toString('ascii'));
