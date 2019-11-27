<template>
  <v-content>
    <v-container class="lighten-5">
      <v-row no-gutters style="flex-wrap: nowrap;">
        <v-col cols="3">
          <UserInfo :user="user" v-on:getAllArticle_event="getAllArticle"/>
        </v-col>
        <v-col cols="8">
          <v-card class="pa-0 ml-1" outlined>
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
      user: {},
      data: {}
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
      axios.get().then(res => {
        
      })
    }
  },
};
</script>
<style scoped>
</style>