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
                  <v-icon size="15">mdi-arrow-right</v-icon>
                  <v-btn max-height="26" style="padding: 0 1px;" v-on="on">{{sortName}}</v-btn>
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
    sort: "",
    sortName: "排序方式"
  }),

  mounted() {
    axios
      .get("/question/find", {
        params: { current: this.page, size: this.size, sort: "gmt_create" }
      })
      .then(res => {
        this.items = res.data.data.records;
        this.pageCount = res.data.data.pages;
        this.page = res.data.data.current;
        console.log(this.items);
      });
  },

  methods: {
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
          console.log(this.items);
        });
    },

    //分页事件
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
          console.log(this.items);
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
          console.log(this.items);
        });
      console.log(index);
      this.sortName = index;
    }
  },

  filters: {
    //时间戳显示格式为几天前、几分钟前、几秒前
    getTimeFormat(valueTime) {
      if (valueTime) {
        // let newData = Date.parse(new Date() + '')
        // let diffTime = Math.abs(newData - valueTime)
        let diffTime = Math.abs(
          new Date().getTime() - new Date(valueTime).getTime()
        );
        if (diffTime > 7 * 24 * 3600 * 1000) {
          let date = new Date(valueTime);
          // let y = date.getFullYear()
          let m = date.getMonth() + 1;
          m = m < 10 ? "0" + m : m;
          let d = date.getDate();
          d = d < 10 ? "0" + d : d;
          let h = date.getHours();
          h = h < 10 ? "0" + h : h;
          let minute = date.getMinutes();
          let second = date.getSeconds();
          console.log(second);
          minute = minute < 10 ? "1" + minute : minute;
          second = second < 10 ? "0" + second : second;
          return m + "-" + d + " " + h + ":" + minute;
        } else if (
          diffTime < 7 * 24 * 3600 * 1000 &&
          diffTime > 24 * 3600 * 1000
        ) {
          // //注释("一周之内");
          // var time = newData - diffTime;
          let dayNum = Math.floor(diffTime / (24 * 60 * 60 * 1000));
          return dayNum + "天前";
        } else if (diffTime < 24 * 3600 * 1000 && diffTime > 3600 * 1000) {
          // //注释("一天之内");
          // var time = newData - diffTime;
          let dayNum = Math.floor(diffTime / (60 * 60 * 1000));
          return dayNum + "小时前";
        } else if (diffTime < 3600 * 1000 && diffTime > 0) {
          // //注释("一小时之内");
          // var time = newData - diffTime;
          let dayNum = Math.floor(diffTime / (60 * 1000));
          return dayNum + "分钟前";
        }
      }
    }
  }
};
</script>