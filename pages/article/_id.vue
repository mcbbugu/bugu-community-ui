<template>
  <v-content>
    <v-container class="lighten-5">
      <v-row no-gutters style="flex-wrap: nowrap;">
        <v-col cols="3">
          <UserInfo :user="user"/>
        </v-col>
        <v-col cols="8">
          <v-card class="pa-0 ml-5" outlined>
            <Article :handbook="handbook"/>
          </v-card>
        </v-col>
        <v-col cols="1">
          <v-card class="pa-1 ml-5" outlined tile></v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>
<script>
import UserInfo from "~/components/article/UserInfo.vue";
import Article from "~/components/article/Article.vue";
import axios from "axios";
export default {
  components: {
    UserInfo,
    Article
  },

  data() {
    return {
      handbook: "",
      user: {}
    }
  },

  validate({ params }) {
    // 必须是number类型
    return /^\d+$/.test(params.id);
  },
  mounted() {
    let id = this.$route.params.id;
    axios.get("/article/find/" + id).then(res => {
      this.handbook = res.data.data.content;
      this.user = res.data.data.user;
    });
  },
  methods: {
    
  },
};
</script>
<style scoped>
</style>