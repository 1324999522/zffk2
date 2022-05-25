<template>

  <div id="base_info">

    <el-form ref="form" :model="form" label-width="90px" size="medium" label-position='left'>
      <el-form-item label="店铺名称">
        <el-input v-model="form.merchant_title" placeholder="请输入店铺名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="店铺头像">
        <van-uploader v-model="fileList" :after-read="afterRead" />
      </el-form-item>

      <el-form-item label="联系方式">
        <el-input v-model="form.contact" placeholder="请输入联系方式,如qq1906602546"></el-input>
      </el-form-item>
      <el-form-item label="通知栏">
        <el-input v-model="form.merchant_noticebar" placeholder="请输入通知栏内容,为空则不显示"></el-input>
      </el-form-item>

      <el-form-item label="店铺公告">
        <mavon-editor v-if="!$isPhone" v-model="form.merchant_describe" @change="change_mavon" />
      </el-form-item>

      <mavon-editor style="margin-bottom:20px;" @change="change_mavon" v-if="$isPhone" v-model="form.merchant_describe" :autofocus='false' :toolbars="$markdownOption" />
      <!-- 表单内容区域 -->
      <el-form-item label="店铺链接">
        <el-link class='link' :underline="false" type="primary">{{$store.state.merchant.domain_name}}/?link={{form.link}}   <el-input v-model="form.link" ></el-input></el-link>  
      </el-form-item>

      <el-form-item label="暂停销售">
        <div>
          <el-radio v-model="form.status" :label="1" border>关闭</el-radio>
          <el-radio v-model="form.status" :label="0" border>开启</el-radio>
        </div>
      </el-form-item>

      <el-form-item label="收款支付宝">
        <el-input v-model="form.collect_alipay" placeholder="请输入收款支付宝账号"></el-input>
      </el-form-item>

      <!-- <el-form-item label="支付宝姓名">
        <el-input v-model="form.merchant_noticebar" placeholder="请输入通知栏内容,为空则不显示"></el-input>
      </el-form-item> -->

      <el-form-item>
        <el-button type="primary" @click="updateConfig()">保存更改</el-button>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
import { request } from '@/network/request.js'

export default {
  props: ["form", 'updateConfig'],
  name: 'base_info',
  components: {

  },
  data() {
    return {
      fileList: []
    }
  },
  created() {

  },
  mounted() {
    setTimeout(() => {
      this.fileList.push({ url: `/api/${this.form.portrait}` })
    }, 1000)

  },
  methods: {
    async afterRead(file) {
      // 此时可以自行将文件上传至服务器
      let formdata = new FormData()
      formdata.append('image', file.file)
      let res = await request({
        method: 'post',
        url: '/merchant/merchant/portrait',
        data: formdata,
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      if (res.data.code === 0) {
        this.form.portrait = res.data.data
      }

    },
    // 获取html
    change_mavon(value, render) {
      this.form.merchant_describe_html = render
    }
  },

}
</script>

<style lang="less" scoped>
#base_info {
  padding: 30px;
  max-width: 700px;

  .link {
    font-weight: 700;
  }
}
</style>
