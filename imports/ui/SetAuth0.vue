<template lang="html">
  <v-layout row wrap>
    <v-flex xs12>
      <v-card>
        <v-card-title primary-title>
          Auth0 Setup instructions
        </v-card-title>
        <v-card-text>
          <ol>
            <li>
              Go to <a href="https://auth0.com/" target="_blank">Auth0 home page.</a> and log in or sign up.
            </li>
            <li>
              On Dashboard, click on Create Application.
            </li>
            <li>
              Type your application name and select Single Page Web Application. Click on Create.
            </li>
            <li>
              On Settings tab, you'll find several fields in blank, type 'http://localhost:3000' (Or your production domain) in both 'Allowed Callback URLs' and 'Allowed Web Origins' fields.
            </li>
            <li>
              Now, copy your app's "Client ID" and "Domain" fields.
            </li>
            <li>
              Paste them in the file /imports/auth0-variables.js. There you'll find instructions of how to paste them.
            </li>
            <li>
              Go to Home page and click on "Log Me In!!".
            </li>
          </ol>
          <br>
          <p>
            Or if you prefer, you can use our Demo auth0 credentials, it will only work with http://localhost:3000 as url.
            <ul>
              <li>CLIENT_ID = "EcVtt1PoK8fUDCf6paFeh3H6eFfQOtBa"</li>
              <li>DOMAIN = "totoom.eu.auth0.com"</li>
            </ul>
          </p>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name:"SetAuth0",
  mounted(){
    this.$store.commit("updateCrumbs", {
      position: 0,
      name: "Set Auth0",
      icon:"person",
      link: {
        name:"setauth0"
      }
    })
  }
}
</script>

<style lang="css" scoped>
</style>
