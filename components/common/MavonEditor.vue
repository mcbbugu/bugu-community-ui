<template>
  <div class="mavonEditor">
    <no-ssr>
      <mavon-editor :toolbars="markdownOption" v-model="handbook"/>
    </no-ssr>
  </div>
</template>
<script>
export default {
  data() {
    return {
      markdownOption: {
        bold: true, // 粗体
        // ... // 更多配置
      },
      handbook: "#### 使用 MarkDown 语法编辑您的问题"
    };
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