<template>
  <div class="article">

    <van-nav-bar v-if="$isPhone" title='文章详情' left-arrow @click-left="$router.push($store.state.home_link)" :border='false' />

    <div class="article_detail">
      <h3> {{article.title}}</h3>

      <p v-html="article.content_html" class="markdown-body"> </p>
    </div>

  </div>
</template>

<script>
import { request } from '@/network/request.js'

export default {
  name: 'article',
  components: {

  },
  data() {
    return {
      article: {},
    }
  },
  async created() {
    this.get_article()
  },

  methods: {
    async get_article() {
      let res = await request({
        url: '/client/article',
        method: 'get',
        params: { id: this.$route.query.id }
      })

      this.article = res.data.data
    }


  },

}
</script>

<style lang="less" scoped>

.article_detail{
    padding: 15px;
    p{
        margin-top: 10px;
    }
}
</style>
