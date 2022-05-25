const axios = require('axios')


class Alipay {
    constructor({ APP_ID, KEY, notify_url } = {}) {
        this.APP_ID = APP_ID;
        this.KEY = KEY;
        this.notify_url = notify_url
    }

    async precreate(biz_content) {
        let obj = {
            app_id: this.APP_ID,
            // biz_content: {
            //     out_trade_no: '22222',
            //     subject: 'asdas',
            //     total_amount: 10,
            // },
            biz_content: biz_content,
            charset: 'utf-8',
            method: "alipay.trade.precreate",
            notify_url: this.notify_url,
            sign_type: 'RSA2',
            timestamp: '2014-07-24 03:07:50',
            version: '1.0',

        }

        let sign = this.get_sign(obj)

        obj.sign = sign


        let res = await axios({
            url: `https://openapi.alipay.com/gateway.do`,
            params: obj
        })

        return res.data.alipay_trade_precreate_response


    }

    get_sign(obj) {

        let str = parseParams(obj)

        const { KJUR, hextob64 } = require('jsrsasign')

        const HashMap = {
            SHA256withRSA: 'SHA256withRSA',
            SHA1withRSA: 'SHA1withRSA'
        }

        const PEM_BEGIN = '-----BEGIN PRIVATE KEY-----\n'
        const PEM_END = '\n-----END PRIVATE KEY-----'

        /**
         * rsa签名参考：https://www.jianshu.com/p/145eab95322c
         */
        let SignUtil = {
            /**
             * rsa签名
             * @param content 签名内容
             * @param privateKey 私钥，PKCS#1
             * @param hash hash算法，SHA256withRSA，SHA1withRSA
             * @returns 返回签名字符串，base64
             */
            rsaSign: function (content, privateKey, hash) {
                privateKey = this._formatKey(privateKey)
                // 创建 Signature 对象
                const signature = new KJUR.crypto.Signature({
                    alg: hash,
                    //!这里指定 私钥 pem!
                    prvkeypem: privateKey
                })
                signature.updateString(content)
                const signData = signature.sign()
                // 将内容转成base64
                return hextob64(signData)
            },
            _formatKey: function (key) {
                if (!key.startsWith(PEM_BEGIN)) {
                    key = PEM_BEGIN + key
                }
                if (!key.endsWith(PEM_END)) {
                    key = key + PEM_END
                }
                return key
            }
        }

        function parseParams(data) {
            try {
                var tempArr = [];
                for (var i in data) {
                    var key = (i);
                    var value = (data[i]);
                    if (value instanceof Object) {
                        value = JSON.stringify(value)
                    }
                    tempArr.push(key + '=' + value);
                }
                var urlParamsStr = tempArr.join('&');
                return urlParamsStr;
            } catch (err) {
                return '';
            }
        }



        let sign = SignUtil.rsaSign(str, this.KEY, 'SHA256withRSA')

        return sign

    }

    cryptoVerify(obj) {
        var crypto = require("crypto");
        //1. 提前获取参数中的sign与sign_type，然后删除原来json中的这两个参数
        let sign = obj.sign;
        let sign_type = obj.sign_type;//RSA2
        delete obj.sign;
        delete obj.sign_type;
        //2. 字典排序，并对一级value可进行url_encoding
        let keys = Object.keys(obj).sort();
        let params = [];
        for (let i = 0;i < keys.length;i++) {
            let v = keys[i];
            params.push(v + "=" + decodeURIComponent(obj[v]));
        }
        let str = params.join("&");
        //3. 获取支付宝支付公钥，并拼上开头与结尾
        let public_key = "-----BEGIN PUBLIC KEY-----" + "\r\n"
            + "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnX1hWgQceRLDjIaOwbHoZobGTAnZn0W4lqTOoeSZ2W0CwoGGptPVl7II1gZKnVGsSYQfacQHHIpkIQQIFaZZxLDYaSE2nLCgQ5SboBCbW0O/A4zzx43xbAioDUH9RehnqBHTnZqe5FNq7u4kfALsCNNZHCrUtgxyb0PC3MkNKig+doW9PzRAhBUeL623ca0qEdzUsfgGCBAXYr9XfOCBlq5aHh3w8bGK7EoXydOlR0jXYoO2JfAK2EQuU/IT8WsWCoVhQXPrlsSY1oRe38S+Fxu42UEnMuLvKAhnAdjFQ+LOhxa2K7PXi2fBBZUX++Ul9+UPU/o3E95GaYD2PLZynwIDAQAB"  //此非应用公钥
            + "\r\n" + "-----END PUBLIC KEY-----";
        //4. 根据sign_type 判断验签方式
        let rsatype = "";
        if (sign_type === "RSA") {
            rsatype = "RSA-SHA1";
        } else if (sign_type === "RSA2") {
            rsatype = "RSA-SHA256";
        } else {
            throw new Error('未知的签名方式' + sign_type);
        }
        //5. 执行验签
        try {
            let verify = crypto.createVerify(rsatype);
            verify.update(str);
            let result = verify.verify(public_key, sign, "base64");
            return result
        } catch {
            return false
        }

    }

}



module.exports = Alipay