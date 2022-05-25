
const fs = require('fs')
fs.readFile('./public/tb/portraits.txt', (err, data) => {
    global.portraits = JSON.parse(data)
})
//如果没有头像 则使用随机头像
function getPortraint() {
    let rand = Math.floor(Math.random() * global.portraits.length);
    console.log(global.portraits[rand])
    return global.portraits[rand]
}

//------------------------------------------------------------------------------------------------------
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

function create_order_number() {
    let myDate = new Date();
    return 'ZF' + myDate.getFullYear() + myDate.getMonth() + myDate.getDate() + createUUID(6) + myDate.getMilliseconds()
}




module.exports = {
    createUUID,
    getPortraint,
    create_order_number,
}
