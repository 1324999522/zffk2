<template>

  <div id="my_card_list">

    <div class='my_card_list' v-for="merchant in data" :key="merchant.id">

      <div>
        <img :src="'api/'+merchant.portrait" alt="">
      </div>

      <div class='text_box'>
        <p class="title">{{merchant.merchant_title}}</p>
        <p class="discount">折扣：{{merchant.proxy_discount}} 折</p>
        <p class="discount">可代理商品：{{merchant.allow_goods_count}} 个</p>
      </div>

    </div>

  </div>
</template>

<script>
import { request } from '@/network/request.js'
export default {
  name: 'my_card_list',
  props:{
    data:Array,

  },
  components: {

  },
  data() {
    return {

    }
  },
  methods: {

  },
  created() {

  },
}
</script>

<style lang="less" scoped>
#my_card_list{
  display: flex;
}
.my_card_list {
  margin-right: 10px;
  margin-bottom: 20px;
  img {
    width: 50px;
    border-radius: 50%;
  }
  width: 240px;
  height: 80px;
  display: flex;
  padding: 20px;
  background-color: rgb(246, 246, 246);

  .text_box {
    width: 150px;
    padding: 0px 20px;
    .title {
      line-height: 30px;
      color: var(--main_color);
    }
    .discount {
      font-size: 12px;
      color: var(--second_font_color);
      line-height: 20px;
    }
  }
}
</style>
