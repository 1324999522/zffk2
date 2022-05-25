//引入模块
const nodemailer = require('nodemailer');

//设置邮箱配置
let transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',//邮箱服务的主机，如smtp.qq.com
    service: 'qq',
    secure: true,	//安全方式发送,建议都加上
    auth: {
        user: '8588927@qq.com',
        pass: 'ispiwgujaaaebhcg'
    }
});


let email_user_bind = function (mailOptions) {
    //设置收件人信息
    // let mailOptions = {
    //     from: '争锋',//谁发的
    //     to: '1715013537@qq.com',//发给谁
    //     subject: 'aaa',//主题是什么
    //     text: 'aaaaaa',//文本内容
    //     html: '',//html模板
    // }
    mailOptions.from = '8588927@qq.com'
    //发送邮件
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) return console.log(error);
        console.log(`Message: ${info.messageId}`);
        console.log(`sent: ${info.response}`);
    })
}

module.exports = {
    email_user_bind,
}