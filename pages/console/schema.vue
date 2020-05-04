<template>
  <div>
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
  </div>
</template>

<script>

import CodeEditor from '@/components/CodeEditor';
export default {
  components: {
    CodeEditor
  }
};
</script>

<style>

</style>
