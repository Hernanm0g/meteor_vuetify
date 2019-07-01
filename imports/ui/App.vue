
<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app>
      <v-list dense>
        <v-list-tile avatar class="my-1">
          <v-list-tile-avatar>
            <img src="/img/logo.png">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title class="subheading">Meteor + Vuetify</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn icon @click.stop="drawer=false">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile avatar v-if="!!user" class="my-1" :to="{name:'profile'}" exact>
          <v-list-tile-avatar>
            <img :src="avatar" lazy-src="/img/logo.png">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{ !!user.profile.name ? user.profile.name : user.profile.email}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <!-- <v-divider v-if="!!user"></v-divider> -->
        <v-list-tile :to="{name:'home'}" exact>
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="{name:'about'}" exact>
          <v-list-tile-action>
            <v-icon>info</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>About us</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="{name:'setauth0'}" exact>
          <v-list-tile-action>
            <v-icon>person</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Set Auth0</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app scroll-off-screen>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="font-weight-bold">Meteor + Vuetify</v-toolbar-title>
      <v-spacer></v-spacer>
        <v-menu offset-y v-if="!!authenticated && !!user">
          <template slot="activator">
            <v-avatar
              size="36px"
              ripple>
              <img
               :src="avatar"
               lazy-src="/img/logo.png"
               alt="">
            </v-avatar>
          </template>
          <v-list>
            <template v-for="(item,i) in options">
              <v-divider dark v-if="i!=0"></v-divider>
              <v-list-tile
                :key="i"
                v-if="item.action != 'logout'"
                :to="{name:item.action}">
                <v-list-tile-action>
                  <v-icon v-if="item.icon">{{item.icon}}</v-icon>
                </v-list-tile-action>
                <v-list-tile-title>{{item.text}}</v-list-tile-title>
              </v-list-tile>
              <v-list-tile
                :key="i"
                v-else
                @click="logout">
                <v-list-tile-action>
                  <v-icon v-if="item.icon">{{item.icon}}</v-icon>
                </v-list-tile-action>
                <v-list-tile-title>{{item.text}}</v-list-tile-title>
              </v-list-tile>
            </template>
          </v-list>
        </v-menu>
        <v-tooltip bottom v-else>
            <v-btn flat
                   icon
                   slot="activator"
                   @click="showLock()">
                <v-icon>fas fa-sign-in-alt</v-icon>
            </v-btn>
            <span>Log in</span>
        </v-tooltip>
    </v-toolbar>
    <v-content>
      <v-container grid-list-md>
      <bread-crumbs></bread-crumbs>
      <router-view @logmein="showLock()"></router-view>
      </v-container>
    </v-content>
    <v-footer app fixed class="px-2">
      <span><a href="http://www.cosmosin.co" target="_blank"> Cosmos Labs</a></span>
    </v-footer>
    <v-snackbar v-cloak
        v-model="snackbar"
        top
        :timeout="3000"
        :color="snackbarColor">
        {{ snacktext}}
    </v-snackbar>
    <confirm :active="confirmDialog" :title="confirmTitle" :text="confirmText"></confirm>
  </v-app>
</template>

<script>
import Loader from '/imports/ui/Loader.vue'
import Confirm from '/imports/ui/Confirm.vue'
import BreadCrumbs from '/imports/ui/BreadCrumbs.vue'
import Avatars from '/imports/api/avatars'
import { AUTH0 } from '/imports/auth0-variables'
const auth0Lock = new Auth0Lock(
  AUTH0.CLIENT_ID,
  AUTH0.DOMAIN,
  {
    autoclose: true,
    auth: {
      responseType: 'token id_token',
      redirectUrl: AUTH0.CALLBACK
    },
    theme: {
      logo: "/img/logo.png",
      primaryColor: '#31324F'
    }
  }
);

export default {
  name:"MeteorVuetify",
  metaInfo: {
    title: 'Meteor & Vuetify',
    // all titles will be injected into this template
    titleTemplate: '%s | Boilerplate'
  },
  data() {
    return {
      click_id:0,
      lock: auth0Lock,
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
    },
    confirmDialog(){
      return this.$store.state.confirmDialog;
    },
    confirmText(){
      return this.$store.state.confirmText;
    },
    confirmTitle(){
      return this.$store.state.confirmTitle;
    }
  },
  methods: {
    showLock(){
      this.$nextTick(function(){
        this.lock.show();
      });
    },
    login(profile){
      self=this;
      Meteor.login(profile);
    },
    logout(){
      self= this;
      Meteor.logout();
      this.$store.commit("updateCrumbs", false);
      this.$router.push("/");
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
      self=this;
      if (!!this.user.profile.avatar) {
        let myavatar = Avatars.findOne({ _id:self.user.profile.avatar });
        if (!!myavatar) {
          return myavatar.link("thumbnail");
        }
      }
      if (!!this.user.profile.picture) {
        return this.user.profile.picture;
      }
      return "/img/logo.png";
    }
  },
  watch: {
    user(n,o){
      if (!!n != !!o) {
        this.$store.commit("authenticated", !!n);
      }
    }
    // Use it when autopublish is off
    // "user.profile.avatar"(a){
    //   if (!!a) {
    //     this.$subscribe("avatars.get.mine", [a] );
    //   }
    // }
  },
  mounted(){
    self=this;
    this.$nextTick(function() {
      self.lock.on('authenticated', function(authResult){
        self.lock.getUserInfo(authResult.accessToken, function(error, profile) {
          if (error) {
            return;
          }
          self.login(profile);
        });
      });
    });
  },
  components: {
    Loader,
    BreadCrumbs,
    Confirm
  }
}
</script>

<style lang="css" scoped>
</style>
