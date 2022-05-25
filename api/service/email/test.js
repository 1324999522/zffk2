"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);

//引入模块
const nodemailer = require('nodemailer');

//设置邮箱配置
let transporter = nodemailer.createTransport({
  host:'smtp.qq.com',//邮箱服务的主机，如smtp.qq.com
  service:'qq',
  secure: true,	//安全方式发送,建议都加上
  auth:{
    user: '8588927@qq.com',
    pass: 'ispiwgujaaaebhcg'
  }
});

//设置收件人信息
let mailOptions={
  from:'8588927@qq.com',//谁发的
  to:'1715013537@qq.com',//发给谁
  subject:'aaa',//主题是什么
  text:'aaaaaa',//文本内容
  html:'',//html模板

   //附件信息
//   attachments:[
//   {
//       filename:'',
//       path:'',
//     }
//   ]
};

//发送邮件
transporter.sendMail(mailOptions,(error,info)=>{
  if(error)
    return console.log(error);
   console.log(`Message: ${info.messageId}`);
   console.log(`sent: ${info.response}`);
});

