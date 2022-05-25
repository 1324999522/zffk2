<template>
  <div id="shopTop">

    <van-row class="top" ref="top">

      <div class="hide" ref="div">
        <!-- 菜单 -->
        <van-icon class='ellipsis' name="ellipsis" @click="ellipsis()" />

        <van-col style="margin-right:10px;">
          <img :src="`/api/${$store.state.config.portrait}`" class="toux" />
        </van-col>

        <van-col>
          <div class="title">{{$store.state.config.merchant_title}}</div>
          <div :class="{'x':true}">
            {{$store.state.config.contact}}
          </div>

        </van-col>

      </div>
    </van-row>
    <!--通知栏 -->
    <van-notice-bar v-if="$store.state.config.merchant_noticebar" color="var(--main_color)" background="#ecf9ff" left-icon="volume-o">
      {{$store.state.config.merchant_noticebar}}
    </van-notice-bar>
    <!-- 弹出层 -->
    <!-- <van-popup v-model="show" position="bottom" :style="{ height: '30%' }" closeable round>
      <div style="padding:40px 20px;">
        <van-row :gutter="10">
          <van-col span="8">
            <van-button type="primary" to="/order" :color="$store.state.config.merchant_main_color" icon="search"> 订单查询</van-button>
          </van-col>
          <van-col span="8">
            <van-button type="primary" to="/articles" :color="$store.state.config.merchant_main_color" icon="description"> 帮助中心</van-button>
          </van-col>
          <van-col span="8">
            <van-button type="primary" to="/" :color="$store.state.config.merchant_main_color" icon="home-o"> 网站首页</van-button>
          </van-col>
        </van-row>

      </div>

    </van-popup> -->

    <!--  -->
    <van-action-sheet v-model="show" :actions="actions" cancel-text="取消" close-on-click-action @select='select' />
  </div>
</template>

   
<script>
import { request } from '@/network/request.js'
import md5 from 'js-md5';
export default {
  name: 'shopTop',
  components: {},
  data() {
    return {
      show: false,
      actions: [{ name: '订单查询' }, { name: '帮助中心' }, { name: '申请售后' }],
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    ellipsis() {
      this.show = true
    },
    select(action, index) {
      console.log(action, index)
      if (action.name == '订单查询') this.$router.push('/order')
      if (action.name == '帮助中心') this.$router.push('/article_list')
      if (action.name == '申请售后') this.$router.push('/after_sale')
    }
  },

}
</script>

<style lang="less" scoped>
.top {
  height: 110px;

  background-color: var(--main_color);
  // background-image: url('http://pic26.nipic.com/20130125/9252150_112213491339_2.jpg');
  background-size: auto 100px;

  .hide {
    height: 100px;
    padding-top: 20px;
    padding-right: 5px;
    overflow: hidden;
    .toux {
      width: 65px;
      height: 65px;
      margin-left: 20px;
      border-radius: 50%;
    }
    .title {
      font-size: 19px;
      color: white;
      font-weight: 700;
      line-height: 35px;
    }
    .x {
      margin-left: 2px;
      font-size: 12px;
      color: rgb(240, 240, 240);
      letter-spacing: 0.2px;
      line-height: 15px;
    }
  }
}
.ellipsis {
  font-size: 26px !important;
  color: white;
  position: absolute;
  left: 90%;
  transform: rotate(90deg);
}
</style>
