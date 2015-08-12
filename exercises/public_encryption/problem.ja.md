## 公開鍵暗号
第一引数にHEX文字列で表されたDER形式の公開鍵が渡されます。その公開鍵を使って
This is my secret
の文字列を暗号化し、Base64形式で標準出力に出力しなさい。

## ヒント
https://nodejs.org/api/crypto.html#crypto_crypto_publicencrypt_public_key_buffer
を使おう

(注) crypto.publicEncrypt を使うには公開鍵をDER形式からPEM形式に変換する必要があります。下記fromDERtoPEM関数(typeは 'public_key')を使ってPEM変換した公開鍵を使いなさい。またpadding形式は RSA_PKCS1_PADDING を使いなさい。paddingは下記の様に指定します。

````
var key = {key: public_key, padding: require('constants').RSA_PKCS1_PADDING};
````

````
function fromDERtoPEM(data, type) {
  var begin;
  var end;
  switch(type) {
    case 'public_key':
    begin = '-----BEGIN PUBLIC KEY-----\n';
    end = '-----END PUBLIC KEY-----\n';
    break;
    case 'certificate':
    begin = '-----BEGIN CERTIFICATE-----\n';
    end = '-----END CERTIFICATE-----\n';
    break;
  }
  var encode = data.toString('base64');
  var ret = '';
  for(var i = 0; i < encode.length; i += 64) {
    var a = encode.slice(i, i + 64);
    ret += (a + '\n');
  }
  return begin + ret  + end;
};
````
