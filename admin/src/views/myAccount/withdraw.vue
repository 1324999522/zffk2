<template>

  <el-card id="withdraw">

    <div class='money_box'>
      <p>账户余额 <span class='withdraw_money'> {{$store.state.merchant.balance}}</span> </p>
      <p>投诉冻结 <span class='withdraw_money'> 0.00 </span> </p>
    </div>
    <el-divider content-position="right"></el-divider>
    <div class='withdraw_input_box'>
      <el-input placeholder="请输入提现金额，只能为整数" v-model="money" clearable ref='withdraw'></el-input>
      <p class='form-item-bottom'>不足100元扣费2元,超过部分每100元扣费2元,最低申请结算10元</p>

      <el-button type="primary" class='withdraw_button' @click="hand_withdraw()">提 现</el-button>
    </div>

  </el-card>

</template>

<script>
import { request } from '@/network/request.js'

export default {
  name: 'withdraw',
  components: {

  },
  data() {
    return {
      money: null,
    }
  },
  created() {

  },
  mounted() {
    if (!this.$isPhone) this.$refs.withdraw.focus()
  },
  methods: {
    async hand_withdraw() {
      this.money = Number(this.money)
      let isInt = Number.isInteger(this.money)
      if (!isInt) {
        this.$message.error('只能为整数')
        return
      }
      let res = await request({
        url: '/merchant/withdraw_record/hand',
        method: 'post',
        data: {
          money: this.money,
        }
      })
    },


  },

}
</script>

<style lang="less" >
#withdraw {
  .money_box {
    p {
      line-height: 60px;
      color: var(--third_font_color);
    }
    .withdraw_money {
      margin-left: 15px;
      font-size: 30px;
      color: var(--second_font_color);
      font-weight: 700;
    }
  }

  .withdraw_input_box {
    max-width: 300px;
    .el-input__inner {
      color: var(--main_color);
      font-size: 16px;
      font-weight: 700;
    }
    .withdraw_button {
      margin-top: 20px;
      width: 100%;
      margin-bottom: 20px;
      font-weight: 700;
      font-size: 16px;
    }
  }
}
</style>
