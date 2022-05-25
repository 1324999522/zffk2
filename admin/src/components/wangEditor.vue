<template>
  <div class="home">
    <!-- <h3>wangEditor with vue</h3> -->
    <div id="demo1"></div>
    <!-- <button type="button" class="btn" @click="getEditorData">获取当前内容</button> -->
    <!-- <h3>内容预览</h3>
    <textarea name="" id="" cols="170" rows="20" readonly v-model="editorData"></textarea> -->
  </div>
</template>

<script>
// 引入 wangEditor
import wangEditor from 'wangeditor'
export default {
  data() {
    return {
      editor: null,
      editorData: ''
    }
  },
  mounted() {
    const editor = new wangEditor(`#demo1`)
    console.log(editor.config)
    // 配置 onchange 回调函数，将数据同步到 vue 中
    editor.config.onchange = (newHtml) => {
      this.editorData = newHtml
    }
    editor.config.height = 150
    
    editor.config.menus = [
        'bold',
        'head',
        'link',
        'italic',
        'underline'
    ]
    // 创建编辑器
    editor.create()
    this.editor = editor
   
  },
  methods: {
    getEditorData() {
      // 通过代码获取编辑器内容
      let data = this.editor.txt.html()
      alert(data)
    }
  },
  created() {

  },
  beforeDestroy() {
    // 调用销毁 API 对当前编辑器实例进行销毁
    this.editor.destroy()
    this.editor = null
  }
}
</script>

<style lang="less">
.home {
  width: 100%;
  margin: auto;
  position: relative;
  .btn {
    position: absolute;
    right: 0;
    top: 0;
    padding: 5px 10px;
    cursor: pointer;
  }
  h3 {
    margin: 30px 0 15px;
  }
  .w-e-text p{
      margin: 2px 0px  !important;
  }
}
</style>