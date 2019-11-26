<template>
  <div class="mavonEditor">
    <client-only>
      <mavon-editor style="z-index:0"
        :value="handbook"
        :editable="false"
        :toolbarsFlag="false"
        :subfield="false"
        :defaultOpen="'preview'"
        :boxShadow="false"
      />
    </client-only>
  </div>
</template>
<script>
import axios from "axios";
export default {
  props: {
    handbook: ""
  },
  data() {
    return {
      markdownOption: {
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        navigation: true // 导航目录
      },
    };
  },
  mounted(){
    
  },
  methods:{
    
  }
};
</script>
<style scoped>
.mavonEditor {
  width: 100%;
  height: 100%;
}
</style>