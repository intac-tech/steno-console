<template>
  <v-container>
    <v-row no-gutters>
      <v-col class="column" cols="12" sm="2">
        <v-navigation-drawer :height="getDrawerMinHeight" permanent>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title">
                Application
              </v-list-item-title>
              <v-list-item-subtitle>Groups</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider />
          <v-treeview :items="items" />
        </v-navigation-drawer>
      </v-col>
      <v-col class="column" cols="12" sm="10">
        <h1 class="welcome-text">
          Welcome
        </h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          id: 1,
          name: 'Applications :',
          children: [
            { id: 2, name: 'Calendar : app' },
            { id: 3, name: 'Chrome : app' },
            { id: 4, name: 'Webstorm : app' }
          ]
        },
        {
          id: 5,
          name: 'Documents :',
          children: [
            {
              id: 6,
              name: 'vuetify :',
              children: [
                {
                  id: 7,
                  name: 'src :',
                  children: [
                    { id: 8, name: 'index : ts' },
                    { id: 9, name: 'bootstrap : ts' }
                  ]
                }
              ]
            },
            {
              id: 10,
              name: 'material2 :',
              children: [
                {
                  id: 11,
                  name: 'src :',
                  children: [
                    { id: 12, name: 'v-btn : ts' },
                    { id: 13, name: 'v-card : ts' },
                    { id: 14, name: 'v-window : ts' }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 15,
          name: 'Downloads :',
          children: [
            { id: 16, name: 'October : pdf' },
            { id: 17, name: 'November : pdf' },
            { id: 18, name: 'Tutorial : html' }
          ]
        },
        {
          id: 19,
          name: 'Videos :',
          children: [
            {
              id: 20,
              name: 'Tutorials :',
              children: [
                { id: 21, name: 'Basic layouts : mp4' },
                { id: 22, name: 'Advanced techniques : mp4' },
                { id: 23, name: 'All about app : dir' }
              ]
            },
            { id: 24, name: 'Intro : mov' },
            { id: 25, name: 'Conference introduction : avi' }
          ]
        }
      ],
      right: null
    };
  },
  computed: {
    getDrawerMinHeight () {
      return process.client ? window.innerHeight - 50 : 0;
    }
  }
};
</script>

<style scoped>
.column {
  padding-right: 15px;
}
.welcome-text {
  font-weight: 400;
}
.v-navigation-drawer {
  width: 100% !important;
}
</style>
