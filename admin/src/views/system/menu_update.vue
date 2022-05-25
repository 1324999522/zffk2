<template>
  <div id="form-update">
    <el-form ref="form" :model="form" label-width="80px" size="small">
      <!-- 表单内容区域 -->
      <el-row :gutter="10">
        <el-form-item label="上级菜单">
          <el-input v-model="form.parentId " placeholder="请输入客户名称" clearable></el-input>
        </el-form-item>

        <el-form-item label="菜单名称">
          <el-input v-model="form.title " placeholder="请输入客户名称" clearable></el-input>
        </el-form-item>

        <el-form-item label="组件路径">
          <el-input v-model="form.component " placeholder="请输入客户名称" clearable></el-input>
        </el-form-item>

        <el-form-item label="路由地址">
          <el-input v-model="form.path " placeholder="请输入客户名称" clearable></el-input>
        </el-form-item>

        <el-form-item label="菜单图标">
          <el-input v-model="form.icon" placeholder="请输入客户名称" clearable></el-input>
        </el-form-item>
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
      parents:[],
    };
  },
  methods: {
    // 获取
    async getById() {
      let res = await request({
        url: "/merchant/menu",
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
        url: "/merchant/menu",
        method: "put",
        data: this.form,
      });
    },
    // 添加
    async create() {
      let res = await request({
        url: "/merchant/menu",
        method: "post",
        data: this.form,
      });
    },
    async get_parents() {
      let res = await request({
        url: "/merchant/menu/all",
        method: "get",
        params: {
          parents: true,
        },
      });
      this.parents = res.data.data
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
