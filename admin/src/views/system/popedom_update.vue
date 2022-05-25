<template>
  <div id="form-update">
    <el-form ref="form" :model="form" label-width="80px" size="small">
      <!-- 表单内容区域 -->
      <el-row :gutter="10">
        <el-col :span="12">

          <el-form-item label="权限名称:">
            <el-input v-model="form.popedomname " placeholder="请输入权限名称" clearable></el-input>
          </el-form-item>
          <el-form-item label="请求地址:">
            <el-input v-model="form.path " placeholder="请输入请求地址" clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="请求方式:">
            <el-select v-model="form.method" placeholder="请选择">
              <el-option v-for="item in ['GET','POST','PUT','DELETE']" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="父级权限:">
            <el-input  v-model="form.pid " placeholder="请输入pid" clearable></el-input>
            <el-cascader :options="popedoms" v-model="form.pid" :props="{ value: 'id',label:'popedomname',checkStrictly: true }" clearable></el-cascader>
          </el-form-item>
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
      popedoms:[],
    };
  },
  methods: {
    // 获取
    async getById() {
      let res = await request({
        url: "/v0/popedom",
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
        url: "/v0/popedom",
        method: "put",
        data: this.form,
      });
    },
    // 添加
    async create() {
      let res = await request({
        url: "/v0/popedom",
        method: "post",
        data: this.form,
      });
    },
    async get_popedoms() {
      let res = await request({
        url: "/v0/popedom/all2",
        method: "get",
      });
      this.popedoms = res.data.data.rows
    },
  },
  created() {
    this.get_popedoms()
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
