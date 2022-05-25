<template >
  <!-- vue实例外创建 -->
  <div id="nav">
    <el-row class="tac">
      <el-col :span="24">

        <el-menu mode='vertical' class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse-transition='false' :collapse="$store.state.isCollapse" router :default-active='$route.path' unique-opened background-color="#1e222d" text-color="hsla(0,0%,100%,.8)" active-text-color="#fff">

          <el-submenu v-for="(submenu,index) in data" :key="index" :index='String(index)'   >
            <template slot="title">
              <i :class="submenu.meta.icon"></i>
              <span> {{submenu.meta.title}} </span>
            </template>

            <el-menu-item v-for="(children,index) in submenu.children" :key="index" :index="children.path">
              <i :class="children.meta.icon"></i>
              {{children.meta.title}}
            </el-menu-item>
          </el-submenu>

        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { request } from "@/network/request.js";
export default {
  data() {
    return {
      data: [
        {
          title: '后台主页',
          i: 'el-icon-menu',
          children: [
            {
              path: 'welcome',
              i: 'el-icon-menu',
              name: '欢迎'
            }
          ]
        },
        // 权限管理
        {
          title: '系统管理',
          i: 'el-icon-menu',
          children: [
            {
              path: '/user',
              i: 'el-icon-menu',
              name: '用户管理'
            },
            {
              path: '/role',
              i: 'el-icon-menu',
              name: '角色管理'
            },
            {
              path: '/popedom',
              i: 'el-icon-menu',
              name: '权限管理'
            },
            {
              path: '/api_log',
              i: 'el-icon-menu',
              name: 'API日志'
            },

          ]
        },
        // 我的账户
        {
          title: '我的账户',
          i: 'el-icon-menu',
          children: [
            {
              path: '/merchant',
              i: 'el-icon-menu',
              name: '商户信息'
            },
            {
              path: '/summary',
              i: 'el-icon-menu',
              name: '信息汇总'
            },
            {
              path: '/capital_change',
              i: 'el-icon-menu',
              name: '资金变动'
            }
          ]
        },
        // 交易管理
        {
          title: '商品管理',
          i: 'el-icon-menu',
          children: [
            {
              path: '/type',
              i: 'el-icon-menu',
              name: '分类管理'
            },
            {
              path: '/good',
              i: 'el-icon-menu',
              name: '商品列表'
            },
            {
              path: '/order',
              i: 'el-icon-menu',
              name: '订单管理'
            },

          ]
        },
        // 代理分销
        {
          title: '代理分销',
          i: 'el-icon-menu',
          children: [
            {
              path: '/proxy_good',
              i: 'el-icon-menu',
              name: '添加代理商品'
            },
            {
              path: '/my_proxy',
              i: 'el-icon-menu',
              name: '我的代理商'
            },
            {
              path: '/order',
              i: 'el-icon-menu',
              name: '订单管理'
            },

          ]
        },
      ]
    };
  },
  created() {
    this.data = this.$router.menuNav[0].children

    // let children = this.$router.menuNav[0].children.filter(i => i.meta.show == true)
    // setTimeout(() => {  
    //   this.data = children
    // }, 1000)
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },

};
</script>

<style lang="less"  >


.tac .is-active {
  background-color: var(--main_color) !important;
  
}

#nav .el-menu-item:hover {
  color: #fff !important;
}
#nav .el-submenu__title:hover {
  color: #fff !important;
}
.iconfont {
  margin-right: 6px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 230px;
  min-height: 400px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 101% !important;
    min-height: 400px;
}
</style>
