<template>

  <div id="header_right">
    <!-- 1 -->

    <a v-if="!$isPhone" href="javascript:;" style="color:var(--second_font_color);">
      <div class='notice'>
        <i class='el-icon-full-screen'> </i>
      </div>
    </a>

    <div class='notice'>
      <el-popover placement="bottom-end" width="280" trigger="click" @show='popover_show' popper-class='herder_right_popover'>
        <div class='notice_box'>
          <el-tabs class='notice_tabs' v-model="activeName" stretch>
            <el-tab-pane :label="`通知(${this.count})`" name="first">
            </el-tab-pane>
            <el-tab-pane label="私信(0)" name="second"></el-tab-pane>
            <el-tab-pane label="待办(0)" name="third"></el-tab-pane>
          </el-tabs>

          <div class='notice_content'>
            <a href="javascript:;" v-for="notify in notifys" :key="notify.id">
              <div class='notice_first'>
                <div>
                  <el-button v-if="notify.type==0" type="primary" icon="el-icon-bell" circle></el-button>
                  <el-button v-if="notify.type==1" type="success" icon="el-icon-check" circle></el-button>
                  <el-button v-if="notify.type==2" type="danger" icon="el-icon-message" circle></el-button>
                </div>
                <div class='notice_first_text_box'>
                  <p>{{notify.title}}</p>
                  <div v-if="notify.content">{{notify.content}}</div>
                  <div>{{notify.createdAt}}</div>
                </div>
              </div>
            </a>

            <el-empty v-if="notifys.length == 0" description="暂无更多信息"></el-empty>
          </div>

          <div class='button_box'>

            <div>
              <a href="javascript:;" @click="clear()"> 清空通知</a>

            </div>

            <div>
              <a href="javascript:;"> 查看更多</a>

            </div>

          </div>

        </div>

        <a href="javascript:;" slot="reference">
          <el-badge :value="this.count" class="notice_icon" v-if="this.count != 0">
            <i class='el-icon-bell'></i>
          </el-badge>
          <i class='el-icon-bell notice_icon' v-if="this.count == 0"></i>
        </a>
      </el-popover>
    </div>

    <!-- 2 -->
    <el-dropdown :hide-on-click="false" @command="handleCommand">

      <div class="el-dropdown-link ">

        <el-avatar size='medium' style="vertical-align:middle;margin-right:5px;" :src='`/api/${$store.state.merchant.portrait}`'>
          <template slot="default">

            <img :src='`/api/${$store.state.merchant.portrait}`' alt="">
          </template>

        </el-avatar>
        <span> {{ $store.state.merchant.username.length>6?$store.state.merchant.username.slice(0,5)+'...':$store.state.merchant.username }} </span>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </div>

      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-user" command='a'>个人中心</el-dropdown-item>
        <el-dropdown-item icon="el-icon-key" command='b'>修改密码</el-dropdown-item>
        <el-dropdown-item icon="el-icon-switch-button" command='c' divided>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <!-- <el-button type="info" @click="exit"> 退出</el-button> -->

  </div>

</template>

<script>
import { request } from '@/network/request.js'
import { get_user_notify_page, put_user_notify_clear } from '@/network/api/user_notify'

export default {
  name: 'header_right',
  components: {

  },
  data() {
    return {
      activeName: "second",
      notifys: [],
      count: 0,
    }
  },
  created() {
    this.get_notifys()
    // setInterval(() => {
    //   this.$store.state.is_loading = false
    //   this.get_notifys()

    // }, 180000)

  },
  mounted() {

  },
  methods: {
    get_notifys() {
      get_user_notify_page({
        limit: 4,
        offset: 1,
      })
        .then(res => {
       
          this.notifys = res.data.data.rows
          this.count = res.data.data.count
          // this.notification()
          this.$store.state.is_loading = true
             console.log(this.notifys)
        })
    },
    exit() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    handleCommand(command) {
      if (command === 'a') this.$router.push('/myAccount/account_center')
      if (command === 'b') this.$store.state.is_change_password = true
      if (command === 'c') this.exit()
    },

    popover_show() {
      setTimeout(() => {
        this.activeName = 'first'
      }, 50)
    },
    notification() {
      let i = 0
      let Timer = null
      try {
        Timer = setInterval(() => {
          let date = new Date(Date.parse(this.notifys[i].createdAt))
          let now_date = new Date().getTime()

          if (now_date - date.getTime() < 1000 * 60 * 3) {
            this.$notify({
              title: this.notifys[i].title,
              message: this.notifys[i].content,
              duration: 0,
              type: this.type_coputed(this.notifys[i].type),
            });
          }

          i++
          if (i >= this.notifys.length) window.clearInterval(Timer)
        }, 200)
      } catch (err) {
        window.clearInterval(Timer)
      }

    },
    type_coputed(type) {
      if (type == 0) return 'info'
      if (type == 1) return 'success'
      if (type == 2) return 'error'
    },
    // 清空通知
    clear() {
      put_user_notify_clear()
        .then(res => {
          if (res.data.code === 0) {
            this.$message.success('清空通知成功')
            this.get_notifys()
          }
        })
    },

  },


}
</script>

<style lang="less" scoped>
#header_right {
  margin-right: 10px;
  display: flex;
  align-items: center;
  line-height: 60px;
}
.el-dropdown-link {
  cursor: pointer;
  color: var(--fourth_font_color);
  font-size: 15px;
  padding: 0px 8px;
}
.el-dropdown-link:hover {
  cursor: pointer;
  color: var(--base_white_color);
  font-size: 15px;
  padding: 0px 8px;
  background-color: var(--second_font_color);
}

.el-icon-arrow-down {
  font-size: 12px;
}

.notice {
  padding: 2px 15px;
  color: var(--fourth_font_color);
  .notice_icon {
    color: var(--second_font_color);
  }
}
.notice:hover {
  padding: 2px 15px;
  background-color: var(--second_font_color);
  color: var(--base_white_color);
}

.notice_box {
  .notice_tabs {
    padding: 0px 25px;
    padding-top: 10px;
  }
  .notice_content {
    max-height: 380px;
    overflow-x: auto;
  }
  .notice_first {
    color: var(--second_font_color);
    padding: 12px;
    display: flex;
    border-top: 1px solid #eeeeee;
    button {
      font-size: 16px;
    }
  }
  .notice_first_text_box {
    margin-left: 10px;
    line-height: 22px;
    div {
      color: var(--third_font_color);
      font-size: 12px;
    }
  }
  .notice_first:hover {
    background-color: rgba(53, 53, 53, 0.075);
  }
  .button_box {
    display: flex;
    a {
      color: var(--second_font_color);
    }
    > div {
      width: 50%;
      text-align: center;

      border-top: 1px solid #eeeeee;
      a {
        padding: 10px 12px;
        display: block;
      }
      a:hover {
        background-color: rgba(53, 53, 53, 0.075);
      }
    }
    > div:nth-child(1) {
      border-right: 1px solid #eeeeee;
    }
  }
}
</style>
