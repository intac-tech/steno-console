<template>
  <v-row justify="center">
    <v-dialog v-model="isOpen" persistent max-width="600px">
      <v-form
        ref="form"
        v-model="valid"
        :lazy-validation="lazy"
      >
        <v-card>
          <v-card-title>
            <span class="headline">Create new group</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field v-model="groupName" label="Enter Group Name*" :rules="groupNameRules" required />
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
              @click="submit()"
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
    }
  },
  data () {
    return {
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
    submit () {
      this.setState(false);
      this.$emit('result', this.groupName);
      this.$refs.form.reset();
    }
  }
};
</script>

<style>
</style>
