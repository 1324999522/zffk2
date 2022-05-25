<template>
  <div class="home">

    <div v-if="status">
      <div class='phone' v-if='$isPhone '>
        <two></two>
        <phonePublic> </phonePublic>
        <describeDialog> </describeDialog>
      </div>

      <div class='pc' v-if='!$isPhone'>
        <onePc> </onePc>
      </div>
    </div>

    <!-- 暂停销售 -->
    <div class='stop' v-if="!status">
      <van-empty image="error" description="暂停销售">
        <van-button  type="info" class="bottom-button" @click="$router.push('/order')">订单查询</van-button>
      </van-empty>
    </div>
  </div>
</template>

<script>
import { request } from '@/network/request.js'
import onePc from '@/views/Template/one_pc'
import two from '@/views/Template/two'
import describeDialog from '@/views/children/describe_dialog'
import phonePublic from '@/views/children/phone_public'
export default {
  name: 'Home',
  components: {
    two,
    describeDialog,
    phonePublic,
    onePc,
  },
  data() {
    return {
      status: true,
    }
  },
  async created() {
    if (this.$store.state.config.status == 0) this.status = false
  },

  methods: {



  },

}
</script>

<style lang="less" scoped>
.home {
  min-height: 100%;
}

// 暂停销售
.stop {
  margin: 0px auto;
  width: 260px;
  text-align: center;
  padding-top: 50px;
  p {
    font-size: 18px;
    color: var(--second_font_color);
  }
}
</style>
