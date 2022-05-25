const axios = require('axios')


let config = {
    apiKey: "51072d8c014a4ff89b528927ae242529",
    userId: "676278",
}


async function tuling(text) {
    let res = await axios({
        url: 'http://openapi.tuling123.com/openapi/api/v2',
        method: 'post',
        data: {
            "reqType": 0,
            "perception": {
                "inputText": {
                    "text": text
                }
            },
            "userInfo": {
                "apiKey": config.apiKey,
                "userId": config.userId
            }
        }
    })

    return res.data.results[0].values.text

}

module.exports = {
    tuling,
}
