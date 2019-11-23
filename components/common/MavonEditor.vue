<template>
  <div class="mavonEditor">
    <no-ssr>
      <mavon-editor 
      :toolbars="markdownOption"
       placeholder="Markdown 编写"
       :tabSize=4
       @change="change_mavon"
       :transition=true
       v-model="handbook"/>
    </no-ssr>
  </div>
</template>
<script>
export default {
  data() {
    return {
      markdownOption: {
        bold: true, // 粗体
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        help: true, // 帮助
        // save: true, // 保存（触发events中的save事件）
        navigation: true, // 导航目录
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        subfield: true, // 单双栏模式
        preview: true, // 预览
      },
      handbook: ""
    };
  },
  methods: {
    change_mavon(value,render){
      this.$emit('change_mavon', value, render);
    },
  }
};
</script>

<style scoped>
.mavonEditor {
  margin: 0 auto;
  width: 90%;
  height: 100%;
}
</style>