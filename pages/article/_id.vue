<template>
  <v-content>
    <!-- tile 方的卡片边框 -->
    <v-container class="lighten-5">
      <v-row no-gutters style="flex-wrap: nowrap;">
        <!-- 右边图标操作 -->
        <v-col cols="1" style="margin-top:100px;">
          <div class="text-center" v-if="!isAllArticle">
            <div>
              <v-btn color fab x-small depressed>
                <v-icon color="#636b6f">mdi-thumb-up-outline</v-icon>
              </v-btn>
              <p style="color:#636b6f">122</p>
            </div>
            <div>
              <v-btn color fab x-small depressed>
                <v-icon color="#636b6f">mdi-comment-outline</v-icon>
              </v-btn>
              <p style="color:#636b6f">123</p>
            </div>
            <div>
              <v-btn color fab x-small depressed>
                <v-icon color="#636b6f">mdi-star</v-icon>
              </v-btn>
            </div>
          </div>
        </v-col>
        <!-- 右边图标操作 end -->
        <!-- 消息条 -->
          <!-- <div>
            <v-snackbar
              style="z-index:10000"
              v-model="snackbar"
              :timeout="1500"
              color="#ff5252"
              top
            >
              {{text}}
              <v-btn color="#fff" text @click="snackbar=false">
                <v-icon size="18">mdi-window-close</v-icon>
              </v-btn>
            </v-snackbar>
          </div> -->
          <!-- 消息条 end -->
        <v-col cols="8">
          <v-card v-if="!isAllArticle" class="pa-0" outlined>
            <div style="color:#636b6f; padding: 25px 0 0 25px; line-height:40px; font-size:30px;">
              <div>{{data.title}}</div>
              <div style="font-size:13px; color:#adb1af;">
                <v-icon color="#adb1af" size="15">mdi-source-fork</v-icon>
                &nbsp;&nbsp;{{data.classify}}
                &nbsp;/&nbsp;
                <v-icon color="#adb1af" size="15">mdi-eye-outline</v-icon>
                &nbsp;{{data.viewCount}}
                &nbsp;/&nbsp;
                <v-icon color="#adb1af" size="15">mdi-clock-outline</v-icon>
                &nbsp;
                 {{data.gmtCreate | getTimeFormat}}
                &nbsp;/&nbsp; 更新于
                {{data.gmtUpdate | getTimeFormat}}
                &nbsp;·&nbsp;
                <nuxt-link v-if="oneself" :to="'/article/' + id +'/edit'" style="text-decoration: none;">编辑</nuxt-link>&nbsp;&nbsp;
                <nuxt-link v-if="oneself"
                  :to="{path: '/article/' + id + '/edit'}"
                  style="text-decoration: none;"
                >删除</nuxt-link>
              </div>
            </div>
            <Article :handbook="handbook" />
          </v-card>
          <!-- 用户所有文章 -->
          <List :userId="user.id" v-if="isAllArticle"/>
        </v-col>
        <v-col cols="3">
          <UserInfo :user="user" v-on:getAllArticle_event="getAllArticle" />
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
      isAllArticle: false,
      id: 0,
      oneself: false,
      snackbar: false,
    };
  },

  validate({ params }) {
    // 必须是number类型
    return /^\d+$/.test(params.id);
  },
  mounted() {
    let id = this.$route.params.id;
    this.id = id;
    axios.get("/article/find/" + id).then(res => {
      this.handbook = res.data.data.content;
      this.user = res.data.data.user;
      this.data = res.data.data;

      var cookie = document.cookie.split(";");
      for (let i = 0; i < cookie.length; i++) {
        let c = cookie[i].trim();
        let token = this.user.token;
        if(c.substring(0, c.lastIndexOf('=')) == "bgcommunity-token"){
          let cookie = c.substring(c.lastIndexOf('=')+1, c.length);
          this.oneself = true;
        }
      }
    });
    // bgcommunity-token
  },
  methods: {
    getAllArticle() {
      this.isAllArticle = true;
    }
  },

  edit() {
    let id = this.$route.params.edit;
    console.log(edit);
  }
};
</script>
<style scoped>
</style>