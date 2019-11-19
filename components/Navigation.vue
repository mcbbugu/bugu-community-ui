<template>
  <v-app-bar
    light
    hide-on-scroll
    fixed
    height="50"
    style="border-top:4px solid #2196F3; color:#888888"
  >
    <v-app-bar-nav-icon>
      <v-icon color="#2196F3">mdi-tennis</v-icon>
    </v-app-bar-nav-icon>
    <v-toolbar-title style="font-size:1em;">布谷社区</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn style="color:#777777;" text to="/home">社区</v-btn>
      <v-btn style="color:#777777;" text to="/a">文档</v-btn>
      <v-btn style="color:#777777;" text to="/b">招聘</v-btn>
      <v-btn style="color:#777777;" text to="/">博客</v-btn>
      <v-btn style="color:#777777;" text to="/inspire">友链</v-btn>
    </v-toolbar-items>

    <!-- 头像 -->
    <v-avatar v-if="isLogin" size=35>
      <img v-bind:src="user.avatarUrl" alt="" />
    </v-avatar>
    <!-- 登录按钮 -->
    <div class="text-center" v-if="!isLogin">
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
      <!-- <v-btn dark>Open Snackbar</v-btn> -->
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
  data: () => ({
    dialog: false,
    valid: true,
    user: {},
    isLogin: false,
    snackbar: false,
    text: "登录成功！"
  }),

  created() {},

  mounted() {
    axios.defaults.baseURL = global.apiUrl;
    //必须加，不加传不了 cookie
    axios.defaults.withCredentials = true;
    //因为重定后设置的 cookie 没传到跳转的页面，所以这里从路径上获取 token，在调用查询数据库用户表接口时存到 cookie 中
    let token = this.$route.query.token;
    if (token != null || token != undefined) {
      axios.get("/user/find", { params: { token } }).then(res => {
        this.$router.push("/");
        this.user = res.data.data;
        this.isLogin = true;
        this.snackbar = true;
        console.log(this.user);
      }).catch(error => {
        this.snackbar = true;
        this.color = "#4CAF50";
      });
    } else {
      //刷新时调用该接口，若 cookie 中已有 token，则直接获取数据
      axios.get("/user/refresh").then(res => {
        this.user = res.data.data;
        this.isLogin = true;
        console.log(res);
      })
    }
  },

  methods: {
    login() {
      console.log("进入了登录方法");
      window.location.href = global.apiUrl + "/oauth/login/gitee";
      // window.location.href = "http://192.168.0.102:3000"
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