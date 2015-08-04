## 楕円 Diffie-Hellman 鍵交換
第一引数にHEX文字列で表されたuncompressed形式のECDH公開鍵が渡されます。その公開鍵と prime256v1 曲線名の楕円Diffie-Hellman を使って共有鍵を求めなさい。
自分の公開鍵も含めて、以下のようなJSON形式で公開鍵・共有鍵を標準出力に出力しなさい。

````
{"public_key":"040b268bad8abb39590fee43d4810ce38da6c15b7fb3e85fc7b49f7554c12a215e8a95253513a38a0f02446e4273e262b34e79675e92c0a24b2db8ba7a7005c87b",
"shared_key":"1801a074109f5f83299fac91e33d184cbdbfd7930d8146586acc723326a6a75e"}
````
