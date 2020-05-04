<template>
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
</template>

<script>

import CodeEditor from '@/components/CodeEditor';
export default {
  components: {
    CodeEditor
  },
  computed: {
    getDrawerMinHeight () {
      return process.client ? window.innerHeight - 50 : 0;
    }
  },
  methods: {
    resize () {}
  }
};
</script>

<style>

.split-container-wrapper {
  position: relative;
  height: 100vh;
}
</style>
