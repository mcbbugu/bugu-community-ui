<template>
  <v-app-bar light hide-on-scroll fixed height="60" style="border-top:4px solid #007bff;">
      <v-app-bar-nav-icon>
        <v-icon color="#007bff">mdi-tennis</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title style="font-size:1em;">布谷社区</v-toolbar-title>
      
      <v-spacer></v-spacer>

     <v-toolbar-items style="margin-right:450px;">
        <v-btn rounded text to="/my">社区</v-btn>
        <v-btn text to="/">博客</v-btn>
        <v-btn text to="/inspire">友链</v-btn>
        <v-btn text>Java</v-btn>
      </v-toolbar-items>

      <v-col cols="12" sm="6" md="2">
        <v-text-field append-icon="mdi-magnify" class="mx-4" flat hide-details color="#007bff">
        </v-text-field>
      </v-col>

      <v-menu left bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-avatar size="40">
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
            </v-avatar>
          </v-btn>
        </template>

        <v-list>
          <!-- <v-list-item v-for="n in 5" :key="n" @click="() => {}">
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item> -->
          <!-- <v-list-item :key="n" @click="() => {}">
              <v-list-item-title>个人中心</v-list-item-title>
          </v-list-item>
          <v-list-item :key="n" @click="() => {}">
              <v-list-item-title>我的收藏</v-list-item-title>
          </v-list-item>
          <v-list-item :key="n" @click="() => {}">
              <v-list-item-title>编辑资料</v-list-item-title>
          </v-list-item>
          <v-list-item :key="n" @click="() => {}">
              <v-list-item-title>注销</v-list-item-title>
          </v-list-item> -->
        </v-list>
      </v-menu>
      <v-menu left bottom>
        
      </v-menu>
    </v-app-bar>
</template>