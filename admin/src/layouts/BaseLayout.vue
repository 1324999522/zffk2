<template>
  <div id="baseLayout">
    <el-container class="home-container">

      <el-aside v-if="!$isPhone" :width="$store.state.isCollapse?'64px':'230px'">

        <div id="el-aside" text-color="#fff">
          <div class='aside_top_box' :style="{width:$store.state.isCollapse?'64px':'',}">
            <img :src="'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'" alt="" />
            <span class="title">zf shop pro</span>
          </div>
          <Navigation> </Navigation>
        </div>

      </el-aside>

      <el-main>
        <el-header id="herder" class='white' style="height:60px;">

          <div class='herder_box'>

            <ul class='header_left'>
              <!-- 收起导航栏 -->
              <li class="el-menu-item2" v-if="$store.state.isCollapse" @click="$store.state.isCollapse = !$store.state.isCollapse">
                <i class="el-icon-s-unfold"></i>
              </li>
              <li class="el-menu-item2" v-if="!$store.state.isCollapse" @click="$store.state.isCollapse = !$store.state.isCollapse">
                <i class="el-icon-s-fold"></i>
              </li>
              <!-- 刷新main -->
              <li class="el-menu-item2" @click="reload()">
                <i class="el-icon-refresh-right"></i>
              </li>

            </ul>

            <!-- 面包屑导航 -->
            <el-breadcrumb class='breadcrumb' v-if="!$isPhone" separator="/">
              <el-breadcrumb-item :to="{ path: '/' }"><span id="homeText">首页</span>
              </el-breadcrumb-item>
              <el-breadcrumb-item>{{ find_p_route($route.path)  }}</el-breadcrumb-item>
              <el-breadcrumb-item v-if="
                $route.meta.title !== undefined && $route.meta.title != '首页'
              ">{{ $route.meta.title }}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>

          <!-- 顶部右侧 -->
          <headerRight> </headerRight>

        </el-header>
        <!-- tabs标签 -->
        <el-tabs v-if="!$isPhone" class="tabs" type="card" v-model="active_tab_name" closable @edit="handleTabsEdit" @tab-click="handleTabsJump">
          <el-tab-pane :key="tab.name" v-for="tab in tabs" :label="tab.title" :name="tab.name">
          </el-tab-pane>
        </el-tabs>

        <!-- 面包屑导航 -->
        <el-breadcrumb class='phone_breadcrumb' v-if="$isPhone" separator="/">
          <el-breadcrumb-item :to="{ path: '/' }"><span id="homeText">首页</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item>{{ find_p_route($route.path)  }}</el-breadcrumb-item>
          <el-breadcrumb-item v-if="
                $route.meta.title !== undefined && $route.meta.title != '首页'
              ">{{ $route.meta.title }}</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- main 内容区 -->
        <div class='main' v-loading="$store.state.loading">
          <changePassword> </changePassword>
          <!-- 标签 -->
          <div class="main2" v-if="main" :style="{padding:$isPhone?'8px':'20px'}">
            <!-- 内容区 -->
            <router-view />
          </div>
          <!-- 底部 -->
          <el-footer class='footer'>
            <p> Ant Design VueBuy Now!</p>
            <p>Copyright 争锋发卡网</p>
          </el-footer>
        </div>

      </el-main>

      <!-- <el-container id="el-container">

      </el-container> -->

    </el-container>

    <!-- 手机侧边栏 -->
    <el-drawer v-if="$isPhone" title="我是标题" size='220px' :visible.sync="!$store.state.isCollapse" direction="ltr" :with-header="false" @close="$store.state.isCollapse=true">
      <div class='aside_top_box' :style="{width:$store.state.isCollapse?'64px':'',}">
        <img :src="'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'" alt="" />
        <span class="title">zf shop pro</span>
      </div>
      <Navigation> </Navigation>
    </el-drawer>
  </div>
</template>

<script>
import { request } from "@/network/request.js";
import Navigation from "./Navigation";
import headerRight from './header_right'
import changePassword from '@/views/myAccount/account_security.vue/change_password'
export default {
  name: "baseLayout",
  components: {
    Navigation,
    headerRight,
    changePassword,
  },
  data() {
    return {
      textarea: [],
      active_tab_name: "1",
      tabs: [
        { title: '首页', name: '/' },
        { title: '商户信息', name: '/myAccount/merchant' },
        { title: '资金变动', name: '/myAccount/capital_change' },
        { title: '分类管理', name: '/goods/type' },
        { title: '商品列表', name: '/goods/goods_list' },

      ],
      main: true,
      drawer: true,
    };
  },
  beforeRouteUpdate(to, form, next) {
    next()
    this.create_tab(to)

  },
  created() { },
  mounted() {
    console.log(this.$isPhone)
    this.create_tab(this.$route)
  },
  methods: {
    // 创建tab标签
    create_tab(route) {
      if (this.tabs.filter(i => i.name === route.fullPath).length === 0) {
        this.tabs.push({ title: route.meta.title, name: route.fullPath })
      }
      this.active_tab_name = route.fullPath
    },
    handleTabsJump(tab) {
      this.$router.push(tab.name);
    },
    // 编辑tabs
    handleTabsEdit(targetName, action) {
      if (action === "remove") {
        let tabs = this.tabs;
        let activeName = this.active_tab_name;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                this.$router.push(nextTab.name);
                activeName = nextTab.name;
              }
            }
          });
        }

        this.active_tab_name = activeName;
        this.tabs = tabs.filter((tab) => tab.name !== targetName);
      }
    },
    // 刷新main组件
    reload() {
      this.main = false;
      setTimeout(() => {
        this.main = true;
      }, 100);
    },

    // find 父路由
    find_p_route(path) {
      let routes = this.$router.routes_data
      let route = routes.filter(route => route.path == path)[0]
      let p_route = routes.filter(item => item.id == route.parentId)[0]
      return p_route.meta.title
    }
  },

};
</script>

