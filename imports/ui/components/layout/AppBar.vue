<template>
  <v-app-bar
    app
    dense
    hide-on-scroll
    scroll-threshold="200"
  >
    <v-app-bar-nav-icon
      v-if="showNavIcon"
      @click="$emit('togle-drawer')"
    />

    <v-toolbar-title>Meteor Vuetify</v-toolbar-title>
    <v-spacer />
    <v-menu
      v-if="!!authenticated && !!user"
      offset-y
    >
      <template #activator="{ on }">
        <v-avatar
          size="36px"
          ripple
          class="pointer"
          v-on="on"
        >
          <img
            :src="avatar || profile.picture"
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
      <template #activator="{ on }">
        <v-btn
          text
          icon
          v-on="on"
          @click="login()"
        >
          <v-icon>mdi-login</v-icon>
        </v-btn>
      </template>
      <span>Log in</span>
    </v-tooltip>
    <template #extension>
      <bread-crumbs />
    </template>
  </v-app-bar>
</template>

<script lang="js">


/*--------  Mixins  --------*/

import {GetAvatarMixin} from '../../mixins/users/avatars'
/*--------  Components  --------*/

import BreadCrumbs from './BreadCrumbs.vue'

export default {
  name:"AppBar",
  components: {
    BreadCrumbs
  },
  mixins: [
    GetAvatarMixin
  ],
  props: {
    showNavIcon: {
      type: Boolean,
      default:false
    }
  },
  data() {
    return {
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
  meteor: {
    user(){
      return Meteor.user()
    },
    profile(){
      return this.user?.profile
    }
  },
  computed: {
    authenticated(){
      return this.$store.state.authenticated
    }
  },
  methods: {
    login(){
      this.$store.dispatch("login")
    },
    logout(){
      this.$store.dispatch("logout")
    }
  }
}
</script>

<style lang="scss" scoped>

</style>