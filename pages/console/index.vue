<template>
  <client-only>
    <div class="dashboard">
      <v-navigation-drawer :width="offsetWidth" fixed permanent>
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
      <section :style="{ 'padding-left': (offsetWidth + 30) + 'px' }">
        <v-tabs v-model="tab">
          <v-tab>
            <label class="tab-header-txt">Schema</label>
          </v-tab>
          <v-tab>
            <label class="tab-header-txt">Query</label>
          </v-tab>
        </v-tabs>
        <div class="tab-data-items">
          <v-tabs-items v-model="tab">
            <v-tab-item>
              <v-col class="column" cols="12">
                <v-toolbar dense>
                  <v-toolbar-title>Code</v-toolbar-title>
                  <v-spacer />
                  <v-btn text>
                    Save
                  </v-btn>
                  <v-btn text>
                    Analyze
                  </v-btn>
                </v-toolbar>
                <div class="code-container">
                  <CodeEditor id="schemaCodeId" />
                </div>
              </v-col>
            </v-tab-item>
            <v-tab-item>
              <v-row no-gutters>
                <v-col class="column" cols="12">
                  <div class="split-container-wrapper">
                    <split-pane :min-percent="20" split="vertical" @resize="resize">
                      <template slot="paneL">
                        <v-toolbar dense>
                          <v-toolbar-title>Code</v-toolbar-title>
                          <v-spacer />
                          <v-btn text>
                            Save
                          </v-btn>
                          <v-btn text>
                            Analyze
                          </v-btn>
                        </v-toolbar>
                        <div class="code-container">
                          <CodeEditor id="codeId" />
                        </div>
                      </template>

                      <template slot="paneR">
                        <v-toolbar dense>
                          <v-toolbar-title>Response</v-toolbar-title>
                          <v-spacer />
                          <v-btn text>
                            Prettify
                          </v-btn>
                        </v-toolbar>
                        <div class="code-container">
                          <CodeEditor id="responseId" />
                        </div>
                      </template>
                    </split-pane>
                  </div>
                </v-col>
              </v-row>
            </v-tab-item>
          </v-tabs-items>
        </div>
      </section>
    </div>
  </client-only>
</template>

<script>
import CodeEditor from '@/components/CodeEditor';
import schema from '@/static/sample-schema.json';
export default {
  components: {
    CodeEditor
  },
  data () {
    return {
      tab: null,
      offsetWidth: 230,
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
  },
  mounted () {
    console.log(schema);
  },
  methods: {
    resize () {},
    onTemplateSelect () {}
  }
};
</script>

<style scoped>
.dashboard {
  padding-top: 20px;
}
.editor-header-txt {
  font-size: 13;
  font-weight: 600;
}
.column {
  padding-right: 15px;
}
.welcome-text {
  font-weight: 400;
}
.v-navigation-drawer {
  top: 50px !important;
  left: 60px;
}
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
.tab-data-items {
  padding-top: 20px;
}
.tab-header-txt {
  font-weight: 400;
  font-size: 20;
  text-transform: uppercase;
}
</style>
