<template>
  <div id="form-update">
    <el-form ref="form" :model="form" label-position='left' label-width="90px" size="medium">
      <!-- 表单内容区域 -->
      <el-row :gutter="10">
 

          <el-form-item label="分类名称">
            <el-input v-model="form.good_typename " placeholder="请输入分类名称" clearable></el-input>
          </el-form-item>
          <el-form-item label="显示顺序">
            <el-input v-model="form.sort " placeholder="请输入显示顺序" clearable></el-input>
          </el-form-item>

 

    
      </el-row>
      <!-- 分割线 -->
      <!-- <el-divider> </el-divider> -->
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
        url: "/merchant/good_type",
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
        url: "/merchant/good_type",
        method: "put",
        data: this.form,
      });
    },
    // 添加
    async create() {
      let res = await request({
        url: "/merchant/good_type",
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
