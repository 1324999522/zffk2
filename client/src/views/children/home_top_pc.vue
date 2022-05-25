<template>

  <div id="home_top_pc">
    <div class="top">
      <div class="top_div">
        
        <div @click="$router.push('/')">
          <img :src="`/api/${$store.state.config.portrait}`" class="toux" />
        </div>

        <div class="top_div_title">
          <div>{{$store.state.config.merchant_title}}</div>
          <div> {{$store.state.config.contact}} </div>
        </div>

        <div class="top_div_button">
          <slot name='right' > </slot>

        </div>

      </div>

    </div>

  </div>
</template>

<script>
import { request } from '@/network/request.js'

export default {
  name: 'home_top_pc',
  components: {

  },
  data() {
    return {
      qurey() {
        this.$router.push('/order')
      }

    }
  },
  methods: {},
  created() { },
}
</script>

<style lang="less" scoped>
.top {
  padding-top: 10px;
  width: 100%;
  height: 60px;
  margin-bottom: 20px;
  // background-color: rgb(240, 240, 240);

  .top_div {
    width: 1150px;
    margin: 0 auto;
    display: flex;
    .toux {
      width: 55px;
      height: 55px;
      border-radius: 50%;
    }
    .top_div_title {
      margin-left: 20px;
      :nth-child(1) {
        font-weight: 700;
        color: rgb(70, 70, 70);
        padding-top: 8px;
        font-size: 17px;
        letter-spacing: 1px;
      }
      :nth-child(2) {
        color: rgb(139, 139, 139);
        font-size: 13px;
        padding-top: 8px;
        letter-spacing: 0.5px;
      }
    }
    .top_div_button {
      flex: 1;
      text-align: right;
      padding: 10px 0px;
    }
  }
}
</style>
