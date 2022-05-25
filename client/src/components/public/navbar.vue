<template>

  <div id="navbar">

    <div class="navbar">
      <div class='left'>
        <slot name='left'> </slot>
      </div>

      <div class='medium'>
        <slot name='middle'></slot>
    
      </div>
      <div class='right'>
        <slot name='right'></slot>
        
      </div>
    </div>

  </div>
</template>

<script>
import { request } from '@/network/request.js'

export default {
  name: 'navbar',
  components: {},
  data() {
    return {

    }
  },
  async beforeCreate() {

  },
  async created() {

  },
  methods: {

  },




}
</script>

<style lang="less" scoped>
.navbar {
  height: 30px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  .left {
    font-size: 24px;
    width: 50px;
  }
  .right {
    margin: auto 0px;
     font-size: 16px;
   
  }
  .medium {
    margin: auto 0px;
     font-size: 16px;
    
  }
}
</style>
