const axios = require('axios')

class official_account {

    constructor({ appid, secret }) {
        this.appid = appid;
        this.secret = secret;

        this.get_access_token().then(res => {
            this.access_token = res
        })
        setInterval(async () => {
            this.access_token = await this.get_access_token()
        }, 1000 * 60 * 60);
    }
    // 创建菜单
    async menu_create() {
        let access_token = await this.get_access_token()
        let res = await axios({
            url: `https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${access_token}`,
            method: 'post',
            data: {
                "button": [
                    {
                        "type": "click",
                        "name": "今日歌曲",
                        "key": "TODAY_MUSIC"
                    },
                    {
                        "type": "click",
                        "name": "测试1",
                        "key": "V1001_TODAY_MUSIC"
                    },
                ]
            }
        })
        console.log(res.data)
    }

    // 获取 access_token
    async get_access_token() {
        let res = await axios({
            url: 'https://api.weixin.qq.com/cgi-bin/token',
            method: 'get',
            params: {
                grant_type: 'client_credential',
                appid: this.appid,
                secret: this.secret
            }


        })

        return res.data.access_token

    }

    // 创建参数二维码
    async create_param_qr_code(str) {
        
        let res = await axios({
            url: `https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=${this.access_token}`,
            method: 'post',
            data: {
                expire_seconds: 604800,
                action_name: 'QR_STR_SCENE',
                action_info: {
                    scene: {
                        "scene_id": 12345678,
                        "scene_str": str | ''
                    }
                }
            }
        })

        let ticket  = encodeURIComponent(res.data.ticket);
        res.data.qr = `https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${ticket}`
        return res.data
    }
}

module.exports = official_account
