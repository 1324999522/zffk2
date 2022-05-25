<template>

  <div id="pay_info">
    <div class='tab'>

      <el-form ref="form" :model="form" label-width="120px" size="medium" label-position='left'>
        <!-- 表单内容区域 -->

        <el-form-item label="支付宝">
          <el-switch v-model="form.pay_alipay" :active-value='1' :inactive-value='0'  >
          </el-switch>
        </el-form-item>

        <el-form-item label="微信支付">
          <el-switch v-model="form.pay_wechatpay"  :active-value='1' :inactive-value='0' >
          </el-switch>
        </el-form-item>

        <el-form-item label="QQ钱包">
          <el-switch v-model="form.pay_qqWallet" :active-value='1' :inactive-value='0' >
          </el-switch>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="updateConfig()">保存更改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { request } from '@/network/request.js'

export default {
  props: ["form", 'updateConfig'],
  name: 'pay_info',
  components: {

  },
  data() {
    return {

    }
  },
  methods: {},
  created() { },
}
</script>

<style lang="less" scoped>
#pay_info {
  .tab {
    padding: 30px;
    width: 500px;
  }
}
</style>
