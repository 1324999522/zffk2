// Depends on tencentcloud-sdk-nodejs version 4.0.3 or higher

const tencentcloud = require("tencentcloud-sdk-nodejs");

const SmsClient = tencentcloud.sms.v20190711.Client;

const clientConfig = {
  credential: {
    secretId: "AKIDRxTDbpYAxBRs1BKOTaGm7FMYXPG3Ykbb",
    secretKey: "3mMhR075sm5PaOQGwX525yuQxKGc0pZI",
  },
  region: "",
  profile: {
    httpProfile: {
      endpoint: "sms.tencentcloudapi.com",
    },
  },
};

const client = new SmsClient(clientConfig);

function sms(phome,content){
    return new Promise(resolve =>{
        const params = {
            "PhoneNumberSet": [
                "+86"+phome
            ],
            "TemplateID": "860565",
            "SmsSdkAppid": "1400481004",
            "TemplateParamSet": [
                content,
            ],
            "Sign": "欣欣图像设计"
        };
        client.SendSms(params).then(
          (data) => {
              resolve(data)
            
          },
          (err) => {
            console.error("error", err);
          }
        );
    },reject =>{

    })
    
}

module.exports = {
    sms:sms,
}
