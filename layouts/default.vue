<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      width="60"
      app
      :mini-variant="true"
      clipped
      permanent
    >
      <v-list dense>
        <v-list-item v-for="item in items" :key="item.text" link @click="navigate(item.link)">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left color="accent" dense>
      <v-toolbar-title class="mr-12 align-center">
        <img src="~/assets/images/LogoBar.png" height="40">
      </v-toolbar-title>
      <v-spacer />
      <v-row align="center" style="max-width: 50px">
        <v-btn icon>
          <v-icon color="secondary">
            mdi-account
          </v-icon>
        </v-btn>
      </v-row>
    </v-app-bar>

    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
export default {
  props: {},
  data: () => ({
    drawer: null,
    items: [
      {
        icon: 'mdi-view-dashboard-outline',
        text: 'Dashboard',
        link: '/console'
      },
      {
        icon: 'mdi-database',
        text: 'Database',
        link: '/console/playground'
      },
      {
        icon: 'mdi-cog',
        text: 'Settings',
        link: '/console/templates'
      }
    ],
    items2: []
  }),
  created () {
    this.$vuetify.theme.dark = false;
  },
  methods: {
    navigate (link) {
      this.$router.push(link);
    }
  }
};
</script>
<style scoped>
.container {
  padding: 0;
  margin-left: 0;
  margin-right: 0;
}
.v-navigation-drawer {
  width: 60px !important;
}
@media (min-width: 1904px) {
  .container {
    width: 100%;
    max-width: 100%;
  }
}
</style>
