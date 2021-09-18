<template>
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
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
      <v-divider />
      <v-list-item
        v-for="(link,i) in links"
        :key="i"
        :to="link.to"
        :exact="link.exact"
      >
        <v-list-item-avatar
          v-if="link.avatar"
        >
          <img
            :src="link.avatar"
            lazy-src="/img/logo.png"
          >
        </v-list-item-avatar>
        <v-list-item-action
          v-else-if="link.icon"
        >
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ $t(link.title) }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="js">
  
/*--------  Mixins  --------*/
import {GetAvatarMixin} from '../../mixins/users/avatars'
export default {
  name:"SideBar",
  mixins: [
    GetAvatarMixin
  ],
  props: {
    value: {
      type: Boolean,
      default: null
    }
  },
  meteor: {
    user(){
      return Meteor.user()
    }
  },
  computed: {
    drawer:{
      get(){
        return this.value
      },
      set(d){
        this.$emit("input", d)
      }
    },
    profile(){
      return this.user?.profile 
    },
    links(){
      let links = []
      if(this.profile){
        links.push({
          avatar: this.avatar || this.profile.picture,
          to: {name:"profile"},
          title: this.profile.name || this.profile.email
        })
      }
      links = [
        ...links,
        {
          title: 'menu.home',
          icon:"mdi-home",
          to: {name:'home'},
          exact:true
        },
        {
          title: 'menu.about',
          icon:"mdi-information",
          to: {name:'about'},
          exact:true
        },
        {
          title: 'menu.set_auth0',
          icon:"mdi-account-question",
          to: {name:'setauth0'},
          exact:true
        },
      ]
      return links
    }
  }
}
</script>

<style lang="scss" scoped>

</style>