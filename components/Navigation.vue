<template>
  <v-app-bar
    light
    hide-on-scroll
    fixed
    height="50"
    style="border-top:4px solid #1976d2; color:#888888;"
  >
    <v-app-bar-nav-icon>
      <v-icon color="#1976d2" to="/home">mdi-hubspot</v-icon>
    </v-app-bar-nav-icon>
    <v-toolbar-title style="font-size:1em; color:#777777">布谷社区</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <!-- 发布什么下拉框 -->
      <div>
        <v-menu open-on-hover offset-y>
          <template v-slot:activator="{ on }">
            <!-- <v-btn style="color:#777777; background:#fff; margin:5px 10px 0 0;" >
                <v-icon>mdi-pencil</v-icon>
            </v-btn>-->
            <v-btn
              style="color:#777777; border:none; margin:7.5px 0 0 0;"
              tile
              outlined
              color="#777777"
              v-on="on"
            >
              <v-icon left>mdi-circle-edit-outline</v-icon>
              <v-icon left>mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in dropDownList"
              :key="index"
              @click="dropDown(item.title)"
            >
              <v-list-item-title style="font-size:0.8em; color:#777777;">
                <v-icon style="padding-bottom:3.8px;" size="17" v-text="item.icon"></v-icon>
                {{item.title}}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <!-- 发布什么下拉框 end -->

      <v-btn style="color:#777777;" text to="/home">社区</v-btn>
      <v-btn style="color:#777777;" text to="/b">招聘</v-btn>
      <v-btn style="color:#777777;" text to="/">博客</v-btn>
      <v-btn style="color:#777777;" text to="/inspire">友链</v-btn>
    </v-toolbar-items>

    <!-- 头像 -->
    <v-avatar size="35" v-if="JSON.stringify(user)!='{}'">
      <img v-bind:src="user.avatarUrl"/>
    </v-avatar>
    <!-- 登录按钮 -->
    <div class="text-center" v-if="JSON.stringify(user)=='{}'">
      <v-dialog v-model="dialog" width="400">
        <template v-slot:activator="{ on }">
          <v-btn class="ma-2" color="#777777" text icon v-on="on">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>

        <!-- 对话框 -->
        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>第三方登录</v-card-title>

          <v-card-text></v-card-text>

          <div class="text-center">
            <v-btn class="ma-2" outlined color="#2196F3" style="width:300px;">GitHub 登录</v-btn>
          </div>
          <div class="text-center">
            <v-btn class="ma-2" outlined color="#2196F3" style="width:300px;" @click="login">码云登录</v-btn>
          </div>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <!-- <v-btn color="primary" text @click="dialog = false">I accept</v-btn> -->
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

    <!-- 消息条 -->
    <div>
      <v-snackbar v-model="snackbar" :timeout="1500" color="#4CAF50" top>
        {{ text }}
        <v-btn color="#fff" text @click="snackbar = false">关闭</v-btn>
      </v-snackbar>
    </div>
  </v-app-bar>
</template>

<script>
import axios from "axios";
import qs from "qs";
import global from "../global";
export default {
  data() {
    return {
      dialog: false,
      valid: true,
      user: {},
      snackbar: false,
      text: "登录成功！",
      dropDownList: [
        { title: "写篇博客", icon: "mdi-circle-edit-outline" },
        { title: "提个问题", icon: "mdi-comment-question-outline" },
        { title: "学习笔记", icon: "mdi-note-outline" }
      ]
    };
  },

  mounted() {
    axios.defaults.baseURL = global.apiUrl;
    //必须加，不加传不了 cookie
    axios.defaults.withCredentials = true;
    //因为重定后设置的 cookie 没传到跳转的页面，所以这里从路径上获取 token，在调用查询数据库用户表接口时存到 cookie 中
    let token = this.$route.query.token;
    if (token != null || token != undefined) {
      axios
        .get("/user/find", { params: { token } })
        .then(res => {
          if (res.data.code == 1) {
            this.$router.push("/");
            this.user = res.data.data;
            this.snackbar = true;
          }
        })
        .catch(error => {
          this.snackbar = true;
          this.color = "#4CAF50";
        });
    } else {
      //刷新时调用该接口，若 cookie 中已有 token，则直接获取数据
      axios.get("/user/refresh").then(res => {
        if (res.data.code == 1) {
          this.user = res.data.data;
        }
      });
    }
  },

  methods: {
    login() {
      console.log("进入了登录方法");
      window.location.href = global.apiUrl + "/oauth/login/gitee";
      // window.location.href = "http://192.168.43.121:3000"
    },
    dropDown(e) {
      if (e == "写篇博客") {
        var classify = "blog";
      } else if (e == "提个问题") {
        var classify = "question";
      }
      this.$router.push("/article/create/" + classify);
    }
  }
};
</script>

<style scoped>
input:focus {
  border: 0.5px solid #007bff;
}

.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}

.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>