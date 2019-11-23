<template>
  <v-container class="grey lighten-5">
    <!-- no-gutters 无间隔 -->
    <v-row justify="end">
      <v-col cols="12" sm="6" md="9">
        <v-card class="pa-2" outlined>
          <h3 style="text-align:center; margin:40px; font-size:1.2em; color:#636b6f;">编辑问题</h3>
          <v-text-field
            @input="titleEdit"
            style="margin:0 auto; width:90%;"
            label="标题"
            outlined
            dense
            required
            :rules="titleRules"
            :counter="30"
            v-model="title"
          ></v-text-field>
          <!-- dense 变小 deletable-chips -->
          <v-select
            @click="bugu"
            @focus="openSelect"
            @change="select"
            style="margin:10px auto; width:90%;"
            :rules="tagRules"
            :counter="3"
            v-model="value"
            :items="items"
            label="标签"
            :menu-props="{top: true,}"
            outlined
            multiple
            small-chips
            dense
            deletable-chips
          ></v-select>
          <MavonEditor v-on:change_mavon="change_text" />
          <!-- 消息条 -->
          <div>
            <v-snackbar v-model="snackbar" :timeout="1500" color="#ff5252" top>
              {{text}}
              <v-btn color="#fff" text @click="snackbar=false">
                <v-icon>mdi-window-close</v-icon>
              </v-btn>
            </v-snackbar>
          </div>
          <!-- 底部按钮 -->
          <v-card outlined style="margin:20px auto; padding: 20px 10px; width:90%;">
            <v-btn @click="release" outlined depressed color="success">
              <v-icon>mdi-telegram</v-icon>&nbsp;立即发布
            </v-btn>
            <v-btn outlined color="primary" depressed>
              <v-icon>mdi-sigma-lower</v-icon>存为草稿
            </v-btn>
            <v-btn text color="#636b6f" style="left:370px;" depressed>
              <v-icon>mdi-emoticon-excited-outline</v-icon>使用说明
            </v-btn>
          </v-card>
          <!-- 底部按钮 end -->
        </v-card>
      </v-col>
      <v-col cols="6" md="2">
        <v-card class="pa-2" outlined>
          <a
            target="_blank"
            href="https://github.com/ryanhanwu/How-To-Ask-Questions-The-Smart-Way/blob/master/README-zh_CN.md"
          >提问的智慧</a>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
// import QuillEditor from '~/components/common/QuillEditor.vue'
import MavonEditor from "~/components/common/MavonEditor.vue";
import axios from "axios";
import qs from "qs";
export default {
  components: {
    MavonEditor
  },
  data: () => ({
    items: [],
    value: [],
    title: "",
    tags: [],
    content: "",
    titleRules: [
      v => !!v || "请输入标题",
      v => v.length <= 50 || "标题不能超过30个字"
    ],
    tagRules: [
      v => v.length >= 1 || "请选择标签",
      v => v.length <= 3 || "不能超过3个标签"
    ],
    text: "",
    snackbar: false
  }),

  mounted() {
    axios.get("/tag/find").then(res => {
      let tags = res.data.data;
      tags.forEach(tag => {
        this.items.push(tag.name);
      });
    });
  },
  methods: {
    change_text(value, render) {
      // console.log("this is value: " + render);
      console.log("this is value: " + value);
      this.content = value;
    },

    titleEdit(e) {
      this.title = e;
      console.log(e);
    },

    select(e) {
      this.tags = e;
    },
    openSelect() {},
    //发布
    release() {
      if (this.content.length == 0) {
        this.snackbar = true;
        this.text = "请填写问题内容";
      }
      if (this.title.length == 0) {
        this.snackbar = true;
        this.text = "请填写标题";
      }
      if (this.tags.length == 0) {
        this.snackbar = true;
        this.text = "请选择标签";
      }

      let data = {
        title: this.title,
        tags: this.value,
        content: this.content
      };
      // if(this.title.length > 0 && this.title.length < 30 &&
      // this.value > 0 &&)
      data = qs.stringify(data);
      axios
        .post("/question/add", data, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(res => {
          console.log(res);
        });
    },
    bugu() {
      console.log();
    }
  }
};
</script>