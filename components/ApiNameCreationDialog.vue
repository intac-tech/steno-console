<template>
  <v-row justify="center">
    <v-dialog v-model="isOpen" persistent max-width="600px">
      <v-form
        ref="form"
        v-model="valid"
        :lazy-validation="lazy"
        @submit.prevent="submit"
      >
        <v-card>
          <v-card-title>
            <span class="headline">{{ title }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-alert
                :value="isExist"
                text
                outlined
                color="error"
                icon="mdi-fire"
              >
                The Name is already exist
              </v-alert>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field v-model="groupName" :autofocus="true" :label="isChildItem ? 'Enter API Name' : 'Enter Group Name*'" :rules="groupNameRules" required />
                </v-col>
                <v-col v-if="isChildItem" cols="12" sm="12" md="12">
                  <v-textarea
                    auto-grow
                    label="Description"
                    rows="2"
                    row-height="20"
                  />
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="danger" text @click="setState(false)">
              Close
            </v-btn>
            <v-btn
              color="primary"
              :disabled="!valid"
              text
              type="submit"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    result: {
      type: Function,
      required: false
    },
    dialog: {
      type: Boolean,
      required: true,
      default: false
    },
    title: {
      type: String,
      required: false,
      default: 'Create new group'
    },
    isChildItem: {
      type: Boolean,
      required: false,
      default: false
    },
    items: {
      type: Array,
      required: false,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    }
  },
  data () {
    return {
      isExist: false,
      lazy: false,
      valid: true,
      groupName: '',
      groupNameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 25) || 'Name must be less than 25 characters'
      ]
    };
  },
  computed: {
    isOpen: {
      get () {
        return this.dialog;
      },
      set (newValue) {
        this.$emit('update:dialog', newValue);
      }
    }
  },
  methods: {
    setState (val) {
      this.isOpen = val;
    },
    submit (e) {
      e.preventDefault();
      if (this.isChildItem) {
        this.isExist = this.items[0].children.filter(x => x.name.toLowerCase() === this.groupName.toLowerCase()).length >= 1;
      } else {
        this.isExist = this.items.filter(x => x.name.toLowerCase() === this.groupName.toLowerCase()).length >= 1;
      }
      if (!this.isExist) {
        this.setState(false);
        this.$emit('result', { name: this.groupName, description: '', isChildItem: this.isChildItem });
        this.$refs.form.reset();
        this.$refs.form.resetValidation();
      }
    }
  }
};
</script>

<style>
</style>
