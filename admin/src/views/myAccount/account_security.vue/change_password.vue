<template>

  <div id="change_password">
    <!-- 弹出框【增】 -->
    <el-dialog title="修改密码" :visible.sync="$store.state.is_change_password" width="400px" :close-on-click-modal="false" @close="close()">

      <el-form ref="form" :model="form" label-width="100px" label-position='left' size="medium">
        <el-form-item label="输入旧密码">
          <el-input v-model="password"></el-input>
        </el-form-item>

        <el-form-item label="输入新密码">
          <el-input v-model="password"></el-input>
        </el-form-item>

        <el-form-item label="确认新密码">
          <el-input v-model="password"></el-input>
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>

  </div>
</template>

<script>

export default {
  data() {
    return {
      password: null,
      form: {}
    };
  },
  async created() {

  },
  methods: {
    close() {

    },
    onSubmit() {

    }
  },

};
</script>

<style lang="less">
#change_password .el-dialog__header {
  padding: 20px 20px 0px 20px;
}
</style>
