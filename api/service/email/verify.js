


let { email_user_bind } = require('./index')
let type = null
let code = null



function verification_code(options) {

    let { to, subject } = options

    type = subject
    code = createUUID(6)

    email_user_bind({
        to: to,//发给谁
        subject: subject,//主题是什么        code: code,
        html: `<head>
        <base target="_blank" />
        <style type="text/css">::-webkit-scrollbar{ display: none; }</style>
        <style id="cloudAttachStyle" type="text/css">#divNeteaseBigAttach, #divNeteaseBigAttach_bak{display:none;}</style>
        <style id="blockquoteStyle" type="text/css">blockquote{display:none;}</style>
        <style type="text/css">
            body{font-size:14px;font-family:arial,verdana,sans-serif;line-height:1.666;padding:0;margin:0;overflow:auto;white-space:normal;word-wrap:break-word;min-height:100px}
            td, input, button, select, body{font-family:Helvetica, 'Microsoft Yahei', verdana}
            pre {white-space:pre-wrap;white-space:-moz-pre-wrap;white-space:-pre-wrap;white-space:-o-pre-wrap;word-wrap:break-word;width:95%}
            th,td{font-family:arial,verdana,sans-serif;line-height:1.666}
            img{ border:0}
            header,footer,section,aside,article,nav,hgroup,figure,figcaption{display:block}
            blockquote{margin-right:0px}
        </style>
        </head>
        <body tabindex="0" role="listitem">
        <table width="700" border="0" align="center" cellspacing="0" style="width:100%;">
        <tbody>
        <tr>
            <td>
                <div style="width:100%;padding:0 10px;margin:0 auto;">
                    <div style="line-height:1.5;font-size:18px;margin-bottom:25px;color:#4d4d4d;">
                        <strong style="display:block;margin-bottom:15px;">
                            您正在进行<span style="color: red">${type}</span>操作，请在验证码输入框中输入：<span style="color:#f60;font-size: 30px"> ${code} </span>，以完成操作。
                        </strong>
                    </div>
        
                </div>
            </td>
        </tr>
        </tbody>
        </table>
        </body>`,//html模板
    })

    return  { code }

}






function createUUID(len, radix) {
    var chars = '0123456789'.split('');
    var uuid = [], i;
    radix = radix || chars.length;
    if (len) {
        for (i = 0;i < len;i++) {
            uuid[i] = chars[0 | Math.random() * radix];
        }
    }
    return uuid.join('');
}








module.exports = {
    verification_code,
}






let html = `<head>
<base target="_blank" />
<style type="text/css">::-webkit-scrollbar{ display: none; }</style>
<style id="cloudAttachStyle" type="text/css">#divNeteaseBigAttach, #divNeteaseBigAttach_bak{display:none;}</style>
<style id="blockquoteStyle" type="text/css">blockquote{display:none;}</style>
<style type="text/css">
    body{font-size:14px;font-family:arial,verdana,sans-serif;line-height:1.666;padding:0;margin:0;overflow:auto;white-space:normal;word-wrap:break-word;min-height:100px}
    td, input, button, select, body{font-family:Helvetica, 'Microsoft Yahei', verdana}
    pre {white-space:pre-wrap;white-space:-moz-pre-wrap;white-space:-pre-wrap;white-space:-o-pre-wrap;word-wrap:break-word;width:95%}
    th,td{font-family:arial,verdana,sans-serif;line-height:1.666}
    img{ border:0}
    header,footer,section,aside,article,nav,hgroup,figure,figcaption{display:block}
    blockquote{margin-right:0px}
</style>
</head>
<body tabindex="0" role="listitem">
<table width="700" border="0" align="center" cellspacing="0" style="width:100%;">
<tbody>
<tr>
    <td>
        <div style="width:100%;padding:0 10px;margin:0 auto;">
            <div style="line-height:1.5;font-size:18px;margin-bottom:25px;color:#4d4d4d;">
                <strong style="display:block;margin-bottom:15px;">
                    您正在进行<span style="color: red">${type}</span>操作，请在验证码输入框中输入：<span style="color:#f60;font-size: 30px">${code}/span>，以完成操作。
                </strong>
            </div>

        </div>
    </td>
</tr>
</tbody>
</table>
</body>`