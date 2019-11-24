<template>
  <div class="mavonEditor">
    <no-ssr>
      <mavon-editor style="z-index:0"
        :value="handbook"
        :editable="false"
        :toolbarsFlag="false"
        :subfield="false"
        :defaultOpen="'preview'"
        :boxShadow="false"
      />
    </no-ssr>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      markdownOption: {
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        navigation: true // 导航目录
      },
      handbook: ""
    };
  },
  mounted() {
    let id = this.$route.params.id;
    axios.get("/article/find/" + id).then(res => {
      console.log(res);
      this.handbook = res.data.data.content;
    });
  }
};
</script>
<style scoped>
.mavonEditor {
  width: 100%;
  height: 100%;
}
</style>