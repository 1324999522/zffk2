<template>
  <div id="form-update">
    <el-form ref="form" :model="form" label-width="80px" size="small">
      <!-- 表单内容区域 -->
      <el-row :gutter="10">
        <el-col :span="12">

          <el-form-item label="角色名称:">
            <el-input v-model="form.api_logname " placeholder="请输入客户名称" clearable ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">

        </el-col>
      </el-row>
      <!-- 分割线 -->
      <el-divider> </el-divider>
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
        url: "/v0/api_log",
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
        url: "/v0/api_log",
        method: "put",
        data: this.form,
      });
    },
    // 添加
    async create() {
      let res = await request({
        url: "/v0/api_log",
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
