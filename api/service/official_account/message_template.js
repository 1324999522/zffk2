const axios = require('axios')

class message_template {

    constructor(access_token) {
        this.access_token = access_token;
    }


    async wx_template(value1, value2, value3, value4) {
        let res = await axios({
            url: `https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${Official_account.access_token}`,
            method: 'post',
            data: {
                touser: "otN7m52Qza_5drffAnv9bex_X_RU",
                template_id: "v4pbs_IAT069wu4Z7LtzlnFtj2zrq79KoqJTX3wScCE",

                data: {
                    "first": {
                        "value": "恭喜你购买成功！",
                        "color": "#173177"
                    },
                    "keyword1": {
                        "value": value1,
                        "color": "#173177"
                    },
                    "keyword2": {
                        "value": value2,
                        "color": "#173177"
                    },
                    "keyword3": {
                        "value": value3,
                        "color": "#173177"
                    },
                    "keyword4": {
                        "value": value4,
                        "color": "#173177"
                    },
                    "keyword5": {
                        "value": "2014年9月22日",
                        "color": "#173177"
                    },
                    "remark": {
                        "value": "欢迎再次购买！",
                        "color": "#173177"
                    }
                }
            }
        })
        return res.data
    }

    async after_sale(options) {
        let { ordername, time, status,content, first, remark, openId } = options
        return await this.base('KUkHarhok1pz4zPj26zB9s6-EwPt75dWnljvwCcmtn0', openId, {
            "first": {
                "value": first,
                "color": "#173177"
            },
            "keyword1": {
                "value": ordername,
                "color": "#173177"
            },
            "keyword2": {
                "value": time,
                "color": "#173177"
            },
            "keyword3": {
                "value": content,
                "color": "#173177"
            },
            "remark": {
                "value": remark,
                "color": "#173177"
            }
        })
    }

    async withdraw(options) {
        let { fee, money, real_money, time, method, first, remark, openId } = options
        return await this.base('JMENNGoUuOUEgD9D5EKKU9FKhN1ycgkt0euPNUonPyM', openId, {
            "first": {
                "value": first,
                "color": "#173177"
            },
            "keyword1": {
                "value": time,
                "color": "#173177"
            },
            "keyword2": {
                "value": method,
                "color": "#173177"
            },
            "keyword3": {
                "value": money,
                "color": "#173177"
            },
            "keyword4": {
                "value": fee,
                "color": "#173177"
            },
            "keyword5": {
                "value": real_money,
                "color": "#173177"
            },
            "remark": {
                "value": remark,
                "color": "#173177"
            }
        })
    }

    async base(template_id, openId, data) {
        let res = await axios({
            url: `https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${this.access_token}`,
            method: 'post',
            data: {
                touser: openId,
                template_id: template_id,
                data: data
            }
        })
        return res.data
    }

}

module.exports = message_template
