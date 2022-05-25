<template>
  <div id="form-update">
    <el-form ref="form" :model="form" label-width="80px" size="small">
      <!-- 表单内容区域 -->
      <el-row :gutter="10">
        <el-col :span="23">

          <el-form-item label="代理商ID">
            <el-input v-model="form.child_merchant_id " placeholder="请输入代理商ID" clearable :disabled='this.id'></el-input>
          </el-form-item>

          <el-form-item label="代理折扣">

            <el-input v-model="form.proxy_discount " placeholder="请输入代理商折扣" clearable></el-input>
            <p class='form-item-bottom'>设置代理商折扣，默认10折，等于没折扣，最低5折</p>
          </el-form-item>

          <el-form-item label="代理备注">
            <el-input v-model="form.child_remark " type="textarea" :span='4' placeholder="请输入代理备注" clearable></el-input>
          </el-form-item>

        </el-col>

      </el-row>

      <!-- 表单操作区域 -->
      <el-form-item size="large">
        <el-button style="float:right;" type="primary" @click="id === 0?create():update()">保存</el-button>
        <el-button style="float:right;margin-right:15px;">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { request } from "@/network/request.js";

export default {
  props: ["id"],
  data() {
    return {
      form: {},
    };
  },
  methods: {
    // 获取
    async getById() {
      let res = await request({
        url: "/merchant/proxy",
        method: "get",
        params: {
          id: this.id,
        },
      });
      this.form = res.data.data;
    },
    // 编辑
    async update() {
      let res = await request({
        url: "/merchant/proxy",
        method: "put",
        data: this.form,
      });
    },
    // 添加
    async create() {
      let res = await request({
        url: "/merchant/proxy",
        method: "post",
        data: this.form,
      });
    },
  },
  created() {
    if (this.id === 0) return
    this.getById();
  },
};
</script>

<style lang="less" scoped>
.el-divider--horizontal {
  margin: 10px 0 !important;
}
</style>
