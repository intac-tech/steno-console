<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.text"
          link
          @click="navigate(item.link)"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left color="blue" dense>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="mr-12 align-center">
        <span class="title">Steno Console</span>
      </v-toolbar-title>
      <v-spacer />
      <v-row align="center" style="max-width: 650px">
        <v-text-field
          :append-icon-cb="() => {}"
          placeholder="Search..."
          single-line
          append-icon="mdi-magnify"
          color="white"
          hide-details
        />
      </v-row>
    </v-app-bar>

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
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
        icon: 'mdi-console-network-outline',
        text: 'Playground',
        link: '/console/playground'
      },
      {
        icon: 'mdi-script-text-outline',
        text: 'Templates',
        link: '/console/templates'
      }
    ],
    items2: []
  }),
  created () {
    this.$vuetify.theme.dark = false
  },
  methods: {
    navigate (link) {
      this.$router.push(link)
    }
  }
}
</script>
