<template>

  <div id="account_center">

    <el-card class='user_info_box'>
      <div>
        <img :src='`/api/${$store.state.merchant.portrait}`' alt="">
      </div>
      <h3>
        Serati Ma
      </h3>
      <p>
        海纳百川，有容乃大
      </p>

      <div class='center_text_box'>
        <p> <i class='el-icon-user'></i>资深前端工程师</p>
        <p> <i class='el-icon-user'></i>Nodejs、Express、Vue、Element-Ui</p>
        <p> <i class='el-icon-user'></i>中国 • 江苏省 • 南京市</p>
      </div>
      <el-divider></el-divider>

      <div class='tag_box'>
        <p>标签</p>
        <el-tag v-for="(name,index) in ['很有想法的','厚德载物','坚持','专注设计','海纳百川']" :key="index" effect="plain" size='small' type="info">
          {{name}}
        </el-tag>
      </div>

    </el-card>

    <el-card class='handle_box'>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="first">

          <el-form class='base_info' ref="form" :model="base_info_form" label-width="80px" size="medium">
            <el-form-item label="真实姓名">
              <el-input v-model="base_info_form.real_name" placeholder="请输入真实姓名"></el-input>
            </el-form-item>
            <el-form-item label="昵称">
              <el-input v-model="base_info_form.nickname" placeholder="请输入昵称"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-select v-model="base_info_form.sex" placeholder="请选择性别">
                <el-option v-for="item in [
                {value: '男',label: '男'},
                {value: '女',label: '女'},
                {value: '保密',label: '保密'},
                ]" :key="item.value" :label="item.label" :value="base_info_form.sex">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="联系电话">
              <el-input v-model="base_info_form.phone" placeholder="请输入联系电话"></el-input>
            </el-form-item>
            <el-form-item label="电子邮箱">
              <el-input v-model="base_info_form.email" placeholder="请输入电子邮箱"></el-input>
            </el-form-item>
            <el-form-item label="个人简介">
              <el-input v-model="base_info_form.profile" placeholder="请输入个人简介"></el-input>
            </el-form-item>

          </el-form>
        </el-tab-pane>
        <el-tab-pane label="安全设置" name="second">
          <div class='bind_box'>

            <div class='bind_item_box'>
              <div class='bind_item_left'>
                <p>账户密码</p>
                <p>当前密码强度：强</p>
              </div>
              <div class='bind_item_right' @click="$store.state.is_change_password = true">
                修改
              </div>
            </div>

            <div class='bind_item_box'>
              <div class='bind_item_left'>
                <p>密保手机</p>
                <p>已绑定手机：138****8293</p>
              </div>
              <div class='bind_item_right'>
                设置
              </div>
            </div>

            <div class='bind_item_box'>
              <div class='bind_item_left'>
                <p>密保问题</p>
                <p>未设置密保问题</p>
              </div>
              <div class='bind_item_right'>
                设置
              </div>
            </div>

            <div class='bind_item_box'>
              <div class='bind_item_left'>
                <p>绑定邮箱</p>
                <p>已绑定邮箱：ant***sign.com</p>
              </div>
              <div class='bind_item_right'>
                修改
              </div>
            </div>

          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>

  </div>
</template>

<script>
import { request } from '@/network/request.js'
export default {
  name: 'account_center',
  components: {

  },
  data() {
    return {
      activeName: "first",
      base_info_form: {
        real_name: '',
        nickname: 'Serati Ma',
        sex: '男'
      }
    }
  },
  methods: {
    handleClick() {

    }
  },
  created() {

  },
}
</script>

<style lang="less" scoped>
#account_center {
  display: flex;
  flex-wrap: wrap;
}

.user_info_box {
  max-width: 400px;
  text-align: center;
  line-height: 35px;
  color: var(--second_font_color);
  padding-top: 30px;

  // margin-right: 15px;
  // margin-bottom: 10px;
  img {
    width: 80px;
    border-radius: 50%;
  }
  .center_text_box {
    margin-top: 30px;
    font-size: 14px;
    text-align: start;
    p {
      display: flex;
    }
    i {
      margin-right: 10px;
      font-size: 16px;
      width: 14px;
      display: block;
      margin-top: 6px;
    }
  }

  .tag_box {
    .el-tag {
      margin: 5px;
    }
    p {
      font-size: 14px;
      line-height: 50px;
    }
  }
}

.handle_box {
  width: 800px;

  .base_info {
    padding: 20px 0px;
    max-width: 350px;
  }

  .bind_box {
    padding: 10px 15px;
    .bind_item_box {
      margin-top: 10px;
      padding: 5px;
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      border-bottom: 1px solid #dcdfe6;
      max-width: 500px;
      .bind_item_left {
        line-height: 30px;
        p:nth-child(2) {
          color: var(--third_font_color);
        }
      }
      .bind_item_right {
        line-height: 60px;
        color: var(--main_color);
      }
    }
  }
}
</style>
