
const express = require('express')
const router = express.Router()
const { user } = require('../../sequelize').sequelize.models
const xmlparser = require('express-xml-bodyparser');
router.use(xmlparser())
router.all('/', async (req, res, next) => {
    console.log(req.body.xml)

    let xml = req.body.xml
    let { msgtype } = handle_xml(xml)

    let result;
    switch (msgtype) {
        case 'text':
            result = await msgtype_text(xml)
            res.send(result)
        case 'event':
            result = await msgtype_event(xml)
            res.send(result)

    }


    // return echostr
    if (req.query.echostr) {
        res.send(req.query.echostr)
    }

})
// 处理文字信息
async function msgtype_text(xml) {
    let { msgtype, event, eventkey, fromusername, content } = handle_xml(xml)

    return send_text_xml({
        ToUserName: fromusername,
        FromUserName: 'gh_78da8817148c',
        Content: content,
    })
}
// 处理事件推送
async function msgtype_event(xml) {
    let { event } = handle_xml(xml)

    switch (event) {
        case 'subscribe':
            return await bind_user(xml)
        case 'CLICK':
            return await event_click(xml)
    }


}


//  事件 处理点击事件
async function event_click(xml) {
    let { msgtype, event, eventkey, fromusername } = handle_xml(xml)

    return send_text_xml({
        ToUserName: fromusername,
        FromUserName: 'gh_78da8817148c',
        Content: '000',
    })

}

//  事件 带参数二维码用户绑定
async function bind_user(xml) {
    let { msgtype, event, eventkey, fromusername } = handle_xml(xml)
    // 普通用户关注
    if (eventkey == '') {
        return send_text_xml({
            ToUserName: fromusername,
            FromUserName: 'gh_78da8817148c',
            Content: '欢迎关注',
        })
    }
    // 用户绑定
    try {
        let User = await user.findByPk(eventkey)
        User.openId = fromusername
        await User.save()

        return send_text_xml({
            ToUserName: fromusername,
            FromUserName: 'gh_78da8817148c',
            Content: '您已成功绑定快发卡账号【13529733708】,系统将实时为您推送帐户数据,如您需人工服务,请咨询QQ公众号:800157060,感谢您的支持~',
        })

    } catch (error) { throw (error) }

}









function handle_xml(xml) {
    let { msgtype, event, eventkey, fromusername, content } = xml
    console.log(msgtype)
    if (msgtype) msgtype = msgtype[0]
    if (event) event = event[0]
    if (fromusername) fromusername = fromusername[0]
    if (eventkey) eventkey = eventkey_hand(eventkey[0])
    if (content) content = content[0]
    return {
        msgtype, event, eventkey, fromusername, content
    }

}

function send_text_xml(options) {
    let { ToUserName, FromUserName, CreateTime, Content } = options
    return `<xml>
    <ToUserName><![CDATA[${ToUserName}]]></ToUserName>
    <FromUserName><![CDATA[${FromUserName}]]></FromUserName>
    <CreateTime>12345678</CreateTime>
    <MsgType><![CDATA[text]]></MsgType>
    <Content><![CDATA[ ${Content}]]></Content>
  </xml>`

}


function eventkey_hand(eventkey) {
    return eventkey.replace('qrscene_', '')
}
module.exports = router