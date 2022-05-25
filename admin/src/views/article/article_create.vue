<template>

  <div id="article_create">

    <el-card class='article_create' v-if="!$isPhone">
      <el-form :model="form" label-width="80px" size="medium" label-position='left'>

        <el-form-item label="文章标题">
          <el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
        </el-form-item>

        <el-form-item label="文章权限">
          <template>
            <el-radio v-model="form.power" :label="0">默认</el-radio>
            <el-radio v-model="form.power" :label="1">隐藏</el-radio>
            <el-radio v-model="form.power" :label="2">密码保护</el-radio>
          </template>
        </el-form-item>

        <el-form-item label="文章内容">
          <mavon-editor v-model="form.content" @change="change_mavon" />
        </el-form-item>

        <!-- 表单操作区域 -->
        <el-form-item style="margin-top:20px;" size="large">
          <el-button class='save' type="primary" @click="!(id)?create():update()">保 存</el-button>
          <!-- <el-button style="float:right;margin-right:15px;">取消</el-button> -->
        </el-form-item>
      </el-form>

    </el-card>

    <el-form v-if="$isPhone" :model="form" label-width="80px" size="medium" label-position='left'>

      <el-form-item label="文章标题">
      </el-form-item>
      <el-input v-model="form.value" placeholder=""></el-input>

      <el-form-item label="文章内容">
      </el-form-item>
      <mavon-editor v-model="form.value" @change="change_mavon" />
      <!-- 表单操作区域 -->
      <el-form-item style="margin-top:20px;" size="large">
        <el-button class='save' type="primary" @click="!(id)?create():update()">保 存</el-button>
        <!-- <el-button style="float:right;margin-right:15px;">取消</el-button> -->
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import { request } from "@/network/request.js";

export default {
  name: "article_create",
  components: {

  },
  data() {
    return {
      form: {
        power: 0,
      },
      id: 0,
    }
  },
  created() {
    let { id } = this.$route.params
    this.id = id

    if (!this.id) return
    this.getById()
  },
  methods: {
    change_mavon() {

    },
    // 获取
    async getById() {
      let res = await request({
        url: "/merchant/article",
        method: "get",
        params: {
          id: this.id,
        },
      });
      this.form = res.data.data;
    },
    // 编辑
    async update() {
      this.form.pr_id = 30
      let res = await request({
        url: "/merchant/article",
        method: "put",
        data: this.form,
      });
    },
    // 添加
    async create() {
      let res = await request({
        url: "/merchant/article",
        method: "post",
        data: this.form,
      });
    },


    // ==========
    // 获取html
    change_mavon(value, render) {
      this.form.content_html = render
    }
  },
};
</script>

<style lang="less" >
.phone #article_create {
  .el-form-item {
    margin-bottom: 0px;
  }
  .el-card__body {
    padding: 10px;
  }
}
#article_create {
  .el-form {
    max-width: 800px;
  }
}
</style>
