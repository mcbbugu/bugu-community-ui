<template>
  <v-card max-width="344" class="mx-auto">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title
          class="headline"
          style="color:#777777; font-weight: bold; font-size:20px !important;"
        >布谷</v-list-item-title>
      </v-list-item-content>
      <v-list-item-avatar color="grey">
        <!-- <v-img :src="item.avatarUrl"></v-img> -->
      </v-list-item-avatar>
    </v-list-item>
    <v-divider></v-divider>
    <v-list-item>
      <div class="userInfo">
        <div class="son">文章</div>
        <div class="son">粉丝</div>
        <div class="son">被赞</div>
        <div class="son">收藏</div>
      </div>
    </v-list-item>
    <v-img src height="100"></v-img>

    <v-card-text>Visit ten places on our planet that are undergoing the biggest changes today.</v-card-text>

    <v-card-actions>
      <v-btn text color="deep-purple accent-4">Read</v-btn>
      <v-btn text color="deep-purple accent-4">Bookmark</v-btn>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import axios from "axios";
export default {
  mounted() {
    axios
      .get("/article/find", {
        params: { current: this.page, size: this.size, sort: this.sort }
      })
      .then(res => {
        this.items = res.data.data.records;
        this.pageCount = res.data.data.pages;
        this.page = res.data.data.current;
      });
  }
};
</script>

<style scoped>
.userInfo{
  display: flex;
}
</style>