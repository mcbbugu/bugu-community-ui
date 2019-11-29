<template>
  <div>
    <div v-if="Object.keys(editData).length != 0 && classify == '博客'">
      <BlogEdit :editData="editData" />
    </div>
    <div v-if="Object.keys(editData).length != 0 && classify == '问答'">
      <QuestionEdit :editData="editData" />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import BlogEdit from "~/components/article/BlogEdit.vue";
import QuestionEdit from "~/components/article/QuestionEdit.vue";
export default {
  components: {
    BlogEdit,
    QuestionEdit
  },
  data() {
    return {
      articleId: 0,
      editData: {},
      classify: ""
    };
  },
  mounted() {
    this.articleId = this.$route.params.edit;
    axios.get("/article/find/" + this.articleId).then(res => {
      this.editData = res.data.data;
      this.classify = this.editData.classify;
    });
  }
};
</script>