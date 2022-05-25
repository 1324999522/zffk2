<template>

  <div id="wx_notify">

    <el-card>
      当前绑定状态 ：<el-tag>未绑定</el-tag>

      <div v-show="$store.state.merchant.wx_bind==0" class='wx_bind_qr'>
        <img :src='$store.state.merchant.wx_bind_qr' alt="">
      </div>
    </el-card>
  </div>
</template>

<script>
import { request } from "@/network/request.js";

export default {
  name: "wx_notify",
  components: {

  },
  data() {
    return {

    };
  },
  async created() {


  },
  mounted() {


  },
  methods: {

  },
};
</script>

<style lang="less">
#wx_notify {
  .wx_bind_qr {
    img {
      width: 150px;
    }
  }
}
</style>
