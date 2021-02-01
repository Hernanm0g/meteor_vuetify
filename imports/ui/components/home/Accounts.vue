<template>
  <v-card>
    <v-img
      class="white--text align-end"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      height="200px"
      src="https://apod.nasa.gov/apod/image/1906/Fusco-BigSurKonaMWBioluminescenceMars-exif1024.jpg"
    >
      <v-card-title>
        User Authentication with Auth0
      </v-card-title>
    </v-img>
    <v-card-text>
      <div>
        <span class="grey--text">Auth0 Universal Login and meteor-accounts!!</span>
        <br>
        <v-icon>mdi-login</v-icon> <a
          href="https://auth0.com/docs/libraries/lock/v11"
          target="_blank"
        >Auth0 Lock</a> via CDN.
        <br>
        <v-icon>mdi-account</v-icon> <a
          href="https://guide.meteor.com/accounts.html"
          target="_blank"
        >Meteor-accounts</a> installed.
        <br>
        <br>
        <span v-if="!settedAuth0">Want to see auth0 and meteor-accounts in action? click on "Set Auth0!!" on this card.</span>
        <span v-else-if="!authenticated">Want to see auth0 and meteor-accounts in action? click on "Log me in!!" on this card.</span>
        <span v-else>Want to see auth0 and meteor-accounts in action? deploy mongol "ctrl+m". Now you can use Meteor.user() and Meteor.userId() on Client and server side. <strong>Check out the Profile page.</strong></span>
        <br>
        <br>
        <span>Authenticated: <strong>{{ authenticated }}</strong></span>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn
        v-if="!settedAuth0"
        text
        color="orange"
        :to="{name:'setauth0'}"
      >
        Set AUTH0!!
      </v-btn>
      <v-btn
        v-else-if="!authenticated"
        text
        color="orange"
        @click="login"
      >
        Log me in!!
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="js">
  import { AUTH0 } from '../../../auth0-variables.js'
  export default {
    name:"Accounts",
    computed: {
      settedAuth0(){
        return !!AUTH0.CLIENT_ID && !!AUTH0.DOMAIN
      }
    },
    methods: {
      login(){
        this.$store.dispatch("login")
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>