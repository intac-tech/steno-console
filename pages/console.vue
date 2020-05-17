<template>
  <client-only>
    <div class="dashboard">
      <v-navigation-drawer :width="offsetWidth" fixed permanent>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
              <v-toolbar class="sidebar-header" dense>
                <v-toolbar-title>GroupQL</v-toolbar-title>

                <v-spacer />
                <v-btn icon @click="openGroupModal">
                  <v-icon color="primary">
                    mdi-plus
                  </v-icon>
                </v-btn>
              </v-toolbar>
            </v-list-item-title>
            <v-list-item-subtitle>Groups</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider />
        <v-treeview
          v-if="items != null && items.length >= 1"
          :active.sync="active"
          :items.sync="items"
          :load-children="fetchUsers"
          :open.sync="open"
          activatable
          color="warning"
          transition
          class="treeview-steno"
          @update:active="childrenItemOpen"
        >
          <template v-slot:prepend="{ item }">
            <v-icon
              color="primary"
            >
              {{ !item.isParent ? 'mdi-circle-medium' : 'mdi-group' }}
            </v-icon>
          </template>
          <template v-slot:append="{ item }">
            <v-icon
              v-if="item.isParent"
              color="primary"
              @click="showMenuDrawer($event, item)"
            >
              mdi-dots-horizontal
            </v-icon>
          </template>
        </v-treeview>
        <div v-else class="empty-txt">
          <label>No group added</label>
        </div>
      </v-navigation-drawer>

      <!-- <v-navigation-drawer
        v-model="showMenu"
        class="navigation-tree-menu"
        :width="offsetWidth"
        absolute
        temporary
      >
        <v-list>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-api</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Add New API</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-circle-edit-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Update</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-trash-can</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Remove Group</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>-->

      <section :style="{ 'padding-left': (offsetWidth + 30) + 'px' }">
        <div v-if="isFirstSetup">
          <v-tabs>
            <v-tab>
              <label class="tab-header-txt">Welcome</label>
            </v-tab>
          </v-tabs>
        </div>
        <div v-else>
          <v-tabs v-model="tab" :optional="isOptional">
            <v-tab @click="navigate('/console/schema')">
              <label class="tab-header-txt">Schema</label>
            </v-tab>
            <v-tab @click="navigate('/console/query')">
              <label class="tab-header-txt">Query</label>
            </v-tab>
          </v-tabs>
        </div>
        <div class="tab-data-items">
          <nuxt-child />
          <v-container fluid>
            <v-row v-if="isFirstSetup" :align="'center'" :justify="'center'">
              <v-col cols="3">
                <label>&nbsp;</label>
              </v-col>
              <v-col class="text-center" cols="6" :align-self="'center'">
                <img src="~/assets/images/empty_welcome.png">
                <div class="welcome-introduction">
                  <label>
                    Welcome To
                    <img src="~/assets/images/Logo.png" height="20">
                  </label>
                </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
                <p>
                  To start click on
                  <v-icon color="primary">
                    mdi-plus
                  </v-icon>symbol
                </p>
              </v-col>
              <v-col cols="3">
                <label>&nbsp;</label>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </section>
      <div v-if="showGroupCreateModal">
        <ApiNameCreationDialog
          :dialog.sync="showGroupCreateModal"
          :title.sync="apiCreationModalTitle"
          :is-child-item="isChildItemCreation"
          :items="itemsToCheck"
          @result="groupModalResult($event)"
        />
      </div>

      <v-menu
        v-model="showMenu"
        :position-x="x"
        :position-y="y"
        absolute
        offset-y
        :offset-overflow="true"
      >
        <v-list>
          <v-list-item link @click="openAddNewChildAPIModal">
            <v-list-item-icon>
              <v-icon>mdi-api</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Add New API</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-circle-edit-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Update</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-trash-can</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Remove Group</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </client-only>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import schema from '@/static/sample-schema.json';
import ApiNameCreationDialog from '@/components/ApiNameCreationDialog';
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
export default {
  components: {
    ApiNameCreationDialog
  },
  data () {
    return {
      x: 0,
      y: 0,
      active: [],
      open: [],
      showGroupCreateModal: false,
      tab: null,
      offsetWidth: 230,
      isOptional: true,
      isFirstSetup: true,
      items: [],
      right: null,
      showMenu: false,
      activeItem: null,
      apiCreationModalTitle: '',
      isChildItemCreation: false,
      itemsToCheck: []
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
    onTemplateSelect () {},
    navigate (link) {
      this.$router.push(link);
    },
    groupModalResult (source) {
      if (!source.isChildItem) {
        this.createGroupTreeItem(source.name);
      } else {
        this.addChild(source.name, source.description);
      }
    },
    createGroupTreeItem (name) {
      const currentRoute = this.$nuxt.$route.path;
      if (this.isFirstSetup && currentRoute === '/console') {
        this.$router.push('/console/schema');
      }
      this.isFirstSetup = false;
      this.items.push({
        id: uuidv4(),
        name,
        isParent: true,
        children: []
      });
    },
    childrenItemOpen (e) {
      console.log(e);
    },
    async fetchUsers (item) {
      // Remove in 6 months and say
      // you've made optimizations! :)
      await pause(1500);
      if (item) {
        return [];
      }
      return null;
    },
    addChild (name, description) {
      const idx = this.items.findIndex(x => x.id === this.activeItem.id);
      if (idx !== -1) {
        this.items[idx].children.push({
          id: uuidv4(),
          name,
          description
        });
      }
    },
    openAddNewChildAPIModal () {
      this.apiCreationModalTitle = 'Create new api';
      this.isChildItemCreation = true;
      this.showGroupCreateModal = true;
    },
    openGroupModal () {
      this.itemsToCheck = this.items;
      this.apiCreationModalTitle = 'Create new group';
      this.isChildItemCreation = false;
      this.showGroupCreateModal = true;
    },
    showMenuDrawer (e, item) {
      e.preventDefault();
      this.showMenu = false;
      this.x = e.clientX;
      this.y = e.clientY;
      this.$nextTick(() => {
        this.activeItem = item;
        this.itemsToCheck = [item];
        this.showMenu = true;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
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
.welcome-introduction {
  padding-bottom: 5px;
  label {
    font-weight: 600;
    font-size: 18px;
  }
}
.empty-txt {
  padding: 10px;
  label {
    color: rgba(0, 0, 0, 0.6);
    font-size: 16px;
    font-style: italic;
    font-weight: 700;
  }
}
.sidebar-header {
  background-color: transparent !important;
  button {
    margin-right: 0 !important;
  }
}
.navigation-tree-menu {
  left: (230px) !important;
  top: 0px !important;
}
</style>
<style lang="scss">
.sidebar-header {
  .v-toolbar__content {
    padding: 0 !important;
  }
}
.treeview-steno {
  .v-treeview-node__prepend {
    button {
      z-index: 20;
    }
  }
}
</style>
