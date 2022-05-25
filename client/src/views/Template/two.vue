<template>
  <div class="one">
    <homeTop> </homeTop>
    <!-- 分类 -->

    <van-row class='good_class'>

      <div :class='{good_class_itme:true,good_class_itme_active:index === $store.state.template.activeFlag}' v-for="(item,index) in $store.state.template.good_types" :key="item.id" :span='12' @click="select_class(index)">
        <div class='d1'>
          {{item.good_typename}}

          <div style="font-size:12px;" class='d2'>
            (包含{{item.goods.length}}种商品)
            <div class='kailong'> </div>
          </div>

        </div>

      </div>

    </van-row>

    <van-divider :style="{  padding: '0px 0px' }">选择商品</van-divider>
    <!-- 商品 -->

    <van-row class='good_class good'>

      <div :class='{good_class_itme:true,good_item:true,good_itme_active:index === $store.state.template.activeFlag_good}' v-for="(item,index) in $store.state.template.goods" :key="item.id" :span='12' @click="select_good(index)">
        <div class='d1'>
          {{item.goodname}}

          <div class='good_d2'>
            ￥ {{item.price}} <span class="good_d2_s1">
              <van-tag v-if="item.noUse > 0" type="primary">库存 <span style="font-weight: 600;"> {{item.noUse}} </span>件</van-tag>
              <van-tag v-if="item.noUse === 0" type="warning">无库存 </van-tag>
            </span>
          </div>
        </div>

      </div>

    </van-row>

  </div>
</template>

<script>
import home_top from '@/views/children/home_top'
import { request } from '@/network/request.js'
import homeTop from '@/views/children/home_top'
export default {
  name: 'Home',
  components: {
    homeTop,
  },
  data() {
    return {

    }
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
    }

  },
  async created() {
    this.getClass()
  },
}
</script>

<style lang="less" scoped>
.good_class {
  padding: 1vw;
  //   column-count: 2;
  flex-wrap: wrap;
  display: flex;
  margin: 0px auto;
  .good_class_itme {
    border-radius: 1vw;
    margin: 1vw;
    display: inline-block !important;
    padding: 1vw;
    width: 45vw;
    background-color: rgb(245, 245, 245);
    // border:1px solid black;
    .d1 {
      padding: 3vw;
      font-size: 13px;
      color: rgb(36, 36, 36);
      font-weight: 600;
      .d2 {
        margin-top: 8px;
        font-size: 13px;
        color: rgb(121, 121, 121);
        font-weight: 300;
      }
    }
  }
}

.good_class_itme_active {
  background-color: var(--main_color) !important;
  .d1 {
    color: white !important ;
  }
  .d2 {

    color: rgb(248, 248, 248) !important ;
  }

  .kailong {
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid rgb(255, 255, 255);
    float: right;
  }
}

.good_item {
  background-color: white !important;
  border: 1.2px solid #e0e0e0;
  width: 44.3vw !important;
  border-radius: 5px !important;
  .good_d2 {
    font-size: 13px;
    margin-top: 10px;
    color: var(--main_color);
    .good_d2_s1 {
      margin-left: 10px;
      .van-tag {
        background-color: rgb(255, 255, 255);
        color: rgb(88, 88, 88);
        padding: 1px 4px 1px 4px;
        font-size: 10px !important;
        font-weight: 300;
      }
    }
  }
}
.good_itme_active {
  border: 1.2px solid var(--main_color);
  .d1 {
    color: var(--main_color) !important ;
  }
  
  .good_d2_s1 {
    .van-tag {
      background-color: var(--main_color) !important;
      color: white !important;
    }
  }
}

.footer {
  height: 80px;
  padding: 80px 15px;
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
.good_price {
  color: var(--main_color);
}
</style>
