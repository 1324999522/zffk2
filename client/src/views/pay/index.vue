<template>

  <div id="index_pay">
    <!-- <alipay v-show="$store.state.customer_info.isPhoen" :order='order'> </alipay> -->
    <payPc :order='order'> </payPc>
    <!-- v-show="$store.state.customer_info.isPhoen" -->

  </div>
</template>

<script>
import { request } from '@/network/request.js'
import alipay from '@/views/pay/alipay'
import payPc from '@/views/pay/pay_pc'

export default {
  name: 'index_pay',
  components: {
    alipay,
    payPc,

  },
  data() {
    return {
      order: {},
      payMode: '支付宝',
      Timer: null,
    }
  },
  created() {
    // 判断跳转是否带有数据，如果没有，返回主页面
    if (this.$route.params.order) {
      // this.$notify({
      //   message: '提示付款多少就付多少,不能少付,否则不会自动发货,请联系客服',
      //   payMode: 'success',
      //   duration: 4000
      // });
      // 加载路由传过来的数据
      this.order = this.$route.params.order
      this.payMode = this.$route.params.payMode
    } else {
      console.log(this.$store.state.home_link)
      this.$router.push(this.$store.state.home_link)
    }
    this.Timer = setInterval(() => {
      this.check_order_status()
    }, 2000)
  },
  methods: {

    async check_order_status() {
      let res = await request({
        url: '/client/order/status',
        method: 'get',
        params: {
          ordername: this.order.ordername
        }
      })
      if (res.data.code === 0) {
        this.$message.success('支付成功')
        setTimeout(() => {
          this.$router.push(`/order_details?ordername=${this.order.ordername}`)
        }, 1000)

      }
    },
  },
  destroyed() {
    clearInterval(this.Timer)
  }

}
</script>

<style lang="less" scoped>
#index_pay {
  height: 100%;
  // background-color: var(--main_color) !important;
}
</style>
