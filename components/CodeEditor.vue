<template>
  <div class="wrap">
    <form class="border">
      <textarea :id="id" name="code" />
    </form>
  </div>
</template>

<script>
export default {
  props: {
    schema: {
      required: false,
      type: Object,
      default: null
    },
    id: {
      required: true,
      default: '',
      type: String
    }
  },
  data () {
    const dummy = {
      attrs: {
        color: ['red', 'green', 'blue', 'purple', 'white', 'black', 'yellow'],
        size: ['large', 'medium', 'small'],
        description: null
      },
      children: []
    };
    const tags = {
      dsql: {
        children: ['sql-template']
      },
      'sql-template': {
        attrs: {
          name: null
        },
        children: ['sql']
      }
    };
    return {
      dummy,
      tags,
      editor: null
    };
  },
  mounted () {
    // eslint-disable-next-line nuxt/no-globals-in-created
    this.editor = this.$CodeMirror.fromTextArea(
      document.getElementById(this.id),
      {
        scrollbarStyle: 'simple',
        autoCloseTags: true,
        matchBrackets: true,
        mode: 'xml',
        lineNumbers: true,
        lineWrapping: true,
        extraKeys: {
          "'<'": this.completeAfter,
          "'/'": this.completeIfAfterLt,
          "' '": this.completeIfInTag,
          "'='": this.completeIfInTag,
          'Ctrl-Space': 'autocomplete',
          'Ctrl-D': this.autoFormatSelection
        },
        hintOptions: { schemaInfo: this.tags }
      }
    );
    let content = 'foo\nbar\nbaz\nquux\n';
    for (let i = 0; i < 2; ++i) {
      content += content;
    }
    this.editor.setValue(content);
    this.editor.setOption('theme', 'material-darker');
  },
  methods: {
    completeIfAfterLt (cm) {
      return this.completeAfter(cm, () => {
        const cur = cm.getCursor();
        return (
          cm.getRange(this.$CodeMirror.Pos(cur.line, cur.ch - 1), cur) === '<'
        );
      });
    },
    completeAfter (cm, pred) {
      cm.getCursor();
      if (!pred || pred()) {
        setTimeout(() => {
          if (!cm.state.completionActive) {
            cm.showHint({ completeSingle: false });
          }
        }, 100);
      }
      return this.$CodeMirror.Pass;
    },
    completeIfInTag (cm) {
      return this.completeAfter(cm, () => {
        const tok = cm.getTokenAt(cm.getCursor());
        if (
          tok.type === 'string' &&
          (!/['"]/.test(tok.string.charAt(tok.string.length - 1)) ||
            tok.string.length === 1)
        ) {
          return false;
        }
        const inner = this.$CodeMirror.innerMode(cm.getMode(), tok.state).state;
        return inner.tagName;
      });
    },
    autoFormatSelection () {
      this.editor.execCommand('selectAll');
      const range = this.getSelectedRange();
      this.editor.autoFormatRange(range.from, range.to);
    },
    getSelectedRange () {
      return {
        from: this.editor.getCursor(true),
        to: this.editor.getCursor(false)
      };
    }
  }
};
</script>

<style>
</style>
