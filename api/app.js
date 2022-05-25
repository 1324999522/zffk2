const express = require('express')
const app = express()
global.$axios = require('axios')
global.$Config = require('./config')

app.use(function (req, res, next) {

  if (req.path.indexOf('/api') <= 1) {
    req.path = req.path.replace('/api', '')
    req.url = req.url.replace('/api', '')
    console.log('请求方式:', req.method, '请求地址:', req.path)
  }

  res.client = new Object()
  res.client.ip = req.ip.replace('::ffff:', '')
  next()
})


// 开放静态资源
app.use('/public/', express.static('./public'))
// 格式请求体数据
app.use(express.json({limit: '20mb'}))
app.use(express.urlencoded({ extended: false }))


app.use('/test', (req, res, next) => {

  res.send(`<h1>OK<h1>`)
})


// 加载路由
require('./routes')(app)



app.listen(6200)


module.exports = app
