<template>
  <div>
    <v-card outlined max-width="100%">
      <v-col cols="12" sm="6" class="py-1">
        <!-- v-model="text" -->
        <v-btn-toggle tile color="#777777" group>
          <v-btn max-height="26" @click="getClassify('')">全部</v-btn>
          <v-btn max-height="26" @click="getClassify('问答')">问答</v-btn>
          <v-btn max-height="26" @click="getClassify('博客')">博客</v-btn>
          <v-btn max-height="26" @click="getClassify('健身')">健身</v-btn>
          <v-btn max-height="26" @click="getClassify('内在工程')">内在工程</v-btn>
          <!-- 下拉排序列表 -->
          <div v-if="userId == undefined" style="padding-left:400px;">
            <v-menu open-on-hover offset-y>
              <template v-slot:activator="{ on }">
                <v-btn-toggle tile color="#777777" group>
                  <v-btn max-height="26" style="padding: 0 1px;" v-on="on">
                    <v-icon size="15">mdi-format-list-bulleted-square</v-icon>
                    &nbsp;{{sortName}}
                  </v-btn>
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
          :key="item.id"
          @click="openArticle(item.id)"
        >
          <v-list-item-avatar v-if="userId == undefined">
            <v-img :src="item.avatarUrl"></v-img>
          </v-list-item-avatar>
          <v-chip v-if="userId == undefined" label small style="margin-right:10px; right:13px;">{{item.classify}}</v-chip>
          <v-list-item-content>
            <v-list-item-title style="color:#636b6f" v-text="item.title"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon style="color:#bab9bb; padding-top:10px; font-size:12px;">
            <v-icon size="15" color="#bab9bb">mdi-eye-outline</v-icon>
            &nbsp;{{item.viewCount}} &nbsp;&nbsp;
            <v-icon size="15" color="#bab9bb">mdi-thumb-up-outline</v-icon>
            &nbsp;{{item.agreeCount}} &nbsp;&nbsp;
            <v-icon size="15" color="#bab9bb">mdi-comment-outline</v-icon>
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
                <v-pagination v-model="current" @input="next" class="my-1" :length="pageCount"></v-pagination>
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
  props: {
    userId: {
      value: "",
      required: false
    }
  },

  data: () => ({
    items: [],
    tagColor: "",
    current: 1,
    pageCount: 0,
    size: 10,
    dropDownList: [
      { title: "最新发布" },
      { title: "点赞最多" },
      { title: "评论最多" },
      { title: "浏览最多" }
    ],
    sort: "gmt_create",
    sortName: "排序方式",
    classify: "",
    articleId: 0
  }),

  mounted() {
    this.articleId = this.$route.params.id;
    let data = {}
    if (this.userId == undefined) {
      data = {
        current: this.current,
        size: this.size,
        sort: this.sort,
        classify: this.classify
      }
    } else {
      data = {
        userId: this.userId,
        current: this.current,
        size: this.size,
        sort: this.sort,
        classify: this.classify
      }
    }

    axios
      .get("/article/find", {
        params: data
      })
      .then(res => {
        this.items = res.data.data.records;
        this.pageCount = res.data.data.pages;
        this.current = res.data.data.current;
      });
  },

  methods: {
    //分类
    getClassify(classify) {
      this.classify = classify;
      this.current = 1;
      axios
        .get("/article/find", {
          params: {
            current: this.current,
            size: this.size,
            classify: this.classify,
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
      this.current = e;
      axios
        .get("/article/find", {
          params: {
            current: this.current,
            size: this.size,
            classify: this.classify,
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
      this.current = 1;
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
        .get("/article/find", {
          params: {
            current: this.current,
            size: this.size,
            classify: this.classify,
            sort: this.sort
          }
        })
        .then(res => {
          this.items = res.data.data.records;
          this.pageCount = res.data.data.pages;
        });
      this.sortName = index;
    },

    openArticle(e) {
      if (e == this.articleId) {
        this.$router.go(0);
      } else {
        this.$router.push("/article/" + e);
      }
    }
  }
};
</script>