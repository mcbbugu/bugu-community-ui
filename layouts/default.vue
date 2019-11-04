<template>
  <v-app>
    <Navigation/>
    <v-content style="margin-top:100px;">
      <v-container>
        <nuxt />
      </v-container>
      <v-container>
        <nuxt />
      </v-container>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      :fixed="fixed"
      app
      light
    >
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import Navigation from '../components/Navigation';
export default {
  components: {
    Navigation
  },

  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>
