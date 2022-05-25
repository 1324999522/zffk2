<template>

  <div id="select_pay">

    <!-- 支付选择 -->
    <van-radio-group v-model="$store.state.template.payMode" checked-color='var(--main_color)'>
      <van-cell-group>
        <van-cell v-if="$store.state.system_config.ali_pay_show" clickable @click="$store.state.template.payMode = '支付宝'">
          <template #title>
            <div> <i class="alipay iconfont icon-zhifubao"> </i> 支付宝</div>
          </template>
          <template #right-icon>
            <van-radio :name="'支付宝'" />
          </template>
        </van-cell>
        <van-cell v-if="$store.state.system_config.wx_pay_show" clickable @click="$store.state.template.payMode = '微信支付'">
          <template #title>
            <div> <i class="wechatpay iconfont icon-weixinzhifu"> </i> 微信支付</div>
          </template>
          <template #right-icon>
            <van-radio :name="'微信支付'" />
          </template>
        </van-cell>
        <van-cell v-if="false" clickable @click="$store.state.template.payMode = 'QQ钱包'">
          <template #title>
            <div> <i class="qqWallet iconfont icon-qq"> </i> QQ钱包</div>
          </template>
          <template #right-icon>
            <van-radio :name="'QQ钱包'" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>

  </div>
</template>

<script>
import { request } from '@/network/request.js'

export default {
  name: 'select_pay',
  components: {

  },
  data() {
    return {

    }
  },
  methods: {
    click_pay_wechatpay() {
      this.$message.warning('暂不支持微信支付')
      this.$store.state.template.payMode = '支付宝'
    }
  },
  created() { },
}
</script>

<style lang="less" scoped>
.alipay {
  color: #00bbee;
  font-size: 22px;
  margin-right: 5px;
  vertical-align: -8%;
}
.wechatpay {
  color: #00c250;
  font-size: 20px;
  margin-right: 5px;
  vertical-align: -8%;
}
.qqWallet {
  color: #414141;
  font-size: 22px;
  margin-right: 5px;
  vertical-align: -8%;
}
</style>
