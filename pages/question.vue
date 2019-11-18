<template>
  <div>
    <v-content>
      <v-container class="lighten-5" style="background:#fff;">
        <v-row no-gutters style="flex-wrap: nowrap;">
          <v-col
            cols="5"
            style="min-width: 100px; max-width: 100%;"
            class="flex-grow-1 flex-shrink-0"
          >
            <!-- <v-card class="pa-2 mb-6" outlined tile></v-card> -->
            <list/>
          </v-col>
          <v-col cols="3" style="min-width: 100px;" class="flex-grow-0 flex-shrink-1">
            <v-card class="pa-2 ml-5" outlined tile></v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <!-- <v-footer :fixed="fixed" app light>
      <span>&copy; 2019</span>
    </v-footer> -->
  </div>
</template>
<script>
import list from "~/components/question/List.vue";
export default {
  components: {
    list
  }
};
</script>