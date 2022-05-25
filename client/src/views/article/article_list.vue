<template>
  <div class="article_list">

    <van-nav-bar v-if="$isPhone" title='帮助中心' left-arrow @click-left="$router.push($store.state.home_link)" :border='false' />

    <van-cell-group>
      <van-cell v-for="article in articles" :key="article.id" :title="article.title" :label="article.createdAt" is-link @click="go_to_detail(article.id)" />
    </van-cell-group>
    <van-empty v-if="articles.length== 0" description="没有更多了" />

  </div>
</template>

<script>
import { request } from '@/network/request.js'

export default {
  name: 'article_list',
  components: {

  },
  data() {
    return {
      page: {
        limit: 10,
        offset: 1,
      },
      articles: [],
    }
  },
  async created() {
    await this.get_article_list()
  },

  methods: {
    async get_article_list() {
      let res = await request({
        url: '/client/article/page',
        method: 'get',
        params: this.page,
      })
      this.articles = res.data.data.rows
    },
    go_to_detail(id) {
      this.$router.push(`/article_detail?id=${id}`)
    }


  },

}
</script>

<style lang="less" >
</style>
