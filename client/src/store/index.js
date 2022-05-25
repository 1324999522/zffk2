import Vue from 'vue'
import Vuex from 'vuex'
import { request } from '@/network/request.js'
import { Notify } from 'vant';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    config: {
      status: 0,
    },
    system_config: {},
    client: {},
    user: {},
    customer_info: {
      intoTime: null,
      leaveTime: null,
    },
    loading: false,
    flag: {
      describe_dialog: false,
    },
    template: {
      activeName: '',
      active: 2,
      // 分类列表
      good_types: [],
      // 商品列表
      goods: [],
      // 当前商品
      good: {},
      // 购买数量
      count: 1,
      // 当前分类下标
      activeFlag: 0,
      // 当前商品下标
      activeFlag_good: 0,
      // 支付方式
      payMode: '支付宝',
      price: 1,

    },
    // 统一提交订单方法
    async onSubmit(vue) {
      if (this.template.count > this.template.good.noUse) return vue.$notify({
        title: '提示',
        message: '库存不足',
        type: 'warning',
      });
      vue.$store.state.loading = true
      let res = await request({
        url: "/client/order/create",
        method: 'post',
        data: {
          price: this.template.good.price,
          count: this.template.count,
          goodId: this.template.good.id,
          payMode: this.template.payMode,
        }
      })

      if (res.data.code === 0) {
        // 缓存查单
        let names = JSON.parse(localStorage.getItem('names'));
        console.log( names)
        if (names === null) names = []
        names.push(res.data.data.ordername)
        localStorage.setItem('names', JSON.stringify(names))

        vue.$router.push({
          name: 'index_pay',
          params: { order: res.data.data, type: this.template.payMode },
        })
      } else {
        vue.$notify({ title: '订单创建失败', message: res.data.msg, type: 'error' });
      }
    },
    // 时间处理
    date(data) {
      try {
        let a = new Date(data.replace(/-/g, "\/"));
        let b = new Date()
        let c = new Date(b - a)

        let minute = c / 1000 / 60
        let hour = c / 1000 / 60 / 60
        let day = c / 1000 / 60 / 60 / 24

        if (day > 1) {
          let month = a.getMonth() + 1
          let Date = a.getDate()
          if (month < 10) month = '0' + month
          if (Date < 10) Date = '0' + Date
          return `${month}-${Date}`
          // console.log( new Date(myDate - c) )
        }
        if (hour > 1) {
          return `${hour.toFixed(0)}小时前`
        }

        if (minute < 1) {
          return `${(c / 1000).toFixed(0)}秒前`
        }
        return `${minute.toFixed(0)}分钟前`
      } catch {
        return null
      }

    }

  },
  mutations: {
    // 获取分类与商品
    async getClass(state) {
      if (state.config.pay_qqWallet) state.template.type = 2
      if (state.config.pay_wechatpay) state.template.type = 3
      if (state.config.pay_alipay) state.template.type = 1
      let { template } = state
      let res = await request({
        url: '/client/good_type/all',
        method: 'get',
      })
      template.activeFlag_good = 0
      template.good_types = res.data.data
      // 默认商品属性
      template.activeFlag = 0
      template.activeName = template.good_types[0].id
      template.goods = template.good_types[0].goods
      template.good = template.goods[0]
      template.price = template.good.price

    },
    // 选择分类
    select_class(state, index) {
      Notify.clear()
      let { template } = state
      template.goods = template.good_types[index].goods
      template.good = template.goods[0]
      template.activeFlag = index
      template.activeFlag_good = 0

      template.price = template.good.price

    },
    // 选择商品
    select_good(state, index) {


      let { template } = state
      template.good = template.goods[index]
      template.activeFlag_good = index
      template.count = 1
      template.price = template.good.price

    },
  },
  actions: {

  },
  modules: {
  }
})
