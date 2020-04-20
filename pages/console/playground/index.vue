<template>
  <div>
    <h1>Playround</h1>
    <div class="split-container-wrapper">
      <split-pane :min-percent="20" split="vertical" @resize="resize">
        <template slot="paneL">
          <v-row align="center" justify="center">
            <v-col cols="12">
              <v-card>
                <v-subheader :inset="inset">
                  Template API
                </v-subheader>
                <v-row class="playroud-api-selector" justify="center">
                  <v-expansion-panels inset>
                    <v-expansion-panel v-for="(item,i) in items" :key="i">
                      <v-expansion-panel-header>{{ item.title }}</v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <v-toolbar color="light-blue" dark>
                          <v-toolbar-title>API Information [{{ item.title }}]</v-toolbar-title>

                          <v-spacer />

                          <v-btn icon>
                            <v-icon>mdi-magnify</v-icon>
                          </v-btn>

                          <v-btn icon>
                            <v-icon>mdi-view-module</v-icon>
                          </v-btn>
                        </v-toolbar>

                        <v-list two-line subheader>
                          <v-list-item v-for="x in item.actions" :key="x">
                            <v-list-item-content>
                              <v-list-item-title v-text="x" />
                            </v-list-item-content>

                            <v-list-item-action>
                              <v-btn icon>
                                <v-icon color="grey lighten-1">
                                  mdi-information
                                </v-icon>
                              </v-btn>
                            </v-list-item-action>
                          </v-list-item>
                        </v-list>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </template>

        <template slot="paneR">
          <split-pane split="horizontal">
            <template slot="paneL">
              <h2>Query</h2>
              <prism-editor
                v-model="code"
                :line-numbers="lineNumbers"
                class="playground-editor"
                language="js"
              />
            </template>

            <template slot="paneR">
              <split-pane split="vertical" :default-percent="30" @resize="resize">
                <template slot="paneL">
                  <h2>Result</h2>
                </template>

                <template slot="paneR">
                  <h2>Response Info</h2>
                </template>
              </split-pane>
            </template>
          </split-pane>
        </template>
      </split-pane>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    inset: false,
    code: '',
    lineNumbers: true,
    items: [
      {
        action: 'inbox',
        title: 'users',
        actions: ['users', 'insert-user']
      },
      {
        action: 'send',
        title: 'products',
        actions: ['products', 'insert-product']
      }
    ]
  }),
  methods: {
    resize (test = '') {
      console.log(test)
    },
    onTemplateSelect () {}
  }
}
</script>

<style>
.split-container-wrapper {
  position: relative;
  height: 100vh;
}
.playroud-api-selector {
  padding: 10px;
}
.playground-editor {
  height: 90%;
}
</style>
