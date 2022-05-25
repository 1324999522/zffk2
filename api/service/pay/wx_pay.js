const { KJUR, hextob64 } = require('jsrsasign')
const axios = require('axios')
const crypto = require('crypto');

class Wx_pay {
  constructor({ appid, mch_id, private_key, serial_no, apiv3_private_key, notify_url } = {}) {
    this.appid = appid;
    this.mch_id = mch_id;
    this.private_key = private_key;
    this.serial_no = serial_no;
    this.apiv3_private_key = apiv3_private_key;
    this.notify_url = notify_url;
  }


  async native (options) {

    let { out_trade_no, subject, total_amount } = options
    let bodyParams = {
      "mchid": this.mch_id,
      "out_trade_no": out_trade_no,
      "appid": this.appid,
      "description": subject,
      "notify_url": "http://119.29.77.51:4200/client/order/pay/success",
      "amount": {
        "total": 100,
        "currency": "CNY"
      }
    }
    let method = 'POST'
    let Authorization = this.get_Authorization({
      method: method,
      pathname: '/v3/pay/transactions/native',
      bodyParams: bodyParams,
    })
    try {
      let res = await axios({
        url: `https://api.mch.weixin.qq.com/v3/pay/transactions/native`,
        method: method,
        data: method == 'GET' ? '' : bodyParams,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': Authorization
        },
      })
      return res.data
    } catch (err) { throw (err) }

  }


  get_Authorization (options) {
    let { method, pathname, bodyParams } = options
    let timestamp = Math.floor(Date.now() / 1000)
    let onece_str = '593BEC0C930BF1AFEB40B4A08C8FB242'
    let bodyParamsStr = bodyParams && Object.keys(bodyParams).length ? JSON.stringify(bodyParams) : ''
    let signature = this.rsaSign(`${method}\n${pathname}\n${timestamp}\n${onece_str}\n${bodyParamsStr}\n`, this.private_key, 'SHA256withRSA')
    let Authorization = `WECHATPAY2-SHA256-RSA2048 mchid="${this.mch_id}",nonce_str="${onece_str}",timestamp="${timestamp}",signature="${signature}",serial_no="${this.serial_no}"`
    return Authorization
  }

  rsaSign (content, privateKey, hash = 'SHA256withRSA') {
    // 创建 Signature 对象
    const signature = new KJUR.crypto.Signature({
      alg: hash,
      //!这里指定 私钥 pem!
      prvkeypem: privateKey,
    })
    signature.updateString(content)
    const signData = signature.sign()
    // 将内容转成base64
    return hextob64(signData)
  }

  // 解密通知
  decode (ciphertext, nonce, associated_data) {
    ciphertext = Buffer.from(ciphertext, 'base64');
    let authTag = ciphertext.slice(ciphertext.length - 16);
    let data = ciphertext.slice(0, ciphertext.length - 16);
    let decipher = crypto.createDecipheriv('aes-256-gcm', this.apiv3_private_key, nonce);
    decipher.setAuthTag(authTag);
    decipher.setAAD(Buffer.from(associated_data));
    let decoded = decipher.update(data, null, 'utf8');
    decipher.final();
    console.log(JSON.parse(decoded))
    return JSON.parse(decoded);
  }
}













module.exports = Wx_pay