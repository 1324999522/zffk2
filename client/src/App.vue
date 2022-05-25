<template >
  <div id="app" v-loading.fullscreen.lock="$store.state.loading" :class="{ pc: !$isPhone, phone: $isPhone }">
    <router-view v-if="status"> </router-view>
  </div>
</template>

 
<script>

import { request } from '@/network/request.js'
import axios from 'axios'
import initialize from '@/components/initialize'



export default {
  name: 'App',
  components: {

  },
  data () {
    return {
      isPhone: true,
      status: false,
    }
  },
  async beforeCreate () {
    // 获取系统配置
    let res2 = await request({
      url: '/client/merchant/system',
      method: 'get'
    })
    let system_config = res2.data.data

    this.$store.state.system_config = system_config

    initialize(this)

    if (this.$route.query.link) {
      window.localStorage.setItem('link', this.$route.query.link)
    } else {
      console.log(system_config.default_link)
      window.localStorage.setItem('link', system_config.default_link)
    }

    let link = window.localStorage.getItem('link')

    // 初始化
    this.$store.state.link = link
    this.$store.state.home_link = '/?link=' + link

    // 获取配置信息
    let res = await request({
      url: '/client/merchant',
      method: 'get'
    })
    this.$store.state.config = res.data.data
    this.$store.state.client = res.data.client
    // 设置网站title
    document.title = this.$store.state.config.merchant_title

    this.status = true

  },
  async created () {


   

    var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'icon';
    link.href = `/api/${this.$store.state.config.headPortrait}`;
    document.getElementsByTagName('head')[0].appendChild(link);


  },
  methods: {


  },


}

</script>

<style lang="less">
@import url('//at.alicdn.com/t/font_2111962_0dmaijh94y7.css');
@import url('//at.alicdn.com/t/font_2511768_v1wynpq07c.css');
@import url('//at.alicdn.com/t/font_2511871_x2a2807oi4q.css');
@import url('./assets/css/clean.css');
@import url('./assets/css/variable.css');
@import url('./assets/css/main.css');
@import url('./assets/css/el.css');
@import url('./assets/css/mavon_editor.css');
body {
  font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Segoe UI, Arial, Roboto, 'PingFang SC', 'miui', 'Hiragino Sans GB', 'Microsoft Yahei', sans-serif;
  img {
    max-width: 100%;
  }
}

.pc {
  #order_details {
    margin: 0px auto;
    width: 600px;
    border-radius: 5px;
  }
  #order {
    margin: 0px auto !important;
    width: 400px;
    border-radius: 5px;
  }
  .cache_query {
    margin: 0px auto !important;
    width: 800px;
    border-radius: 5px;
  }
}
.phone {
  #pay_pc {
    background-color: white !important;
    .title {
      font-size: 18px !important;
    }
    .pay_pc_box {
      width: 100% !important;

      .qr_code_box {
        width: 98% !important;
        background-size: 100%; /* 第一个值为宽，第二个值为高，当设置一个值时，将其作为图片宽度来等比缩放 */
        img {
          width: 150px !important;
          height: 150px !important;
        }
        .qr_code_text_box {
          padding-top: 45px;
          line-height: 30px !important;
        }
      }
    }
  }
}
.van-nav-bar__content {
  height: 60px !important;

  .van-icon {
    font-size: 24px !important;
    color: var(--first_font_color) !important;
  }
}
</style>
