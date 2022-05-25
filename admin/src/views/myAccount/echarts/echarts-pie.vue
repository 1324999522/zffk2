<template>
  <div>

    <!-- 图表 -->
    <div id="pie">

    </div>
  </div>
</template>


<script>

import { request } from "@/network/request.js";

import echarts from './echarts';

export default {

  data() {
    return {
      option: {
        title: {
          text: '销售统计'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          left: 'right'
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '75%'],
            avoidLabelOverlap: false,

            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: false,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: '搜索引擎' },
              { value: 735, name: '直接访问' },
              { value: 580, name: '邮件营销' },
              { value: 484, name: '联盟广告' },
              { value: 300, name: '视频广告' },
              { value: 1048, name: '搜索引擎2' },
              { value: 735, name: '直接访问2' },
              { value: 580, name: '邮件营销2' },
              { value: 484, name: '联盟广告2' },
              { value: 300, name: '视频广告2' },
              { value: 735, name: '直接访问2' },
              { value: 580, name: '邮件营销3' },
              { value: 484, name: '联盟广告5' },
              { value: 300, name: '视频广告4' }
            ]
          }
        ]
      }



    };
  },
  async created() {

  },
  mounted() {

    var chartDom = document.getElementById('pie');

    var myChart = echarts.init(chartDom);
    myChart.setOption(this.option);


  },
  methods: {



  },

};
</script>

<style lang="less" scoped>
#pie {
  height: 300px;
}
</style>
