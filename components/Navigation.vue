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

    <!-- <template v-if="$vuetify.breakpoint.smAndUp">
        <v-btn icon>
          <v-icon to="">mdi-account-circle</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-delete-circle</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-plus-circle</v-icon>
        </v-btn>
    </template>-->

    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="400">
        <template v-slot:activator="{ on }">
          <div class="my-2" style="padding-bottom:2px;">
            <!-- 获取用户头像时加载loading -->
            <v-btn color="#ccc" x-small light outlined fab v-on="on">
              <v-icon>mdi-account-circle</v-icon>
            </v-btn>
          </div>
        </template>
        <v-card>
          <v-card-title class="headline">请登录</v-card-title>
          <v-card-text>
            <!-- 登录弹窗 -->
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" required></v-text-field>

              <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

              <!-- <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">Validate</v-btn>

              <v-btn color="error" class="mr-4" @click="reset">Reset Form</v-btn>

              -->

              <div class="text-center" style="padding-right:20px;">
                <div class="left">
                  <v-btn
                    class="ma-2"
                    :loading="loading"
                    :disabled="loading"
                    color="success"
                    @click="loader = 'loading'"
                    style="width:400px;"
                  >提交</v-btn>
                </div>
              </div>

              <v-spacer></v-spacer>

              <div class="text-center" style="padding-right:20px;">
                <v-btn class="ma-2" outlined color="#888" style="width:400px;">GitHub 登录</v-btn>
              </div>
              <div class="text-center" style="padding-right:20px;">
                <v-btn class="ma-2" outlined color="#888" style="width:400px;">码云登录</v-btn>
              </div>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false"></v-btn>
            <v-btn color="green darken-1" text @click="dialog = false">注册</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- <v-col cols="12" sm="6" md="2">
        <v-text-field append-icon="mdi-magnify" class="mx-4" rounded flat hide-details color="#007bff">
        </v-text-field>
    </v-col>-->
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    valid: true,
    name: "",
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 10) || "Name must be less than 10 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    select: null,

    loader: null,
    loading: false
  }),

  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    }
  },

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
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