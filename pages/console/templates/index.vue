<template>
  <div>
    <h1>Templates</h1>
    <v-container>
      <v-banner two-line>
        <v-avatar slot="icon" color="green accent-4" size="40">
          <v-icon icon="mdi-file-tree-outline" color="white">
            mdi-file-tree-outline
          </v-icon>
        </v-avatar>
        Three line text string example with two actions. One to two lines is preferable. Three lines should be considered the maximum string length on desktop in order to keep messages short and actionable.
        <template
          v-slot:actions
        >
          <v-btn text color="deep-purple accent-4">
            Create a group
          </v-btn>
        </template>
      </v-banner>
      <v-expansion-panels>
        <v-expansion-panel v-for="(item,i) in 5" :key="i">
          <v-expansion-panel-header>Item</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-banner single-line @click:icon="alert">
              <v-icon
                slot="icon"
                color="warning"
                size="36"
              >
                mdi-wifi-strength-alert-outline
              </v-icon>
              Template
              <template v-slot:actions>
                <v-btn
                  color="primary"
                  text
                >
                  Connecting Settings
                </v-btn>
              </template>
            </v-banner>
            <v-list flat>
              <v-list-item-group v-model="itemData" color="primary">
                <v-list-item
                  v-for="(x, idx) in items"
                  :key="idx"
                >
                  <v-list-item-icon>
                    <v-icon v-text="x.icon" />
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="x.text" />
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      itemData: 1,
      items: [
        { text: 'Real-Time', icon: 'mdi-clock' },
        { text: 'Audience', icon: 'mdi-account' },
        { text: 'Conversions', icon: 'mdi-flag' }
      ],
      drawer: true,
      color: 'primary',
      colors: ['primary', 'blue', 'success', 'red', 'teal'],
      right: true,
      miniVariant: false,
      expandOnHover: false,
      background: false
    };
  },
  computed: {
    bg () {
      return this.background
        ? 'https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg'
        : undefined;
    }
  }
};
</script>

<style></style>
