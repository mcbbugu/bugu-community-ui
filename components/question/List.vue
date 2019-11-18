<template>
  <div>
    <v-card max-width="1000" class="mx-auto">
      <v-col cols="12" sm="6" class="py-1">
        <v-btn-toggle v-model="text" tile color="#777777" group>
          <v-btn max-height="26" value="left">全部</v-btn>

          <v-btn max-height="26" value="center">翻译</v-btn>

          <v-btn max-height="26" value="right">教程</v-btn>

          <v-btn max-height="26" value="justify">健身</v-btn>
        </v-btn-toggle>
      </v-col>

      <!-- 文章列表 -->
      <v-list subheader>
        <v-list-item v-for="item in items" :key="item.title" @click>
          <v-list-item-avatar>
            <v-img :src="item.avatarUrl"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title color="#636b6f" v-text="item.title"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon style="color:#bab9bb; font-size:12px;"> 
            <v-icon size=15 color="#bab9bb">mdi-thumb-up</v-icon> &nbsp; 100 &nbsp;
            <v-icon size=15 color="#bab9bb">mdi-message-text</v-icon> &nbsp; 20 &nbsp;  / 3天前
            <i class="fa fa-comment-o" aria-hidden="true"></i>
            <!-- <v-icon :color="item.active ? 'deep-purple accent-4' : 'grey'">chat_bubble</v-icon> -->
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-card>
    <pag />
  </div>
</template>

<script>
import pag from "~/components/Pag.vue";
import axios from 'axios';
export default {
  components: {
    pag
  },
  data: () => ({
    items: [],
    // items: [
    //   {
    //     active: true,
    //     title: "Jason Oner",
    //     avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg"
    //   },
    //   {
    //     active: true,
    //     title: "Ranee Carlson",
    //     avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg"
    //   },
    //   {
    //     title: "Cindy Baker",
    //     avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg"
    //   },
    //   {
    //     title: "Ali Connors",
    //     avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg"
    //   }
    // ],
    // items2: [
    //   {
    //     title: "Travis Howard",
    //     avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg"
    //   }
    // ]
  }),

  mounted(){
    axios.get("/question/find").then(res => {
      this.items = res.data.data
      console.log(this.items);
    })
  }
};
</script>