<style lang="less" >
.home-container {
  height: 100%;
}

#herder {
  background-color: #1e222d;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  border-bottom: 1px solid #e9e9e9;
  z-index: 500;
  // position: fixed;
  // top: 0px;
  // right: 0px;
  // left: 230px;
  .herder_box {
    display: flex;
    align-items: center;
  }
}
.el-main {
  padding: 0px !important;
  background-color: #f0f2f5;
}
.main2 {
  padding: 20px;
}
#el-aside {
  min-height: 100%;
  background-color: #1e222d;
  position: fixed;
  overflow: hidden;
  .el-menu {
    border-right: none;
  }
}
// 顶部logo盒子
.aside_top_box {
  display: flex;
  align-items: center;
  width: 230px;
  background-color: #1e222d;
  height: 60px;
  img {
    width: 35px;
    height: 53px;
    margin-left: 15px;
    border-radius: 50%;
  }
  .title {
    margin-left: 20px;
    font-weight: 700;
    color: #fff;
    font-size: 20px;
  }
}
// 白色顶部
.white {
  background-color: white !important;

  .el-menu-item2 {
    color: var(--second_font_color) !important;
  }
  .el-menu-item2:hover {
    background-color: rgba(0, 0, 0, 0.05) !important;
  }

  .breadcrumb {
    #homeText {
      color: var(--third_font_color) !important;
      font-weight: 400 !important;
    }
    #homeText:hover {
      color: var(--main_color) !important;
      font-weight: 400 !important;
    }
    .el-breadcrumb__inner {
      color: var(--second_font_color) !important;
    }
  }

  .el-dropdown-link {
    color: var(--first_font_color) !important;
  }
  .el-dropdown-link:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
  .notice {
    color: var(--first_font_color) !important;
  }
  .notice:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
}

#baseLayout {
  height: 100%;
}

.el-breadcrumb {
  margin-left: 60px;
}
#homeText {
  color: #e0e0e0 !important;
}

.el-breadcrumb__inner {
  color: #b4b4b4 !important;
}

.header_left {
  margin-left: 15px;
  display: flex;
  line-height: 60px;
  .el-menu-item2 {
    color: #cccccc;
    padding: 0px 15px;
    cursor: pointer;
    transition: border-color 0.5s, background-color 0.5s, color 0.5s;
    box-sizing: border-box;
  }
  // .el-menu-item2 :hover {
  //   color: #ffffff;
  // }
}

.el-breadcrumb {
  margin-left: 20px;
}

.tabs {
  background-color: white;
  .el-tabs__header {
    margin: 0px !important;
  }
  .el-tabs__item {
    color: var(--second_font_color) !important;
  }
  .el-tabs__item:before {
    content: "";
    width: 9px;
    height: 9px;
    margin-right: 8px;
    display: inline-block;
    background-color: #ddd;
    border-radius: 50%;
    transition: background-color 0.2s;
  }
  .el-tabs__item:hover {
    color: var(--first_font_color) !important;
    background-color: rgba(82, 82, 82, 0.08);
  }
  .el-tabs__item.is-active {
    color: var(--main_color) !important;
    background-color: rgba(64, 158, 255, 0.08);
  }

  .el-tabs__item.is-active:before {
    background-color: var(--main_color) !important;
  }
  .el-tabs__nav-wrap.is-scrollable {
    padding: 0 40px;
    box-sizing: border-box;
  }
  .el-tabs__nav-next,
  .el-tabs__nav-prev {
    line-height: 40px;
    font-size: 16px;
    margin: 0px 5px;
    padding: 0px 10px;
  }
}
.el-tabs--card > .el-tabs__header .el-tabs__item {
  border-bottom: 0px solid transparent !important;
}
.el-tabs--card > .el-tabs__header .el-tabs__item .el-icon-close {
  width: auto !important;
}
// tabs 外层
.el-tabs--card > .el-tabs__header .el-tabs__nav {
  border: 0px solid #e4e7ed !important;
  border-right: 1px solid #e4e7ed !important;
  border-radius: 0px !important;
}

.footer {
  margin: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 13px;
  color: var(--third_font_color);
}

// 移动端侧边栏弹出框
.el-drawer__body {
  background-color: #1e222d;
}
// 移动端面包屑导航
.phone_breadcrumb {
  margin-top: 10px;
  // margin-left: 12px;
  padding: 10px 0px;
  #homeText {
    color: var(--third_font_color) !important;
    font-weight: 400 !important;
  }
  .el-breadcrumb__inner {
    color: var(--second_font_color) !important;
  }
}
</style>
