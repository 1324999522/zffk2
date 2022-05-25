<template>
  <!-- http://datav.jiaminghi.com/guide/charts.html 图表组件 -->
  <!-- http://manage.vue.pro.javaweb.vip/login -->
  <!-- https://www.jianshu.com/p/1d694388cba8 vue管理系统案例 -->
  <!--前段打印组件 https://blog.csdn.net/weixin_45115705/article/details/102717637?utm_medium=distribute.pc_relevant_bbs_down.none-task-blog-baidujs-2.nonecase&depth_1-utm_source=distribute.pc_relevant_bbs_down.none-task-blog-baidujs-2.nonecase -->
  <div id="app" :class="{ phone: $isPhone, pc: !$isPhone }">
    <router-view />
  </div>
</template>

<script>
import { request } from "@/network/request.js";
import Vue from 'vue';
import initialize from '@/components/initialize'

export default {
  name: "app",
  components: {

  },
  data () {
    return {

    };
  },
  async beforeCreate () {
    await initialize()
  },
  async created () {


    Vue.prototype.$main_color = getComputedStyle(document.documentElement).getPropertyValue('--main_color')

    if (window.sessionStorage.getItem('token')) this.$get_summary()


  },
  mounted () {


  },
  methods: {

  },
};
</script>

<style lang="less">
@import url('./assets/css/variable.css');
@import url('//at.alicdn.com/t/font_2111962_hvoqaemktd.css');
@import url('//at.alicdn.com/t/font_2511768_v1wynpq07c.css');
@import url('./assets/css/main.css');
@import url('./assets/css/clean.css');
@import url('./assets/css/el.css');
// body {
//   font-size: 14px;
// }
#app {
  min-height: 100%;
}
// #app #follow .user .left {
//   display: flex !important;
//   width: 1000px !important;
// }
.phone {
  .el-card__body {
    .el-col {
      margin-bottom: 10px;
    }
  }
  // 分页
  .el-pagination {
    display: flex;
    flex-wrap: wrap;
    // .el-pagination__sizes {
    //   display: none;
    // }
    .btn-prev,
    .el-pager,
    .btn-next {
      display: inline-block;
    }
    .el-pagination__sizes {
      display: none;
    }
    .el-pagination__jump {
      display: block;
    }
  }
  // 商户信息移动端
  #base_info {
    padding: 15px !important;
    max-width: 700px;
  }
  .el-card__body .el-col {
    width: 50%;
    .el-buttom {
      width: 50%;
    }
  }
  .el-dialog {
    max-width: 100%;
    // .el-dialog__body {
    //   padding: 10px !important;
    // }
    margin-top: 0vh !important;
  }
}
</style>
