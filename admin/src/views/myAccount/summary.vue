<template>

  <div id="summary">

    <summaryStatistics> </summaryStatistics>

    <el-card class='second_box'>
      <div class='second_box_header' slot="header">

        <div>
          销售量
        </div>

        <div class='second_box_header_right'>
          <div>
            <el-radio-group v-model="rank_date" size="small" @change="rank_date_change">
              <el-radio-button label="今天"></el-radio-button>
              <el-radio-button label="本周"></el-radio-button>
              <el-radio-button label="本月"></el-radio-button>
              <el-radio-button label="本年"></el-radio-button>
            </el-radio-group>
          </div>
          <!-- 时间选择 -->
          <div>
            <el-date-picker class='datetimerange' size="small" v-model="date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </div>

      </div>
      <div class='second_box_body'>
        <div class='vChartsBar'>
          <vChartsBar></vChartsBar>
        </div>
        <div class='rank_box'>
          <div class='rank_box_title'>
            门店销售额排名
          </div>

          <div class='rank_box_item'>
            <span class='number'>1</span> 工专路 1 号店
            <span style="float:right;">323,234 </span>
          </div>
          <div class='rank_box_item'>
            <span class='number'>2</span>工专路 1 号店
            <span style="float:right;">323,234 </span>
          </div>
          <div class='rank_box_item'>
            <span class='number'>3</span>工专路 1 号店
            <span style="float:right;">323,234 </span>
          </div>
          <div class='rank_box_item'>
            <span class='number'>4</span>工专路 1 号店
            <span style="float:right;">323,234 </span>
          </div>
        </div>
      </div>

    </el-card>

  </div>
</template>

<script>
import { request } from '@/network/request.js'

import vChartsBar from './echarts/echarts-bar2'
import summaryStatistics from './summary_statistics'

export default {
  name: 'order',
  components: {

    vChartsBar,
    summaryStatistics,

  },
  data() {
    return {
      radio3: '',
      rank_date: '今天',
      date: [new Date(), new Date()],
    }
  },
  methods: {
    rank_date_change(value) {
      const end = new Date();
      const start = new Date();
      let day = 1
      if (value == '本周') day = 7
      if (value == '本月') day = 30
      if (value == '本年') day = 365

      start.setTime(start.getTime() - 3600 * 1000 * 24 * day);
      this.date = []
      this.date.push(start)
      this.date.push(end)
      console.log(this.date)
    }
  },
  created() { },
}
</script>

<style lang="less" scoped>
.second_box {
  margin: 5px;
  margin-top: 5px;
  .second_box_header {
    display: flex;
    justify-content: space-between;
    .second_box_header_right {
      display: flex;
      > div:nth-child(1) {
        margin-right: 20px;
      }
      .datetimerange {
        max-width: 260px;
      }
    }
  }
  .second_box_body {
    display: flex;
    .rank_box {
      width: 25%;
      font-size: 14px;
      .rank_box_title {
        margin: 10px;
        margin-top: 0px;
        margin-bottom: 20px;
      }
      .rank_box_item {
        line-height: 30px;
        .number {
          width: 30px;
          margin: 0px 10px;
          padding: 2px 6px;
          background-color: black;
          border-radius: 50%;
          color: white;
        }
      }
    }
    .vChartsBar {
      width: 70%;
      background-color: white;
    }
  }
}
</style>
