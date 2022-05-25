<template>

  <div id="one_pc">
    <homeTopPc>
      <template v-slot:right>
        <el-button icon="el-icon-search" type="primary" @click="$router.push('/order')">查询订单</el-button>
      </template>

    </homeTopPc>

    <div class='box1'>
      <el-row :gutter="10">

        <el-col :span="6">
          <el-card class="card_box1" shadow='always'>
            <div slot="header" class='card_1_Notice_title '>
              店铺公告
            </div>
            <div class='card_1_Notice markdown-body' v-html='$store.state.config.merchant_describe_html'>

            </div>

          </el-card>
        </el-col>
        <el-col :span="18">
          <el-card class='card_box2' shadow='always'>
            <div slot="header" class='classify'>
              <div :class='{box_class_item:true,box_class_item_active:data.activeFlag === index}' v-for="(type,index) in data.good_types" :key="type.id" @click="select_class(index)">
                <div class='box_class_item_name'> {{type.good_typename}}</div>
                <div class='box_class_item_count'> 包含{{type.goods.length}}种商品</div>
              </div>
            </div>
            <el-table :data="data.goods" style="width: 100%">
              <el-table-column prop="name" label="商品名称" width="180" class='good_name'>
                <template slot-scope="scope">
                  <p class='good_name'> {{scope.row.goodname}}</p>
                </template>
              </el-table-column>
              <el-table-column prop="noUse" label="库存" width="80">
              </el-table-column>
 
              <el-table-column prop="price" label="单价" width="80">
                <template slot-scope="scope">￥ {{scope.row.price}}</template>
              </el-table-column>
              <el-table-column label="描述">
                <template slot-scope="scope">
                  <p class="describe" v-html="scope.row.describe"></p>
                </template>
              </el-table-column>

              <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                  <el-button v-if="scope.row.noUse === 0" type="info" size="small" disabled>缺货</el-button>

                  <el-button v-if="scope.row.noUse > 0" @click="handleClick(scope.$index)" type="primary" size="small">购买</el-button>

                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>

      </el-row>
    </div>

    <!-- 底部 -->
    <div class="footer">
      <p class="foot1" style="padding:0px 30px" v-html="$store.state.config.web_foot"> </p>
    </div>

    <!-- 弹出框 -->
    <el-dialog title="购买" :visible.sync="is_buy" width="410px">

      <van-cell title="商品名称" :value="data.good.goodname" />
      <van-cell title="商品单价" :value="`￥${data.good.price}`" />
      <van-cell title="购买数量">
        <template #right-icon>
          <van-stepper v-model="data.count" :min="$store.state.template.good.limit_buy_count_less" :max="max()" integer @change='change_count()' />
        </template>
        <template #label>
          <div class='wholesale' v-for="(wholesale,index) in $store.state.template.good.wholesales" :key="wholesale.id">
            <van-icon name="point-gift-o" size="17px" color="red" />
            优惠{{index+1}}：买满{{wholesale.count}}件，商品单价变为{{wholesale.price}}元
          </div>
        </template>
      </van-cell>
      <van-cell title="应付款" :value="`￥${(data.price * data.count).toFixed(2)}`" />
      <selectPay> </selectPay>
      <span slot="footer" class="dialog-footer">
        <el-button @click="is_buy = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit()">去支付</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { request } from '@/network/request.js'
import homeTopPc from '@/views/children/home_top_pc'
import selectPay from '@/views/children/select_pay'
export default {
  name: 'one_pc',
  components: {
    homeTopPc,
    selectPay,
  },
  props: [
    'name'
  ],
  data() {
    return {
      is_buy: false,
    }
  },
  async created() {
    this.getClass()
    this.data = this.$store.state.template
  },
  methods: {
    // 点击分类
    select_class(index) {
      this.$store.commit('select_class', index)
    },
    // 获取分类与商品
    async getClass() {
      await this.$store.commit('getClass', 1)
    },
    // 选择商品
    select_good(index) {
      this.$store.commit('select_good', index)
    },
    // 提交订单
    async onSubmit() {
      this.$store.state.onSubmit(this)
    },
    // 点击购买
    handleClick(index) {
      this.select_good(index)
      this.is_buy = true
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
    },


  },

}
</script>

<style lang="less" scoped>
#one_pc {
  .box1 {
    width: 1150px;
    margin: 0 auto;
    // background-color: rgb(233, 233, 233);
    height: 100%;
  }
}
.card_box1 {
  color: var(--first_font_color);
  font-size: 14px;
  // letter-spacing: 0.5px;
  min-height: 650px;
  .card_1_Notice_title {
    color: rgb(70, 70, 70);
    font-size: 16px;
    font-weight: 500;
  }
  .card_1_Notice {
    font-size: 14px;
    
    line-height: 22px;
  }
}
.card_box2 {
  min-height: 650px;
}

.classify {
  display: flex;
  flex-wrap: wrap;
  .box_class_item {
    font-size: 14px !important;
    margin: 5px;
    cursor: pointer;
    background-color: rgb(245, 245, 245);
    border-radius: 5px;
    padding: 0px 15px;
    .box_class_item_name {
      text-align: center;
      padding: 10px;
      padding-top: 15px;
    }
    .box_class_item_count {
      padding-bottom: 15px;
      text-align: center;
      font-size: 12px;
    }
  }
  .box_class_item:hover {
    transition: background-color 1s, color 0.5s;
    background-color: var(--main_color);
    color: white;
  }
  .box_class_item_active {
    transition: background-color 1s, color 0.5s;
    background-color: var(--main_color);
    color: white;
  }
}

// 描述
.describe {
  font-size: 13px;
  color: rgb(133, 133, 133);
}
.good_name {
  font-size: 14px !important;
  color: rgb(36, 36, 36);
}

.footer {
  padding-top: 50px;
  margin: 0px auto;
  text-align: center;
  width: 300px;
  font-size: 12px;
  color: var(--footTextColor);
}

// 优惠信息
.wholesale {
  font-size: 12px;
  i {
    vertical-align: -22%;
    margin-right: 2px;
  }
}
</style>
