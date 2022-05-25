<template>

  <div id="select_pay">
    <!-- 商品简介 -->
    <div class='describe'>
      <div v-if='$store.state.template.good.wholesale_open==1 && $store.state.template.good.wholesales.length != 0' class='describe_text'>

        <div v-for="(wholesale,index) in $store.state.template.good.wholesales" :key="wholesale.id">

          <el-row :gutter="5">
            <el-col :span="1.5">
              <van-icon class='describe_text2_icon' name="point-gift-o" size="17px" color="red" />
            </el-col>
            <el-col :span="22">
              优惠{{index+1}}：买满{{wholesale.count}}件，商品单价变为{{wholesale.price}}元
            </el-col>
          </el-row>
        </div>

      </div>

      <el-row :gutter="5">
        <el-col :span="1.5">
          <van-icon class='describe_text2_icon' name="comment-o" size="16px" color="var(--main_color)" />
        </el-col>
        <el-col :span="22" style="line-height:18px;">
          商品描述：{{$store.state.template.good.describe}}
          <span v-show='$store.state.template.good.describe<5'>暂无描述</span>
        </el-col>
      </el-row>

    </div>
    <!-- 购买数量 -->
    <van-cell is-link>
      <template #title>
        <van-tag type="primary" size="large" color='var(--main_color)'>购买数量</van-tag>
      </template>
      <template #right-icon>
        <van-stepper v-model="$store.state.template.count" :min="$store.state.template.good.limit_buy_count_less" :max="max()" integer @change='change_count()' />
      </template>
    </van-cell>
    <!-- 支付选择 -->
    <selectPay></selectPay>
    <!-- 底部 -->
    <van-row class="footer">

      <!-- <p class="foot1">投诉/查单请联系QQ: <span><a href="" style="color:var(--main_color);">( 8588927 )</a></span> 咨询</p> -->

      <p class="foot2">本卡密自动销售技术由<span >@争锋</span>提供</p>
    </van-row>
    <!-- 提交订单 -->
    <van-submit-bar :price="$store.state.template.price * $store.state.template.count *100" button-text="提交订单" @submit="onSubmit()">
      <van-goods-action-icon icon="search" text="查单" @click="$router.push('/order')" color="var(--main_color)" />
      <van-goods-action-icon icon="chat-o" text="客服" :url='$store.state.config.contact_cs' color="var(--main_color)" />
      <!-- <van-button icon="search" type="primary" size="small" color="var(--main_color)" plain @click="$router.push('/order')">订单查询</van-button> -->
    </van-submit-bar>

  </div>
</template>

<script>
import { request } from '@/network/request.js'
import selectPay from '@/views/children/select_pay'
export default {
  name: 'select_pay',
  components: {
    selectPay,
  },
  data() {
    return {

    }
  },
  beforeCreated() {


  },
  created() {

  },
  mounted() {

  },
  methods: {


    onSubmit() {
      this.$store.state.onSubmit(this)
    },
    // 改变购买数量事件
    change_count() {
      let { count, good } = this.$store.state.template
      // 如果开启批发
      if (good.wholesale_open === 1) {
        // let count_flag = 0
        for (const wholesale of good.wholesales) {
          if (count >= wholesale.count) {
            this.$store.state.template.price = wholesale.price
          }
        }
      }
    },
    // 最大购买数量
    max() {
      if (this.$store.state.template.good.noUse > this.$store.state.template.good.limit_buy_count) {
        return this.$store.state.template.good.limit_buy_count
      } else {
        return this.$store.state.template.good.noUse
      }

    }
  },

}
</script>

<style lang="less" scoped>
.describe {
  background-color: rgb(245, 245, 245);
  margin: 10px;
  padding: 15px 10px;
  border-radius: 5px;
  color: #999;
  font-size: 12px;
  font-weight: 700;
  line-height: 20px;
  i {
    vertical-align: -22%;
    margin-right: 5px;
  }
  .describe_text {
    margin-bottom: 10px;
  }
}

.alipay {
  color: #00bbee;
  font-size: 22px;
  margin-right: 5px;
}
.wechatpay {
  color: #00c250;
  font-size: 20px;
  margin-right: 5px;
}
.qqWallet {
  color: #414141;
  font-size: 22px;
  margin-right: 5px;
}

.footer {
  height: 50px;
  padding: 60px 15px;
  font-size: 12px;
  color: var(--footTextColor);
  .foot1 {
    text-align: center;
  }
  .foot2 {
    margin-top: 10px;
    text-align: center;
  }
}
</style>
