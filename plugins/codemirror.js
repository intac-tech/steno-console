import Vue from 'vue';
if (process.client) {
  const codeMirror = require('codemirror');
  window.CodeMirror = codeMirror;
  require('codemirror/addon/hint/show-hint');
  require('codemirror/addon/hint/xml-hint');
  require('codemirror/addon/scroll/simplescrollbars');
  require('codemirror/addon/hint/javascript-hint');
  require('codemirror/mode/xml/xml');
  require('codemirror/mode/javascript/javascript');
  require('../assets/js/codemirror-formatting');
  Vue.prototype.$CodeMirror = codeMirror;
}
