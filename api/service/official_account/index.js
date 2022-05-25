const axios = require('axios')
const Official_account = require('./official_account')
const Message_template = require('./message_template')
const official_account = new Official_account({
    appid: 'wxf3d37679488f0b35',
    secret: "296e228cbdc61ae1e302f02bfc699693"
})
function t(number) {
    return number.toFixed(2)
}

Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "H+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function wx_notify(Notify) {
    const message_template = new Message_template(official_account.access_token)
    console.log(Notify)

    if (Notify.title == `提现已到账 `) {
        let {  createdAt, datas, openId } = Notify
        datas = JSON.parse(datas)
        message_template.withdraw({
            fee: t(datas[2]),
            money: t(datas[1]),
            real_money: t(datas[1] - datas[2]),
            createdAt: createdAt.Format("yyyy-MM-dd HH:mm:ss"),
            method: '支付宝转账',
            openId: openId,
            first: ``,
            remark: ``
        })
    } else if (Notify.title == `买家投诉订单`) {
        let { datas, openId } = Notify
        datas = JSON.parse(datas)

        message_template.after_sale({
            ordername: datas[1],
            time: datas[0],
            content: datas[2],
            openId: openId,
            first: `亲爱的商家，您的一笔订单收到买家投诉，订单金额：${datas[3]} 元`,
            remark: `为避免投诉升级，请您尽快处理`
        })
    }
}

setTimeout(async () => {

    // const message_template = new Message_template(official_account.access_token)
    // message_template.after_sale({
    //     ordername:'111',
    //     status:'d爱处理',
    //     time:'11',
    //     first:'asgasga',
    //     remark:'asfasfa'
    // })



}, 2000)





global.official_account = official_account

module.exports = {
    wx_notify,
}

