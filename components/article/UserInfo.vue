<template>
  <div>
    <v-card outlined max-width="260" class="mx-auto">
      <v-list-item style="left:15px;">
        <v-list-item-avatar>
          <v-img size="6" :src="user.avatarUrl"></v-img>
        </v-list-item-avatar>
        <v-list-item-content style="padding-right:5px;">
          <v-list-item-title class="headline" style="color:#636b6f; font-size:15px !important;">布谷</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-card-text>
        <div class="userInfo">
          <div class="son">
            <div>文章</div>
            <div>{{user.articleCount}}</div>
          </div>
          <div class="son">
            <div>粉丝</div>
            <div>{{user.fansCount}}</div>
          </div>
          <div class="son">
            <div>点赞</div>
            <div>{{user.likeCount}}</div>
          </div>
          <div class="son">
            <div>收藏</div>
            <div>{{user.collectionCount}}</div>
          </div>
        </div>
      </v-card-text>
      <!-- class="mx-8" -->
      <v-divider class="mx-2"></v-divider>
      <v-card-text>
        <div class="userInfo">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <div v-on="on">排行：{{user.rank}}</div>
            </template>
            <span>总访问量的排行</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <div v-on="on">访问：{{user.viewCount}}</div>
            </template>
            <span>总访问量</span>
          </v-tooltip>
        </div>
      </v-card-text>
      <v-divider class="mx-2"></v-divider>
      <v-card-actions style="display:flex; justify-content: center; ">
        <v-btn text color="#636b6f">
          <v-icon left>mdi-eye-plus-outline</v-icon>关注
        </v-btn>
        <v-btn text color="#636b6f">
          <v-icon left>mdi-email-outline</v-icon>私信
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-card loader-height outlined max-width="260" class="mx-auto" style="margin-top:15px;">
      <div>
        <v-btn @click="getAllArticle" style="width:100%; color:#636b6f; margin: 0 auto;" text>
          <v-icon size="18">mdi-card-text-outline</v-icon>&nbsp;所有文章
        </v-btn>
      </div>
    </v-card>
  </div>
</template>
<script>
export default {
  props: {
    user: {}
  },
  methods: {
    getAllArticle(){
      this.$emit('getAllArticle_event')
    }
  },
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