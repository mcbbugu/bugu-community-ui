<template>
  <v-content>
    <v-container class="lighten-5">
      <v-row no-gutters style="flex-wrap: nowrap;">
        <v-col cols="3">
          <v-card class="pa-1 mb-6" outlined tile>
            <UserInfo />
          </v-card>
        </v-col>
        <v-col cols="8">
          <v-card class="pa-1 ml-5" outlined tile>
            <Article/>
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
export default {
  components: {
    UserInfo,
    Article
  },

  validate({ params }) {
    // 必须是number类型
    return /^\d+$/.test(params.id);
  },
  mounted() {

  }
};
</script>
<style scoped>
</style>