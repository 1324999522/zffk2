<template>

  <div id="describe_dialog">

    <div>
      <van-dialog v-model="show" width='350px' closeOnClickOverlay confirmButtonColor='var(--main_color)'>
        <homeTopDialog> </homeTopDialog>
        <p class='dialog markdown-body' v-html='$store.state.config.merchant_describe_html'> </p>
      </van-dialog>
    </div>
  </div>
</template>

<script>
import { request } from '@/network/request.js'
import homeTopDialog from '@/views/children/home_top_dialog'
export default {
  name: 'describe_dialog',
  components: {
    homeTopDialog,

  },
  data() {
    return {
      show: false,
    }
  },
  created() {
    setTimeout(() => {
      if (!this.$store.state.describe_dialog && this.$store.state.config.merchant_describe_html.length > 50 ) this.show = true
      this.$store.state.describe_dialog = true
    }, 1500)

  },
  methods: {},

}
</script>

<style lang="less" scoped>
#describe_dialog {
  .dialog {
    padding: 20px 15px 20px 20px;
    color: var(--first_font_color);
    max-height: 350px;
    overflow: auto;
    font-size: 14px;
    line-height: 20px;
  }
}
</style>
