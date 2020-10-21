<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <v-list-item>
          <v-list-item-avatar>
            <img src="/img/logo.png">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title class="subheading">
              Meteor + Vuetify
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn
              icon
              small
              @click.stop="drawer=false"
            >
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-divider />
        <v-list-item
          v-if="!!user"
          :to="{name:'profile'}"
          exact
        >
          <v-list-item-avatar>
            <img
              :src="avatar"
              lazy-src="/img/logo.png"
            >
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ !!user.profile.name ? user.profile.name : user.profile.email }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- <v-divider v-if="!!user"></v-divider> -->
        <v-list-item
          :to="{name:'home'}"
          exact
        >
          <v-list-item-action>
            <v-icon>home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          :to="{name:'about'}"
          exact
        >
          <v-list-item-action>
            <v-icon>info</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>About us</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          :to="{name:'setauth0'}"
          exact
        >
          <v-list-item-action>
            <v-icon>person</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Set Auth0</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      hide-on-scroll
      color="tertiary"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer">
        <v-icon>menu</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title class="font-weight-bold">
        Meteor + Vuetify
      </v-toolbar-title>
      <v-spacer />
      <v-menu
        v-if="!!authenticated && !!user"
        offset-y
      >
        <template v-slot:activator="{ on }">
          <v-avatar
            size="36px"
            ripple
            class="pointer"
            v-on="on"
          >
            <img
              :src="avatar"
              lazy-src="/img/logo.png"
              alt=""
            >
          </v-avatar>
        </template>
        <v-list>
          <template v-for="(item,i) in options">
            <v-divider
              v-if="i!=0"
              :key="i+'-divider'"
              dark
            />
            <v-list-item
              v-if="item.action != 'logout'"
              :key="i"
              :to="{name:item.action}"
            >
              <v-list-item-action>
                <v-icon v-if="item.icon">
                  {{ item.icon }}
                </v-icon>
              </v-list-item-action>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item>
            <v-list-item
              v-else
              :key="i"
              @click="logout"
            >
              <v-list-item-action>
                <v-icon v-if="item.icon">
                  {{ item.icon }}
                </v-icon>
              </v-list-item-action>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item>
          </template>
        </v-list>
      </v-menu>
      <v-tooltip
        v-else
        bottom
      >
        <template v-slot:activator="{ on }">
          <v-btn
            text
            icon
            v-on="on"
            @click="login()"
          >
            <v-icon>fas fa-sign-in-alt</v-icon>
          </v-btn>
        </template>
        <span>Log in</span>
      </v-tooltip>
    </v-app-bar>
    <v-main>
      <v-container grid-list-md>
        <bread-crumbs />
        <router-view @logmein="showLock()" />
        <snack-bar />
        <confirm-dialog />
      </v-container>
    </v-main>
    <v-footer
      app
      fixed
      class="px-2"
    >
      <span><a
        href="http://www.cosmosin.co"
        target="_blank"
      > Cosmos Labs</a></span>
    </v-footer>
  </v-app>
</template>

<script>
import ConfirmDialog from './ConfirmDialog.vue'
import BreadCrumbs from './BreadCrumbs.vue'
import SnackBar from './SnackBar.vue'
import Avatars from '../api/avatars/client'

export default {
  name:"MeteorVuetify",
  metaInfo: {
    title: 'Meteor & Vuetify',
    // all titles will be injected into this template
    titleTemplate: '%s | Boilerplate'
  },
  components: {
    BreadCrumbs,
    ConfirmDialog,
    SnackBar,
  },
  data() {
    return {
      click_id:0,
      drawer: null,
      options: [
        {
          text: "Profile",
          icon: "fas fa-user",
          action:"profile"
        },
        {
          text: "Log Out",
          icon: "fas fa-sign-out-alt",
          action:"logout"
        }
      ]
    }
  },
  computed: {
    snackbar:{
      get: function(){
        return this.$store.state.snackbar;
      },
      set: function(s){
        if (!s) {
          this.$store.commit("deactivateSnack");
        }
      }
    },
    snackbarColor(){
      return this.$store.state.snackbarColor;
    },
    snacktext(){
      return this.$store.state.snacktext;
    }
  },
  watch: {
    user(n,o){
      if (!!n != !!o) {
        this.$store.commit("authenticated", !!n);
      }
    },
    // Use it when autopublish is off
    "user.profile.avatar"(a){
      if (a) {
        this.$subscribe("avatars.get.mine", [a] );
      }
    }
  },
  meteor: {
    // Get user logged
    user(){
      return Meteor.user();
    },
    avatar(){
      if (!this.user) {
        return "/img/logo.png";
      }
      if (this.user.profile.avatar) {
        let myavatar = Avatars.findOne({ _id:this.user.profile.avatar });
        if (myavatar) {
          return myavatar.link("thumbnail");
        }
      }
      if (this.user.profile.picture) {
        return this.user.profile.picture;
      }
      return "/img/logo.png";
    }
  },
  methods: {
    login(){
      this.$store.dispatch("login")
    },
    logout(){
      this.$store.dispatch("logout")
    }
  },
}
</script>

<style lang="css" scoped>
</style>
