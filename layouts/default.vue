<template>
  <v-app style="margin-top:80px;">
    <Navigation/>
    <nuxt/>
  </v-app>
</template>

<script>
import Navigation from "../components/Navigation";
export default {
  components: {
    Navigation
  },

  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/"
        },
        {
          icon: "mdi-chart-bubble",
          title: "Inspire",
          to: "/inspire"
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js"
    };
  }
};
</script>
