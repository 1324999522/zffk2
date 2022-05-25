<template>
  <div id="shopTop">

    <van-row class="top" ref="top">
        <div class='h2'>
              <h3 >店铺公告</h3>
        </div>
      
    </van-row>

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
    }
  },
  methods: {
    ellipsis() {
      this.show = true
    }
  },
  created() {

  },
  mounted() {

  }
}
</script>

<style lang="less" scoped>
.top {
  height: 45px;
 
  // background-image: url('http://pic26.nipic.com/20130125/9252150_112213491339_2.jpg');
  background-size: auto 100px;
    .h2{
        color: var(--first_font_color);
        padding: 25px;
        text-align: center;
        font-size: 18px;
    }
  
}

</style>
