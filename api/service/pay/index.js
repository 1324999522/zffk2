
const { verify } = require('crypto')
const Alipay = require('./alipay')
const Wx_pay = require('./wx_pay')

const { collect } = global.$Config

const wx_pay = new Wx_pay({
    appid: collect.wx_pay.appid,
    mch_id: collect.wx_pay.mch_id,
    serial_no: collect.wx_pay.serial_no,
    apiv3_private_key: collect.wx_pay.apiv3_private_key,
    notify_url: collect.notify_url,
    private_key: collect.wx_pay.private_key,
})

const alipay = new Alipay({
    APP_ID: collect.ali_pay.appid,
    notify_url: collect.notify_url,
    KEY: collect.ali_pay.private_key,
})




async function create_pay(options) {

    let { out_trade_no, subject, total_amount, payMode } = options


    if (payMode == `支付宝`) {
        return await ali()
    } else if (payMode == `微信支付`) {
        return await wx()
    }


    async function wx() {
        let wx_pay_res = await wx_pay.native({ out_trade_no, subject, total_amount })
        wx_pay_res.qr_code = wx_pay_res.code_url
        return wx_pay_res
    }



    async function ali() {
        let alipay_res = await alipay.precreate({ out_trade_no, subject, total_amount })
        return alipay_res
    }

}

function verify_success(body) {


    let result, ordername, receipt_amount = false

    if (body.app_id) {
        result = alipay.cryptoVerify(body)
        receipt_amount = body.receipt_amount


        ordername = body.out_trade_no

        return { result, ordername, receipt_amount }
    } else {
        let { ciphertext, associated_data, nonce } = body.resource;
        let decode_after = wx_pay.decode(ciphertext, nonce, associated_data)


        ordername = decode_after.out_trade_no
        receipt_amount = decode_after.amount.payer_total / 100
        result = true

        return { result, ordername, receipt_amount }

    }
}





module.exports = { create_pay, verify_success }