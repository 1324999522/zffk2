<template>

  <div id="pay_pc">

    <div class='top_box' style="height:50px;"></div>

    <div class='pay_pc_box'>

      <div class='title'>

        请在
        <van-count-down :time="time" format="mm:ss" /> 分钟内扫描二维码完成支付
      </div>

      <div class='order'>
        订单号：{{order.ordername}}
        <span class='copy'>
          <el-link @click="$copy(order.ordername)" :underline="false">复制</el-link>
        </span>
      </div>

      <div>
        {{order.goodname}} x{{order.count}}
      </div>

      <van-divider />

      <div class='qr_code_box'>

        <div class='qr_code_text_box'>

          <h2>{{order.orderPrice}} <span style="font-size:18px;">元</span> </h2>
          <div class='qr_code_text_box_payMode'>
            <div v-if="order.payMode==`支付宝`">
              <i class="alipay iconfont icon-zhifubao"></i>支付宝扫码
            </div>
            <div v-if="order.payMode==`微信支付`">
              <i class="wechatpay iconfont icon-weixinzhifu"></i>微信支付
            </div>

          </div>
          <img :src="order.qrcode" alt="">
          <div>
            <i class='el-icon-loading' style="font-size:20px;"></i> 正在检测付款状态 {{this.count }} 次
          </div>

        </div>
      </div>

    </div>

    <div v-show="false" class="img">
      <!-- 支付二维码 -->
      <img :src="order.qrcode" alt="" />
      <div class="qrcode img2" ref="qrCodeUrl"></div>
      <!-- 10分钟倒计时 -->
      <van-count-down :time="time" format="HH 时 mm 分 ss 秒"> </van-count-down>

    </div>

  </div>
</template>

<script>
import { request } from '@/network/request.js'
import QRCode from 'qrcodejs2'
export default {
  name: 'pay_pc',

  components: {

  },
  props: [
    'order',
  ],
  data() {
    return {
      time: 10 * 60 * 1000,
      timer: null,
      count: 0,
    }
  },
  created() {
    this.Timer = setInterval(() => {
      this.count += 1
    }, 3000)
  },
  mounted() {


  },
  methods: {


  },
  // 离开组件关闭检测订单支付状态定时器
  destroyed() {
    clearInterval(this.timer)
  }
}
</script>

<style lang="less" scoped>
#pay_pc {
  background-color: rgb(245, 245, 245);
  min-height: 100%;
  font-size: 14px;
  color: #999;
  line-height: 40px;

  .title {
    font-size: 20px;
    font-weight: 600;
    color: var(--second_font_color);
  }
  .order {
    margin: 10px auto;
    border-radius: 2px;
    height: 40px;
    width: 260px;
    background-color: rgb(245, 245, 245);
    .copy {
      color: brown;
      float: right;
      margin-right: 14px;
    }
  }
}

.pay_pc_box {
  width: 1100px;
  margin: 0px auto;
  padding-top: 35px;
  background-color: #fff;
  border-radius: 10px;
  text-align: center;
  .van-count-down {
    display: inline-block;
    color: var(--main_color);
    font-size: 20px;
  }
  .qr_code_box {
    background-image: url("../../assets/img/pay.png");
    background-repeat: no-repeat;
    height: 500px;
    width: 555px;
    margin: 0 auto;
    .qr_code_text_box {
      padding-top: 70px;
      text-align: center;
      img {
        height: 210px !important;
        width: 210px !important;
      }
      h2 {
        color: var(--main_color);
        font-size: 24px;
      }
      .qr_code_text_box_payMode {
        .alipay {
          color: #00bbee;
          font-size: 24px;
          margin-right: 5px;
          vertical-align: -6%;
        }
        .wechatpay {
          color: #00c250;
          font-size: 22px;
          margin-right: 5px;
          vertical-align: -6%;
        }
      }
    }
  }
}
</style>
