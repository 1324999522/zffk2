<template>

  <div id="merchant">

    <el-card class='card' :body-style="{ padding: '0px' }">

      <baseInfo :form='form' :updateConfig='updateConfig'> </baseInfo>

    </el-card>

  </div>
</template>


<script>
import { request } from '@/network/request.js'
import baseInfo from '@/views/myAccount/base_info'
import payInfo from '@/views/myAccount/pay_info'
export default {
  name: 'merchant',
  components: {
    baseInfo,
    payInfo
  },
  data() {
    return {
      form: {},
      activeName: 'first',
    }
  },
  async created() {
    await this.getConfig()
  },
  methods: {
    async getConfig() {
      let res = await request({
        url: '/merchant/merchant',
        method: "get",
      })

      this.form = res.data.data
    },
    async updateConfig() {
      let res = await request({
        url: '/merchant/merchant',
        method: 'put',
        data: this.form,
      })
    },
    hanlde_success(response, file, fileList) {
      if (response.no === 0) {
        this.$notify({ title: '头像上传', message: '头像上传成功', type: 'success', })
        this.form.headPortrait = response.data
      } else {
        this.$notify({ title: '头像上传', message: '头像上传失败', type: 'error', })
      }
    },
   

  },

}
</script>

<style lang="less" scoped>



.info_card {
  text-align: center;
  height: 550px;
  overflow: auto;
  > img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  > h2 {
    font-weight: 600;
    padding: 10px;
  }
  > p {
    padding: 10px;
  }
  > div {
    margin-top: 25px;
    font-size: 14px;
    display: block !important;
  }
}
</style>
