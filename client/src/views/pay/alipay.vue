<template>

  <div id="alipay">
    <div style="height:50px;" class="top"></div>

    <div class="img">
      <!-- 支付宝logo -->
      <div style="height:50px;" class="top">
        <img src="@/assets/img/alipay.png" alt="二维码加载失败" />
      </div>
      <!-- 支付二维码 -->
      <img :src="order.qrcode" alt="" />
      <div class="qrcode img2" ref="qrCodeUrl"></div>
      <!-- 10分钟倒计时 -->
      <van-count-down :time="time" format="HH 时 mm 分 ss 秒"> </van-count-down>
      <!-- 启动支付宝按钮 -->
      <div v-if="false">
        <van-button type="info" style="width:220px;height:35px;font-weight:500;margin-top:10px;" :url="order.qr">立即启动支付宝APP支付</van-button>
      </div>
      <van-divider />
      <!-- 使用支付宝支付提示 -->
      <div>请使用支付宝扫码支付<span class="s1">{{ order.orderPrice }}</span>元</div>
      <!-- 订单信息 -->
      <van-cell title="订单信息">
        <!-- 描述 -->
        <template #label>
          <div>订单号: {{order.ordername}}</div>
          <div>商品名称: {{order.goodname}}</div>
          <div>购买数量: {{order.count}} 张</div>
          <div>合计金额: {{order.orderPrice}} 元</div>
        </template>

      </van-cell>
    </div>

  </div>
</template>

<script>
import { request } from '@/network/request.js'
import QRCode from 'qrcodejs2'
export default {
  name: 'alipay',

  components: {

  },
  props: [
    'order',
  ],
  data() {
    return {
      time: 10 * 60 * 1000,
      timer: null,
    }
  },
  created() {

  },
  mounted() {

    this.creatQrCode();
  },
  methods: {
   
    creatQrCode() {
      var qrcode = new QRCode(this.$refs.qrCodeUrl, {
        text: this.order.qrcode, // 需要转换为二维码的内容
        width: 200,
        height: 200,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      })
    },

  },
  // 离开组件关闭检测订单支付状态定时器
  destroyed() {
    clearInterval(this.timer)
  }
}
</script>

<style lang="less" scoped>
#alipay {
  height: 100%;
  background-color: var(--main_color) !important;
  .top {
    text-align: center;
    margin: 0 auto;
    img {
      width: 100px;
    }
  }
}
.img {
  min-height: 420px;
  width: 75vw;
  max-width: 400px;
  padding: 20px;
  font-size: 17px;
  background-color: #ffffff;
  text-align: center;
  margin: 0 auto;
  color: rgb(54, 54, 54);
  border-radius: 3%;
  img {
    width: 220px;
    border-radius: 2%;
  }
  .img2 {
    display: inline-block !important;
  }
}
</style>
