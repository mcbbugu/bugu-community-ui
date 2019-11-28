<template>
  <v-content>
    <v-container class="lighten-5">
      <v-row no-gutters style="flex-wrap: nowrap;">
        <v-col cols="1">
          <!-- tile 方的 -->
          <v-card class="pt-2 mr-5 mt-10" outlined>

          </v-card>
        </v-col>
        <v-col cols="8">
          <v-card v-if="!isAllArticle" class="pa-0" outlined>
            <div style="color:#636b6f; padding: 25px 0 0 25px; line-height:40px; font-size:30px;">
              <div>{{data.title}}</div>
              <div style="font-size:13px; color:#adb1af;">
                <v-icon color="#adb1af" size="15">mdi-source-fork</v-icon>&nbsp;&nbsp;{{data.classify}}
                &nbsp;/&nbsp;
                <v-icon color="#adb1af" size="15">mdi-eye-outline</v-icon>&nbsp;&nbsp;{{data.viewCount}}
                &nbsp;/&nbsp;
                <v-icon color="#adb1af" size="15">mdi-clock-outline</v-icon>&nbsp;&nbsp;{{data.gmtCreate}}
                &nbsp;/&nbsp; 更新于3天前
              </div>
            </div>
            <Article :handbook="handbook"/>
          </v-card>
          <!-- 用户所有文章 -->
          <List :userId="user.id" v-if="isAllArticle"/>
        </v-col>
        <v-col cols="3">
          <UserInfo :user="user" v-on:getAllArticle_event="getAllArticle"/>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>
<script>
import UserInfo from "~/components/article/UserInfo.vue";
import Article from "~/components/article/Article.vue";
import List from "~/components/home/List.vue";
import axios from "axios";
export default {
  components: {
    UserInfo,
    Article,
    List
  },

  data() {
    return {
      handbook: "",
      user: {},
      data: {},
      isAllArticle: false
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
      this.data = res.data.data;
    });
  },
  methods: {
    getAllArticle(){
      this.isAllArticle = true
      // axios.get("/article/find/user/all", {
      //   params: {
      //     userId: this.user.id,
      //     current: this.current,
      //     size: this.size
      //   }
      // }).then(res => {
        
      //   // this.$router.push("/article/" + res.data.data.title);
      // })
    }
  },
};
</script>
<style scoped>
</style>