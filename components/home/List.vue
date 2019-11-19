<template>
  <div>
    <v-card max-width="1000" class="mx-auto">
      <v-col cols="12" sm="6" class="py-1">
        <!-- v-model="text" -->
        <v-btn-toggle tile color="#777777" group>
          <v-btn max-height="26" @click="getTag('')">全部</v-btn>
          <v-btn max-height="26" @click="getTag('提问')">提问</v-btn>
          <v-btn max-height="26" @click="getTag('博客')">博客</v-btn>
          <v-btn max-height="26" @click="getTag('健身')">健身</v-btn>
          <v-btn max-height="26" @click="getTag('内在工程')">内在工程</v-btn>
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
            <v-icon size="15" color="#bab9bb">mdi-thumb-up</v-icon>&nbsp; {{item.viewCount}} &nbsp;
            <v-icon size="15" color="#bab9bb">mdi-message-text</v-icon>&nbsp; {{item.commentCount}} &nbsp; / 3天前
            <i class="fa fa-comment-o" aria-hidden="true"></i>
            <!-- <v-icon :color="item.active ? 'deep-purple accent-4' : 'grey'">chat_bubble</v-icon> -->
          </v-list-item-icon>
        </v-list-item>
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
    pageCount: 0
  }),

  mounted() {
    axios
      .get("/question/find", { params: { current: this.page, size: 15 } })
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
      this.page = 0;
      axios
        .get("/question/find", {
          params: { current: this.page, size: 3, tag: this.tag }
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
          params: { current: this.page, size: 3, tag: this.tag }
        })
        .then(res => {
          this.items = res.data.data.records;
          this.pageCount = res.data.data.pages;
          console.log(this.items);
        });
    }
  }
};
</script>