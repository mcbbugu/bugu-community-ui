<template>
  <v-card max-width="344" class="mx-auto">
    <v-list-item style="left:12px;">
      <v-list-item-avatar>
        <v-img :src="getUserInfo.avatarUrl"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline" style="color:#888c8e; font-size:18px !important;">布谷</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-card-text>
      <div class="userInfo">
        <div class="son">
          <div>文章</div>
          <div>{{getUserInfo.articleCount}}</div>
        </div>
        <div class="son">
          <div>粉丝</div>
          <div>{{getUserInfo.fansCount}}</div>
        </div>
        <div class="son">
          <div>被赞</div>
          <div>{{getUserInfo.likeCount}}</div>
        </div>
        <div class="son">
          <div>收藏</div>
          <div>{{getUserInfo.collectionCount}}</div> 
        </div>
      </div>
    </v-card-text>
    <v-divider class="mx-2"></v-divider>
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
  props: {
    getUserInfo: {}
  }
};
</script>

<style scoped>
.userInfo {
  font-size: 14px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  color: #888c8e;
}
.son {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>