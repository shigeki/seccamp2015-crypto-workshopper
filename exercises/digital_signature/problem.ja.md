## デジタル署名
第一引数にHEX文字列で表されたuncompressed形式のECDH公開鍵、第2引数にデジタル署名が渡されます。公開鍵はランダムに改ざんされています。以下のデジタル署名の公開鍵を使って、署名検証してECDH公開鍵が改ざんされていなければ true、改ざんされていれば false を標準出力に出力しなさい。


````
var public_key_str = "-----BEGIN PUBLIC KEY-----\n" +
    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxdMF0D3TDXRsAjxlAFbv\n" +
    "hb/fE4P95JEDOCjf4REd8+XcIzMcyJT79QcjGoVg6LlUFMKfxbRDTIw/BQHT5sIW\n" +
    "0ez1r5gaE59zf3l78rajTXvgR2QL8eMTIbEyIgSpmVIVsRMqKxL93xf/JsnMU7sQ\n" +
    "gKdXZN2BQQ8XnzMKWs5fzA7GzAPfGiSsng0cy7ThJNBizMdkMTDek6UxWD60noIH\n" +
    "VW2tD7g1bf42DXTLH6cMw/tPwvGVIXRJoFH3FiyBwSIBv1XQVpkdS9smCFaIUOly\n" +
    "xAjt6mI7ixMXDfnxb7ACR4+XpsbqqvxBFD18XTRuT3im6ubX1zZCJPh/BI75bb5h\n" +
    "OwIDAQAB\n" +
    "-----END PUBLIC KEY-----";
````
