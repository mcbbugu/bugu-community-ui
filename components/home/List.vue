<template>
  <div>
    <v-card max-width="1000" class="mx-auto">
      <v-col cols="12" sm="6" class="py-1">
        <!-- v-model="text" -->
        <v-btn-toggle tile color="#777777" group>
          <v-btn max-height="26" @click="getTag('')">全部</v-btn>
          <v-btn max-height="26" @click="getTag('问答')">问答</v-btn>
          <v-btn max-height="26" @click="getTag('博客')">博客</v-btn>
          <v-btn max-height="26" @click="getTag('健身')">健身</v-btn>
          <v-btn max-height="26" @click="getTag('内在工程')">内在工程</v-btn>
          <!-- 下拉排序列表 -->
          <div style="margin-left:400px;">
            <v-menu open-on-hover offset-y>
              <template v-slot:activator="{ on }">
                <v-btn-toggle tile color="#777777" group>
                  
                  <v-btn max-height="26" style="padding: 0 1px;" v-on="on">
                    <v-icon size="15">mdi-format-list-bulleted-square</v-icon>&nbsp;{{sortName}}</v-btn>
                </v-btn-toggle>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in dropDownList"
                  :key="index"
                  @click="dropDown(item.title)"
                >
                  <v-list-item-title
                    style="font-size:0.8em; color: rgba(0, 0, 0, 0.87);"
                  >{{item.title}}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
          <!-- 下拉排序列表 end -->
        </v-btn-toggle>
      </v-col>
      <!-- 文章列表 -->
      <v-list subheader>
        <v-list-item
          style="border-top:1px solid #f2f2f2; height:70px;"
          v-for="item in items"
          :key="item.title"
          @click
        >
          <v-list-item-avatar>
            <v-img :src="item.avatarUrl"></v-img>
          </v-list-item-avatar>
          <v-chip label small style="margin-right:10  px; right:13px;">{{item.tag}}</v-chip>
          <v-list-item-content>
            <v-list-item-title style="color:#636b6f" v-text="item.title"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon style="color:#bab9bb; padding-top:10px; font-size:12px;">
            <v-icon size="15" color="#bab9bb">mdi-thumb-up</v-icon>
            &nbsp;{{item.agreeCount}} &nbsp;&nbsp;
            <v-icon size="15" color="#bab9bb">mdi-message-text</v-icon>
            &nbsp;{{item.commentCount}}&nbsp;&nbsp; / {{item.gmtCreate | getTimeFormat}}
            <i
              class="fa fa-comment-o"
              aria-hidden="true"
            ></i>
            <!-- <v-icon :color="item.active ? 'deep-purple accent-4' : 'grey'">chat_bubble</v-icon> -->
          </v-list-item-icon>
        </v-list-item>
        <!-- 文章列表 end -->
        <!-- 分页 -->
        <v-container v-if="items.length!=0">
          <v-row justify="center">
            <v-col cols="8">
              <v-container class="max-width">
                <v-pagination v-model="page" @input="next" class="my-1" :length="pageCount"></v-pagination>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
        <!-- 分页 end -->
      </v-list>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    items: [],
    tagColor: "",
    page: 1,
    pageCount: 0,
    size: 5,
    dropDownList: [
      { title: "最新发布" },
      { title: "点赞最多" },
      { title: "评论最多" },
      { title: "浏览最多" }
    ],
    sort: "gmt_create",
    sortName: "排序方式"
  }),

  mounted() {
    axios
      .get("/question/find", {
        params: { current: this.page, size: this.size, sort: this.sort}
      })
      .then(res => {
        this.items = res.data.data.records;
        this.pageCount = res.data.data.pages;
        this.page = res.data.data.current;
      });
  },

  methods: {
    //分类
    getTag(tag) {
      console.log(tag);
      this.tag = tag;
      this.page = 1;
      axios
        .get("/question/find", {
          params: {
            current: this.page,
            size: this.size,
            tag: this.tag,
            sort: this.sort
          }
        })
        .then(res => {
          this.items = res.data.data.records;
          this.pageCount = res.data.data.pages;
        });
    },

    //分页
    next(e) {
      this.page = e;
      axios
        .get("/question/find", {
          params: {
            current: this.page,
            size: this.size,
            tag: this.tag,
            sort: this.sort
          }
        })
        .then(res => {
          this.items = res.data.data.records;
          this.pageCount = res.data.data.pages;
        });
    },

    //下拉框
    dropDown(index) {
      this.page = 1;
      switch (index) {
        case 0:
          this.sort = "agree_count";
          break;
        case "评论最多":
          this.sort = "comment_count";
          break;
        case "点赞最多":
          this.sort = "agree_count";
          break;
        case "浏览最多":
          this.sort = "view_count";
          break;
      }
      axios
        .get("/question/find", {
          params: {
            current: this.page,
            size: this.size,
            tag: this.tag,
            sort: this.sort
          }
        })
        .then(res => {
          this.items = res.data.data.records;
          this.pageCount = res.data.data.pages;
        });
      this.sortName = index;
    }
  },

  find(){

  }
};
</script>