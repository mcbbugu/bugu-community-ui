<template>
  <v-app-bar
    light
    hide-on-scroll
    fixed
    height="50"
    style="border-top:4px solid #007bff; color:#888888"
  >
    <v-app-bar-nav-icon>
      <v-icon color="#007bff">mdi-tennis</v-icon>
    </v-app-bar-nav-icon>
    <v-toolbar-title style="font-size:1em;">布谷社区</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn style="color:#777777;" text to="/my">社区</v-btn>
      <v-btn style="color:#777777;" text to="/">博客</v-btn>
      <v-btn style="color:#777777;" text to="/inspire">友链</v-btn>
    </v-toolbar-items>

    <div class="text-center">
      <v-dialog v-model="dialog" width="400">
        <template v-slot:activator="{ on }">
          <v-btn class="ma-2" color="#777777" text icon v-on="on">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>第三方登录</v-card-title>

          <v-card-text></v-card-text>

          <div class="text-center">
            <v-btn class="ma-2" outlined color="#007bff" style="width:300px;">GitHub 登录</v-btn>
          </div>
          <div class="text-center">
            <v-btn class="ma-2" outlined color="#007bff" style="width:300px;" @click="login">码云登录</v-btn>
          </div>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <!-- <v-btn color="primary" text @click="dialog = false">I accept</v-btn> -->
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-app-bar>
</template>

<script>
import axios from "axios";
import qs from 'qs';
export default {
  data: () => ({
    dialog: false,
    valid: true,
  }),

  methods: {
    login() {
      console.log("进入了登录方法");
      window.location.href = "http://127.0.0.1:8081/oauth/login/gitee"
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