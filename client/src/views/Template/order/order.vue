<template>
  <div>
    <van-nav-bar v-if="$isPhone" title="查询订单" right-text="浏览器缓存" left-arrow @click-left="$router.back()" @click-right="$router.push('/cache_query')" :border='false' />

    <homeTopPc v-if="!$isPhone">
      <template v-slot:right>
        <el-button icon="el-icon-warning-outline" type="danger" @click="$router.push('/after_sale')">投诉订单</el-button>
        <el-button icon="el-icon-search" type="primary" @click="$router.push('/cache_query')">浏览器缓存</el-button>
      </template>

    </homeTopPc>

    <div id="order" class='out_box_base'>

      <div style="padding:10px;">
        <div class='main'>
          <div class='main_text_box'>
            <h1>查询订单卡密</h1>
            <p style="margin:10px 0px;">写支付宝账单详情里的订单号,或使用"ZF"开头的订单号查询</p>
            <p style="margin:10px 0px;">可点击右上角浏览器缓存快速查询最近订单</p>
          </div>
        </div>

        <div class='input_box'>
          <p>

            <van-icon name="orders-o" />

          </p>

          <input v-model="ordername" ref="input_query" type="text" placeholder="请输入订单号">
        </div>

        <div>
          <van-button @click="handle_query()" class='query_button' type="primary" block>查询</van-button>
        </div>

      </div>
    </div>

    <!-- 弹出框 -->
    <el-dialog title="购买" :visible.sync="is_afterSale" width="410px">

      <afterSale> </afterSale>
      <span slot="footer" class="dialog-footer">
        <el-button @click="is_afterSale = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit()">去支付</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
import { request } from '@/network/request.js'
import navbar from '@/components/public/navbar'
import homeTopPc from '@/views/children/home_top_pc'
import afterSale from '@/views/Template/order/after_sale'
export default {
  name: 'order',
  components: {
    navbar,
    homeTopPc,
    afterSale
  },
  data() {
    return {
      name: null,
      ordername: '',
      order: {},
      is_afterSale: false
    }
  },
  async beforeCreate() {

  },
  async created() {
    if (this.$route.params.ordername != undefined) {
      this.ordername = this.$route.params.ordername
      this.handle_query()
    }
    // 获取焦点
    setTimeout(() => {
      this.$refs.input_query.focus()
    }, 100)
  },
  methods: {
    async handle_query() {
      let flag = await this.order_query()
      if (!flag) {
        this.$message.error(res.data.msg)
      }

      this.$router.push({
        name: 'order_details',
        query: {
          ordername: this.ordername
        }
      })
    },
    async order_query() {
      let res = await request({
        url: "/client/order/query",
        method: "get",
        params: {
          ordername: this.ordername
        }
      })
      this.order = res.data.data
      if (res.data.code !== 0) {
        this.$message.warning(res.data.err)
      }
      if (res.data.code === 0) return true
    },
  },




}
</script>

<style lang="less" scoped>
#order {
  margin: 5px;
  .van-button--primary {
    color: #fff;
    background-color: var(--main_color);
    border: 1px solid var(--main_color);
  }
}

.main {
  margin-top: 40px;
}

.input_box {
  margin: 20px 0px;
  width: 100%;
  line-height: 40px;
  background: #fcfcfc;
  border: 2px solid #f2f2f2;
  border-radius: 5px;
  box-sizing: border-box;
  input {
    display: inline-block;
    vertical-align: middle;
    color: #999;
    font-weight: 500;
    font-size: 14px;
    background: #fcfcfc;
    border: none;
    margin-left: 5px;
    width: 80%;
    margin-bottom: 5px;
  }
  p {
    margin: 0px 10px;
    display: inline-block;
    font-size: 16px;
  }
}

.query_button {
  border-radius: 4px;
  font-size: 18px;
  font-weight: 700;
}
</style>
