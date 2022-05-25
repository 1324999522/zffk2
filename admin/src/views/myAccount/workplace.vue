<template>

  <div id="workplace">

    <div class='top_box'>
      <div class='left_box'>
        <div>
          <img src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" alt="">
        </div>

        <div class='top_box_right_text'>
          <p>{{timeFix()}} ，{{$store.state.merchant.username }}，{{timeFix()=='早上好'?'开始您一天的工作吧':welcome()}} </p>
          <p>账户余额：￥{{$store.state.merchant.balance }}
            | 投诉冻结：￥0
          </p>
        </div>

      </div>

      <div class='right_box'>

        <div class='right_box_item'>
          <p>今日收益</p>
          <p style="color:var(--main_color);">{{$store.state.merchant.Sales_today || 0}}</p>
        </div>

        <div class='right_box_item'>
          <p>今日订单</p>
          <p>{{$store.state.merchant.orders_count_today || 0}}</p>
        </div>

        <div class='right_box_item' v-if="!$isPhone">
          <p>总成交订单</p>
          <p>{{$store.state.merchant.orders_count_total || 0}}</p>
        </div>

        <div class='right_box_item'>
          <p>总成交金额</p>
          <p>{{$store.state.merchant.Sales_total || 0}}</p>
        </div>
      </div>
    </div>

    <div :class='{medium_phone:$isPhone,medium:true}'>
      <el-card class='my_card'>
        <div slot="header">最近订单
          <el-button style="float: right; padding: 3px 0" type="text" @click="$router.push(`/goods/order`)">全部订单</el-button>
        </div>
        <div class='my_card_content'>
          <div v-for="order in orders" :key='order.id' class='my_card_content_item' :style="{'min-width':$isPhone?'100%':'33.3%'}">
            <div>
              <p> {{order.goodName}} x {{order.count}}</p>
              <p>
                订单总价：{{order.orderPrice}} 元 | 订单分成：<span style="color:var(--main_color);">{{order.real_get_money}} 元</span>
              </p>
              <div class='my_card_content_item_bottom'>
                <p>{{order.ordername}}</p>
                <p>{{$moment(order.createdAt, "YYYY-MM-DD hh:mm:ss").fromNow()}}</p>
              </div>
            </div>
          </div>
        </div>
      </el-card>

      <el-card class='quick_start_box'>
        <div slot="header">快速开始</div>
        <div class='quick_start'>
          <el-row :gutter="10" class="quick_start_row">
            <el-col :span="6">
              <el-link :underline="false">商品列表</el-link>
            </el-col>
            <el-col :span="6">
              <el-link :underline="false">商品分类</el-link>
            </el-col>
            <el-col :span="6">
              <el-link :underline="false">商户信息</el-link>
            </el-col>
            <el-col :span="6">
              <el-link :underline="false">信息汇总</el-link>
            </el-col>
            <el-col :span="6">
              <el-link :underline="false">资金变动</el-link>
            </el-col>
            <el-col :span="6">
              <el-link :underline="false">添加代理商品</el-link>
            </el-col>
          </el-row>
        </div>
      </el-card>

    </div>

  </div>
</template>

<script>
import { request } from '@/network/request.js'
import { get_order_page } from '@/network/api/order'

export default {
  name: 'workplace',
  components: {

  },
  data() {
    return {
      orders: []
    }
  },
  created() {
    get_order_page({ limit: 6, status: '已支付' })
      .then(res => {
        this.orders = res.data.data.rows
      })
  },
  methods: {
    timeFix() {
      const time = new Date()
      const hour = time.getHours()
      return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
    },
    welcome() {
      const arr = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 DOTA', '我猜你可能累了']
      const index = Math.floor(Math.random() * arr.length)
      return arr[index]
    }
  },

}
</script>

<style lang="less" >
#workplace {
  .top_box {
    display: flex !important;
    background-color: white;
    padding: 20px;
    justify-content: space-between;
    flex-wrap: wrap;
    .left_box {
      display: flex;
      .top_box_right_text {
        margin-left: 20px;
        line-height: 35px;
        :nth-child(1) {
          font-size: 20px;
          color: var(--first_font_color);
        }
        :nth-child(2) {
          font-size: 14px;
          color: var(--third_font_color);
        }
      }
    }
    img {
      width: 72px;
    }
    .right_box {
      display: flex !important;
      .right_box_item {
        padding: 0px 20px;
        line-height: 35px;
        :nth-child(1) {
          font-size: 14px;
          color: var(--third_font_color);
        }
        :nth-child(2) {
          font-size: 24px;
          color: var(--second_font_color);
        }
      }
    }
  }
  .medium {
    margin: 20px 0px;
    display: flex;
    justify-content: space-between;
  }
  .my_card {
    background-color: white;
    margin-right: 20px;
    width: 100%;
    .el-card__body {
      padding: 0px !important;
    }
    .el-card__header {
      border-bottom: 1px solid #ffffff;
    }
    .my_card_content {
      display: flex;
      // column-count: 1;
      flex-wrap: wrap;

      .my_card_content_item {
        flex: 1;
        border-top: 1px solid #dcdfe6;
        > div:nth-child(1) {
          padding: 20px;
          color: var(--third_font_color);
          line-height: 24px;
          font-size: 14px;
          > p:nth-child(1) {
            line-height: 30px;
            font-size: 16px;
            color: var(--first_font_color);
          }
          .my_card_content_item_bottom {
            display: flex;
            justify-content: space-between;
            font-size: 12px;
          }
        }
      }
    //   .my_card_content_item:nth-child(2) {
    //     border-left: 0.5px solid #dcdfe6;
    //   }
      .my_card_content_item:hover {
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
      }
    }
  }

  .quick_start_box {
    min-width: 500px;
  }
  .quick_start {
    text-align: center;
    a {
      margin-bottom: 15px;
    }
  }

  .medium_phone {
    flex-wrap: wrap;
    .my_card {
      margin-right: 0px;
      margin-bottom: 20px;
    }
    .quick_start_box {
      min-width: 280px;
    }
  }
}
</style>
