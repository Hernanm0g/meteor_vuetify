<template>
  <v-card>
    <v-card-title>
      {{ $t("home.accounts.title") }}
    </v-card-title>
    <v-card-text>
      <div>
        <span class="grey--text">{{ $t('home.accounts.text_1') }}</span>
        <br>
        <v-icon>mdi-login</v-icon> <a
          href="https://auth0.com/docs/universal-login"
          target="_blank"
        >Auth0 Universal Login</a> vie NPM.
        <br>
        <v-icon>mdi-account</v-icon> <a
          href="https://guide.meteor.com/accounts.html"
          target="_blank"
        >Meteor-accounts</a> installed.
        <br>
        <br>
        <span v-if="!settedAuth0">{{ $t("home.accounts.text_2") }}</span>
        <span v-else-if="!authenticated">{{ $t('home.accounts.text_3') }}</span>
        <span v-else>{{ $t('home.accounts.text_4') }}<strong>{{ $t('home.accounts.text_5') }}</strong></span>
        <br>
        <br>
        <span>Authenticated: <strong>{{ authenticated ? "true" : "false" }}</strong></span>
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
      <v-btn
        v-else
        text
        color="orange"
        :to="{name:'profile'}"
      >
        {{ $t('home.accounts.go_to_profile') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script cpl="vuetify">
  const { AUTH0 } = Meteor.settings.public
  export default {
    name:"Accounts",
    computed: {
      settedAuth0(){
        return !!AUTH0.CLIENT_ID && !!AUTH0.DOMAIN
      },
      authenticated(){
        return this.$store.state.authenticated
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