<template>
  <div id='after_sale'>
    <homeTopPc v-if="!$isPhone">
      <template v-slot:right>
        <el-button icon="el-icon-warning-outline" type="danger" @click="$router.push('/after_sale')">投诉订单</el-button>
        <el-button icon="el-icon-search" type="primary" @click="$router.push('/cache_query')">浏览器缓存</el-button>
      </template>

    </homeTopPc>

    <van-nav-bar v-if="$isPhone"  right-text="查询售后" left-arrow @click-left="$router.push($store.state.home_link)" @click-right="$router.push('/cache_query')" :border='false' />

    <div class="after_sale">

      <h2>申请订单售后</h2>
      <p>提交申请后，平台将在24小时内为您解决问题</p>
      <van-cell-group>
        <van-field v-model="form.ordername" center clearable label="订单编号" placeholder="请输入短信验证码">
        </van-field>
        <van-field v-model="form.qq" center clearable label="联系qq" placeholder="请输入短信验证码">
        </van-field>
        <van-field v-model="form.email" center clearable label="邮箱地址" placeholder="请输入邮箱地址">
          <template #button>
            <span style="color:var(--main_color);" @click="send_verification_code()">
              发送验证码
            </span>
          </template>
        </van-field>
        <van-field v-model="form.verify_code" center clearable label="验证码" placeholder="请输入验证码">
        </van-field>
      </van-cell-group>

      <div class='input_select_box'>
        <h3>请选择售后类型</h3>
        <p>请准确填写售后类型，恶意抹黑将无法受理</p>

        <div v-for="(item,index) in ['不会使用','无效卡密','涉嫌色情','没人售后','涉嫌赌博','描述不符']" :key="index" @click="select_box_flag=index;form.type=item" :class='{select_box:true,select_box_active:select_box_flag==index}'>
          {{item}}
        </div>
      </div>

      <van-field class='reason' v-model="form.reason" rows="3" autosize type="textarea" maxlength="50" placeholder="填写投诉原因,为保证投诉/售后处理速度,尽量写详细些,10字以上" show-word-limit />

      <el-button type="primary" @click="after_sale()">申请售后</el-button>
    </div>
  </div>

</template>

<script>
import { request } from '@/network/request.js'
import navbar from '@/components/public/navbar'
import homeTopPc from '@/views/children/home_top_pc'
export default {
  name: 'after_sale',
  components: {
    navbar,
    homeTopPc,
  },
  data() {
    return {
      select_box_flag: 1,
      form: {}

    }
  },
  methods: {
    async send_verification_code() {
      let res = await request({
        url: '/client/user/verification_code',
        method: 'get',
        params: {
          to: this.form.email,
          subject: '申请订单售后',
        }
      })
      if (res.data.code == 0) {
        this.$message.success('验证码发送成功')
      } else {
        this.$message.error(res.data.msg)
      }
    },

    async after_sale() {
      let res = await request({
        url: '/client/order/after_sale',
        method: 'get',
        params: this.form
      })
      if (res.data.code === 0) {
        this.$message.success('申请售后成功，请耐心等待')
      } else {
        this.$message.error(res.data.err)
      }
    }
  },
}
</script>

<style lang="less" >
#after_sale {
  padding-bottom: 40px;
  .van-nav-bar__content {
    background-color: rgb(245, 245, 245) !important;
  }
}

.after_sale {
  padding: 20px;
  background-color: rgb(245, 245, 245);
  min-height: 100%;

  color: var(--first_font_color);

  .reason {
    margin-top: 20px;
    border-radius: 4px;
  }

  .select_box {
    background: white;
    color: #999;
    border: 1px solid #f2f2f2;
    width: 29.5%;
    margin: 1.5%;
    display: inline-block;
    border-radius: 4px;
    height: 45px;
    line-height: 45px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    font-size: 13px;
    position: relative;
    text-align: center;
  }

  .select_box_active {
    border: 1px solid var(--main_color);
    background: white;
    color: var(--main_color);
    font-weight: 700;
  }

  .el-button {
    margin-top: 30px;
    width: 100%;
    font-size: 17px;
    font-weight: 600;
  }

  h2 {
    margin-top: 10px;
  }
  h3 {
    margin-top: 20px;
  }
  p {
    color: var(--third_font_color);
    font-size: 14px;
    margin: 15px 0px;
  }
}
.pc {
  .after_sale {
    width: 420px;
    margin: 0px auto;
    border-radius: 4px;
  }
}
</style>
