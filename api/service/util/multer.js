var multer = require("multer");
// var upload = multer({ dest: 'public/image' })
const express = require('express')
const router = express.Router()
const fs = require('fs')
var path = require('path')

var storage = multer.diskStorage({
    destination: async function (req, file, cb) {

     cb(null, 'public/image')
    },
    filename: function (req, file, cb) {

        let extName = file.originalname.slice(file.originalname.lastIndexOf("."));  //.jpg
        console.log(extName)
        if (extName !== '.jpg' && extName !== '.png') return cb('upload err', 2)

        cb(null, file.fieldname + '-' + Date.now() + extName)
    }
})

var upload = multer({ storage: storage })

const image_upload = router.post('*', upload.single('image'), function (req, res, next) {
    console.log(req.file)
    

    let imageUrl = req.file.path
    imageUrl = imageUrl.replace(/\\/g, '/');
    res.image = imageUrl
    next()
    // req.file 是 `iamge` 文件的信息
    // req.body 将具有文本域数据，如果存在的话
})






module.exports = {
    image_upload,
}
// https://www.jianshu.com/p/562cf4baf417  选自
//多张上传
// var multer = require("multer");
// const imageUploader = multer({
//   fileFilter,
//   storage,
//   limits
// }).array("file"); 

//以上三个字段是固定写法


// 我google了一把，发现，还是有解决方法的 ，如果是ajax提交你要看input框的name 与 ajax 的 data append传的属性名称与 multer().single('name')名字是否一致. 我遇到这个已经解决了4 年前回复
// 点赞
// 3
// qq_35447768
// qq_35447768回复:非常感谢12 天前回复
// 点赞
// sinat_31529197
// pupuGirl回复:确实是的， var formData = new FormData(); formData.append('image', e.target.files[0]);//文件 append里面的名字要和app.use(multer({ dest: '/tmp/'}).array('image'));这里的array里面的名字一致

// 前端
// let formdata = new FormData()
// formdata.append('image', file.file)
// let res = await $axios({
//   method: 'post',
//   url: '/user/other/img',
//   data: formdata,
//   headers: { 'Content-Type': 'multipart/form-data' },
// })